# Relevo de pedidos web (Cloudflare Worker)

Pieza minima en la nube que permite que un pedido hecho en el catalogo web
caiga solo en la app de escritorio, sin que nadie tenga que pegar el mensaje
de WhatsApp a mano. Ver `worker.js` para el codigo completo.

No guarda nada del negocio: solo el codigo del pedido y el texto del mensaje,
por unos minutos, hasta que la app los recoge.

## Como se desplego (panel de Cloudflare, sin instalar nada)

1. **Workers & Pages > KV > Create a namespace** — nombre `PEDIDOS`.
2. **Workers & Pages > Create > Create Worker** — nombre `cafe-shopping-pedidos`, Deploy.
3. Editar el Worker: pegar el contenido de `worker.js`, Save and Deploy.
4. En el Worker, pestaña **Bindings > Add binding > KV namespace**:
   - Variable name: `PEDIDOS` (tiene que ser exactamente ese nombre, el codigo lo busca asi)
   - Namespace: el creado en el paso 1
5. En el Worker, **Settings > Variables and Secrets > Add**:
   - Nombre: `CLAVE_SECRETA`, tipo Secret, valor: la clave generada para este proyecto (no compartir).
6. La URL del Worker queda arriba de su pagina, forma
   `https://cafe-shopping-pedidos.<subdominio>.workers.dev`.
7. En la app, **Configuracion > Datos del negocio**, pegar esa URL y la
   misma clave del paso 5 en los campos "Pedidos web automaticos". La app
   guarda esto en su base de datos, no en un archivo — el negocio lo cambia
   el mismo cuando quiera, sin editar nada a mano.

## Piezas que hablan con esto

- `backend/src/catalogo/plantilla.ts` — el boton "Pedir por WhatsApp" del
  catalogo tambien avisa a este Worker (ademas de abrir WhatsApp, que sigue
  siendo el canal real con el cliente). La URL sale de BusinessProfile.
- `backend/src/web-orders/web-orders-relay.service.ts` — la app revisa este
  Worker cada pocos minutos y crea el pedido solo, usando el mismo parser que
  ya existe para pegar el mensaje a mano. Si Configuracion no tiene URL y
  clave puestas, esta pieza no hace nada.
