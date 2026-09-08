import { promises as fs } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { CatalogoService } from './catalogo.service';

/**
 * Publicacion automatica del catalogo a Netlify. Solo se sube si estan
 * puestos el token y el site id, y solo si el contenido visible cambio
 * (una venta que baja el stock de 5 a 4 no cambia nada -> no se sube).
 * Un fallo de Netlify NUNCA rompe la generacion del catalogo.
 */
function crearService(perfilExtra: Record<string, unknown> = {}) {
  const prisma = {
    businessProfile: {
      findFirst: jest.fn().mockResolvedValue({
        nombre: 'Cafe Shopping',
        telefonoWhatsapp: '18095551234',
        logoUrl: null,
        descripcionWeb: '',
        direccion: '',
        relevoPedidosUrl: null,
        netlifyToken: null,
        netlifySiteId: null,
        ...perfilExtra,
      }),
    },
    product: {
      findMany: jest.fn().mockResolvedValue([
        {
          sku: 'AN-001',
          nombre: 'Anillo',
          precioUnitario: 1000,
          imageUrl: 'https://ejemplo.test/anillo.jpg',
          material: 'PLATA',
          categoriaId: null,
          tallas: null,
        },
      ]),
    },
    category: { findMany: jest.fn().mockResolvedValue([]) },
  };
  return new CatalogoService(prisma as any);
}

describe('CatalogoService — publicacion a Netlify', () => {
  let carpeta: string;

  beforeEach(async () => {
    carpeta = join(tmpdir(), `catalogo-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
    process.env.CATALOGO_DIR = carpeta;
  });

  afterEach(async () => {
    delete process.env.CATALOGO_DIR;
    await fs.rm(carpeta, { recursive: true, force: true }).catch(() => {});
    jest.restoreAllMocks();
  });

  it('sin token/site id: no llama a Netlify', async () => {
    const fetchMock = jest.fn();
    (global as any).fetch = fetchMock;
    const service = crearService();

    const r = await service.generar();

    expect(r.ok).toBe(true);
    expect(r.netlify).toBe('sin-configurar');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('con credenciales y contenido nuevo: sube el zip y marca "publicado"', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ssl_url: 'https://mi-catalogo.netlify.app' }),
    });
    (global as any).fetch = fetchMock;
    const service = crearService({ netlifyToken: 'nfp_abc', netlifySiteId: 'site-1' });

    const r = await service.generar();

    expect(r.netlify).toBe('publicado');
    expect(r.netlifyUrl).toBe('https://mi-catalogo.netlify.app');
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.netlify.com/api/v1/sites/site-1/deploys');
    expect(init.method).toBe('POST');
    expect(init.headers.Authorization).toBe('Bearer nfp_abc');
    expect(init.headers['Content-Type']).toBe('application/zip');
    expect(Buffer.isBuffer(init.body)).toBe(true);
  });

  it('segunda generacion sin cambios: no vuelve a subir', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ssl_url: 'https://mi-catalogo.netlify.app' }),
    });
    (global as any).fetch = fetchMock;
    const service = crearService({ netlifyToken: 'nfp_abc', netlifySiteId: 'site-1' });

    await service.generar();
    const r2 = await service.generar();

    expect(r2.netlify).toBe('sin-cambios');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('forzarPublicacion sube aunque no haya cambios (boton manual)', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ssl_url: 'https://mi-catalogo.netlify.app' }),
    });
    (global as any).fetch = fetchMock;
    const service = crearService({ netlifyToken: 'nfp_abc', netlifySiteId: 'site-1' });

    await service.generar();
    await service.generar(true);

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('Netlify responde 401: marca "error" pero la generacion sigue OK', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: false, status: 401, text: async () => 'unauthorized' });
    (global as any).fetch = fetchMock;
    const service = crearService({ netlifyToken: 'malo', netlifySiteId: 'site-1' });

    const r = await service.generar();

    expect(r.ok).toBe(true);
    expect(r.netlify).toBe('error');
    expect(r.netlifyError).toContain('token');
  });
});
