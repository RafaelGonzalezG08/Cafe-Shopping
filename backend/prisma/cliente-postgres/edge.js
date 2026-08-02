
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/edge.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  email: 'email',
  passwordHash: 'passwordHash',
  role: 'role',
  activo: 'activo',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ClientScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  telefono: 'telefono',
  email: 'email',
  direccion: 'direccion',
  notas: 'notas',
  lastReminderSentAt: 'lastReminderSentAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  sku: 'sku',
  nombre: 'nombre',
  precioUnitario: 'precioUnitario',
  costoUnitario: 'costoUnitario',
  stock: 'stock',
  imageUrl: 'imageUrl',
  activo: 'activo',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SaleScalarFieldEnum = {
  id: 'id',
  fecha: 'fecha',
  subtotal: 'subtotal',
  impuestos: 'impuestos',
  total: 'total',
  metodoPago: 'metodoPago',
  userId: 'userId',
  clientId: 'clientId',
  createdAt: 'createdAt'
};

exports.Prisma.SaleItemScalarFieldEnum = {
  id: 'id',
  saleId: 'saleId',
  productId: 'productId',
  descripcion: 'descripcion',
  cantidad: 'cantidad',
  precioUnitario: 'precioUnitario',
  costoUnitario: 'costoUnitario',
  total: 'total'
};

exports.Prisma.InvoiceScalarFieldEnum = {
  id: 'id',
  saleId: 'saleId',
  numero: 'numero',
  estado: 'estado',
  pdfUrl: 'pdfUrl',
  pngUrl: 'pngUrl',
  sentWhatsappAt: 'sentWhatsappAt',
  ultimoError: 'ultimoError',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  saleId: 'saleId',
  amount: 'amount',
  fecha: 'fecha',
  metodo: 'metodo',
  createdAt: 'createdAt'
};

exports.Prisma.ClientDebtScalarFieldEnum = {
  id: 'id',
  clientId: 'clientId',
  saleId: 'saleId',
  amountTotal: 'amountTotal',
  amountPaid: 'amountPaid',
  dueDate: 'dueDate',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ExpenseScalarFieldEnum = {
  id: 'id',
  fecha: 'fecha',
  categoria: 'categoria',
  descripcion: 'descripcion',
  monto: 'monto',
  userId: 'userId',
  createdAt: 'createdAt'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  saleId: 'saleId',
  estado: 'estado',
  fechaEntrega: 'fechaEntrega',
  notas: 'notas',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  entity: 'entity',
  entityId: 'entityId',
  action: 'action',
  userId: 'userId',
  changes: 'changes',
  timestamp: 'timestamp'
};

exports.Prisma.BusinessProfileScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  logoUrl: 'logoUrl',
  direccion: 'direccion',
  identifFiscal: 'identifFiscal',
  tasaImpuesto: 'tasaImpuesto',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.Role = exports.$Enums.Role = {
  ADMIN: 'ADMIN',
  CAJERO: 'CAJERO',
  CONTABILIDAD: 'CONTABILIDAD'
};

exports.MetodoPago = exports.$Enums.MetodoPago = {
  EFECTIVO: 'EFECTIVO',
  TARJETA: 'TARJETA',
  TRANSFERENCIA: 'TRANSFERENCIA',
  CREDITO: 'CREDITO',
  OTRO: 'OTRO'
};

exports.EstadoFactura = exports.$Enums.EstadoFactura = {
  PENDIENTE: 'PENDIENTE',
  GENERADA: 'GENERADA',
  ENVIADA: 'ENVIADA',
  ERROR: 'ERROR'
};

exports.EstadoDeuda = exports.$Enums.EstadoDeuda = {
  PENDIENTE: 'PENDIENTE',
  PARCIAL: 'PARCIAL',
  PAGADA: 'PAGADA',
  VENCIDA: 'VENCIDA'
};

exports.EstadoPedido = exports.$Enums.EstadoPedido = {
  PENDIENTE: 'PENDIENTE',
  EMPACADO: 'EMPACADO',
  ENTREGADO: 'ENTREGADO'
};

exports.Prisma.ModelName = {
  User: 'User',
  Client: 'Client',
  Product: 'Product',
  Sale: 'Sale',
  SaleItem: 'SaleItem',
  Invoice: 'Invoice',
  Payment: 'Payment',
  ClientDebt: 'ClientDebt',
  Expense: 'Expense',
  Order: 'Order',
  AuditLog: 'AuditLog',
  BusinessProfile: 'BusinessProfile'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\Users\\ykaru\\Downloads\\cafe-shopping\\backend\\prisma\\cliente-postgres",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "C:\\Users\\ykaru\\Downloads\\cafe-shopping\\backend\\prisma\\schema-origen-postgres.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../../.env",
    "schemaEnvPath": "../../.env"
  },
  "relativePath": "..",
  "clientVersion": "5.22.0",
  "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "// Esquema de base de datos - Cafe Shopping\n// Sigue el modelo de datos definido en la especificacion del proyecto.\n\n// Esquema SOLO PARA LEER la base de PostgreSQL de la version con Docker\n// durante la migracion. No se usa en la app; existe para poder generar un\n// segundo cliente de Prisma que hable Postgres (el cliente normal ya quedo\n// atado a SQLite y rechaza una URL de postgres).\ngenerator client {\n  provider = \"prisma-client-js\"\n  output   = \"./cliente-postgres\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\n// ---------- Enums ----------\n\nenum Role {\n  ADMIN\n  CAJERO\n  CONTABILIDAD\n}\n\nenum MetodoPago {\n  EFECTIVO\n  TARJETA\n  TRANSFERENCIA\n  CREDITO\n  OTRO\n}\n\nenum EstadoFactura {\n  PENDIENTE\n  GENERADA\n  ENVIADA\n  ERROR\n}\n\nenum EstadoDeuda {\n  PENDIENTE\n  PARCIAL\n  PAGADA\n  VENCIDA\n}\n\n// Estados por los que pasa un pedido antes de llegar al cliente.\n// ENTREGADO no llega a guardarse: al marcarlo, el pedido se borra y la\n// factura queda como el registro de la venta (ver orders.service.ts).\nenum EstadoPedido {\n  PENDIENTE\n  EMPACADO\n  ENTREGADO\n}\n\n// ---------- Modelos ----------\n\nmodel User {\n  id           String   @id @default(cuid())\n  nombre       String\n  email        String   @unique\n  passwordHash String   @map(\"password_hash\")\n  role         Role     @default(CAJERO)\n  activo       Boolean  @default(true)\n  createdAt    DateTime @default(now()) @map(\"created_at\")\n  updatedAt    DateTime @updatedAt @map(\"updated_at\")\n\n  sales     Sale[]\n  expenses  Expense[]\n  auditLogs AuditLog[]\n\n  @@map(\"users\")\n}\n\nmodel Client {\n  id                 String    @id @default(cuid())\n  nombre             String\n  telefono           String\n  email              String?\n  direccion          String?\n  notas              String?\n  lastReminderSentAt DateTime? @map(\"last_reminder_sent_at\")\n  createdAt          DateTime  @default(now()) @map(\"created_at\")\n  updatedAt          DateTime  @updatedAt @map(\"updated_at\")\n\n  sales Sale[]\n  debts ClientDebt[]\n\n  @@map(\"clients\")\n}\n\nmodel Product {\n  id             String   @id @default(cuid())\n  sku            String   @unique\n  nombre         String\n  precioUnitario Decimal  @map(\"precio_unitario\") @db.Decimal(10, 2)\n  // Costo de adquisicion de la pieza. Solo visible/editable por ADMIN (ver\n  // ProductsController) - se usa para calcular margen en el apartado de Costos.\n  costoUnitario  Decimal  @default(0) @map(\"costo_unitario\") @db.Decimal(10, 2)\n  stock          Int      @default(0)\n  imageUrl       String?  @map(\"image_url\")\n  activo         Boolean  @default(true)\n  createdAt      DateTime @default(now()) @map(\"created_at\")\n  updatedAt      DateTime @updatedAt @map(\"updated_at\")\n\n  saleItems SaleItem[]\n\n  @@map(\"products\")\n}\n\nmodel Sale {\n  id         String     @id @default(cuid())\n  fecha      DateTime   @default(now())\n  subtotal   Decimal    @db.Decimal(10, 2)\n  impuestos  Decimal    @default(0) @db.Decimal(10, 2)\n  total      Decimal    @db.Decimal(10, 2)\n  metodoPago MetodoPago @map(\"metodo_pago\")\n  userId     String     @map(\"user_id\")\n  clientId   String?    @map(\"client_id\")\n  createdAt  DateTime   @default(now()) @map(\"created_at\")\n\n  user     User       @relation(fields: [userId], references: [id])\n  client   Client?    @relation(fields: [clientId], references: [id])\n  items    SaleItem[]\n  invoice  Invoice?\n  payments Payment[]\n  order    Order?\n\n  @@index([fecha])\n  @@index([clientId])\n  @@map(\"sales\")\n}\n\nmodel SaleItem {\n  id             String  @id @default(cuid())\n  saleId         String  @map(\"sale_id\")\n  productId      String? @map(\"product_id\")\n  descripcion    String\n  cantidad       Int\n  precioUnitario Decimal @map(\"precio_unitario\") @db.Decimal(10, 2)\n  // Copia del costo del producto al momento de la venta (igual que\n  // precioUnitario), para que el margen historico no cambie si luego se\n  // edita el costo del producto en el catalogo.\n  costoUnitario  Decimal @default(0) @map(\"costo_unitario\") @db.Decimal(10, 2)\n  total          Decimal @db.Decimal(10, 2)\n\n  sale    Sale     @relation(fields: [saleId], references: [id], onDelete: Cascade)\n  product Product? @relation(fields: [productId], references: [id])\n\n  @@map(\"sale_items\")\n}\n\nmodel Invoice {\n  id             String        @id @default(cuid())\n  saleId         String        @unique @map(\"sale_id\")\n  numero         String        @unique\n  estado         EstadoFactura @default(PENDIENTE)\n  pdfUrl         String?       @map(\"pdf_url\")\n  pngUrl         String?       @map(\"png_url\")\n  sentWhatsappAt DateTime?     @map(\"sent_whatsapp_at\")\n  ultimoError    String?       @map(\"ultimo_error\")\n  createdAt      DateTime      @default(now()) @map(\"created_at\")\n  updatedAt      DateTime      @updatedAt @map(\"updated_at\")\n\n  sale Sale @relation(fields: [saleId], references: [id])\n\n  @@map(\"invoices\")\n}\n\nmodel Payment {\n  id        String     @id @default(cuid())\n  saleId    String     @map(\"sale_id\")\n  amount    Decimal    @db.Decimal(10, 2)\n  fecha     DateTime   @default(now())\n  metodo    MetodoPago\n  createdAt DateTime   @default(now()) @map(\"created_at\")\n\n  sale Sale @relation(fields: [saleId], references: [id])\n\n  @@map(\"payments\")\n}\n\nmodel ClientDebt {\n  id          String      @id @default(cuid())\n  clientId    String      @map(\"client_id\")\n  saleId      String?     @map(\"sale_id\")\n  amountTotal Decimal     @map(\"amount_total\") @db.Decimal(10, 2)\n  amountPaid  Decimal     @default(0) @map(\"amount_paid\") @db.Decimal(10, 2)\n  dueDate     DateTime?   @map(\"due_date\")\n  status      EstadoDeuda @default(PENDIENTE)\n  createdAt   DateTime    @default(now()) @map(\"created_at\")\n  updatedAt   DateTime    @updatedAt @map(\"updated_at\")\n\n  client Client @relation(fields: [clientId], references: [id])\n\n  @@index([clientId])\n  @@index([status])\n  @@map(\"client_debts\")\n}\n\nmodel Expense {\n  id          String   @id @default(cuid())\n  fecha       DateTime @default(now())\n  categoria   String\n  descripcion String\n  monto       Decimal  @db.Decimal(10, 2)\n  userId      String   @map(\"user_id\")\n  createdAt   DateTime @default(now()) @map(\"created_at\")\n\n  user User @relation(fields: [userId], references: [id])\n\n  @@index([fecha])\n  @@map(\"expenses\")\n}\n\n// Pedido pendiente de entregar al cliente.\n//\n// Solo existe mientras la pieza no ha llegado a manos del cliente: al\n// marcarlo ENTREGADO se borra la fila, y la factura de la venta queda como\n// el registro permanente (por eso `onDelete: Cascade` hacia Sale — si se\n// borra la venta, el pedido se va con ella).\nmodel Order {\n  id           String       @id @default(cuid())\n  saleId       String       @unique @map(\"sale_id\")\n  estado       EstadoPedido @default(PENDIENTE)\n  // Fecha en la que se le prometio la entrega al cliente. Es lo que ordena\n  // el listado y lo que el Dashboard usa para marcar atrasos.\n  fechaEntrega DateTime?    @map(\"fecha_entrega\")\n  notas        String?\n  createdAt    DateTime     @default(now()) @map(\"created_at\")\n  updatedAt    DateTime     @updatedAt @map(\"updated_at\")\n\n  sale Sale @relation(fields: [saleId], references: [id], onDelete: Cascade)\n\n  @@index([estado])\n  @@index([fechaEntrega])\n  @@map(\"orders\")\n}\n\nmodel AuditLog {\n  id        String   @id @default(cuid())\n  entity    String\n  entityId  String   @map(\"entity_id\")\n  action    String\n  userId    String?  @map(\"user_id\")\n  changes   Json?\n  timestamp DateTime @default(now())\n\n  user User? @relation(fields: [userId], references: [id])\n\n  @@index([entity, entityId])\n  @@map(\"audit_logs\")\n}\n\n// Perfil unico del negocio (fila singleton) usado en el modulo de Configuracion.\nmodel BusinessProfile {\n  id            String   @id @default(cuid())\n  nombre        String   @default(\"Cafe Shopping\")\n  logoUrl       String?  @map(\"logo_url\")\n  direccion     String?\n  identifFiscal String?  @map(\"identif_fiscal\")\n  tasaImpuesto  Decimal  @default(0.18) @map(\"tasa_impuesto\") @db.Decimal(5, 4)\n  updatedAt     DateTime @updatedAt @map(\"updated_at\")\n\n  @@map(\"business_profile\")\n}\n",
  "inlineSchemaHash": "c219ded0b002a8fc65ace9da563341aa0ace9740af2835c5e7a71d9b54e84d80",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"dbName\":\"users\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nombre\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"passwordHash\",\"dbName\":\"password_hash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Role\",\"default\":\"CAJERO\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"activo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"sales\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Sale\",\"relationName\":\"SaleToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expenses\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Expense\",\"relationName\":\"ExpenseToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"auditLogs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AuditLog\",\"relationName\":\"AuditLogToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Client\":{\"dbName\":\"clients\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nombre\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"telefono\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"direccion\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"notas\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastReminderSentAt\",\"dbName\":\"last_reminder_sent_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"sales\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Sale\",\"relationName\":\"ClientToSale\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"debts\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ClientDebt\",\"relationName\":\"ClientToClientDebt\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Product\":{\"dbName\":\"products\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sku\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nombre\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"precioUnitario\",\"dbName\":\"precio_unitario\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"costoUnitario\",\"dbName\":\"costo_unitario\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stock\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"imageUrl\",\"dbName\":\"image_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"activo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"saleItems\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SaleItem\",\"relationName\":\"ProductToSaleItem\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Sale\":{\"dbName\":\"sales\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fecha\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"subtotal\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"impuestos\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"total\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"metodoPago\",\"dbName\":\"metodo_pago\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MetodoPago\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clientId\",\"dbName\":\"client_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"SaleToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"client\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Client\",\"relationName\":\"ClientToSale\",\"relationFromFields\":[\"clientId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"items\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SaleItem\",\"relationName\":\"SaleToSaleItem\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"invoice\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Invoice\",\"relationName\":\"InvoiceToSale\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Payment\",\"relationName\":\"PaymentToSale\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"order\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Order\",\"relationName\":\"OrderToSale\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"SaleItem\":{\"dbName\":\"sale_items\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"saleId\",\"dbName\":\"sale_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"productId\",\"dbName\":\"product_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"descripcion\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cantidad\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"precioUnitario\",\"dbName\":\"precio_unitario\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"costoUnitario\",\"dbName\":\"costo_unitario\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"total\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sale\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Sale\",\"relationName\":\"SaleToSaleItem\",\"relationFromFields\":[\"saleId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"product\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Product\",\"relationName\":\"ProductToSaleItem\",\"relationFromFields\":[\"productId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Invoice\":{\"dbName\":\"invoices\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"saleId\",\"dbName\":\"sale_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"numero\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"estado\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"EstadoFactura\",\"default\":\"PENDIENTE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pdfUrl\",\"dbName\":\"pdf_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pngUrl\",\"dbName\":\"png_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sentWhatsappAt\",\"dbName\":\"sent_whatsapp_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ultimoError\",\"dbName\":\"ultimo_error\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"sale\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Sale\",\"relationName\":\"InvoiceToSale\",\"relationFromFields\":[\"saleId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Payment\":{\"dbName\":\"payments\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"saleId\",\"dbName\":\"sale_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fecha\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"metodo\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MetodoPago\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sale\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Sale\",\"relationName\":\"PaymentToSale\",\"relationFromFields\":[\"saleId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ClientDebt\":{\"dbName\":\"client_debts\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clientId\",\"dbName\":\"client_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"saleId\",\"dbName\":\"sale_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amountTotal\",\"dbName\":\"amount_total\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amountPaid\",\"dbName\":\"amount_paid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dueDate\",\"dbName\":\"due_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"EstadoDeuda\",\"default\":\"PENDIENTE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"client\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Client\",\"relationName\":\"ClientToClientDebt\",\"relationFromFields\":[\"clientId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Expense\":{\"dbName\":\"expenses\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fecha\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"categoria\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"descripcion\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"monto\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"ExpenseToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Order\":{\"dbName\":\"orders\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"saleId\",\"dbName\":\"sale_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"estado\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"EstadoPedido\",\"default\":\"PENDIENTE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fechaEntrega\",\"dbName\":\"fecha_entrega\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"notas\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"sale\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Sale\",\"relationName\":\"OrderToSale\",\"relationFromFields\":[\"saleId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"AuditLog\":{\"dbName\":\"audit_logs\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entityId\",\"dbName\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"action\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"changes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timestamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"AuditLogToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"BusinessProfile\":{\"dbName\":\"business_profile\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nombre\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"Cafe Shopping\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"logoUrl\",\"dbName\":\"logo_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"direccion\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"identifFiscal\",\"dbName\":\"identif_fiscal\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tasaImpuesto\",\"dbName\":\"tasa_impuesto\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"default\":0.18,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"Role\":{\"values\":[{\"name\":\"ADMIN\",\"dbName\":null},{\"name\":\"CAJERO\",\"dbName\":null},{\"name\":\"CONTABILIDAD\",\"dbName\":null}],\"dbName\":null},\"MetodoPago\":{\"values\":[{\"name\":\"EFECTIVO\",\"dbName\":null},{\"name\":\"TARJETA\",\"dbName\":null},{\"name\":\"TRANSFERENCIA\",\"dbName\":null},{\"name\":\"CREDITO\",\"dbName\":null},{\"name\":\"OTRO\",\"dbName\":null}],\"dbName\":null},\"EstadoFactura\":{\"values\":[{\"name\":\"PENDIENTE\",\"dbName\":null},{\"name\":\"GENERADA\",\"dbName\":null},{\"name\":\"ENVIADA\",\"dbName\":null},{\"name\":\"ERROR\",\"dbName\":null}],\"dbName\":null},\"EstadoDeuda\":{\"values\":[{\"name\":\"PENDIENTE\",\"dbName\":null},{\"name\":\"PARCIAL\",\"dbName\":null},{\"name\":\"PAGADA\",\"dbName\":null},{\"name\":\"VENCIDA\",\"dbName\":null}],\"dbName\":null},\"EstadoPedido\":{\"values\":[{\"name\":\"PENDIENTE\",\"dbName\":null},{\"name\":\"EMPACADO\",\"dbName\":null},{\"name\":\"ENTREGADO\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

