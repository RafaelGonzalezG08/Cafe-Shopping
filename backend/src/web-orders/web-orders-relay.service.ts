import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { WebOrdersService } from './web-orders.service';

interface PedidoRelevo {
  codigo: string;
  texto: string;
  creado: number;
}

/**
 * Revisa el relevo en la nube (ver /cloud-relay en la raiz del repo) cada
 * pocos minutos y crea solos los pedidos que el catalogo web fue dejando ahi
 * - lo mismo que hace un cajero al pegar el mensaje a mano, pero sin que
 * nadie tenga que hacerlo.
 *
 * La URL y la clave se guardan en Configuracion (BusinessProfile), no en una
 * variable de entorno: el negocio tiene que poder ponerlas el mismo desde la
 * app, sin editar archivos. Si no las ha puesto, esta clase no hace nada: el
 * negocio puede seguir usando solo "pegar el mensaje" sin que esto interfiera.
 */
@Injectable()
export class WebOrdersRelayService {
  private readonly logger = new Logger(WebOrdersRelayService.name);
  private revisando = false;

  constructor(
    private readonly prisma: PrismaService,
    private readonly webOrders: WebOrdersService,
  ) {}

  @Interval(3 * 60 * 1000)
  async revisar() {
    const perfil = await this.prisma.businessProfile.findFirst();
    const url = perfil?.relevoPedidosUrl?.trim();
    const clave = perfil?.relevoPedidosClave?.trim();
    if (!url || !clave) return;

    // Evita superponerse si una revision anterior todavia esta esperando la
    // red (conexion lenta, relevo caido) cuando toca la siguiente.
    if (this.revisando) return;
    this.revisando = true;

    try {
      const respuesta = await fetch(`${url.replace(/\/$/, '')}/pedidos`, {
        headers: { Authorization: `Bearer ${clave}` },
      });
      if (!respuesta.ok) {
        this.logger.warn(
          `El relevo de pedidos respondio ${respuesta.status}; se reintenta en el proximo ciclo.`,
        );
        return;
      }

      const pedidos = (await respuesta.json()) as PedidoRelevo[];
      let creados = 0;

      for (const pedido of pedidos) {
        const resultado = await this.procesarUno(pedido, url, clave);
        if (resultado === 'creado') creados += 1;
      }

      if (creados > 0) {
        this.logger.log(`${creados} pedido(s) web creado(s) automaticamente desde el relevo.`);
      }
    } catch (error) {
      // Sin internet, el relevo caido, etc.: se reintenta solo en el
      // proximo ciclo. El pedido sigue disponible por WhatsApp mientras tanto.
      this.logger.warn(`No se pudo revisar el relevo de pedidos: ${error}`);
    } finally {
      this.revisando = false;
    }
  }

  /** Crea el pedido y, sea cual sea el resultado, lo quita del relevo para no reprocesarlo. */
  private async procesarUno(
    pedido: PedidoRelevo,
    url: string,
    clave: string,
  ): Promise<'creado' | 'omitido'> {
    let resultado: 'creado' | 'omitido' = 'omitido';
    try {
      await this.webOrders.create({ texto: pedido.texto });
      resultado = 'creado';
    } catch (error) {
      // Ya existia (se pegó a mano mientras tanto, o un ciclo anterior fallo
      // borrandolo del relevo) o el texto no se pudo interpretar: en ambos
      // casos no tiene sentido reintentarlo por siempre.
      if (!(error instanceof BadRequestException) && !(error as { status?: number })?.status) {
        this.logger.warn(`Pedido ${pedido.codigo} del relevo no se pudo crear: ${error}`);
      }
    }

    try {
      await fetch(`${url.replace(/\/$/, '')}/pedidos/${encodeURIComponent(pedido.codigo)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${clave}` },
      });
    } catch (error) {
      this.logger.warn(`No se pudo quitar ${pedido.codigo} del relevo (se reintentara): ${error}`);
    }

    return resultado;
  }
}
