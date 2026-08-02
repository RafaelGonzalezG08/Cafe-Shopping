
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Client
 * 
 */
export type Client = $Result.DefaultSelection<Prisma.$ClientPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model Sale
 * 
 */
export type Sale = $Result.DefaultSelection<Prisma.$SalePayload>
/**
 * Model SaleItem
 * 
 */
export type SaleItem = $Result.DefaultSelection<Prisma.$SaleItemPayload>
/**
 * Model Invoice
 * 
 */
export type Invoice = $Result.DefaultSelection<Prisma.$InvoicePayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model ClientDebt
 * 
 */
export type ClientDebt = $Result.DefaultSelection<Prisma.$ClientDebtPayload>
/**
 * Model Expense
 * 
 */
export type Expense = $Result.DefaultSelection<Prisma.$ExpensePayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model BusinessProfile
 * 
 */
export type BusinessProfile = $Result.DefaultSelection<Prisma.$BusinessProfilePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  CAJERO: 'CAJERO',
  CONTABILIDAD: 'CONTABILIDAD'
};

export type Role = (typeof Role)[keyof typeof Role]


export const MetodoPago: {
  EFECTIVO: 'EFECTIVO',
  TARJETA: 'TARJETA',
  TRANSFERENCIA: 'TRANSFERENCIA',
  CREDITO: 'CREDITO',
  OTRO: 'OTRO'
};

export type MetodoPago = (typeof MetodoPago)[keyof typeof MetodoPago]


export const EstadoFactura: {
  PENDIENTE: 'PENDIENTE',
  GENERADA: 'GENERADA',
  ENVIADA: 'ENVIADA',
  ERROR: 'ERROR'
};

export type EstadoFactura = (typeof EstadoFactura)[keyof typeof EstadoFactura]


export const EstadoDeuda: {
  PENDIENTE: 'PENDIENTE',
  PARCIAL: 'PARCIAL',
  PAGADA: 'PAGADA',
  VENCIDA: 'VENCIDA'
};

export type EstadoDeuda = (typeof EstadoDeuda)[keyof typeof EstadoDeuda]


export const EstadoPedido: {
  PENDIENTE: 'PENDIENTE',
  EMPACADO: 'EMPACADO',
  ENTREGADO: 'ENTREGADO'
};

export type EstadoPedido = (typeof EstadoPedido)[keyof typeof EstadoPedido]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type MetodoPago = $Enums.MetodoPago

export const MetodoPago: typeof $Enums.MetodoPago

export type EstadoFactura = $Enums.EstadoFactura

export const EstadoFactura: typeof $Enums.EstadoFactura

export type EstadoDeuda = $Enums.EstadoDeuda

export const EstadoDeuda: typeof $Enums.EstadoDeuda

export type EstadoPedido = $Enums.EstadoPedido

export const EstadoPedido: typeof $Enums.EstadoPedido

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.client`: Exposes CRUD operations for the **Client** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clients
    * const clients = await prisma.client.findMany()
    * ```
    */
  get client(): Prisma.ClientDelegate<ExtArgs>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs>;

  /**
   * `prisma.sale`: Exposes CRUD operations for the **Sale** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sales
    * const sales = await prisma.sale.findMany()
    * ```
    */
  get sale(): Prisma.SaleDelegate<ExtArgs>;

  /**
   * `prisma.saleItem`: Exposes CRUD operations for the **SaleItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SaleItems
    * const saleItems = await prisma.saleItem.findMany()
    * ```
    */
  get saleItem(): Prisma.SaleItemDelegate<ExtArgs>;

  /**
   * `prisma.invoice`: Exposes CRUD operations for the **Invoice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invoices
    * const invoices = await prisma.invoice.findMany()
    * ```
    */
  get invoice(): Prisma.InvoiceDelegate<ExtArgs>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs>;

  /**
   * `prisma.clientDebt`: Exposes CRUD operations for the **ClientDebt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClientDebts
    * const clientDebts = await prisma.clientDebt.findMany()
    * ```
    */
  get clientDebt(): Prisma.ClientDebtDelegate<ExtArgs>;

  /**
   * `prisma.expense`: Exposes CRUD operations for the **Expense** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Expenses
    * const expenses = await prisma.expense.findMany()
    * ```
    */
  get expense(): Prisma.ExpenseDelegate<ExtArgs>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;

  /**
   * `prisma.businessProfile`: Exposes CRUD operations for the **BusinessProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BusinessProfiles
    * const businessProfiles = await prisma.businessProfile.findMany()
    * ```
    */
  get businessProfile(): Prisma.BusinessProfileDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "client" | "product" | "sale" | "saleItem" | "invoice" | "payment" | "clientDebt" | "expense" | "order" | "auditLog" | "businessProfile"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Client: {
        payload: Prisma.$ClientPayload<ExtArgs>
        fields: Prisma.ClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findFirst: {
            args: Prisma.ClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findMany: {
            args: Prisma.ClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          create: {
            args: Prisma.ClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          createMany: {
            args: Prisma.ClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          delete: {
            args: Prisma.ClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          update: {
            args: Prisma.ClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          deleteMany: {
            args: Prisma.ClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          aggregate: {
            args: Prisma.ClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClient>
          }
          groupBy: {
            args: Prisma.ClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientCountArgs<ExtArgs>
            result: $Utils.Optional<ClientCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      Sale: {
        payload: Prisma.$SalePayload<ExtArgs>
        fields: Prisma.SaleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SaleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SaleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          findFirst: {
            args: Prisma.SaleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SaleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          findMany: {
            args: Prisma.SaleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>[]
          }
          create: {
            args: Prisma.SaleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          createMany: {
            args: Prisma.SaleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SaleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>[]
          }
          delete: {
            args: Prisma.SaleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          update: {
            args: Prisma.SaleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          deleteMany: {
            args: Prisma.SaleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SaleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SaleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          aggregate: {
            args: Prisma.SaleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSale>
          }
          groupBy: {
            args: Prisma.SaleGroupByArgs<ExtArgs>
            result: $Utils.Optional<SaleGroupByOutputType>[]
          }
          count: {
            args: Prisma.SaleCountArgs<ExtArgs>
            result: $Utils.Optional<SaleCountAggregateOutputType> | number
          }
        }
      }
      SaleItem: {
        payload: Prisma.$SaleItemPayload<ExtArgs>
        fields: Prisma.SaleItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SaleItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SaleItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload>
          }
          findFirst: {
            args: Prisma.SaleItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SaleItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload>
          }
          findMany: {
            args: Prisma.SaleItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload>[]
          }
          create: {
            args: Prisma.SaleItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload>
          }
          createMany: {
            args: Prisma.SaleItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SaleItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload>[]
          }
          delete: {
            args: Prisma.SaleItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload>
          }
          update: {
            args: Prisma.SaleItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload>
          }
          deleteMany: {
            args: Prisma.SaleItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SaleItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SaleItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload>
          }
          aggregate: {
            args: Prisma.SaleItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSaleItem>
          }
          groupBy: {
            args: Prisma.SaleItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<SaleItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.SaleItemCountArgs<ExtArgs>
            result: $Utils.Optional<SaleItemCountAggregateOutputType> | number
          }
        }
      }
      Invoice: {
        payload: Prisma.$InvoicePayload<ExtArgs>
        fields: Prisma.InvoiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvoiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvoiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findFirst: {
            args: Prisma.InvoiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvoiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findMany: {
            args: Prisma.InvoiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          create: {
            args: Prisma.InvoiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          createMany: {
            args: Prisma.InvoiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvoiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          delete: {
            args: Prisma.InvoiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          update: {
            args: Prisma.InvoiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          deleteMany: {
            args: Prisma.InvoiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvoiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InvoiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          aggregate: {
            args: Prisma.InvoiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvoice>
          }
          groupBy: {
            args: Prisma.InvoiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvoiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvoiceCountArgs<ExtArgs>
            result: $Utils.Optional<InvoiceCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      ClientDebt: {
        payload: Prisma.$ClientDebtPayload<ExtArgs>
        fields: Prisma.ClientDebtFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientDebtFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientDebtPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientDebtFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientDebtPayload>
          }
          findFirst: {
            args: Prisma.ClientDebtFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientDebtPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientDebtFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientDebtPayload>
          }
          findMany: {
            args: Prisma.ClientDebtFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientDebtPayload>[]
          }
          create: {
            args: Prisma.ClientDebtCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientDebtPayload>
          }
          createMany: {
            args: Prisma.ClientDebtCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClientDebtCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientDebtPayload>[]
          }
          delete: {
            args: Prisma.ClientDebtDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientDebtPayload>
          }
          update: {
            args: Prisma.ClientDebtUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientDebtPayload>
          }
          deleteMany: {
            args: Prisma.ClientDebtDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientDebtUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClientDebtUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientDebtPayload>
          }
          aggregate: {
            args: Prisma.ClientDebtAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClientDebt>
          }
          groupBy: {
            args: Prisma.ClientDebtGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientDebtGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientDebtCountArgs<ExtArgs>
            result: $Utils.Optional<ClientDebtCountAggregateOutputType> | number
          }
        }
      }
      Expense: {
        payload: Prisma.$ExpensePayload<ExtArgs>
        fields: Prisma.ExpenseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExpenseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExpenseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          findFirst: {
            args: Prisma.ExpenseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExpenseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          findMany: {
            args: Prisma.ExpenseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>[]
          }
          create: {
            args: Prisma.ExpenseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          createMany: {
            args: Prisma.ExpenseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExpenseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>[]
          }
          delete: {
            args: Prisma.ExpenseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          update: {
            args: Prisma.ExpenseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          deleteMany: {
            args: Prisma.ExpenseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExpenseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExpenseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          aggregate: {
            args: Prisma.ExpenseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExpense>
          }
          groupBy: {
            args: Prisma.ExpenseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExpenseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExpenseCountArgs<ExtArgs>
            result: $Utils.Optional<ExpenseCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      BusinessProfile: {
        payload: Prisma.$BusinessProfilePayload<ExtArgs>
        fields: Prisma.BusinessProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BusinessProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BusinessProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessProfilePayload>
          }
          findFirst: {
            args: Prisma.BusinessProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BusinessProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessProfilePayload>
          }
          findMany: {
            args: Prisma.BusinessProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessProfilePayload>[]
          }
          create: {
            args: Prisma.BusinessProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessProfilePayload>
          }
          createMany: {
            args: Prisma.BusinessProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BusinessProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessProfilePayload>[]
          }
          delete: {
            args: Prisma.BusinessProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessProfilePayload>
          }
          update: {
            args: Prisma.BusinessProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessProfilePayload>
          }
          deleteMany: {
            args: Prisma.BusinessProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BusinessProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BusinessProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessProfilePayload>
          }
          aggregate: {
            args: Prisma.BusinessProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBusinessProfile>
          }
          groupBy: {
            args: Prisma.BusinessProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<BusinessProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.BusinessProfileCountArgs<ExtArgs>
            result: $Utils.Optional<BusinessProfileCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sales: number
    expenses: number
    auditLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sales?: boolean | UserCountOutputTypeCountSalesArgs
    expenses?: boolean | UserCountOutputTypeCountExpensesArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountExpensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type ClientCountOutputType
   */

  export type ClientCountOutputType = {
    sales: number
    debts: number
  }

  export type ClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sales?: boolean | ClientCountOutputTypeCountSalesArgs
    debts?: boolean | ClientCountOutputTypeCountDebtsArgs
  }

  // Custom InputTypes
  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientCountOutputType
     */
    select?: ClientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountSalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleWhereInput
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountDebtsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientDebtWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    saleItems: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    saleItems?: boolean | ProductCountOutputTypeCountSaleItemsArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountSaleItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleItemWhereInput
  }


  /**
   * Count Type SaleCountOutputType
   */

  export type SaleCountOutputType = {
    items: number
    payments: number
  }

  export type SaleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | SaleCountOutputTypeCountItemsArgs
    payments?: boolean | SaleCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * SaleCountOutputType without action
   */
  export type SaleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleCountOutputType
     */
    select?: SaleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SaleCountOutputType without action
   */
  export type SaleCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleItemWhereInput
  }

  /**
   * SaleCountOutputType without action
   */
  export type SaleCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    activo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    activo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    nombre: number
    email: number
    passwordHash: number
    role: number
    activo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    nombre?: true
    email?: true
    passwordHash?: true
    role?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    nombre?: true
    email?: true
    passwordHash?: true
    role?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    nombre?: true
    email?: true
    passwordHash?: true
    role?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    nombre: string
    email: string
    passwordHash: string
    role: $Enums.Role
    activo: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sales?: boolean | User$salesArgs<ExtArgs>
    expenses?: boolean | User$expensesArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    nombre?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sales?: boolean | User$salesArgs<ExtArgs>
    expenses?: boolean | User$expensesArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sales: Prisma.$SalePayload<ExtArgs>[]
      expenses: Prisma.$ExpensePayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      email: string
      passwordHash: string
      role: $Enums.Role
      activo: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sales<T extends User$salesArgs<ExtArgs> = {}>(args?: Subset<T, User$salesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany"> | Null>
    expenses<T extends User$expensesArgs<ExtArgs> = {}>(args?: Subset<T, User$expensesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany"> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly nombre: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly activo: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.sales
   */
  export type User$salesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    where?: SaleWhereInput
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    cursor?: SaleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * User.expenses
   */
  export type User$expensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    cursor?: ExpenseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Client
   */

  export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  export type ClientMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    telefono: string | null
    email: string | null
    direccion: string | null
    notas: string | null
    lastReminderSentAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    telefono: string | null
    email: string | null
    direccion: string | null
    notas: string | null
    lastReminderSentAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientCountAggregateOutputType = {
    id: number
    nombre: number
    telefono: number
    email: number
    direccion: number
    notas: number
    lastReminderSentAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClientMinAggregateInputType = {
    id?: true
    nombre?: true
    telefono?: true
    email?: true
    direccion?: true
    notas?: true
    lastReminderSentAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientMaxAggregateInputType = {
    id?: true
    nombre?: true
    telefono?: true
    email?: true
    direccion?: true
    notas?: true
    lastReminderSentAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientCountAggregateInputType = {
    id?: true
    nombre?: true
    telefono?: true
    email?: true
    direccion?: true
    notas?: true
    lastReminderSentAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Client to aggregate.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clients
    **/
    _count?: true | ClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientMaxAggregateInputType
  }

  export type GetClientAggregateType<T extends ClientAggregateArgs> = {
        [P in keyof T & keyof AggregateClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClient[P]>
      : GetScalarType<T[P], AggregateClient[P]>
  }




  export type ClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithAggregationInput | ClientOrderByWithAggregationInput[]
    by: ClientScalarFieldEnum[] | ClientScalarFieldEnum
    having?: ClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientCountAggregateInputType | true
    _min?: ClientMinAggregateInputType
    _max?: ClientMaxAggregateInputType
  }

  export type ClientGroupByOutputType = {
    id: string
    nombre: string
    telefono: string
    email: string | null
    direccion: string | null
    notas: string | null
    lastReminderSentAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  type GetClientGroupByPayload<T extends ClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientGroupByOutputType[P]>
            : GetScalarType<T[P], ClientGroupByOutputType[P]>
        }
      >
    >


  export type ClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    telefono?: boolean
    email?: boolean
    direccion?: boolean
    notas?: boolean
    lastReminderSentAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sales?: boolean | Client$salesArgs<ExtArgs>
    debts?: boolean | Client$debtsArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    telefono?: boolean
    email?: boolean
    direccion?: boolean
    notas?: boolean
    lastReminderSentAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["client"]>

  export type ClientSelectScalar = {
    id?: boolean
    nombre?: boolean
    telefono?: boolean
    email?: boolean
    direccion?: boolean
    notas?: boolean
    lastReminderSentAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sales?: boolean | Client$salesArgs<ExtArgs>
    debts?: boolean | Client$debtsArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Client"
    objects: {
      sales: Prisma.$SalePayload<ExtArgs>[]
      debts: Prisma.$ClientDebtPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      telefono: string
      email: string | null
      direccion: string | null
      notas: string | null
      lastReminderSentAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["client"]>
    composites: {}
  }

  type ClientGetPayload<S extends boolean | null | undefined | ClientDefaultArgs> = $Result.GetResult<Prisma.$ClientPayload, S>

  type ClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ClientFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ClientCountAggregateInputType | true
    }

  export interface ClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Client'], meta: { name: 'Client' } }
    /**
     * Find zero or one Client that matches the filter.
     * @param {ClientFindUniqueArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientFindUniqueArgs>(args: SelectSubset<T, ClientFindUniqueArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Client that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ClientFindUniqueOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientFindFirstArgs>(args?: SelectSubset<T, ClientFindFirstArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clients
     * const clients = await prisma.client.findMany()
     * 
     * // Get first 10 Clients
     * const clients = await prisma.client.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientWithIdOnly = await prisma.client.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClientFindManyArgs>(args?: SelectSubset<T, ClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Client.
     * @param {ClientCreateArgs} args - Arguments to create a Client.
     * @example
     * // Create one Client
     * const Client = await prisma.client.create({
     *   data: {
     *     // ... data to create a Client
     *   }
     * })
     * 
     */
    create<T extends ClientCreateArgs>(args: SelectSubset<T, ClientCreateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Clients.
     * @param {ClientCreateManyArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientCreateManyArgs>(args?: SelectSubset<T, ClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clients and returns the data saved in the database.
     * @param {ClientCreateManyAndReturnArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClientCreateManyAndReturnArgs>(args?: SelectSubset<T, ClientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Client.
     * @param {ClientDeleteArgs} args - Arguments to delete one Client.
     * @example
     * // Delete one Client
     * const Client = await prisma.client.delete({
     *   where: {
     *     // ... filter to delete one Client
     *   }
     * })
     * 
     */
    delete<T extends ClientDeleteArgs>(args: SelectSubset<T, ClientDeleteArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Client.
     * @param {ClientUpdateArgs} args - Arguments to update one Client.
     * @example
     * // Update one Client
     * const client = await prisma.client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientUpdateArgs>(args: SelectSubset<T, ClientUpdateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Clients.
     * @param {ClientDeleteManyArgs} args - Arguments to filter Clients to delete.
     * @example
     * // Delete a few Clients
     * const { count } = await prisma.client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientDeleteManyArgs>(args?: SelectSubset<T, ClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientUpdateManyArgs>(args: SelectSubset<T, ClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Client.
     * @param {ClientUpsertArgs} args - Arguments to update or create a Client.
     * @example
     * // Update or create a Client
     * const client = await prisma.client.upsert({
     *   create: {
     *     // ... data to create a Client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client we want to update
     *   }
     * })
     */
    upsert<T extends ClientUpsertArgs>(args: SelectSubset<T, ClientUpsertArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientCountArgs} args - Arguments to filter Clients to count.
     * @example
     * // Count the number of Clients
     * const count = await prisma.client.count({
     *   where: {
     *     // ... the filter for the Clients we want to count
     *   }
     * })
    **/
    count<T extends ClientCountArgs>(
      args?: Subset<T, ClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClientAggregateArgs>(args: Subset<T, ClientAggregateArgs>): Prisma.PrismaPromise<GetClientAggregateType<T>>

    /**
     * Group by Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientGroupByArgs['orderBy'] }
        : { orderBy?: ClientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Client model
   */
  readonly fields: ClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Client.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sales<T extends Client$salesArgs<ExtArgs> = {}>(args?: Subset<T, Client$salesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany"> | Null>
    debts<T extends Client$debtsArgs<ExtArgs> = {}>(args?: Subset<T, Client$debtsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientDebtPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Client model
   */ 
  interface ClientFieldRefs {
    readonly id: FieldRef<"Client", 'String'>
    readonly nombre: FieldRef<"Client", 'String'>
    readonly telefono: FieldRef<"Client", 'String'>
    readonly email: FieldRef<"Client", 'String'>
    readonly direccion: FieldRef<"Client", 'String'>
    readonly notas: FieldRef<"Client", 'String'>
    readonly lastReminderSentAt: FieldRef<"Client", 'DateTime'>
    readonly createdAt: FieldRef<"Client", 'DateTime'>
    readonly updatedAt: FieldRef<"Client", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Client findUnique
   */
  export type ClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findUniqueOrThrow
   */
  export type ClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findFirst
   */
  export type ClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findFirstOrThrow
   */
  export type ClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findMany
   */
  export type ClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Clients to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client create
   */
  export type ClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to create a Client.
     */
    data: XOR<ClientCreateInput, ClientUncheckedCreateInput>
  }

  /**
   * Client createMany
   */
  export type ClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client createManyAndReturn
   */
  export type ClientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client update
   */
  export type ClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to update a Client.
     */
    data: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
    /**
     * Choose, which Client to update.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client updateMany
   */
  export type ClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
  }

  /**
   * Client upsert
   */
  export type ClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The filter to search for the Client to update in case it exists.
     */
    where: ClientWhereUniqueInput
    /**
     * In case the Client found by the `where` argument doesn't exist, create a new Client with this data.
     */
    create: XOR<ClientCreateInput, ClientUncheckedCreateInput>
    /**
     * In case the Client was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
  }

  /**
   * Client delete
   */
  export type ClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter which Client to delete.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client deleteMany
   */
  export type ClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clients to delete
     */
    where?: ClientWhereInput
  }

  /**
   * Client.sales
   */
  export type Client$salesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    where?: SaleWhereInput
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    cursor?: SaleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Client.debts
   */
  export type Client$debtsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientDebt
     */
    select?: ClientDebtSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientDebtInclude<ExtArgs> | null
    where?: ClientDebtWhereInput
    orderBy?: ClientDebtOrderByWithRelationInput | ClientDebtOrderByWithRelationInput[]
    cursor?: ClientDebtWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClientDebtScalarFieldEnum | ClientDebtScalarFieldEnum[]
  }

  /**
   * Client without action
   */
  export type ClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    precioUnitario: Decimal | null
    costoUnitario: Decimal | null
    stock: number | null
  }

  export type ProductSumAggregateOutputType = {
    precioUnitario: Decimal | null
    costoUnitario: Decimal | null
    stock: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    sku: string | null
    nombre: string | null
    precioUnitario: Decimal | null
    costoUnitario: Decimal | null
    stock: number | null
    imageUrl: string | null
    activo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    sku: string | null
    nombre: string | null
    precioUnitario: Decimal | null
    costoUnitario: Decimal | null
    stock: number | null
    imageUrl: string | null
    activo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    sku: number
    nombre: number
    precioUnitario: number
    costoUnitario: number
    stock: number
    imageUrl: number
    activo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    precioUnitario?: true
    costoUnitario?: true
    stock?: true
  }

  export type ProductSumAggregateInputType = {
    precioUnitario?: true
    costoUnitario?: true
    stock?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    sku?: true
    nombre?: true
    precioUnitario?: true
    costoUnitario?: true
    stock?: true
    imageUrl?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    sku?: true
    nombre?: true
    precioUnitario?: true
    costoUnitario?: true
    stock?: true
    imageUrl?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    sku?: true
    nombre?: true
    precioUnitario?: true
    costoUnitario?: true
    stock?: true
    imageUrl?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    sku: string
    nombre: string
    precioUnitario: Decimal
    costoUnitario: Decimal
    stock: number
    imageUrl: string | null
    activo: boolean
    createdAt: Date
    updatedAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sku?: boolean
    nombre?: boolean
    precioUnitario?: boolean
    costoUnitario?: boolean
    stock?: boolean
    imageUrl?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    saleItems?: boolean | Product$saleItemsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sku?: boolean
    nombre?: boolean
    precioUnitario?: boolean
    costoUnitario?: boolean
    stock?: boolean
    imageUrl?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    sku?: boolean
    nombre?: boolean
    precioUnitario?: boolean
    costoUnitario?: boolean
    stock?: boolean
    imageUrl?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    saleItems?: boolean | Product$saleItemsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      saleItems: Prisma.$SaleItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sku: string
      nombre: string
      precioUnitario: Prisma.Decimal
      costoUnitario: Prisma.Decimal
      stock: number
      imageUrl: string | null
      activo: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    saleItems<T extends Product$saleItemsArgs<ExtArgs> = {}>(args?: Subset<T, Product$saleItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */ 
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly sku: FieldRef<"Product", 'String'>
    readonly nombre: FieldRef<"Product", 'String'>
    readonly precioUnitario: FieldRef<"Product", 'Decimal'>
    readonly costoUnitario: FieldRef<"Product", 'Decimal'>
    readonly stock: FieldRef<"Product", 'Int'>
    readonly imageUrl: FieldRef<"Product", 'String'>
    readonly activo: FieldRef<"Product", 'Boolean'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
  }

  /**
   * Product.saleItems
   */
  export type Product$saleItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    where?: SaleItemWhereInput
    orderBy?: SaleItemOrderByWithRelationInput | SaleItemOrderByWithRelationInput[]
    cursor?: SaleItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleItemScalarFieldEnum | SaleItemScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model Sale
   */

  export type AggregateSale = {
    _count: SaleCountAggregateOutputType | null
    _avg: SaleAvgAggregateOutputType | null
    _sum: SaleSumAggregateOutputType | null
    _min: SaleMinAggregateOutputType | null
    _max: SaleMaxAggregateOutputType | null
  }

  export type SaleAvgAggregateOutputType = {
    subtotal: Decimal | null
    impuestos: Decimal | null
    total: Decimal | null
  }

  export type SaleSumAggregateOutputType = {
    subtotal: Decimal | null
    impuestos: Decimal | null
    total: Decimal | null
  }

  export type SaleMinAggregateOutputType = {
    id: string | null
    fecha: Date | null
    subtotal: Decimal | null
    impuestos: Decimal | null
    total: Decimal | null
    metodoPago: $Enums.MetodoPago | null
    userId: string | null
    clientId: string | null
    createdAt: Date | null
  }

  export type SaleMaxAggregateOutputType = {
    id: string | null
    fecha: Date | null
    subtotal: Decimal | null
    impuestos: Decimal | null
    total: Decimal | null
    metodoPago: $Enums.MetodoPago | null
    userId: string | null
    clientId: string | null
    createdAt: Date | null
  }

  export type SaleCountAggregateOutputType = {
    id: number
    fecha: number
    subtotal: number
    impuestos: number
    total: number
    metodoPago: number
    userId: number
    clientId: number
    createdAt: number
    _all: number
  }


  export type SaleAvgAggregateInputType = {
    subtotal?: true
    impuestos?: true
    total?: true
  }

  export type SaleSumAggregateInputType = {
    subtotal?: true
    impuestos?: true
    total?: true
  }

  export type SaleMinAggregateInputType = {
    id?: true
    fecha?: true
    subtotal?: true
    impuestos?: true
    total?: true
    metodoPago?: true
    userId?: true
    clientId?: true
    createdAt?: true
  }

  export type SaleMaxAggregateInputType = {
    id?: true
    fecha?: true
    subtotal?: true
    impuestos?: true
    total?: true
    metodoPago?: true
    userId?: true
    clientId?: true
    createdAt?: true
  }

  export type SaleCountAggregateInputType = {
    id?: true
    fecha?: true
    subtotal?: true
    impuestos?: true
    total?: true
    metodoPago?: true
    userId?: true
    clientId?: true
    createdAt?: true
    _all?: true
  }

  export type SaleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sale to aggregate.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sales
    **/
    _count?: true | SaleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SaleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SaleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SaleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SaleMaxAggregateInputType
  }

  export type GetSaleAggregateType<T extends SaleAggregateArgs> = {
        [P in keyof T & keyof AggregateSale]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSale[P]>
      : GetScalarType<T[P], AggregateSale[P]>
  }




  export type SaleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleWhereInput
    orderBy?: SaleOrderByWithAggregationInput | SaleOrderByWithAggregationInput[]
    by: SaleScalarFieldEnum[] | SaleScalarFieldEnum
    having?: SaleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SaleCountAggregateInputType | true
    _avg?: SaleAvgAggregateInputType
    _sum?: SaleSumAggregateInputType
    _min?: SaleMinAggregateInputType
    _max?: SaleMaxAggregateInputType
  }

  export type SaleGroupByOutputType = {
    id: string
    fecha: Date
    subtotal: Decimal
    impuestos: Decimal
    total: Decimal
    metodoPago: $Enums.MetodoPago
    userId: string
    clientId: string | null
    createdAt: Date
    _count: SaleCountAggregateOutputType | null
    _avg: SaleAvgAggregateOutputType | null
    _sum: SaleSumAggregateOutputType | null
    _min: SaleMinAggregateOutputType | null
    _max: SaleMaxAggregateOutputType | null
  }

  type GetSaleGroupByPayload<T extends SaleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SaleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SaleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SaleGroupByOutputType[P]>
            : GetScalarType<T[P], SaleGroupByOutputType[P]>
        }
      >
    >


  export type SaleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fecha?: boolean
    subtotal?: boolean
    impuestos?: boolean
    total?: boolean
    metodoPago?: boolean
    userId?: boolean
    clientId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | Sale$clientArgs<ExtArgs>
    items?: boolean | Sale$itemsArgs<ExtArgs>
    invoice?: boolean | Sale$invoiceArgs<ExtArgs>
    payments?: boolean | Sale$paymentsArgs<ExtArgs>
    order?: boolean | Sale$orderArgs<ExtArgs>
    _count?: boolean | SaleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sale"]>

  export type SaleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fecha?: boolean
    subtotal?: boolean
    impuestos?: boolean
    total?: boolean
    metodoPago?: boolean
    userId?: boolean
    clientId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | Sale$clientArgs<ExtArgs>
  }, ExtArgs["result"]["sale"]>

  export type SaleSelectScalar = {
    id?: boolean
    fecha?: boolean
    subtotal?: boolean
    impuestos?: boolean
    total?: boolean
    metodoPago?: boolean
    userId?: boolean
    clientId?: boolean
    createdAt?: boolean
  }

  export type SaleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | Sale$clientArgs<ExtArgs>
    items?: boolean | Sale$itemsArgs<ExtArgs>
    invoice?: boolean | Sale$invoiceArgs<ExtArgs>
    payments?: boolean | Sale$paymentsArgs<ExtArgs>
    order?: boolean | Sale$orderArgs<ExtArgs>
    _count?: boolean | SaleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SaleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | Sale$clientArgs<ExtArgs>
  }

  export type $SalePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sale"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      client: Prisma.$ClientPayload<ExtArgs> | null
      items: Prisma.$SaleItemPayload<ExtArgs>[]
      invoice: Prisma.$InvoicePayload<ExtArgs> | null
      payments: Prisma.$PaymentPayload<ExtArgs>[]
      order: Prisma.$OrderPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fecha: Date
      subtotal: Prisma.Decimal
      impuestos: Prisma.Decimal
      total: Prisma.Decimal
      metodoPago: $Enums.MetodoPago
      userId: string
      clientId: string | null
      createdAt: Date
    }, ExtArgs["result"]["sale"]>
    composites: {}
  }

  type SaleGetPayload<S extends boolean | null | undefined | SaleDefaultArgs> = $Result.GetResult<Prisma.$SalePayload, S>

  type SaleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SaleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SaleCountAggregateInputType | true
    }

  export interface SaleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sale'], meta: { name: 'Sale' } }
    /**
     * Find zero or one Sale that matches the filter.
     * @param {SaleFindUniqueArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SaleFindUniqueArgs>(args: SelectSubset<T, SaleFindUniqueArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Sale that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SaleFindUniqueOrThrowArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SaleFindUniqueOrThrowArgs>(args: SelectSubset<T, SaleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Sale that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFindFirstArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SaleFindFirstArgs>(args?: SelectSubset<T, SaleFindFirstArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Sale that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFindFirstOrThrowArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SaleFindFirstOrThrowArgs>(args?: SelectSubset<T, SaleFindFirstOrThrowArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sales that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sales
     * const sales = await prisma.sale.findMany()
     * 
     * // Get first 10 Sales
     * const sales = await prisma.sale.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const saleWithIdOnly = await prisma.sale.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SaleFindManyArgs>(args?: SelectSubset<T, SaleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Sale.
     * @param {SaleCreateArgs} args - Arguments to create a Sale.
     * @example
     * // Create one Sale
     * const Sale = await prisma.sale.create({
     *   data: {
     *     // ... data to create a Sale
     *   }
     * })
     * 
     */
    create<T extends SaleCreateArgs>(args: SelectSubset<T, SaleCreateArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sales.
     * @param {SaleCreateManyArgs} args - Arguments to create many Sales.
     * @example
     * // Create many Sales
     * const sale = await prisma.sale.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SaleCreateManyArgs>(args?: SelectSubset<T, SaleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sales and returns the data saved in the database.
     * @param {SaleCreateManyAndReturnArgs} args - Arguments to create many Sales.
     * @example
     * // Create many Sales
     * const sale = await prisma.sale.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sales and only return the `id`
     * const saleWithIdOnly = await prisma.sale.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SaleCreateManyAndReturnArgs>(args?: SelectSubset<T, SaleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Sale.
     * @param {SaleDeleteArgs} args - Arguments to delete one Sale.
     * @example
     * // Delete one Sale
     * const Sale = await prisma.sale.delete({
     *   where: {
     *     // ... filter to delete one Sale
     *   }
     * })
     * 
     */
    delete<T extends SaleDeleteArgs>(args: SelectSubset<T, SaleDeleteArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Sale.
     * @param {SaleUpdateArgs} args - Arguments to update one Sale.
     * @example
     * // Update one Sale
     * const sale = await prisma.sale.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SaleUpdateArgs>(args: SelectSubset<T, SaleUpdateArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sales.
     * @param {SaleDeleteManyArgs} args - Arguments to filter Sales to delete.
     * @example
     * // Delete a few Sales
     * const { count } = await prisma.sale.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SaleDeleteManyArgs>(args?: SelectSubset<T, SaleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sales
     * const sale = await prisma.sale.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SaleUpdateManyArgs>(args: SelectSubset<T, SaleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Sale.
     * @param {SaleUpsertArgs} args - Arguments to update or create a Sale.
     * @example
     * // Update or create a Sale
     * const sale = await prisma.sale.upsert({
     *   create: {
     *     // ... data to create a Sale
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sale we want to update
     *   }
     * })
     */
    upsert<T extends SaleUpsertArgs>(args: SelectSubset<T, SaleUpsertArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleCountArgs} args - Arguments to filter Sales to count.
     * @example
     * // Count the number of Sales
     * const count = await prisma.sale.count({
     *   where: {
     *     // ... the filter for the Sales we want to count
     *   }
     * })
    **/
    count<T extends SaleCountArgs>(
      args?: Subset<T, SaleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SaleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sale.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SaleAggregateArgs>(args: Subset<T, SaleAggregateArgs>): Prisma.PrismaPromise<GetSaleAggregateType<T>>

    /**
     * Group by Sale.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SaleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SaleGroupByArgs['orderBy'] }
        : { orderBy?: SaleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SaleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSaleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sale model
   */
  readonly fields: SaleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sale.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SaleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    client<T extends Sale$clientArgs<ExtArgs> = {}>(args?: Subset<T, Sale$clientArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    items<T extends Sale$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Sale$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "findMany"> | Null>
    invoice<T extends Sale$invoiceArgs<ExtArgs> = {}>(args?: Subset<T, Sale$invoiceArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    payments<T extends Sale$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Sale$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany"> | Null>
    order<T extends Sale$orderArgs<ExtArgs> = {}>(args?: Subset<T, Sale$orderArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Sale model
   */ 
  interface SaleFieldRefs {
    readonly id: FieldRef<"Sale", 'String'>
    readonly fecha: FieldRef<"Sale", 'DateTime'>
    readonly subtotal: FieldRef<"Sale", 'Decimal'>
    readonly impuestos: FieldRef<"Sale", 'Decimal'>
    readonly total: FieldRef<"Sale", 'Decimal'>
    readonly metodoPago: FieldRef<"Sale", 'MetodoPago'>
    readonly userId: FieldRef<"Sale", 'String'>
    readonly clientId: FieldRef<"Sale", 'String'>
    readonly createdAt: FieldRef<"Sale", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Sale findUnique
   */
  export type SaleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale findUniqueOrThrow
   */
  export type SaleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale findFirst
   */
  export type SaleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sales.
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sales.
     */
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Sale findFirstOrThrow
   */
  export type SaleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sales.
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sales.
     */
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Sale findMany
   */
  export type SaleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sales to fetch.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sales.
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Sale create
   */
  export type SaleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * The data needed to create a Sale.
     */
    data: XOR<SaleCreateInput, SaleUncheckedCreateInput>
  }

  /**
   * Sale createMany
   */
  export type SaleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sales.
     */
    data: SaleCreateManyInput | SaleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Sale createManyAndReturn
   */
  export type SaleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Sales.
     */
    data: SaleCreateManyInput | SaleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Sale update
   */
  export type SaleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * The data needed to update a Sale.
     */
    data: XOR<SaleUpdateInput, SaleUncheckedUpdateInput>
    /**
     * Choose, which Sale to update.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale updateMany
   */
  export type SaleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sales.
     */
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyInput>
    /**
     * Filter which Sales to update
     */
    where?: SaleWhereInput
  }

  /**
   * Sale upsert
   */
  export type SaleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * The filter to search for the Sale to update in case it exists.
     */
    where: SaleWhereUniqueInput
    /**
     * In case the Sale found by the `where` argument doesn't exist, create a new Sale with this data.
     */
    create: XOR<SaleCreateInput, SaleUncheckedCreateInput>
    /**
     * In case the Sale was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SaleUpdateInput, SaleUncheckedUpdateInput>
  }

  /**
   * Sale delete
   */
  export type SaleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter which Sale to delete.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale deleteMany
   */
  export type SaleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sales to delete
     */
    where?: SaleWhereInput
  }

  /**
   * Sale.client
   */
  export type Sale$clientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    where?: ClientWhereInput
  }

  /**
   * Sale.items
   */
  export type Sale$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    where?: SaleItemWhereInput
    orderBy?: SaleItemOrderByWithRelationInput | SaleItemOrderByWithRelationInput[]
    cursor?: SaleItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleItemScalarFieldEnum | SaleItemScalarFieldEnum[]
  }

  /**
   * Sale.invoice
   */
  export type Sale$invoiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    where?: InvoiceWhereInput
  }

  /**
   * Sale.payments
   */
  export type Sale$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Sale.order
   */
  export type Sale$orderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
  }

  /**
   * Sale without action
   */
  export type SaleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
  }


  /**
   * Model SaleItem
   */

  export type AggregateSaleItem = {
    _count: SaleItemCountAggregateOutputType | null
    _avg: SaleItemAvgAggregateOutputType | null
    _sum: SaleItemSumAggregateOutputType | null
    _min: SaleItemMinAggregateOutputType | null
    _max: SaleItemMaxAggregateOutputType | null
  }

  export type SaleItemAvgAggregateOutputType = {
    cantidad: number | null
    precioUnitario: Decimal | null
    costoUnitario: Decimal | null
    total: Decimal | null
  }

  export type SaleItemSumAggregateOutputType = {
    cantidad: number | null
    precioUnitario: Decimal | null
    costoUnitario: Decimal | null
    total: Decimal | null
  }

  export type SaleItemMinAggregateOutputType = {
    id: string | null
    saleId: string | null
    productId: string | null
    descripcion: string | null
    cantidad: number | null
    precioUnitario: Decimal | null
    costoUnitario: Decimal | null
    total: Decimal | null
  }

  export type SaleItemMaxAggregateOutputType = {
    id: string | null
    saleId: string | null
    productId: string | null
    descripcion: string | null
    cantidad: number | null
    precioUnitario: Decimal | null
    costoUnitario: Decimal | null
    total: Decimal | null
  }

  export type SaleItemCountAggregateOutputType = {
    id: number
    saleId: number
    productId: number
    descripcion: number
    cantidad: number
    precioUnitario: number
    costoUnitario: number
    total: number
    _all: number
  }


  export type SaleItemAvgAggregateInputType = {
    cantidad?: true
    precioUnitario?: true
    costoUnitario?: true
    total?: true
  }

  export type SaleItemSumAggregateInputType = {
    cantidad?: true
    precioUnitario?: true
    costoUnitario?: true
    total?: true
  }

  export type SaleItemMinAggregateInputType = {
    id?: true
    saleId?: true
    productId?: true
    descripcion?: true
    cantidad?: true
    precioUnitario?: true
    costoUnitario?: true
    total?: true
  }

  export type SaleItemMaxAggregateInputType = {
    id?: true
    saleId?: true
    productId?: true
    descripcion?: true
    cantidad?: true
    precioUnitario?: true
    costoUnitario?: true
    total?: true
  }

  export type SaleItemCountAggregateInputType = {
    id?: true
    saleId?: true
    productId?: true
    descripcion?: true
    cantidad?: true
    precioUnitario?: true
    costoUnitario?: true
    total?: true
    _all?: true
  }

  export type SaleItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SaleItem to aggregate.
     */
    where?: SaleItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SaleItems to fetch.
     */
    orderBy?: SaleItemOrderByWithRelationInput | SaleItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SaleItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SaleItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SaleItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SaleItems
    **/
    _count?: true | SaleItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SaleItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SaleItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SaleItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SaleItemMaxAggregateInputType
  }

  export type GetSaleItemAggregateType<T extends SaleItemAggregateArgs> = {
        [P in keyof T & keyof AggregateSaleItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSaleItem[P]>
      : GetScalarType<T[P], AggregateSaleItem[P]>
  }




  export type SaleItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleItemWhereInput
    orderBy?: SaleItemOrderByWithAggregationInput | SaleItemOrderByWithAggregationInput[]
    by: SaleItemScalarFieldEnum[] | SaleItemScalarFieldEnum
    having?: SaleItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SaleItemCountAggregateInputType | true
    _avg?: SaleItemAvgAggregateInputType
    _sum?: SaleItemSumAggregateInputType
    _min?: SaleItemMinAggregateInputType
    _max?: SaleItemMaxAggregateInputType
  }

  export type SaleItemGroupByOutputType = {
    id: string
    saleId: string
    productId: string | null
    descripcion: string
    cantidad: number
    precioUnitario: Decimal
    costoUnitario: Decimal
    total: Decimal
    _count: SaleItemCountAggregateOutputType | null
    _avg: SaleItemAvgAggregateOutputType | null
    _sum: SaleItemSumAggregateOutputType | null
    _min: SaleItemMinAggregateOutputType | null
    _max: SaleItemMaxAggregateOutputType | null
  }

  type GetSaleItemGroupByPayload<T extends SaleItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SaleItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SaleItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SaleItemGroupByOutputType[P]>
            : GetScalarType<T[P], SaleItemGroupByOutputType[P]>
        }
      >
    >


  export type SaleItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    saleId?: boolean
    productId?: boolean
    descripcion?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    costoUnitario?: boolean
    total?: boolean
    sale?: boolean | SaleDefaultArgs<ExtArgs>
    product?: boolean | SaleItem$productArgs<ExtArgs>
  }, ExtArgs["result"]["saleItem"]>

  export type SaleItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    saleId?: boolean
    productId?: boolean
    descripcion?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    costoUnitario?: boolean
    total?: boolean
    sale?: boolean | SaleDefaultArgs<ExtArgs>
    product?: boolean | SaleItem$productArgs<ExtArgs>
  }, ExtArgs["result"]["saleItem"]>

  export type SaleItemSelectScalar = {
    id?: boolean
    saleId?: boolean
    productId?: boolean
    descripcion?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    costoUnitario?: boolean
    total?: boolean
  }

  export type SaleItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sale?: boolean | SaleDefaultArgs<ExtArgs>
    product?: boolean | SaleItem$productArgs<ExtArgs>
  }
  export type SaleItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sale?: boolean | SaleDefaultArgs<ExtArgs>
    product?: boolean | SaleItem$productArgs<ExtArgs>
  }

  export type $SaleItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SaleItem"
    objects: {
      sale: Prisma.$SalePayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      saleId: string
      productId: string | null
      descripcion: string
      cantidad: number
      precioUnitario: Prisma.Decimal
      costoUnitario: Prisma.Decimal
      total: Prisma.Decimal
    }, ExtArgs["result"]["saleItem"]>
    composites: {}
  }

  type SaleItemGetPayload<S extends boolean | null | undefined | SaleItemDefaultArgs> = $Result.GetResult<Prisma.$SaleItemPayload, S>

  type SaleItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SaleItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SaleItemCountAggregateInputType | true
    }

  export interface SaleItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SaleItem'], meta: { name: 'SaleItem' } }
    /**
     * Find zero or one SaleItem that matches the filter.
     * @param {SaleItemFindUniqueArgs} args - Arguments to find a SaleItem
     * @example
     * // Get one SaleItem
     * const saleItem = await prisma.saleItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SaleItemFindUniqueArgs>(args: SelectSubset<T, SaleItemFindUniqueArgs<ExtArgs>>): Prisma__SaleItemClient<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SaleItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SaleItemFindUniqueOrThrowArgs} args - Arguments to find a SaleItem
     * @example
     * // Get one SaleItem
     * const saleItem = await prisma.saleItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SaleItemFindUniqueOrThrowArgs>(args: SelectSubset<T, SaleItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SaleItemClient<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SaleItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleItemFindFirstArgs} args - Arguments to find a SaleItem
     * @example
     * // Get one SaleItem
     * const saleItem = await prisma.saleItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SaleItemFindFirstArgs>(args?: SelectSubset<T, SaleItemFindFirstArgs<ExtArgs>>): Prisma__SaleItemClient<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SaleItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleItemFindFirstOrThrowArgs} args - Arguments to find a SaleItem
     * @example
     * // Get one SaleItem
     * const saleItem = await prisma.saleItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SaleItemFindFirstOrThrowArgs>(args?: SelectSubset<T, SaleItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__SaleItemClient<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SaleItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SaleItems
     * const saleItems = await prisma.saleItem.findMany()
     * 
     * // Get first 10 SaleItems
     * const saleItems = await prisma.saleItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const saleItemWithIdOnly = await prisma.saleItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SaleItemFindManyArgs>(args?: SelectSubset<T, SaleItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SaleItem.
     * @param {SaleItemCreateArgs} args - Arguments to create a SaleItem.
     * @example
     * // Create one SaleItem
     * const SaleItem = await prisma.saleItem.create({
     *   data: {
     *     // ... data to create a SaleItem
     *   }
     * })
     * 
     */
    create<T extends SaleItemCreateArgs>(args: SelectSubset<T, SaleItemCreateArgs<ExtArgs>>): Prisma__SaleItemClient<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SaleItems.
     * @param {SaleItemCreateManyArgs} args - Arguments to create many SaleItems.
     * @example
     * // Create many SaleItems
     * const saleItem = await prisma.saleItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SaleItemCreateManyArgs>(args?: SelectSubset<T, SaleItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SaleItems and returns the data saved in the database.
     * @param {SaleItemCreateManyAndReturnArgs} args - Arguments to create many SaleItems.
     * @example
     * // Create many SaleItems
     * const saleItem = await prisma.saleItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SaleItems and only return the `id`
     * const saleItemWithIdOnly = await prisma.saleItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SaleItemCreateManyAndReturnArgs>(args?: SelectSubset<T, SaleItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SaleItem.
     * @param {SaleItemDeleteArgs} args - Arguments to delete one SaleItem.
     * @example
     * // Delete one SaleItem
     * const SaleItem = await prisma.saleItem.delete({
     *   where: {
     *     // ... filter to delete one SaleItem
     *   }
     * })
     * 
     */
    delete<T extends SaleItemDeleteArgs>(args: SelectSubset<T, SaleItemDeleteArgs<ExtArgs>>): Prisma__SaleItemClient<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SaleItem.
     * @param {SaleItemUpdateArgs} args - Arguments to update one SaleItem.
     * @example
     * // Update one SaleItem
     * const saleItem = await prisma.saleItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SaleItemUpdateArgs>(args: SelectSubset<T, SaleItemUpdateArgs<ExtArgs>>): Prisma__SaleItemClient<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SaleItems.
     * @param {SaleItemDeleteManyArgs} args - Arguments to filter SaleItems to delete.
     * @example
     * // Delete a few SaleItems
     * const { count } = await prisma.saleItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SaleItemDeleteManyArgs>(args?: SelectSubset<T, SaleItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SaleItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SaleItems
     * const saleItem = await prisma.saleItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SaleItemUpdateManyArgs>(args: SelectSubset<T, SaleItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SaleItem.
     * @param {SaleItemUpsertArgs} args - Arguments to update or create a SaleItem.
     * @example
     * // Update or create a SaleItem
     * const saleItem = await prisma.saleItem.upsert({
     *   create: {
     *     // ... data to create a SaleItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SaleItem we want to update
     *   }
     * })
     */
    upsert<T extends SaleItemUpsertArgs>(args: SelectSubset<T, SaleItemUpsertArgs<ExtArgs>>): Prisma__SaleItemClient<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SaleItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleItemCountArgs} args - Arguments to filter SaleItems to count.
     * @example
     * // Count the number of SaleItems
     * const count = await prisma.saleItem.count({
     *   where: {
     *     // ... the filter for the SaleItems we want to count
     *   }
     * })
    **/
    count<T extends SaleItemCountArgs>(
      args?: Subset<T, SaleItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SaleItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SaleItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SaleItemAggregateArgs>(args: Subset<T, SaleItemAggregateArgs>): Prisma.PrismaPromise<GetSaleItemAggregateType<T>>

    /**
     * Group by SaleItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SaleItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SaleItemGroupByArgs['orderBy'] }
        : { orderBy?: SaleItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SaleItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSaleItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SaleItem model
   */
  readonly fields: SaleItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SaleItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SaleItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sale<T extends SaleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SaleDefaultArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    product<T extends SaleItem$productArgs<ExtArgs> = {}>(args?: Subset<T, SaleItem$productArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SaleItem model
   */ 
  interface SaleItemFieldRefs {
    readonly id: FieldRef<"SaleItem", 'String'>
    readonly saleId: FieldRef<"SaleItem", 'String'>
    readonly productId: FieldRef<"SaleItem", 'String'>
    readonly descripcion: FieldRef<"SaleItem", 'String'>
    readonly cantidad: FieldRef<"SaleItem", 'Int'>
    readonly precioUnitario: FieldRef<"SaleItem", 'Decimal'>
    readonly costoUnitario: FieldRef<"SaleItem", 'Decimal'>
    readonly total: FieldRef<"SaleItem", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * SaleItem findUnique
   */
  export type SaleItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * Filter, which SaleItem to fetch.
     */
    where: SaleItemWhereUniqueInput
  }

  /**
   * SaleItem findUniqueOrThrow
   */
  export type SaleItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * Filter, which SaleItem to fetch.
     */
    where: SaleItemWhereUniqueInput
  }

  /**
   * SaleItem findFirst
   */
  export type SaleItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * Filter, which SaleItem to fetch.
     */
    where?: SaleItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SaleItems to fetch.
     */
    orderBy?: SaleItemOrderByWithRelationInput | SaleItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SaleItems.
     */
    cursor?: SaleItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SaleItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SaleItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SaleItems.
     */
    distinct?: SaleItemScalarFieldEnum | SaleItemScalarFieldEnum[]
  }

  /**
   * SaleItem findFirstOrThrow
   */
  export type SaleItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * Filter, which SaleItem to fetch.
     */
    where?: SaleItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SaleItems to fetch.
     */
    orderBy?: SaleItemOrderByWithRelationInput | SaleItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SaleItems.
     */
    cursor?: SaleItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SaleItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SaleItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SaleItems.
     */
    distinct?: SaleItemScalarFieldEnum | SaleItemScalarFieldEnum[]
  }

  /**
   * SaleItem findMany
   */
  export type SaleItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * Filter, which SaleItems to fetch.
     */
    where?: SaleItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SaleItems to fetch.
     */
    orderBy?: SaleItemOrderByWithRelationInput | SaleItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SaleItems.
     */
    cursor?: SaleItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SaleItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SaleItems.
     */
    skip?: number
    distinct?: SaleItemScalarFieldEnum | SaleItemScalarFieldEnum[]
  }

  /**
   * SaleItem create
   */
  export type SaleItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * The data needed to create a SaleItem.
     */
    data: XOR<SaleItemCreateInput, SaleItemUncheckedCreateInput>
  }

  /**
   * SaleItem createMany
   */
  export type SaleItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SaleItems.
     */
    data: SaleItemCreateManyInput | SaleItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SaleItem createManyAndReturn
   */
  export type SaleItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SaleItems.
     */
    data: SaleItemCreateManyInput | SaleItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SaleItem update
   */
  export type SaleItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * The data needed to update a SaleItem.
     */
    data: XOR<SaleItemUpdateInput, SaleItemUncheckedUpdateInput>
    /**
     * Choose, which SaleItem to update.
     */
    where: SaleItemWhereUniqueInput
  }

  /**
   * SaleItem updateMany
   */
  export type SaleItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SaleItems.
     */
    data: XOR<SaleItemUpdateManyMutationInput, SaleItemUncheckedUpdateManyInput>
    /**
     * Filter which SaleItems to update
     */
    where?: SaleItemWhereInput
  }

  /**
   * SaleItem upsert
   */
  export type SaleItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * The filter to search for the SaleItem to update in case it exists.
     */
    where: SaleItemWhereUniqueInput
    /**
     * In case the SaleItem found by the `where` argument doesn't exist, create a new SaleItem with this data.
     */
    create: XOR<SaleItemCreateInput, SaleItemUncheckedCreateInput>
    /**
     * In case the SaleItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SaleItemUpdateInput, SaleItemUncheckedUpdateInput>
  }

  /**
   * SaleItem delete
   */
  export type SaleItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * Filter which SaleItem to delete.
     */
    where: SaleItemWhereUniqueInput
  }

  /**
   * SaleItem deleteMany
   */
  export type SaleItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SaleItems to delete
     */
    where?: SaleItemWhereInput
  }

  /**
   * SaleItem.product
   */
  export type SaleItem$productArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
  }

  /**
   * SaleItem without action
   */
  export type SaleItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
  }


  /**
   * Model Invoice
   */

  export type AggregateInvoice = {
    _count: InvoiceCountAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  export type InvoiceMinAggregateOutputType = {
    id: string | null
    saleId: string | null
    numero: string | null
    estado: $Enums.EstadoFactura | null
    pdfUrl: string | null
    pngUrl: string | null
    sentWhatsappAt: Date | null
    ultimoError: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvoiceMaxAggregateOutputType = {
    id: string | null
    saleId: string | null
    numero: string | null
    estado: $Enums.EstadoFactura | null
    pdfUrl: string | null
    pngUrl: string | null
    sentWhatsappAt: Date | null
    ultimoError: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvoiceCountAggregateOutputType = {
    id: number
    saleId: number
    numero: number
    estado: number
    pdfUrl: number
    pngUrl: number
    sentWhatsappAt: number
    ultimoError: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InvoiceMinAggregateInputType = {
    id?: true
    saleId?: true
    numero?: true
    estado?: true
    pdfUrl?: true
    pngUrl?: true
    sentWhatsappAt?: true
    ultimoError?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvoiceMaxAggregateInputType = {
    id?: true
    saleId?: true
    numero?: true
    estado?: true
    pdfUrl?: true
    pngUrl?: true
    sentWhatsappAt?: true
    ultimoError?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvoiceCountAggregateInputType = {
    id?: true
    saleId?: true
    numero?: true
    estado?: true
    pdfUrl?: true
    pngUrl?: true
    sentWhatsappAt?: true
    ultimoError?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InvoiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoice to aggregate.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Invoices
    **/
    _count?: true | InvoiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvoiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvoiceMaxAggregateInputType
  }

  export type GetInvoiceAggregateType<T extends InvoiceAggregateArgs> = {
        [P in keyof T & keyof AggregateInvoice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvoice[P]>
      : GetScalarType<T[P], AggregateInvoice[P]>
  }




  export type InvoiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithAggregationInput | InvoiceOrderByWithAggregationInput[]
    by: InvoiceScalarFieldEnum[] | InvoiceScalarFieldEnum
    having?: InvoiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvoiceCountAggregateInputType | true
    _min?: InvoiceMinAggregateInputType
    _max?: InvoiceMaxAggregateInputType
  }

  export type InvoiceGroupByOutputType = {
    id: string
    saleId: string
    numero: string
    estado: $Enums.EstadoFactura
    pdfUrl: string | null
    pngUrl: string | null
    sentWhatsappAt: Date | null
    ultimoError: string | null
    createdAt: Date
    updatedAt: Date
    _count: InvoiceCountAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  type GetInvoiceGroupByPayload<T extends InvoiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvoiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvoiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
            : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
        }
      >
    >


  export type InvoiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    saleId?: boolean
    numero?: boolean
    estado?: boolean
    pdfUrl?: boolean
    pngUrl?: boolean
    sentWhatsappAt?: boolean
    ultimoError?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sale?: boolean | SaleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    saleId?: boolean
    numero?: boolean
    estado?: boolean
    pdfUrl?: boolean
    pngUrl?: boolean
    sentWhatsappAt?: boolean
    ultimoError?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sale?: boolean | SaleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectScalar = {
    id?: boolean
    saleId?: boolean
    numero?: boolean
    estado?: boolean
    pdfUrl?: boolean
    pngUrl?: boolean
    sentWhatsappAt?: boolean
    ultimoError?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InvoiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sale?: boolean | SaleDefaultArgs<ExtArgs>
  }
  export type InvoiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sale?: boolean | SaleDefaultArgs<ExtArgs>
  }

  export type $InvoicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Invoice"
    objects: {
      sale: Prisma.$SalePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      saleId: string
      numero: string
      estado: $Enums.EstadoFactura
      pdfUrl: string | null
      pngUrl: string | null
      sentWhatsappAt: Date | null
      ultimoError: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["invoice"]>
    composites: {}
  }

  type InvoiceGetPayload<S extends boolean | null | undefined | InvoiceDefaultArgs> = $Result.GetResult<Prisma.$InvoicePayload, S>

  type InvoiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InvoiceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InvoiceCountAggregateInputType | true
    }

  export interface InvoiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Invoice'], meta: { name: 'Invoice' } }
    /**
     * Find zero or one Invoice that matches the filter.
     * @param {InvoiceFindUniqueArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvoiceFindUniqueArgs>(args: SelectSubset<T, InvoiceFindUniqueArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Invoice that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InvoiceFindUniqueOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvoiceFindUniqueOrThrowArgs>(args: SelectSubset<T, InvoiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Invoice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvoiceFindFirstArgs>(args?: SelectSubset<T, InvoiceFindFirstArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Invoice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvoiceFindFirstOrThrowArgs>(args?: SelectSubset<T, InvoiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Invoices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invoices
     * const invoices = await prisma.invoice.findMany()
     * 
     * // Get first 10 Invoices
     * const invoices = await prisma.invoice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invoiceWithIdOnly = await prisma.invoice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvoiceFindManyArgs>(args?: SelectSubset<T, InvoiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Invoice.
     * @param {InvoiceCreateArgs} args - Arguments to create a Invoice.
     * @example
     * // Create one Invoice
     * const Invoice = await prisma.invoice.create({
     *   data: {
     *     // ... data to create a Invoice
     *   }
     * })
     * 
     */
    create<T extends InvoiceCreateArgs>(args: SelectSubset<T, InvoiceCreateArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Invoices.
     * @param {InvoiceCreateManyArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvoiceCreateManyArgs>(args?: SelectSubset<T, InvoiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Invoices and returns the data saved in the database.
     * @param {InvoiceCreateManyAndReturnArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Invoices and only return the `id`
     * const invoiceWithIdOnly = await prisma.invoice.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvoiceCreateManyAndReturnArgs>(args?: SelectSubset<T, InvoiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Invoice.
     * @param {InvoiceDeleteArgs} args - Arguments to delete one Invoice.
     * @example
     * // Delete one Invoice
     * const Invoice = await prisma.invoice.delete({
     *   where: {
     *     // ... filter to delete one Invoice
     *   }
     * })
     * 
     */
    delete<T extends InvoiceDeleteArgs>(args: SelectSubset<T, InvoiceDeleteArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Invoice.
     * @param {InvoiceUpdateArgs} args - Arguments to update one Invoice.
     * @example
     * // Update one Invoice
     * const invoice = await prisma.invoice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvoiceUpdateArgs>(args: SelectSubset<T, InvoiceUpdateArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Invoices.
     * @param {InvoiceDeleteManyArgs} args - Arguments to filter Invoices to delete.
     * @example
     * // Delete a few Invoices
     * const { count } = await prisma.invoice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvoiceDeleteManyArgs>(args?: SelectSubset<T, InvoiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invoices
     * const invoice = await prisma.invoice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvoiceUpdateManyArgs>(args: SelectSubset<T, InvoiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Invoice.
     * @param {InvoiceUpsertArgs} args - Arguments to update or create a Invoice.
     * @example
     * // Update or create a Invoice
     * const invoice = await prisma.invoice.upsert({
     *   create: {
     *     // ... data to create a Invoice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invoice we want to update
     *   }
     * })
     */
    upsert<T extends InvoiceUpsertArgs>(args: SelectSubset<T, InvoiceUpsertArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceCountArgs} args - Arguments to filter Invoices to count.
     * @example
     * // Count the number of Invoices
     * const count = await prisma.invoice.count({
     *   where: {
     *     // ... the filter for the Invoices we want to count
     *   }
     * })
    **/
    count<T extends InvoiceCountArgs>(
      args?: Subset<T, InvoiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvoiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvoiceAggregateArgs>(args: Subset<T, InvoiceAggregateArgs>): Prisma.PrismaPromise<GetInvoiceAggregateType<T>>

    /**
     * Group by Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvoiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvoiceGroupByArgs['orderBy'] }
        : { orderBy?: InvoiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvoiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Invoice model
   */
  readonly fields: InvoiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Invoice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvoiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sale<T extends SaleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SaleDefaultArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Invoice model
   */ 
  interface InvoiceFieldRefs {
    readonly id: FieldRef<"Invoice", 'String'>
    readonly saleId: FieldRef<"Invoice", 'String'>
    readonly numero: FieldRef<"Invoice", 'String'>
    readonly estado: FieldRef<"Invoice", 'EstadoFactura'>
    readonly pdfUrl: FieldRef<"Invoice", 'String'>
    readonly pngUrl: FieldRef<"Invoice", 'String'>
    readonly sentWhatsappAt: FieldRef<"Invoice", 'DateTime'>
    readonly ultimoError: FieldRef<"Invoice", 'String'>
    readonly createdAt: FieldRef<"Invoice", 'DateTime'>
    readonly updatedAt: FieldRef<"Invoice", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Invoice findUnique
   */
  export type InvoiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice findUniqueOrThrow
   */
  export type InvoiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice findFirst
   */
  export type InvoiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice findFirstOrThrow
   */
  export type InvoiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice findMany
   */
  export type InvoiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoices to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice create
   */
  export type InvoiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Invoice.
     */
    data: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
  }

  /**
   * Invoice createMany
   */
  export type InvoiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Invoices.
     */
    data: InvoiceCreateManyInput | InvoiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Invoice createManyAndReturn
   */
  export type InvoiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Invoices.
     */
    data: InvoiceCreateManyInput | InvoiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invoice update
   */
  export type InvoiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Invoice.
     */
    data: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
    /**
     * Choose, which Invoice to update.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice updateMany
   */
  export type InvoiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Invoices.
     */
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyInput>
    /**
     * Filter which Invoices to update
     */
    where?: InvoiceWhereInput
  }

  /**
   * Invoice upsert
   */
  export type InvoiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Invoice to update in case it exists.
     */
    where: InvoiceWhereUniqueInput
    /**
     * In case the Invoice found by the `where` argument doesn't exist, create a new Invoice with this data.
     */
    create: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
    /**
     * In case the Invoice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
  }

  /**
   * Invoice delete
   */
  export type InvoiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter which Invoice to delete.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice deleteMany
   */
  export type InvoiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoices to delete
     */
    where?: InvoiceWhereInput
  }

  /**
   * Invoice without action
   */
  export type InvoiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type PaymentSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    saleId: string | null
    amount: Decimal | null
    fecha: Date | null
    metodo: $Enums.MetodoPago | null
    createdAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    saleId: string | null
    amount: Decimal | null
    fecha: Date | null
    metodo: $Enums.MetodoPago | null
    createdAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    saleId: number
    amount: number
    fecha: number
    metodo: number
    createdAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    amount?: true
  }

  export type PaymentSumAggregateInputType = {
    amount?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    saleId?: true
    amount?: true
    fecha?: true
    metodo?: true
    createdAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    saleId?: true
    amount?: true
    fecha?: true
    metodo?: true
    createdAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    saleId?: true
    amount?: true
    fecha?: true
    metodo?: true
    createdAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    saleId: string
    amount: Decimal
    fecha: Date
    metodo: $Enums.MetodoPago
    createdAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    saleId?: boolean
    amount?: boolean
    fecha?: boolean
    metodo?: boolean
    createdAt?: boolean
    sale?: boolean | SaleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    saleId?: boolean
    amount?: boolean
    fecha?: boolean
    metodo?: boolean
    createdAt?: boolean
    sale?: boolean | SaleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    saleId?: boolean
    amount?: boolean
    fecha?: boolean
    metodo?: boolean
    createdAt?: boolean
  }

  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sale?: boolean | SaleDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sale?: boolean | SaleDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      sale: Prisma.$SalePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      saleId: string
      amount: Prisma.Decimal
      fecha: Date
      metodo: $Enums.MetodoPago
      createdAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sale<T extends SaleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SaleDefaultArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */ 
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly saleId: FieldRef<"Payment", 'String'>
    readonly amount: FieldRef<"Payment", 'Decimal'>
    readonly fecha: FieldRef<"Payment", 'DateTime'>
    readonly metodo: FieldRef<"Payment", 'MetodoPago'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model ClientDebt
   */

  export type AggregateClientDebt = {
    _count: ClientDebtCountAggregateOutputType | null
    _avg: ClientDebtAvgAggregateOutputType | null
    _sum: ClientDebtSumAggregateOutputType | null
    _min: ClientDebtMinAggregateOutputType | null
    _max: ClientDebtMaxAggregateOutputType | null
  }

  export type ClientDebtAvgAggregateOutputType = {
    amountTotal: Decimal | null
    amountPaid: Decimal | null
  }

  export type ClientDebtSumAggregateOutputType = {
    amountTotal: Decimal | null
    amountPaid: Decimal | null
  }

  export type ClientDebtMinAggregateOutputType = {
    id: string | null
    clientId: string | null
    saleId: string | null
    amountTotal: Decimal | null
    amountPaid: Decimal | null
    dueDate: Date | null
    status: $Enums.EstadoDeuda | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientDebtMaxAggregateOutputType = {
    id: string | null
    clientId: string | null
    saleId: string | null
    amountTotal: Decimal | null
    amountPaid: Decimal | null
    dueDate: Date | null
    status: $Enums.EstadoDeuda | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientDebtCountAggregateOutputType = {
    id: number
    clientId: number
    saleId: number
    amountTotal: number
    amountPaid: number
    dueDate: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClientDebtAvgAggregateInputType = {
    amountTotal?: true
    amountPaid?: true
  }

  export type ClientDebtSumAggregateInputType = {
    amountTotal?: true
    amountPaid?: true
  }

  export type ClientDebtMinAggregateInputType = {
    id?: true
    clientId?: true
    saleId?: true
    amountTotal?: true
    amountPaid?: true
    dueDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientDebtMaxAggregateInputType = {
    id?: true
    clientId?: true
    saleId?: true
    amountTotal?: true
    amountPaid?: true
    dueDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientDebtCountAggregateInputType = {
    id?: true
    clientId?: true
    saleId?: true
    amountTotal?: true
    amountPaid?: true
    dueDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClientDebtAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClientDebt to aggregate.
     */
    where?: ClientDebtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClientDebts to fetch.
     */
    orderBy?: ClientDebtOrderByWithRelationInput | ClientDebtOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientDebtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClientDebts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClientDebts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClientDebts
    **/
    _count?: true | ClientDebtCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClientDebtAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClientDebtSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientDebtMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientDebtMaxAggregateInputType
  }

  export type GetClientDebtAggregateType<T extends ClientDebtAggregateArgs> = {
        [P in keyof T & keyof AggregateClientDebt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClientDebt[P]>
      : GetScalarType<T[P], AggregateClientDebt[P]>
  }




  export type ClientDebtGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientDebtWhereInput
    orderBy?: ClientDebtOrderByWithAggregationInput | ClientDebtOrderByWithAggregationInput[]
    by: ClientDebtScalarFieldEnum[] | ClientDebtScalarFieldEnum
    having?: ClientDebtScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientDebtCountAggregateInputType | true
    _avg?: ClientDebtAvgAggregateInputType
    _sum?: ClientDebtSumAggregateInputType
    _min?: ClientDebtMinAggregateInputType
    _max?: ClientDebtMaxAggregateInputType
  }

  export type ClientDebtGroupByOutputType = {
    id: string
    clientId: string
    saleId: string | null
    amountTotal: Decimal
    amountPaid: Decimal
    dueDate: Date | null
    status: $Enums.EstadoDeuda
    createdAt: Date
    updatedAt: Date
    _count: ClientDebtCountAggregateOutputType | null
    _avg: ClientDebtAvgAggregateOutputType | null
    _sum: ClientDebtSumAggregateOutputType | null
    _min: ClientDebtMinAggregateOutputType | null
    _max: ClientDebtMaxAggregateOutputType | null
  }

  type GetClientDebtGroupByPayload<T extends ClientDebtGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientDebtGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientDebtGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientDebtGroupByOutputType[P]>
            : GetScalarType<T[P], ClientDebtGroupByOutputType[P]>
        }
      >
    >


  export type ClientDebtSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    saleId?: boolean
    amountTotal?: boolean
    amountPaid?: boolean
    dueDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clientDebt"]>

  export type ClientDebtSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    saleId?: boolean
    amountTotal?: boolean
    amountPaid?: boolean
    dueDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clientDebt"]>

  export type ClientDebtSelectScalar = {
    id?: boolean
    clientId?: boolean
    saleId?: boolean
    amountTotal?: boolean
    amountPaid?: boolean
    dueDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClientDebtInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }
  export type ClientDebtIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }

  export type $ClientDebtPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClientDebt"
    objects: {
      client: Prisma.$ClientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clientId: string
      saleId: string | null
      amountTotal: Prisma.Decimal
      amountPaid: Prisma.Decimal
      dueDate: Date | null
      status: $Enums.EstadoDeuda
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["clientDebt"]>
    composites: {}
  }

  type ClientDebtGetPayload<S extends boolean | null | undefined | ClientDebtDefaultArgs> = $Result.GetResult<Prisma.$ClientDebtPayload, S>

  type ClientDebtCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ClientDebtFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ClientDebtCountAggregateInputType | true
    }

  export interface ClientDebtDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClientDebt'], meta: { name: 'ClientDebt' } }
    /**
     * Find zero or one ClientDebt that matches the filter.
     * @param {ClientDebtFindUniqueArgs} args - Arguments to find a ClientDebt
     * @example
     * // Get one ClientDebt
     * const clientDebt = await prisma.clientDebt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientDebtFindUniqueArgs>(args: SelectSubset<T, ClientDebtFindUniqueArgs<ExtArgs>>): Prisma__ClientDebtClient<$Result.GetResult<Prisma.$ClientDebtPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ClientDebt that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ClientDebtFindUniqueOrThrowArgs} args - Arguments to find a ClientDebt
     * @example
     * // Get one ClientDebt
     * const clientDebt = await prisma.clientDebt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientDebtFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientDebtFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientDebtClient<$Result.GetResult<Prisma.$ClientDebtPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ClientDebt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientDebtFindFirstArgs} args - Arguments to find a ClientDebt
     * @example
     * // Get one ClientDebt
     * const clientDebt = await prisma.clientDebt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientDebtFindFirstArgs>(args?: SelectSubset<T, ClientDebtFindFirstArgs<ExtArgs>>): Prisma__ClientDebtClient<$Result.GetResult<Prisma.$ClientDebtPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ClientDebt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientDebtFindFirstOrThrowArgs} args - Arguments to find a ClientDebt
     * @example
     * // Get one ClientDebt
     * const clientDebt = await prisma.clientDebt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientDebtFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientDebtFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientDebtClient<$Result.GetResult<Prisma.$ClientDebtPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ClientDebts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientDebtFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClientDebts
     * const clientDebts = await prisma.clientDebt.findMany()
     * 
     * // Get first 10 ClientDebts
     * const clientDebts = await prisma.clientDebt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientDebtWithIdOnly = await prisma.clientDebt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClientDebtFindManyArgs>(args?: SelectSubset<T, ClientDebtFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientDebtPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ClientDebt.
     * @param {ClientDebtCreateArgs} args - Arguments to create a ClientDebt.
     * @example
     * // Create one ClientDebt
     * const ClientDebt = await prisma.clientDebt.create({
     *   data: {
     *     // ... data to create a ClientDebt
     *   }
     * })
     * 
     */
    create<T extends ClientDebtCreateArgs>(args: SelectSubset<T, ClientDebtCreateArgs<ExtArgs>>): Prisma__ClientDebtClient<$Result.GetResult<Prisma.$ClientDebtPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ClientDebts.
     * @param {ClientDebtCreateManyArgs} args - Arguments to create many ClientDebts.
     * @example
     * // Create many ClientDebts
     * const clientDebt = await prisma.clientDebt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientDebtCreateManyArgs>(args?: SelectSubset<T, ClientDebtCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClientDebts and returns the data saved in the database.
     * @param {ClientDebtCreateManyAndReturnArgs} args - Arguments to create many ClientDebts.
     * @example
     * // Create many ClientDebts
     * const clientDebt = await prisma.clientDebt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClientDebts and only return the `id`
     * const clientDebtWithIdOnly = await prisma.clientDebt.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClientDebtCreateManyAndReturnArgs>(args?: SelectSubset<T, ClientDebtCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientDebtPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ClientDebt.
     * @param {ClientDebtDeleteArgs} args - Arguments to delete one ClientDebt.
     * @example
     * // Delete one ClientDebt
     * const ClientDebt = await prisma.clientDebt.delete({
     *   where: {
     *     // ... filter to delete one ClientDebt
     *   }
     * })
     * 
     */
    delete<T extends ClientDebtDeleteArgs>(args: SelectSubset<T, ClientDebtDeleteArgs<ExtArgs>>): Prisma__ClientDebtClient<$Result.GetResult<Prisma.$ClientDebtPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ClientDebt.
     * @param {ClientDebtUpdateArgs} args - Arguments to update one ClientDebt.
     * @example
     * // Update one ClientDebt
     * const clientDebt = await prisma.clientDebt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientDebtUpdateArgs>(args: SelectSubset<T, ClientDebtUpdateArgs<ExtArgs>>): Prisma__ClientDebtClient<$Result.GetResult<Prisma.$ClientDebtPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ClientDebts.
     * @param {ClientDebtDeleteManyArgs} args - Arguments to filter ClientDebts to delete.
     * @example
     * // Delete a few ClientDebts
     * const { count } = await prisma.clientDebt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientDebtDeleteManyArgs>(args?: SelectSubset<T, ClientDebtDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClientDebts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientDebtUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClientDebts
     * const clientDebt = await prisma.clientDebt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientDebtUpdateManyArgs>(args: SelectSubset<T, ClientDebtUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ClientDebt.
     * @param {ClientDebtUpsertArgs} args - Arguments to update or create a ClientDebt.
     * @example
     * // Update or create a ClientDebt
     * const clientDebt = await prisma.clientDebt.upsert({
     *   create: {
     *     // ... data to create a ClientDebt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClientDebt we want to update
     *   }
     * })
     */
    upsert<T extends ClientDebtUpsertArgs>(args: SelectSubset<T, ClientDebtUpsertArgs<ExtArgs>>): Prisma__ClientDebtClient<$Result.GetResult<Prisma.$ClientDebtPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ClientDebts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientDebtCountArgs} args - Arguments to filter ClientDebts to count.
     * @example
     * // Count the number of ClientDebts
     * const count = await prisma.clientDebt.count({
     *   where: {
     *     // ... the filter for the ClientDebts we want to count
     *   }
     * })
    **/
    count<T extends ClientDebtCountArgs>(
      args?: Subset<T, ClientDebtCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientDebtCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClientDebt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientDebtAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClientDebtAggregateArgs>(args: Subset<T, ClientDebtAggregateArgs>): Prisma.PrismaPromise<GetClientDebtAggregateType<T>>

    /**
     * Group by ClientDebt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientDebtGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClientDebtGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientDebtGroupByArgs['orderBy'] }
        : { orderBy?: ClientDebtGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClientDebtGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientDebtGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClientDebt model
   */
  readonly fields: ClientDebtFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClientDebt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientDebtClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ClientDebt model
   */ 
  interface ClientDebtFieldRefs {
    readonly id: FieldRef<"ClientDebt", 'String'>
    readonly clientId: FieldRef<"ClientDebt", 'String'>
    readonly saleId: FieldRef<"ClientDebt", 'String'>
    readonly amountTotal: FieldRef<"ClientDebt", 'Decimal'>
    readonly amountPaid: FieldRef<"ClientDebt", 'Decimal'>
    readonly dueDate: FieldRef<"ClientDebt", 'DateTime'>
    readonly status: FieldRef<"ClientDebt", 'EstadoDeuda'>
    readonly createdAt: FieldRef<"ClientDebt", 'DateTime'>
    readonly updatedAt: FieldRef<"ClientDebt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ClientDebt findUnique
   */
  export type ClientDebtFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientDebt
     */
    select?: ClientDebtSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientDebtInclude<ExtArgs> | null
    /**
     * Filter, which ClientDebt to fetch.
     */
    where: ClientDebtWhereUniqueInput
  }

  /**
   * ClientDebt findUniqueOrThrow
   */
  export type ClientDebtFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientDebt
     */
    select?: ClientDebtSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientDebtInclude<ExtArgs> | null
    /**
     * Filter, which ClientDebt to fetch.
     */
    where: ClientDebtWhereUniqueInput
  }

  /**
   * ClientDebt findFirst
   */
  export type ClientDebtFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientDebt
     */
    select?: ClientDebtSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientDebtInclude<ExtArgs> | null
    /**
     * Filter, which ClientDebt to fetch.
     */
    where?: ClientDebtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClientDebts to fetch.
     */
    orderBy?: ClientDebtOrderByWithRelationInput | ClientDebtOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClientDebts.
     */
    cursor?: ClientDebtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClientDebts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClientDebts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClientDebts.
     */
    distinct?: ClientDebtScalarFieldEnum | ClientDebtScalarFieldEnum[]
  }

  /**
   * ClientDebt findFirstOrThrow
   */
  export type ClientDebtFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientDebt
     */
    select?: ClientDebtSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientDebtInclude<ExtArgs> | null
    /**
     * Filter, which ClientDebt to fetch.
     */
    where?: ClientDebtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClientDebts to fetch.
     */
    orderBy?: ClientDebtOrderByWithRelationInput | ClientDebtOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClientDebts.
     */
    cursor?: ClientDebtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClientDebts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClientDebts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClientDebts.
     */
    distinct?: ClientDebtScalarFieldEnum | ClientDebtScalarFieldEnum[]
  }

  /**
   * ClientDebt findMany
   */
  export type ClientDebtFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientDebt
     */
    select?: ClientDebtSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientDebtInclude<ExtArgs> | null
    /**
     * Filter, which ClientDebts to fetch.
     */
    where?: ClientDebtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClientDebts to fetch.
     */
    orderBy?: ClientDebtOrderByWithRelationInput | ClientDebtOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClientDebts.
     */
    cursor?: ClientDebtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClientDebts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClientDebts.
     */
    skip?: number
    distinct?: ClientDebtScalarFieldEnum | ClientDebtScalarFieldEnum[]
  }

  /**
   * ClientDebt create
   */
  export type ClientDebtCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientDebt
     */
    select?: ClientDebtSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientDebtInclude<ExtArgs> | null
    /**
     * The data needed to create a ClientDebt.
     */
    data: XOR<ClientDebtCreateInput, ClientDebtUncheckedCreateInput>
  }

  /**
   * ClientDebt createMany
   */
  export type ClientDebtCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClientDebts.
     */
    data: ClientDebtCreateManyInput | ClientDebtCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClientDebt createManyAndReturn
   */
  export type ClientDebtCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientDebt
     */
    select?: ClientDebtSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ClientDebts.
     */
    data: ClientDebtCreateManyInput | ClientDebtCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientDebtIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClientDebt update
   */
  export type ClientDebtUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientDebt
     */
    select?: ClientDebtSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientDebtInclude<ExtArgs> | null
    /**
     * The data needed to update a ClientDebt.
     */
    data: XOR<ClientDebtUpdateInput, ClientDebtUncheckedUpdateInput>
    /**
     * Choose, which ClientDebt to update.
     */
    where: ClientDebtWhereUniqueInput
  }

  /**
   * ClientDebt updateMany
   */
  export type ClientDebtUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClientDebts.
     */
    data: XOR<ClientDebtUpdateManyMutationInput, ClientDebtUncheckedUpdateManyInput>
    /**
     * Filter which ClientDebts to update
     */
    where?: ClientDebtWhereInput
  }

  /**
   * ClientDebt upsert
   */
  export type ClientDebtUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientDebt
     */
    select?: ClientDebtSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientDebtInclude<ExtArgs> | null
    /**
     * The filter to search for the ClientDebt to update in case it exists.
     */
    where: ClientDebtWhereUniqueInput
    /**
     * In case the ClientDebt found by the `where` argument doesn't exist, create a new ClientDebt with this data.
     */
    create: XOR<ClientDebtCreateInput, ClientDebtUncheckedCreateInput>
    /**
     * In case the ClientDebt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientDebtUpdateInput, ClientDebtUncheckedUpdateInput>
  }

  /**
   * ClientDebt delete
   */
  export type ClientDebtDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientDebt
     */
    select?: ClientDebtSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientDebtInclude<ExtArgs> | null
    /**
     * Filter which ClientDebt to delete.
     */
    where: ClientDebtWhereUniqueInput
  }

  /**
   * ClientDebt deleteMany
   */
  export type ClientDebtDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClientDebts to delete
     */
    where?: ClientDebtWhereInput
  }

  /**
   * ClientDebt without action
   */
  export type ClientDebtDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientDebt
     */
    select?: ClientDebtSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientDebtInclude<ExtArgs> | null
  }


  /**
   * Model Expense
   */

  export type AggregateExpense = {
    _count: ExpenseCountAggregateOutputType | null
    _avg: ExpenseAvgAggregateOutputType | null
    _sum: ExpenseSumAggregateOutputType | null
    _min: ExpenseMinAggregateOutputType | null
    _max: ExpenseMaxAggregateOutputType | null
  }

  export type ExpenseAvgAggregateOutputType = {
    monto: Decimal | null
  }

  export type ExpenseSumAggregateOutputType = {
    monto: Decimal | null
  }

  export type ExpenseMinAggregateOutputType = {
    id: string | null
    fecha: Date | null
    categoria: string | null
    descripcion: string | null
    monto: Decimal | null
    userId: string | null
    createdAt: Date | null
  }

  export type ExpenseMaxAggregateOutputType = {
    id: string | null
    fecha: Date | null
    categoria: string | null
    descripcion: string | null
    monto: Decimal | null
    userId: string | null
    createdAt: Date | null
  }

  export type ExpenseCountAggregateOutputType = {
    id: number
    fecha: number
    categoria: number
    descripcion: number
    monto: number
    userId: number
    createdAt: number
    _all: number
  }


  export type ExpenseAvgAggregateInputType = {
    monto?: true
  }

  export type ExpenseSumAggregateInputType = {
    monto?: true
  }

  export type ExpenseMinAggregateInputType = {
    id?: true
    fecha?: true
    categoria?: true
    descripcion?: true
    monto?: true
    userId?: true
    createdAt?: true
  }

  export type ExpenseMaxAggregateInputType = {
    id?: true
    fecha?: true
    categoria?: true
    descripcion?: true
    monto?: true
    userId?: true
    createdAt?: true
  }

  export type ExpenseCountAggregateInputType = {
    id?: true
    fecha?: true
    categoria?: true
    descripcion?: true
    monto?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type ExpenseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Expense to aggregate.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Expenses
    **/
    _count?: true | ExpenseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExpenseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExpenseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExpenseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExpenseMaxAggregateInputType
  }

  export type GetExpenseAggregateType<T extends ExpenseAggregateArgs> = {
        [P in keyof T & keyof AggregateExpense]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExpense[P]>
      : GetScalarType<T[P], AggregateExpense[P]>
  }




  export type ExpenseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithAggregationInput | ExpenseOrderByWithAggregationInput[]
    by: ExpenseScalarFieldEnum[] | ExpenseScalarFieldEnum
    having?: ExpenseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExpenseCountAggregateInputType | true
    _avg?: ExpenseAvgAggregateInputType
    _sum?: ExpenseSumAggregateInputType
    _min?: ExpenseMinAggregateInputType
    _max?: ExpenseMaxAggregateInputType
  }

  export type ExpenseGroupByOutputType = {
    id: string
    fecha: Date
    categoria: string
    descripcion: string
    monto: Decimal
    userId: string
    createdAt: Date
    _count: ExpenseCountAggregateOutputType | null
    _avg: ExpenseAvgAggregateOutputType | null
    _sum: ExpenseSumAggregateOutputType | null
    _min: ExpenseMinAggregateOutputType | null
    _max: ExpenseMaxAggregateOutputType | null
  }

  type GetExpenseGroupByPayload<T extends ExpenseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExpenseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExpenseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExpenseGroupByOutputType[P]>
            : GetScalarType<T[P], ExpenseGroupByOutputType[P]>
        }
      >
    >


  export type ExpenseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fecha?: boolean
    categoria?: boolean
    descripcion?: boolean
    monto?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["expense"]>

  export type ExpenseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fecha?: boolean
    categoria?: boolean
    descripcion?: boolean
    monto?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["expense"]>

  export type ExpenseSelectScalar = {
    id?: boolean
    fecha?: boolean
    categoria?: boolean
    descripcion?: boolean
    monto?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type ExpenseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ExpenseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ExpensePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Expense"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fecha: Date
      categoria: string
      descripcion: string
      monto: Prisma.Decimal
      userId: string
      createdAt: Date
    }, ExtArgs["result"]["expense"]>
    composites: {}
  }

  type ExpenseGetPayload<S extends boolean | null | undefined | ExpenseDefaultArgs> = $Result.GetResult<Prisma.$ExpensePayload, S>

  type ExpenseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ExpenseFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ExpenseCountAggregateInputType | true
    }

  export interface ExpenseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Expense'], meta: { name: 'Expense' } }
    /**
     * Find zero or one Expense that matches the filter.
     * @param {ExpenseFindUniqueArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExpenseFindUniqueArgs>(args: SelectSubset<T, ExpenseFindUniqueArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Expense that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ExpenseFindUniqueOrThrowArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExpenseFindUniqueOrThrowArgs>(args: SelectSubset<T, ExpenseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Expense that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindFirstArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExpenseFindFirstArgs>(args?: SelectSubset<T, ExpenseFindFirstArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Expense that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindFirstOrThrowArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExpenseFindFirstOrThrowArgs>(args?: SelectSubset<T, ExpenseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Expenses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Expenses
     * const expenses = await prisma.expense.findMany()
     * 
     * // Get first 10 Expenses
     * const expenses = await prisma.expense.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const expenseWithIdOnly = await prisma.expense.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExpenseFindManyArgs>(args?: SelectSubset<T, ExpenseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Expense.
     * @param {ExpenseCreateArgs} args - Arguments to create a Expense.
     * @example
     * // Create one Expense
     * const Expense = await prisma.expense.create({
     *   data: {
     *     // ... data to create a Expense
     *   }
     * })
     * 
     */
    create<T extends ExpenseCreateArgs>(args: SelectSubset<T, ExpenseCreateArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Expenses.
     * @param {ExpenseCreateManyArgs} args - Arguments to create many Expenses.
     * @example
     * // Create many Expenses
     * const expense = await prisma.expense.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExpenseCreateManyArgs>(args?: SelectSubset<T, ExpenseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Expenses and returns the data saved in the database.
     * @param {ExpenseCreateManyAndReturnArgs} args - Arguments to create many Expenses.
     * @example
     * // Create many Expenses
     * const expense = await prisma.expense.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Expenses and only return the `id`
     * const expenseWithIdOnly = await prisma.expense.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExpenseCreateManyAndReturnArgs>(args?: SelectSubset<T, ExpenseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Expense.
     * @param {ExpenseDeleteArgs} args - Arguments to delete one Expense.
     * @example
     * // Delete one Expense
     * const Expense = await prisma.expense.delete({
     *   where: {
     *     // ... filter to delete one Expense
     *   }
     * })
     * 
     */
    delete<T extends ExpenseDeleteArgs>(args: SelectSubset<T, ExpenseDeleteArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Expense.
     * @param {ExpenseUpdateArgs} args - Arguments to update one Expense.
     * @example
     * // Update one Expense
     * const expense = await prisma.expense.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExpenseUpdateArgs>(args: SelectSubset<T, ExpenseUpdateArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Expenses.
     * @param {ExpenseDeleteManyArgs} args - Arguments to filter Expenses to delete.
     * @example
     * // Delete a few Expenses
     * const { count } = await prisma.expense.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExpenseDeleteManyArgs>(args?: SelectSubset<T, ExpenseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Expenses
     * const expense = await prisma.expense.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExpenseUpdateManyArgs>(args: SelectSubset<T, ExpenseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Expense.
     * @param {ExpenseUpsertArgs} args - Arguments to update or create a Expense.
     * @example
     * // Update or create a Expense
     * const expense = await prisma.expense.upsert({
     *   create: {
     *     // ... data to create a Expense
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Expense we want to update
     *   }
     * })
     */
    upsert<T extends ExpenseUpsertArgs>(args: SelectSubset<T, ExpenseUpsertArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCountArgs} args - Arguments to filter Expenses to count.
     * @example
     * // Count the number of Expenses
     * const count = await prisma.expense.count({
     *   where: {
     *     // ... the filter for the Expenses we want to count
     *   }
     * })
    **/
    count<T extends ExpenseCountArgs>(
      args?: Subset<T, ExpenseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExpenseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Expense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExpenseAggregateArgs>(args: Subset<T, ExpenseAggregateArgs>): Prisma.PrismaPromise<GetExpenseAggregateType<T>>

    /**
     * Group by Expense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExpenseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExpenseGroupByArgs['orderBy'] }
        : { orderBy?: ExpenseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExpenseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpenseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Expense model
   */
  readonly fields: ExpenseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Expense.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExpenseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Expense model
   */ 
  interface ExpenseFieldRefs {
    readonly id: FieldRef<"Expense", 'String'>
    readonly fecha: FieldRef<"Expense", 'DateTime'>
    readonly categoria: FieldRef<"Expense", 'String'>
    readonly descripcion: FieldRef<"Expense", 'String'>
    readonly monto: FieldRef<"Expense", 'Decimal'>
    readonly userId: FieldRef<"Expense", 'String'>
    readonly createdAt: FieldRef<"Expense", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Expense findUnique
   */
  export type ExpenseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense findUniqueOrThrow
   */
  export type ExpenseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense findFirst
   */
  export type ExpenseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expenses.
     */
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense findFirstOrThrow
   */
  export type ExpenseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expenses.
     */
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense findMany
   */
  export type ExpenseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expenses to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense create
   */
  export type ExpenseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * The data needed to create a Expense.
     */
    data: XOR<ExpenseCreateInput, ExpenseUncheckedCreateInput>
  }

  /**
   * Expense createMany
   */
  export type ExpenseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Expenses.
     */
    data: ExpenseCreateManyInput | ExpenseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Expense createManyAndReturn
   */
  export type ExpenseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Expenses.
     */
    data: ExpenseCreateManyInput | ExpenseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Expense update
   */
  export type ExpenseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * The data needed to update a Expense.
     */
    data: XOR<ExpenseUpdateInput, ExpenseUncheckedUpdateInput>
    /**
     * Choose, which Expense to update.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense updateMany
   */
  export type ExpenseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Expenses.
     */
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyInput>
    /**
     * Filter which Expenses to update
     */
    where?: ExpenseWhereInput
  }

  /**
   * Expense upsert
   */
  export type ExpenseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * The filter to search for the Expense to update in case it exists.
     */
    where: ExpenseWhereUniqueInput
    /**
     * In case the Expense found by the `where` argument doesn't exist, create a new Expense with this data.
     */
    create: XOR<ExpenseCreateInput, ExpenseUncheckedCreateInput>
    /**
     * In case the Expense was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExpenseUpdateInput, ExpenseUncheckedUpdateInput>
  }

  /**
   * Expense delete
   */
  export type ExpenseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter which Expense to delete.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense deleteMany
   */
  export type ExpenseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Expenses to delete
     */
    where?: ExpenseWhereInput
  }

  /**
   * Expense without action
   */
  export type ExpenseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    saleId: string | null
    estado: $Enums.EstadoPedido | null
    fechaEntrega: Date | null
    notas: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    saleId: string | null
    estado: $Enums.EstadoPedido | null
    fechaEntrega: Date | null
    notas: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    saleId: number
    estado: number
    fechaEntrega: number
    notas: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrderMinAggregateInputType = {
    id?: true
    saleId?: true
    estado?: true
    fechaEntrega?: true
    notas?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    saleId?: true
    estado?: true
    fechaEntrega?: true
    notas?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    saleId?: true
    estado?: true
    fechaEntrega?: true
    notas?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    saleId: string
    estado: $Enums.EstadoPedido
    fechaEntrega: Date | null
    notas: string | null
    createdAt: Date
    updatedAt: Date
    _count: OrderCountAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    saleId?: boolean
    estado?: boolean
    fechaEntrega?: boolean
    notas?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sale?: boolean | SaleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    saleId?: boolean
    estado?: boolean
    fechaEntrega?: boolean
    notas?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sale?: boolean | SaleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    saleId?: boolean
    estado?: boolean
    fechaEntrega?: boolean
    notas?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sale?: boolean | SaleDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sale?: boolean | SaleDefaultArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      sale: Prisma.$SalePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      saleId: string
      estado: $Enums.EstadoPedido
      fechaEntrega: Date | null
      notas: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sale<T extends SaleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SaleDefaultArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */ 
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly saleId: FieldRef<"Order", 'String'>
    readonly estado: FieldRef<"Order", 'EstadoPedido'>
    readonly fechaEntrega: FieldRef<"Order", 'DateTime'>
    readonly notas: FieldRef<"Order", 'String'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    entity: string | null
    entityId: string | null
    action: string | null
    userId: string | null
    timestamp: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    entity: string | null
    entityId: string | null
    action: string | null
    userId: string | null
    timestamp: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    entity: number
    entityId: number
    action: number
    userId: number
    changes: number
    timestamp: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    entity?: true
    entityId?: true
    action?: true
    userId?: true
    timestamp?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    entity?: true
    entityId?: true
    action?: true
    userId?: true
    timestamp?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    entity?: true
    entityId?: true
    action?: true
    userId?: true
    changes?: true
    timestamp?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    entity: string
    entityId: string
    action: string
    userId: string | null
    changes: JsonValue | null
    timestamp: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entity?: boolean
    entityId?: boolean
    action?: boolean
    userId?: boolean
    changes?: boolean
    timestamp?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entity?: boolean
    entityId?: boolean
    action?: boolean
    userId?: boolean
    changes?: boolean
    timestamp?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    entity?: boolean
    entityId?: boolean
    action?: boolean
    userId?: boolean
    changes?: boolean
    timestamp?: boolean
  }

  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      entity: string
      entityId: string
      action: string
      userId: string | null
      changes: Prisma.JsonValue | null
      timestamp: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends AuditLog$userArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly entity: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly changes: FieldRef<"AuditLog", 'Json'>
    readonly timestamp: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog.user
   */
  export type AuditLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Model BusinessProfile
   */

  export type AggregateBusinessProfile = {
    _count: BusinessProfileCountAggregateOutputType | null
    _avg: BusinessProfileAvgAggregateOutputType | null
    _sum: BusinessProfileSumAggregateOutputType | null
    _min: BusinessProfileMinAggregateOutputType | null
    _max: BusinessProfileMaxAggregateOutputType | null
  }

  export type BusinessProfileAvgAggregateOutputType = {
    tasaImpuesto: Decimal | null
  }

  export type BusinessProfileSumAggregateOutputType = {
    tasaImpuesto: Decimal | null
  }

  export type BusinessProfileMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    logoUrl: string | null
    direccion: string | null
    identifFiscal: string | null
    tasaImpuesto: Decimal | null
    updatedAt: Date | null
  }

  export type BusinessProfileMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    logoUrl: string | null
    direccion: string | null
    identifFiscal: string | null
    tasaImpuesto: Decimal | null
    updatedAt: Date | null
  }

  export type BusinessProfileCountAggregateOutputType = {
    id: number
    nombre: number
    logoUrl: number
    direccion: number
    identifFiscal: number
    tasaImpuesto: number
    updatedAt: number
    _all: number
  }


  export type BusinessProfileAvgAggregateInputType = {
    tasaImpuesto?: true
  }

  export type BusinessProfileSumAggregateInputType = {
    tasaImpuesto?: true
  }

  export type BusinessProfileMinAggregateInputType = {
    id?: true
    nombre?: true
    logoUrl?: true
    direccion?: true
    identifFiscal?: true
    tasaImpuesto?: true
    updatedAt?: true
  }

  export type BusinessProfileMaxAggregateInputType = {
    id?: true
    nombre?: true
    logoUrl?: true
    direccion?: true
    identifFiscal?: true
    tasaImpuesto?: true
    updatedAt?: true
  }

  export type BusinessProfileCountAggregateInputType = {
    id?: true
    nombre?: true
    logoUrl?: true
    direccion?: true
    identifFiscal?: true
    tasaImpuesto?: true
    updatedAt?: true
    _all?: true
  }

  export type BusinessProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BusinessProfile to aggregate.
     */
    where?: BusinessProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessProfiles to fetch.
     */
    orderBy?: BusinessProfileOrderByWithRelationInput | BusinessProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BusinessProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BusinessProfiles
    **/
    _count?: true | BusinessProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BusinessProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BusinessProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BusinessProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BusinessProfileMaxAggregateInputType
  }

  export type GetBusinessProfileAggregateType<T extends BusinessProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateBusinessProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBusinessProfile[P]>
      : GetScalarType<T[P], AggregateBusinessProfile[P]>
  }




  export type BusinessProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusinessProfileWhereInput
    orderBy?: BusinessProfileOrderByWithAggregationInput | BusinessProfileOrderByWithAggregationInput[]
    by: BusinessProfileScalarFieldEnum[] | BusinessProfileScalarFieldEnum
    having?: BusinessProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BusinessProfileCountAggregateInputType | true
    _avg?: BusinessProfileAvgAggregateInputType
    _sum?: BusinessProfileSumAggregateInputType
    _min?: BusinessProfileMinAggregateInputType
    _max?: BusinessProfileMaxAggregateInputType
  }

  export type BusinessProfileGroupByOutputType = {
    id: string
    nombre: string
    logoUrl: string | null
    direccion: string | null
    identifFiscal: string | null
    tasaImpuesto: Decimal
    updatedAt: Date
    _count: BusinessProfileCountAggregateOutputType | null
    _avg: BusinessProfileAvgAggregateOutputType | null
    _sum: BusinessProfileSumAggregateOutputType | null
    _min: BusinessProfileMinAggregateOutputType | null
    _max: BusinessProfileMaxAggregateOutputType | null
  }

  type GetBusinessProfileGroupByPayload<T extends BusinessProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BusinessProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BusinessProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BusinessProfileGroupByOutputType[P]>
            : GetScalarType<T[P], BusinessProfileGroupByOutputType[P]>
        }
      >
    >


  export type BusinessProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    logoUrl?: boolean
    direccion?: boolean
    identifFiscal?: boolean
    tasaImpuesto?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["businessProfile"]>

  export type BusinessProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    logoUrl?: boolean
    direccion?: boolean
    identifFiscal?: boolean
    tasaImpuesto?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["businessProfile"]>

  export type BusinessProfileSelectScalar = {
    id?: boolean
    nombre?: boolean
    logoUrl?: boolean
    direccion?: boolean
    identifFiscal?: boolean
    tasaImpuesto?: boolean
    updatedAt?: boolean
  }


  export type $BusinessProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BusinessProfile"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      logoUrl: string | null
      direccion: string | null
      identifFiscal: string | null
      tasaImpuesto: Prisma.Decimal
      updatedAt: Date
    }, ExtArgs["result"]["businessProfile"]>
    composites: {}
  }

  type BusinessProfileGetPayload<S extends boolean | null | undefined | BusinessProfileDefaultArgs> = $Result.GetResult<Prisma.$BusinessProfilePayload, S>

  type BusinessProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BusinessProfileFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BusinessProfileCountAggregateInputType | true
    }

  export interface BusinessProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BusinessProfile'], meta: { name: 'BusinessProfile' } }
    /**
     * Find zero or one BusinessProfile that matches the filter.
     * @param {BusinessProfileFindUniqueArgs} args - Arguments to find a BusinessProfile
     * @example
     * // Get one BusinessProfile
     * const businessProfile = await prisma.businessProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BusinessProfileFindUniqueArgs>(args: SelectSubset<T, BusinessProfileFindUniqueArgs<ExtArgs>>): Prisma__BusinessProfileClient<$Result.GetResult<Prisma.$BusinessProfilePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BusinessProfile that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BusinessProfileFindUniqueOrThrowArgs} args - Arguments to find a BusinessProfile
     * @example
     * // Get one BusinessProfile
     * const businessProfile = await prisma.businessProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BusinessProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, BusinessProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BusinessProfileClient<$Result.GetResult<Prisma.$BusinessProfilePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BusinessProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessProfileFindFirstArgs} args - Arguments to find a BusinessProfile
     * @example
     * // Get one BusinessProfile
     * const businessProfile = await prisma.businessProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BusinessProfileFindFirstArgs>(args?: SelectSubset<T, BusinessProfileFindFirstArgs<ExtArgs>>): Prisma__BusinessProfileClient<$Result.GetResult<Prisma.$BusinessProfilePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BusinessProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessProfileFindFirstOrThrowArgs} args - Arguments to find a BusinessProfile
     * @example
     * // Get one BusinessProfile
     * const businessProfile = await prisma.businessProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BusinessProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, BusinessProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__BusinessProfileClient<$Result.GetResult<Prisma.$BusinessProfilePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BusinessProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BusinessProfiles
     * const businessProfiles = await prisma.businessProfile.findMany()
     * 
     * // Get first 10 BusinessProfiles
     * const businessProfiles = await prisma.businessProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const businessProfileWithIdOnly = await prisma.businessProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BusinessProfileFindManyArgs>(args?: SelectSubset<T, BusinessProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessProfilePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BusinessProfile.
     * @param {BusinessProfileCreateArgs} args - Arguments to create a BusinessProfile.
     * @example
     * // Create one BusinessProfile
     * const BusinessProfile = await prisma.businessProfile.create({
     *   data: {
     *     // ... data to create a BusinessProfile
     *   }
     * })
     * 
     */
    create<T extends BusinessProfileCreateArgs>(args: SelectSubset<T, BusinessProfileCreateArgs<ExtArgs>>): Prisma__BusinessProfileClient<$Result.GetResult<Prisma.$BusinessProfilePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BusinessProfiles.
     * @param {BusinessProfileCreateManyArgs} args - Arguments to create many BusinessProfiles.
     * @example
     * // Create many BusinessProfiles
     * const businessProfile = await prisma.businessProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BusinessProfileCreateManyArgs>(args?: SelectSubset<T, BusinessProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BusinessProfiles and returns the data saved in the database.
     * @param {BusinessProfileCreateManyAndReturnArgs} args - Arguments to create many BusinessProfiles.
     * @example
     * // Create many BusinessProfiles
     * const businessProfile = await prisma.businessProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BusinessProfiles and only return the `id`
     * const businessProfileWithIdOnly = await prisma.businessProfile.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BusinessProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, BusinessProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessProfilePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a BusinessProfile.
     * @param {BusinessProfileDeleteArgs} args - Arguments to delete one BusinessProfile.
     * @example
     * // Delete one BusinessProfile
     * const BusinessProfile = await prisma.businessProfile.delete({
     *   where: {
     *     // ... filter to delete one BusinessProfile
     *   }
     * })
     * 
     */
    delete<T extends BusinessProfileDeleteArgs>(args: SelectSubset<T, BusinessProfileDeleteArgs<ExtArgs>>): Prisma__BusinessProfileClient<$Result.GetResult<Prisma.$BusinessProfilePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BusinessProfile.
     * @param {BusinessProfileUpdateArgs} args - Arguments to update one BusinessProfile.
     * @example
     * // Update one BusinessProfile
     * const businessProfile = await prisma.businessProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BusinessProfileUpdateArgs>(args: SelectSubset<T, BusinessProfileUpdateArgs<ExtArgs>>): Prisma__BusinessProfileClient<$Result.GetResult<Prisma.$BusinessProfilePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BusinessProfiles.
     * @param {BusinessProfileDeleteManyArgs} args - Arguments to filter BusinessProfiles to delete.
     * @example
     * // Delete a few BusinessProfiles
     * const { count } = await prisma.businessProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BusinessProfileDeleteManyArgs>(args?: SelectSubset<T, BusinessProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BusinessProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BusinessProfiles
     * const businessProfile = await prisma.businessProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BusinessProfileUpdateManyArgs>(args: SelectSubset<T, BusinessProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BusinessProfile.
     * @param {BusinessProfileUpsertArgs} args - Arguments to update or create a BusinessProfile.
     * @example
     * // Update or create a BusinessProfile
     * const businessProfile = await prisma.businessProfile.upsert({
     *   create: {
     *     // ... data to create a BusinessProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BusinessProfile we want to update
     *   }
     * })
     */
    upsert<T extends BusinessProfileUpsertArgs>(args: SelectSubset<T, BusinessProfileUpsertArgs<ExtArgs>>): Prisma__BusinessProfileClient<$Result.GetResult<Prisma.$BusinessProfilePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BusinessProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessProfileCountArgs} args - Arguments to filter BusinessProfiles to count.
     * @example
     * // Count the number of BusinessProfiles
     * const count = await prisma.businessProfile.count({
     *   where: {
     *     // ... the filter for the BusinessProfiles we want to count
     *   }
     * })
    **/
    count<T extends BusinessProfileCountArgs>(
      args?: Subset<T, BusinessProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BusinessProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BusinessProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BusinessProfileAggregateArgs>(args: Subset<T, BusinessProfileAggregateArgs>): Prisma.PrismaPromise<GetBusinessProfileAggregateType<T>>

    /**
     * Group by BusinessProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BusinessProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BusinessProfileGroupByArgs['orderBy'] }
        : { orderBy?: BusinessProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BusinessProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBusinessProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BusinessProfile model
   */
  readonly fields: BusinessProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BusinessProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BusinessProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BusinessProfile model
   */ 
  interface BusinessProfileFieldRefs {
    readonly id: FieldRef<"BusinessProfile", 'String'>
    readonly nombre: FieldRef<"BusinessProfile", 'String'>
    readonly logoUrl: FieldRef<"BusinessProfile", 'String'>
    readonly direccion: FieldRef<"BusinessProfile", 'String'>
    readonly identifFiscal: FieldRef<"BusinessProfile", 'String'>
    readonly tasaImpuesto: FieldRef<"BusinessProfile", 'Decimal'>
    readonly updatedAt: FieldRef<"BusinessProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BusinessProfile findUnique
   */
  export type BusinessProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessProfile
     */
    select?: BusinessProfileSelect<ExtArgs> | null
    /**
     * Filter, which BusinessProfile to fetch.
     */
    where: BusinessProfileWhereUniqueInput
  }

  /**
   * BusinessProfile findUniqueOrThrow
   */
  export type BusinessProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessProfile
     */
    select?: BusinessProfileSelect<ExtArgs> | null
    /**
     * Filter, which BusinessProfile to fetch.
     */
    where: BusinessProfileWhereUniqueInput
  }

  /**
   * BusinessProfile findFirst
   */
  export type BusinessProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessProfile
     */
    select?: BusinessProfileSelect<ExtArgs> | null
    /**
     * Filter, which BusinessProfile to fetch.
     */
    where?: BusinessProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessProfiles to fetch.
     */
    orderBy?: BusinessProfileOrderByWithRelationInput | BusinessProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BusinessProfiles.
     */
    cursor?: BusinessProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusinessProfiles.
     */
    distinct?: BusinessProfileScalarFieldEnum | BusinessProfileScalarFieldEnum[]
  }

  /**
   * BusinessProfile findFirstOrThrow
   */
  export type BusinessProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessProfile
     */
    select?: BusinessProfileSelect<ExtArgs> | null
    /**
     * Filter, which BusinessProfile to fetch.
     */
    where?: BusinessProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessProfiles to fetch.
     */
    orderBy?: BusinessProfileOrderByWithRelationInput | BusinessProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BusinessProfiles.
     */
    cursor?: BusinessProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusinessProfiles.
     */
    distinct?: BusinessProfileScalarFieldEnum | BusinessProfileScalarFieldEnum[]
  }

  /**
   * BusinessProfile findMany
   */
  export type BusinessProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessProfile
     */
    select?: BusinessProfileSelect<ExtArgs> | null
    /**
     * Filter, which BusinessProfiles to fetch.
     */
    where?: BusinessProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessProfiles to fetch.
     */
    orderBy?: BusinessProfileOrderByWithRelationInput | BusinessProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BusinessProfiles.
     */
    cursor?: BusinessProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessProfiles.
     */
    skip?: number
    distinct?: BusinessProfileScalarFieldEnum | BusinessProfileScalarFieldEnum[]
  }

  /**
   * BusinessProfile create
   */
  export type BusinessProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessProfile
     */
    select?: BusinessProfileSelect<ExtArgs> | null
    /**
     * The data needed to create a BusinessProfile.
     */
    data: XOR<BusinessProfileCreateInput, BusinessProfileUncheckedCreateInput>
  }

  /**
   * BusinessProfile createMany
   */
  export type BusinessProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BusinessProfiles.
     */
    data: BusinessProfileCreateManyInput | BusinessProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BusinessProfile createManyAndReturn
   */
  export type BusinessProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessProfile
     */
    select?: BusinessProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BusinessProfiles.
     */
    data: BusinessProfileCreateManyInput | BusinessProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BusinessProfile update
   */
  export type BusinessProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessProfile
     */
    select?: BusinessProfileSelect<ExtArgs> | null
    /**
     * The data needed to update a BusinessProfile.
     */
    data: XOR<BusinessProfileUpdateInput, BusinessProfileUncheckedUpdateInput>
    /**
     * Choose, which BusinessProfile to update.
     */
    where: BusinessProfileWhereUniqueInput
  }

  /**
   * BusinessProfile updateMany
   */
  export type BusinessProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BusinessProfiles.
     */
    data: XOR<BusinessProfileUpdateManyMutationInput, BusinessProfileUncheckedUpdateManyInput>
    /**
     * Filter which BusinessProfiles to update
     */
    where?: BusinessProfileWhereInput
  }

  /**
   * BusinessProfile upsert
   */
  export type BusinessProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessProfile
     */
    select?: BusinessProfileSelect<ExtArgs> | null
    /**
     * The filter to search for the BusinessProfile to update in case it exists.
     */
    where: BusinessProfileWhereUniqueInput
    /**
     * In case the BusinessProfile found by the `where` argument doesn't exist, create a new BusinessProfile with this data.
     */
    create: XOR<BusinessProfileCreateInput, BusinessProfileUncheckedCreateInput>
    /**
     * In case the BusinessProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BusinessProfileUpdateInput, BusinessProfileUncheckedUpdateInput>
  }

  /**
   * BusinessProfile delete
   */
  export type BusinessProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessProfile
     */
    select?: BusinessProfileSelect<ExtArgs> | null
    /**
     * Filter which BusinessProfile to delete.
     */
    where: BusinessProfileWhereUniqueInput
  }

  /**
   * BusinessProfile deleteMany
   */
  export type BusinessProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BusinessProfiles to delete
     */
    where?: BusinessProfileWhereInput
  }

  /**
   * BusinessProfile without action
   */
  export type BusinessProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessProfile
     */
    select?: BusinessProfileSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    activo: 'activo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ClientScalarFieldEnum: {
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

  export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum]


  export const ProductScalarFieldEnum: {
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

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const SaleScalarFieldEnum: {
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

  export type SaleScalarFieldEnum = (typeof SaleScalarFieldEnum)[keyof typeof SaleScalarFieldEnum]


  export const SaleItemScalarFieldEnum: {
    id: 'id',
    saleId: 'saleId',
    productId: 'productId',
    descripcion: 'descripcion',
    cantidad: 'cantidad',
    precioUnitario: 'precioUnitario',
    costoUnitario: 'costoUnitario',
    total: 'total'
  };

  export type SaleItemScalarFieldEnum = (typeof SaleItemScalarFieldEnum)[keyof typeof SaleItemScalarFieldEnum]


  export const InvoiceScalarFieldEnum: {
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

  export type InvoiceScalarFieldEnum = (typeof InvoiceScalarFieldEnum)[keyof typeof InvoiceScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    saleId: 'saleId',
    amount: 'amount',
    fecha: 'fecha',
    metodo: 'metodo',
    createdAt: 'createdAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const ClientDebtScalarFieldEnum: {
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

  export type ClientDebtScalarFieldEnum = (typeof ClientDebtScalarFieldEnum)[keyof typeof ClientDebtScalarFieldEnum]


  export const ExpenseScalarFieldEnum: {
    id: 'id',
    fecha: 'fecha',
    categoria: 'categoria',
    descripcion: 'descripcion',
    monto: 'monto',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type ExpenseScalarFieldEnum = (typeof ExpenseScalarFieldEnum)[keyof typeof ExpenseScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    saleId: 'saleId',
    estado: 'estado',
    fechaEntrega: 'fechaEntrega',
    notas: 'notas',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    entity: 'entity',
    entityId: 'entityId',
    action: 'action',
    userId: 'userId',
    changes: 'changes',
    timestamp: 'timestamp'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const BusinessProfileScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    logoUrl: 'logoUrl',
    direccion: 'direccion',
    identifFiscal: 'identifFiscal',
    tasaImpuesto: 'tasaImpuesto',
    updatedAt: 'updatedAt'
  };

  export type BusinessProfileScalarFieldEnum = (typeof BusinessProfileScalarFieldEnum)[keyof typeof BusinessProfileScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'MetodoPago'
   */
  export type EnumMetodoPagoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MetodoPago'>
    


  /**
   * Reference to a field of type 'MetodoPago[]'
   */
  export type ListEnumMetodoPagoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MetodoPago[]'>
    


  /**
   * Reference to a field of type 'EstadoFactura'
   */
  export type EnumEstadoFacturaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoFactura'>
    


  /**
   * Reference to a field of type 'EstadoFactura[]'
   */
  export type ListEnumEstadoFacturaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoFactura[]'>
    


  /**
   * Reference to a field of type 'EstadoDeuda'
   */
  export type EnumEstadoDeudaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoDeuda'>
    


  /**
   * Reference to a field of type 'EstadoDeuda[]'
   */
  export type ListEnumEstadoDeudaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoDeuda[]'>
    


  /**
   * Reference to a field of type 'EstadoPedido'
   */
  export type EnumEstadoPedidoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoPedido'>
    


  /**
   * Reference to a field of type 'EstadoPedido[]'
   */
  export type ListEnumEstadoPedidoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoPedido[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    nombre?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    activo?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sales?: SaleListRelationFilter
    expenses?: ExpenseListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sales?: SaleOrderByRelationAggregateInput
    expenses?: ExpenseOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    nombre?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    activo?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sales?: SaleListRelationFilter
    expenses?: ExpenseListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    nombre?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    activo?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ClientWhereInput = {
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    id?: StringFilter<"Client"> | string
    nombre?: StringFilter<"Client"> | string
    telefono?: StringFilter<"Client"> | string
    email?: StringNullableFilter<"Client"> | string | null
    direccion?: StringNullableFilter<"Client"> | string | null
    notas?: StringNullableFilter<"Client"> | string | null
    lastReminderSentAt?: DateTimeNullableFilter<"Client"> | Date | string | null
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    sales?: SaleListRelationFilter
    debts?: ClientDebtListRelationFilter
  }

  export type ClientOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    telefono?: SortOrder
    email?: SortOrderInput | SortOrder
    direccion?: SortOrderInput | SortOrder
    notas?: SortOrderInput | SortOrder
    lastReminderSentAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sales?: SaleOrderByRelationAggregateInput
    debts?: ClientDebtOrderByRelationAggregateInput
  }

  export type ClientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    nombre?: StringFilter<"Client"> | string
    telefono?: StringFilter<"Client"> | string
    email?: StringNullableFilter<"Client"> | string | null
    direccion?: StringNullableFilter<"Client"> | string | null
    notas?: StringNullableFilter<"Client"> | string | null
    lastReminderSentAt?: DateTimeNullableFilter<"Client"> | Date | string | null
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    sales?: SaleListRelationFilter
    debts?: ClientDebtListRelationFilter
  }, "id">

  export type ClientOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    telefono?: SortOrder
    email?: SortOrderInput | SortOrder
    direccion?: SortOrderInput | SortOrder
    notas?: SortOrderInput | SortOrder
    lastReminderSentAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClientCountOrderByAggregateInput
    _max?: ClientMaxOrderByAggregateInput
    _min?: ClientMinOrderByAggregateInput
  }

  export type ClientScalarWhereWithAggregatesInput = {
    AND?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    OR?: ClientScalarWhereWithAggregatesInput[]
    NOT?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Client"> | string
    nombre?: StringWithAggregatesFilter<"Client"> | string
    telefono?: StringWithAggregatesFilter<"Client"> | string
    email?: StringNullableWithAggregatesFilter<"Client"> | string | null
    direccion?: StringNullableWithAggregatesFilter<"Client"> | string | null
    notas?: StringNullableWithAggregatesFilter<"Client"> | string | null
    lastReminderSentAt?: DateTimeNullableWithAggregatesFilter<"Client"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    sku?: StringFilter<"Product"> | string
    nombre?: StringFilter<"Product"> | string
    precioUnitario?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    costoUnitario?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    stock?: IntFilter<"Product"> | number
    imageUrl?: StringNullableFilter<"Product"> | string | null
    activo?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    saleItems?: SaleItemListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    sku?: SortOrder
    nombre?: SortOrder
    precioUnitario?: SortOrder
    costoUnitario?: SortOrder
    stock?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    saleItems?: SaleItemOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sku?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    nombre?: StringFilter<"Product"> | string
    precioUnitario?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    costoUnitario?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    stock?: IntFilter<"Product"> | number
    imageUrl?: StringNullableFilter<"Product"> | string | null
    activo?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    saleItems?: SaleItemListRelationFilter
  }, "id" | "sku">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    sku?: SortOrder
    nombre?: SortOrder
    precioUnitario?: SortOrder
    costoUnitario?: SortOrder
    stock?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    sku?: StringWithAggregatesFilter<"Product"> | string
    nombre?: StringWithAggregatesFilter<"Product"> | string
    precioUnitario?: DecimalWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string
    costoUnitario?: DecimalWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string
    stock?: IntWithAggregatesFilter<"Product"> | number
    imageUrl?: StringNullableWithAggregatesFilter<"Product"> | string | null
    activo?: BoolWithAggregatesFilter<"Product"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type SaleWhereInput = {
    AND?: SaleWhereInput | SaleWhereInput[]
    OR?: SaleWhereInput[]
    NOT?: SaleWhereInput | SaleWhereInput[]
    id?: StringFilter<"Sale"> | string
    fecha?: DateTimeFilter<"Sale"> | Date | string
    subtotal?: DecimalFilter<"Sale"> | Decimal | DecimalJsLike | number | string
    impuestos?: DecimalFilter<"Sale"> | Decimal | DecimalJsLike | number | string
    total?: DecimalFilter<"Sale"> | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFilter<"Sale"> | $Enums.MetodoPago
    userId?: StringFilter<"Sale"> | string
    clientId?: StringNullableFilter<"Sale"> | string | null
    createdAt?: DateTimeFilter<"Sale"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    client?: XOR<ClientNullableRelationFilter, ClientWhereInput> | null
    items?: SaleItemListRelationFilter
    invoice?: XOR<InvoiceNullableRelationFilter, InvoiceWhereInput> | null
    payments?: PaymentListRelationFilter
    order?: XOR<OrderNullableRelationFilter, OrderWhereInput> | null
  }

  export type SaleOrderByWithRelationInput = {
    id?: SortOrder
    fecha?: SortOrder
    subtotal?: SortOrder
    impuestos?: SortOrder
    total?: SortOrder
    metodoPago?: SortOrder
    userId?: SortOrder
    clientId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    client?: ClientOrderByWithRelationInput
    items?: SaleItemOrderByRelationAggregateInput
    invoice?: InvoiceOrderByWithRelationInput
    payments?: PaymentOrderByRelationAggregateInput
    order?: OrderOrderByWithRelationInput
  }

  export type SaleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SaleWhereInput | SaleWhereInput[]
    OR?: SaleWhereInput[]
    NOT?: SaleWhereInput | SaleWhereInput[]
    fecha?: DateTimeFilter<"Sale"> | Date | string
    subtotal?: DecimalFilter<"Sale"> | Decimal | DecimalJsLike | number | string
    impuestos?: DecimalFilter<"Sale"> | Decimal | DecimalJsLike | number | string
    total?: DecimalFilter<"Sale"> | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFilter<"Sale"> | $Enums.MetodoPago
    userId?: StringFilter<"Sale"> | string
    clientId?: StringNullableFilter<"Sale"> | string | null
    createdAt?: DateTimeFilter<"Sale"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    client?: XOR<ClientNullableRelationFilter, ClientWhereInput> | null
    items?: SaleItemListRelationFilter
    invoice?: XOR<InvoiceNullableRelationFilter, InvoiceWhereInput> | null
    payments?: PaymentListRelationFilter
    order?: XOR<OrderNullableRelationFilter, OrderWhereInput> | null
  }, "id">

  export type SaleOrderByWithAggregationInput = {
    id?: SortOrder
    fecha?: SortOrder
    subtotal?: SortOrder
    impuestos?: SortOrder
    total?: SortOrder
    metodoPago?: SortOrder
    userId?: SortOrder
    clientId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SaleCountOrderByAggregateInput
    _avg?: SaleAvgOrderByAggregateInput
    _max?: SaleMaxOrderByAggregateInput
    _min?: SaleMinOrderByAggregateInput
    _sum?: SaleSumOrderByAggregateInput
  }

  export type SaleScalarWhereWithAggregatesInput = {
    AND?: SaleScalarWhereWithAggregatesInput | SaleScalarWhereWithAggregatesInput[]
    OR?: SaleScalarWhereWithAggregatesInput[]
    NOT?: SaleScalarWhereWithAggregatesInput | SaleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Sale"> | string
    fecha?: DateTimeWithAggregatesFilter<"Sale"> | Date | string
    subtotal?: DecimalWithAggregatesFilter<"Sale"> | Decimal | DecimalJsLike | number | string
    impuestos?: DecimalWithAggregatesFilter<"Sale"> | Decimal | DecimalJsLike | number | string
    total?: DecimalWithAggregatesFilter<"Sale"> | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoWithAggregatesFilter<"Sale"> | $Enums.MetodoPago
    userId?: StringWithAggregatesFilter<"Sale"> | string
    clientId?: StringNullableWithAggregatesFilter<"Sale"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Sale"> | Date | string
  }

  export type SaleItemWhereInput = {
    AND?: SaleItemWhereInput | SaleItemWhereInput[]
    OR?: SaleItemWhereInput[]
    NOT?: SaleItemWhereInput | SaleItemWhereInput[]
    id?: StringFilter<"SaleItem"> | string
    saleId?: StringFilter<"SaleItem"> | string
    productId?: StringNullableFilter<"SaleItem"> | string | null
    descripcion?: StringFilter<"SaleItem"> | string
    cantidad?: IntFilter<"SaleItem"> | number
    precioUnitario?: DecimalFilter<"SaleItem"> | Decimal | DecimalJsLike | number | string
    costoUnitario?: DecimalFilter<"SaleItem"> | Decimal | DecimalJsLike | number | string
    total?: DecimalFilter<"SaleItem"> | Decimal | DecimalJsLike | number | string
    sale?: XOR<SaleRelationFilter, SaleWhereInput>
    product?: XOR<ProductNullableRelationFilter, ProductWhereInput> | null
  }

  export type SaleItemOrderByWithRelationInput = {
    id?: SortOrder
    saleId?: SortOrder
    productId?: SortOrderInput | SortOrder
    descripcion?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    costoUnitario?: SortOrder
    total?: SortOrder
    sale?: SaleOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type SaleItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SaleItemWhereInput | SaleItemWhereInput[]
    OR?: SaleItemWhereInput[]
    NOT?: SaleItemWhereInput | SaleItemWhereInput[]
    saleId?: StringFilter<"SaleItem"> | string
    productId?: StringNullableFilter<"SaleItem"> | string | null
    descripcion?: StringFilter<"SaleItem"> | string
    cantidad?: IntFilter<"SaleItem"> | number
    precioUnitario?: DecimalFilter<"SaleItem"> | Decimal | DecimalJsLike | number | string
    costoUnitario?: DecimalFilter<"SaleItem"> | Decimal | DecimalJsLike | number | string
    total?: DecimalFilter<"SaleItem"> | Decimal | DecimalJsLike | number | string
    sale?: XOR<SaleRelationFilter, SaleWhereInput>
    product?: XOR<ProductNullableRelationFilter, ProductWhereInput> | null
  }, "id">

  export type SaleItemOrderByWithAggregationInput = {
    id?: SortOrder
    saleId?: SortOrder
    productId?: SortOrderInput | SortOrder
    descripcion?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    costoUnitario?: SortOrder
    total?: SortOrder
    _count?: SaleItemCountOrderByAggregateInput
    _avg?: SaleItemAvgOrderByAggregateInput
    _max?: SaleItemMaxOrderByAggregateInput
    _min?: SaleItemMinOrderByAggregateInput
    _sum?: SaleItemSumOrderByAggregateInput
  }

  export type SaleItemScalarWhereWithAggregatesInput = {
    AND?: SaleItemScalarWhereWithAggregatesInput | SaleItemScalarWhereWithAggregatesInput[]
    OR?: SaleItemScalarWhereWithAggregatesInput[]
    NOT?: SaleItemScalarWhereWithAggregatesInput | SaleItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SaleItem"> | string
    saleId?: StringWithAggregatesFilter<"SaleItem"> | string
    productId?: StringNullableWithAggregatesFilter<"SaleItem"> | string | null
    descripcion?: StringWithAggregatesFilter<"SaleItem"> | string
    cantidad?: IntWithAggregatesFilter<"SaleItem"> | number
    precioUnitario?: DecimalWithAggregatesFilter<"SaleItem"> | Decimal | DecimalJsLike | number | string
    costoUnitario?: DecimalWithAggregatesFilter<"SaleItem"> | Decimal | DecimalJsLike | number | string
    total?: DecimalWithAggregatesFilter<"SaleItem"> | Decimal | DecimalJsLike | number | string
  }

  export type InvoiceWhereInput = {
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    id?: StringFilter<"Invoice"> | string
    saleId?: StringFilter<"Invoice"> | string
    numero?: StringFilter<"Invoice"> | string
    estado?: EnumEstadoFacturaFilter<"Invoice"> | $Enums.EstadoFactura
    pdfUrl?: StringNullableFilter<"Invoice"> | string | null
    pngUrl?: StringNullableFilter<"Invoice"> | string | null
    sentWhatsappAt?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    ultimoError?: StringNullableFilter<"Invoice"> | string | null
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
    sale?: XOR<SaleRelationFilter, SaleWhereInput>
  }

  export type InvoiceOrderByWithRelationInput = {
    id?: SortOrder
    saleId?: SortOrder
    numero?: SortOrder
    estado?: SortOrder
    pdfUrl?: SortOrderInput | SortOrder
    pngUrl?: SortOrderInput | SortOrder
    sentWhatsappAt?: SortOrderInput | SortOrder
    ultimoError?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sale?: SaleOrderByWithRelationInput
  }

  export type InvoiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    saleId?: string
    numero?: string
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    estado?: EnumEstadoFacturaFilter<"Invoice"> | $Enums.EstadoFactura
    pdfUrl?: StringNullableFilter<"Invoice"> | string | null
    pngUrl?: StringNullableFilter<"Invoice"> | string | null
    sentWhatsappAt?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    ultimoError?: StringNullableFilter<"Invoice"> | string | null
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
    sale?: XOR<SaleRelationFilter, SaleWhereInput>
  }, "id" | "saleId" | "numero">

  export type InvoiceOrderByWithAggregationInput = {
    id?: SortOrder
    saleId?: SortOrder
    numero?: SortOrder
    estado?: SortOrder
    pdfUrl?: SortOrderInput | SortOrder
    pngUrl?: SortOrderInput | SortOrder
    sentWhatsappAt?: SortOrderInput | SortOrder
    ultimoError?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InvoiceCountOrderByAggregateInput
    _max?: InvoiceMaxOrderByAggregateInput
    _min?: InvoiceMinOrderByAggregateInput
  }

  export type InvoiceScalarWhereWithAggregatesInput = {
    AND?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    OR?: InvoiceScalarWhereWithAggregatesInput[]
    NOT?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Invoice"> | string
    saleId?: StringWithAggregatesFilter<"Invoice"> | string
    numero?: StringWithAggregatesFilter<"Invoice"> | string
    estado?: EnumEstadoFacturaWithAggregatesFilter<"Invoice"> | $Enums.EstadoFactura
    pdfUrl?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    pngUrl?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    sentWhatsappAt?: DateTimeNullableWithAggregatesFilter<"Invoice"> | Date | string | null
    ultimoError?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    saleId?: StringFilter<"Payment"> | string
    amount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    fecha?: DateTimeFilter<"Payment"> | Date | string
    metodo?: EnumMetodoPagoFilter<"Payment"> | $Enums.MetodoPago
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    sale?: XOR<SaleRelationFilter, SaleWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    saleId?: SortOrder
    amount?: SortOrder
    fecha?: SortOrder
    metodo?: SortOrder
    createdAt?: SortOrder
    sale?: SaleOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    saleId?: StringFilter<"Payment"> | string
    amount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    fecha?: DateTimeFilter<"Payment"> | Date | string
    metodo?: EnumMetodoPagoFilter<"Payment"> | $Enums.MetodoPago
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    sale?: XOR<SaleRelationFilter, SaleWhereInput>
  }, "id">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    saleId?: SortOrder
    amount?: SortOrder
    fecha?: SortOrder
    metodo?: SortOrder
    createdAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payment"> | string
    saleId?: StringWithAggregatesFilter<"Payment"> | string
    amount?: DecimalWithAggregatesFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    fecha?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    metodo?: EnumMetodoPagoWithAggregatesFilter<"Payment"> | $Enums.MetodoPago
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type ClientDebtWhereInput = {
    AND?: ClientDebtWhereInput | ClientDebtWhereInput[]
    OR?: ClientDebtWhereInput[]
    NOT?: ClientDebtWhereInput | ClientDebtWhereInput[]
    id?: StringFilter<"ClientDebt"> | string
    clientId?: StringFilter<"ClientDebt"> | string
    saleId?: StringNullableFilter<"ClientDebt"> | string | null
    amountTotal?: DecimalFilter<"ClientDebt"> | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFilter<"ClientDebt"> | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeNullableFilter<"ClientDebt"> | Date | string | null
    status?: EnumEstadoDeudaFilter<"ClientDebt"> | $Enums.EstadoDeuda
    createdAt?: DateTimeFilter<"ClientDebt"> | Date | string
    updatedAt?: DateTimeFilter<"ClientDebt"> | Date | string
    client?: XOR<ClientRelationFilter, ClientWhereInput>
  }

  export type ClientDebtOrderByWithRelationInput = {
    id?: SortOrder
    clientId?: SortOrder
    saleId?: SortOrderInput | SortOrder
    amountTotal?: SortOrder
    amountPaid?: SortOrder
    dueDate?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    client?: ClientOrderByWithRelationInput
  }

  export type ClientDebtWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClientDebtWhereInput | ClientDebtWhereInput[]
    OR?: ClientDebtWhereInput[]
    NOT?: ClientDebtWhereInput | ClientDebtWhereInput[]
    clientId?: StringFilter<"ClientDebt"> | string
    saleId?: StringNullableFilter<"ClientDebt"> | string | null
    amountTotal?: DecimalFilter<"ClientDebt"> | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFilter<"ClientDebt"> | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeNullableFilter<"ClientDebt"> | Date | string | null
    status?: EnumEstadoDeudaFilter<"ClientDebt"> | $Enums.EstadoDeuda
    createdAt?: DateTimeFilter<"ClientDebt"> | Date | string
    updatedAt?: DateTimeFilter<"ClientDebt"> | Date | string
    client?: XOR<ClientRelationFilter, ClientWhereInput>
  }, "id">

  export type ClientDebtOrderByWithAggregationInput = {
    id?: SortOrder
    clientId?: SortOrder
    saleId?: SortOrderInput | SortOrder
    amountTotal?: SortOrder
    amountPaid?: SortOrder
    dueDate?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClientDebtCountOrderByAggregateInput
    _avg?: ClientDebtAvgOrderByAggregateInput
    _max?: ClientDebtMaxOrderByAggregateInput
    _min?: ClientDebtMinOrderByAggregateInput
    _sum?: ClientDebtSumOrderByAggregateInput
  }

  export type ClientDebtScalarWhereWithAggregatesInput = {
    AND?: ClientDebtScalarWhereWithAggregatesInput | ClientDebtScalarWhereWithAggregatesInput[]
    OR?: ClientDebtScalarWhereWithAggregatesInput[]
    NOT?: ClientDebtScalarWhereWithAggregatesInput | ClientDebtScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ClientDebt"> | string
    clientId?: StringWithAggregatesFilter<"ClientDebt"> | string
    saleId?: StringNullableWithAggregatesFilter<"ClientDebt"> | string | null
    amountTotal?: DecimalWithAggregatesFilter<"ClientDebt"> | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalWithAggregatesFilter<"ClientDebt"> | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeNullableWithAggregatesFilter<"ClientDebt"> | Date | string | null
    status?: EnumEstadoDeudaWithAggregatesFilter<"ClientDebt"> | $Enums.EstadoDeuda
    createdAt?: DateTimeWithAggregatesFilter<"ClientDebt"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ClientDebt"> | Date | string
  }

  export type ExpenseWhereInput = {
    AND?: ExpenseWhereInput | ExpenseWhereInput[]
    OR?: ExpenseWhereInput[]
    NOT?: ExpenseWhereInput | ExpenseWhereInput[]
    id?: StringFilter<"Expense"> | string
    fecha?: DateTimeFilter<"Expense"> | Date | string
    categoria?: StringFilter<"Expense"> | string
    descripcion?: StringFilter<"Expense"> | string
    monto?: DecimalFilter<"Expense"> | Decimal | DecimalJsLike | number | string
    userId?: StringFilter<"Expense"> | string
    createdAt?: DateTimeFilter<"Expense"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ExpenseOrderByWithRelationInput = {
    id?: SortOrder
    fecha?: SortOrder
    categoria?: SortOrder
    descripcion?: SortOrder
    monto?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ExpenseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExpenseWhereInput | ExpenseWhereInput[]
    OR?: ExpenseWhereInput[]
    NOT?: ExpenseWhereInput | ExpenseWhereInput[]
    fecha?: DateTimeFilter<"Expense"> | Date | string
    categoria?: StringFilter<"Expense"> | string
    descripcion?: StringFilter<"Expense"> | string
    monto?: DecimalFilter<"Expense"> | Decimal | DecimalJsLike | number | string
    userId?: StringFilter<"Expense"> | string
    createdAt?: DateTimeFilter<"Expense"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type ExpenseOrderByWithAggregationInput = {
    id?: SortOrder
    fecha?: SortOrder
    categoria?: SortOrder
    descripcion?: SortOrder
    monto?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    _count?: ExpenseCountOrderByAggregateInput
    _avg?: ExpenseAvgOrderByAggregateInput
    _max?: ExpenseMaxOrderByAggregateInput
    _min?: ExpenseMinOrderByAggregateInput
    _sum?: ExpenseSumOrderByAggregateInput
  }

  export type ExpenseScalarWhereWithAggregatesInput = {
    AND?: ExpenseScalarWhereWithAggregatesInput | ExpenseScalarWhereWithAggregatesInput[]
    OR?: ExpenseScalarWhereWithAggregatesInput[]
    NOT?: ExpenseScalarWhereWithAggregatesInput | ExpenseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Expense"> | string
    fecha?: DateTimeWithAggregatesFilter<"Expense"> | Date | string
    categoria?: StringWithAggregatesFilter<"Expense"> | string
    descripcion?: StringWithAggregatesFilter<"Expense"> | string
    monto?: DecimalWithAggregatesFilter<"Expense"> | Decimal | DecimalJsLike | number | string
    userId?: StringWithAggregatesFilter<"Expense"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Expense"> | Date | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    saleId?: StringFilter<"Order"> | string
    estado?: EnumEstadoPedidoFilter<"Order"> | $Enums.EstadoPedido
    fechaEntrega?: DateTimeNullableFilter<"Order"> | Date | string | null
    notas?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    sale?: XOR<SaleRelationFilter, SaleWhereInput>
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    saleId?: SortOrder
    estado?: SortOrder
    fechaEntrega?: SortOrderInput | SortOrder
    notas?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sale?: SaleOrderByWithRelationInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    saleId?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    estado?: EnumEstadoPedidoFilter<"Order"> | $Enums.EstadoPedido
    fechaEntrega?: DateTimeNullableFilter<"Order"> | Date | string | null
    notas?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    sale?: XOR<SaleRelationFilter, SaleWhereInput>
  }, "id" | "saleId">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    saleId?: SortOrder
    estado?: SortOrder
    fechaEntrega?: SortOrderInput | SortOrder
    notas?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    saleId?: StringWithAggregatesFilter<"Order"> | string
    estado?: EnumEstadoPedidoWithAggregatesFilter<"Order"> | $Enums.EstadoPedido
    fechaEntrega?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    notas?: StringNullableWithAggregatesFilter<"Order"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    changes?: JsonNullableFilter<"AuditLog">
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    userId?: SortOrderInput | SortOrder
    changes?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    changes?: JsonNullableFilter<"AuditLog">
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    userId?: SortOrderInput | SortOrder
    changes?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    entity?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    userId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    changes?: JsonNullableWithAggregatesFilter<"AuditLog">
    timestamp?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type BusinessProfileWhereInput = {
    AND?: BusinessProfileWhereInput | BusinessProfileWhereInput[]
    OR?: BusinessProfileWhereInput[]
    NOT?: BusinessProfileWhereInput | BusinessProfileWhereInput[]
    id?: StringFilter<"BusinessProfile"> | string
    nombre?: StringFilter<"BusinessProfile"> | string
    logoUrl?: StringNullableFilter<"BusinessProfile"> | string | null
    direccion?: StringNullableFilter<"BusinessProfile"> | string | null
    identifFiscal?: StringNullableFilter<"BusinessProfile"> | string | null
    tasaImpuesto?: DecimalFilter<"BusinessProfile"> | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFilter<"BusinessProfile"> | Date | string
  }

  export type BusinessProfileOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    direccion?: SortOrderInput | SortOrder
    identifFiscal?: SortOrderInput | SortOrder
    tasaImpuesto?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusinessProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BusinessProfileWhereInput | BusinessProfileWhereInput[]
    OR?: BusinessProfileWhereInput[]
    NOT?: BusinessProfileWhereInput | BusinessProfileWhereInput[]
    nombre?: StringFilter<"BusinessProfile"> | string
    logoUrl?: StringNullableFilter<"BusinessProfile"> | string | null
    direccion?: StringNullableFilter<"BusinessProfile"> | string | null
    identifFiscal?: StringNullableFilter<"BusinessProfile"> | string | null
    tasaImpuesto?: DecimalFilter<"BusinessProfile"> | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFilter<"BusinessProfile"> | Date | string
  }, "id">

  export type BusinessProfileOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    direccion?: SortOrderInput | SortOrder
    identifFiscal?: SortOrderInput | SortOrder
    tasaImpuesto?: SortOrder
    updatedAt?: SortOrder
    _count?: BusinessProfileCountOrderByAggregateInput
    _avg?: BusinessProfileAvgOrderByAggregateInput
    _max?: BusinessProfileMaxOrderByAggregateInput
    _min?: BusinessProfileMinOrderByAggregateInput
    _sum?: BusinessProfileSumOrderByAggregateInput
  }

  export type BusinessProfileScalarWhereWithAggregatesInput = {
    AND?: BusinessProfileScalarWhereWithAggregatesInput | BusinessProfileScalarWhereWithAggregatesInput[]
    OR?: BusinessProfileScalarWhereWithAggregatesInput[]
    NOT?: BusinessProfileScalarWhereWithAggregatesInput | BusinessProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BusinessProfile"> | string
    nombre?: StringWithAggregatesFilter<"BusinessProfile"> | string
    logoUrl?: StringNullableWithAggregatesFilter<"BusinessProfile"> | string | null
    direccion?: StringNullableWithAggregatesFilter<"BusinessProfile"> | string | null
    identifFiscal?: StringNullableWithAggregatesFilter<"BusinessProfile"> | string | null
    tasaImpuesto?: DecimalWithAggregatesFilter<"BusinessProfile"> | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeWithAggregatesFilter<"BusinessProfile"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    nombre: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sales?: SaleCreateNestedManyWithoutUserInput
    expenses?: ExpenseCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    nombre: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sales?: SaleUncheckedCreateNestedManyWithoutUserInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SaleUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SaleUncheckedUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    nombre: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientCreateInput = {
    id?: string
    nombre: string
    telefono: string
    email?: string | null
    direccion?: string | null
    notas?: string | null
    lastReminderSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sales?: SaleCreateNestedManyWithoutClientInput
    debts?: ClientDebtCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateInput = {
    id?: string
    nombre: string
    telefono: string
    email?: string | null
    direccion?: string | null
    notas?: string | null
    lastReminderSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sales?: SaleUncheckedCreateNestedManyWithoutClientInput
    debts?: ClientDebtUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    telefono?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    lastReminderSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SaleUpdateManyWithoutClientNestedInput
    debts?: ClientDebtUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    telefono?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    lastReminderSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SaleUncheckedUpdateManyWithoutClientNestedInput
    debts?: ClientDebtUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientCreateManyInput = {
    id?: string
    nombre: string
    telefono: string
    email?: string | null
    direccion?: string | null
    notas?: string | null
    lastReminderSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    telefono?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    lastReminderSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    telefono?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    lastReminderSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    id?: string
    sku: string
    nombre: string
    precioUnitario: Decimal | DecimalJsLike | number | string
    costoUnitario?: Decimal | DecimalJsLike | number | string
    stock?: number
    imageUrl?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    saleItems?: SaleItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    sku: string
    nombre: string
    precioUnitario: Decimal | DecimalJsLike | number | string
    costoUnitario?: Decimal | DecimalJsLike | number | string
    stock?: number
    imageUrl?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    saleItems?: SaleItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    saleItems?: SaleItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    saleItems?: SaleItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    sku: string
    nombre: string
    precioUnitario: Decimal | DecimalJsLike | number | string
    costoUnitario?: Decimal | DecimalJsLike | number | string
    stock?: number
    imageUrl?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleCreateInput = {
    id?: string
    fecha?: Date | string
    subtotal: Decimal | DecimalJsLike | number | string
    impuestos?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: $Enums.MetodoPago
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSalesInput
    client?: ClientCreateNestedOneWithoutSalesInput
    items?: SaleItemCreateNestedManyWithoutSaleInput
    invoice?: InvoiceCreateNestedOneWithoutSaleInput
    payments?: PaymentCreateNestedManyWithoutSaleInput
    order?: OrderCreateNestedOneWithoutSaleInput
  }

  export type SaleUncheckedCreateInput = {
    id?: string
    fecha?: Date | string
    subtotal: Decimal | DecimalJsLike | number | string
    impuestos?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: $Enums.MetodoPago
    userId: string
    clientId?: string | null
    createdAt?: Date | string
    items?: SaleItemUncheckedCreateNestedManyWithoutSaleInput
    invoice?: InvoiceUncheckedCreateNestedOneWithoutSaleInput
    payments?: PaymentUncheckedCreateNestedManyWithoutSaleInput
    order?: OrderUncheckedCreateNestedOneWithoutSaleInput
  }

  export type SaleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    impuestos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSalesNestedInput
    client?: ClientUpdateOneWithoutSalesNestedInput
    items?: SaleItemUpdateManyWithoutSaleNestedInput
    invoice?: InvoiceUpdateOneWithoutSaleNestedInput
    payments?: PaymentUpdateManyWithoutSaleNestedInput
    order?: OrderUpdateOneWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    impuestos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    userId?: StringFieldUpdateOperationsInput | string
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: SaleItemUncheckedUpdateManyWithoutSaleNestedInput
    invoice?: InvoiceUncheckedUpdateOneWithoutSaleNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutSaleNestedInput
    order?: OrderUncheckedUpdateOneWithoutSaleNestedInput
  }

  export type SaleCreateManyInput = {
    id?: string
    fecha?: Date | string
    subtotal: Decimal | DecimalJsLike | number | string
    impuestos?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: $Enums.MetodoPago
    userId: string
    clientId?: string | null
    createdAt?: Date | string
  }

  export type SaleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    impuestos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    impuestos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    userId?: StringFieldUpdateOperationsInput | string
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleItemCreateInput = {
    id?: string
    descripcion: string
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    costoUnitario?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    sale: SaleCreateNestedOneWithoutItemsInput
    product?: ProductCreateNestedOneWithoutSaleItemsInput
  }

  export type SaleItemUncheckedCreateInput = {
    id?: string
    saleId: string
    productId?: string | null
    descripcion: string
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    costoUnitario?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
  }

  export type SaleItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sale?: SaleUpdateOneRequiredWithoutItemsNestedInput
    product?: ProductUpdateOneWithoutSaleItemsNestedInput
  }

  export type SaleItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type SaleItemCreateManyInput = {
    id?: string
    saleId: string
    productId?: string | null
    descripcion: string
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    costoUnitario?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
  }

  export type SaleItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type SaleItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type InvoiceCreateInput = {
    id?: string
    numero: string
    estado?: $Enums.EstadoFactura
    pdfUrl?: string | null
    pngUrl?: string | null
    sentWhatsappAt?: Date | string | null
    ultimoError?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sale: SaleCreateNestedOneWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateInput = {
    id?: string
    saleId: string
    numero: string
    estado?: $Enums.EstadoFactura
    pdfUrl?: string | null
    pngUrl?: string | null
    sentWhatsappAt?: Date | string | null
    ultimoError?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoFacturaFieldUpdateOperationsInput | $Enums.EstadoFactura
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pngUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sentWhatsappAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ultimoError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sale?: SaleUpdateOneRequiredWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoFacturaFieldUpdateOperationsInput | $Enums.EstadoFactura
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pngUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sentWhatsappAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ultimoError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceCreateManyInput = {
    id?: string
    saleId: string
    numero: string
    estado?: $Enums.EstadoFactura
    pdfUrl?: string | null
    pngUrl?: string | null
    sentWhatsappAt?: Date | string | null
    ultimoError?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoFacturaFieldUpdateOperationsInput | $Enums.EstadoFactura
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pngUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sentWhatsappAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ultimoError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoFacturaFieldUpdateOperationsInput | $Enums.EstadoFactura
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pngUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sentWhatsappAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ultimoError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    fecha?: Date | string
    metodo: $Enums.MetodoPago
    createdAt?: Date | string
    sale: SaleCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    saleId: string
    amount: Decimal | DecimalJsLike | number | string
    fecha?: Date | string
    metodo: $Enums.MetodoPago
    createdAt?: Date | string
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    metodo?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sale?: SaleUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    metodo?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInput = {
    id?: string
    saleId: string
    amount: Decimal | DecimalJsLike | number | string
    fecha?: Date | string
    metodo: $Enums.MetodoPago
    createdAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    metodo?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    metodo?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientDebtCreateInput = {
    id?: string
    saleId?: string | null
    amountTotal: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    dueDate?: Date | string | null
    status?: $Enums.EstadoDeuda
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutDebtsInput
  }

  export type ClientDebtUncheckedCreateInput = {
    id?: string
    clientId: string
    saleId?: string | null
    amountTotal: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    dueDate?: Date | string | null
    status?: $Enums.EstadoDeuda
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientDebtUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleId?: NullableStringFieldUpdateOperationsInput | string | null
    amountTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumEstadoDeudaFieldUpdateOperationsInput | $Enums.EstadoDeuda
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutDebtsNestedInput
  }

  export type ClientDebtUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    saleId?: NullableStringFieldUpdateOperationsInput | string | null
    amountTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumEstadoDeudaFieldUpdateOperationsInput | $Enums.EstadoDeuda
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientDebtCreateManyInput = {
    id?: string
    clientId: string
    saleId?: string | null
    amountTotal: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    dueDate?: Date | string | null
    status?: $Enums.EstadoDeuda
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientDebtUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleId?: NullableStringFieldUpdateOperationsInput | string | null
    amountTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumEstadoDeudaFieldUpdateOperationsInput | $Enums.EstadoDeuda
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientDebtUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    saleId?: NullableStringFieldUpdateOperationsInput | string | null
    amountTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumEstadoDeudaFieldUpdateOperationsInput | $Enums.EstadoDeuda
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseCreateInput = {
    id?: string
    fecha?: Date | string
    categoria: string
    descripcion: string
    monto: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutExpensesInput
  }

  export type ExpenseUncheckedCreateInput = {
    id?: string
    fecha?: Date | string
    categoria: string
    descripcion: string
    monto: Decimal | DecimalJsLike | number | string
    userId: string
    createdAt?: Date | string
  }

  export type ExpenseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutExpensesNestedInput
  }

  export type ExpenseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseCreateManyInput = {
    id?: string
    fecha?: Date | string
    categoria: string
    descripcion: string
    monto: Decimal | DecimalJsLike | number | string
    userId: string
    createdAt?: Date | string
  }

  export type ExpenseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateInput = {
    id?: string
    estado?: $Enums.EstadoPedido
    fechaEntrega?: Date | string | null
    notas?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sale: SaleCreateNestedOneWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    saleId: string
    estado?: $Enums.EstadoPedido
    fechaEntrega?: Date | string | null
    notas?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    fechaEntrega?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sale?: SaleUpdateOneRequiredWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    fechaEntrega?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateManyInput = {
    id?: string
    saleId: string
    estado?: $Enums.EstadoPedido
    fechaEntrega?: Date | string | null
    notas?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    fechaEntrega?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    fechaEntrega?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    entity: string
    entityId: string
    action: string
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    user?: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    entity: string
    entityId: string
    action: string
    userId?: string | null
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    entity: string
    entityId: string
    action: string
    userId?: string | null
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessProfileCreateInput = {
    id?: string
    nombre?: string
    logoUrl?: string | null
    direccion?: string | null
    identifFiscal?: string | null
    tasaImpuesto?: Decimal | DecimalJsLike | number | string
    updatedAt?: Date | string
  }

  export type BusinessProfileUncheckedCreateInput = {
    id?: string
    nombre?: string
    logoUrl?: string | null
    direccion?: string | null
    identifFiscal?: string | null
    tasaImpuesto?: Decimal | DecimalJsLike | number | string
    updatedAt?: Date | string
  }

  export type BusinessProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    identifFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    tasaImpuesto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    identifFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    tasaImpuesto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessProfileCreateManyInput = {
    id?: string
    nombre?: string
    logoUrl?: string | null
    direccion?: string | null
    identifFiscal?: string | null
    tasaImpuesto?: Decimal | DecimalJsLike | number | string
    updatedAt?: Date | string
  }

  export type BusinessProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    identifFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    tasaImpuesto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    identifFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    tasaImpuesto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SaleListRelationFilter = {
    every?: SaleWhereInput
    some?: SaleWhereInput
    none?: SaleWhereInput
  }

  export type ExpenseListRelationFilter = {
    every?: ExpenseWhereInput
    some?: ExpenseWhereInput
    none?: ExpenseWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type SaleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExpenseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ClientDebtListRelationFilter = {
    every?: ClientDebtWhereInput
    some?: ClientDebtWhereInput
    none?: ClientDebtWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ClientDebtOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClientCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    telefono?: SortOrder
    email?: SortOrder
    direccion?: SortOrder
    notas?: SortOrder
    lastReminderSentAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    telefono?: SortOrder
    email?: SortOrder
    direccion?: SortOrder
    notas?: SortOrder
    lastReminderSentAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    telefono?: SortOrder
    email?: SortOrder
    direccion?: SortOrder
    notas?: SortOrder
    lastReminderSentAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type SaleItemListRelationFilter = {
    every?: SaleItemWhereInput
    some?: SaleItemWhereInput
    none?: SaleItemWhereInput
  }

  export type SaleItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    sku?: SortOrder
    nombre?: SortOrder
    precioUnitario?: SortOrder
    costoUnitario?: SortOrder
    stock?: SortOrder
    imageUrl?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    precioUnitario?: SortOrder
    costoUnitario?: SortOrder
    stock?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    sku?: SortOrder
    nombre?: SortOrder
    precioUnitario?: SortOrder
    costoUnitario?: SortOrder
    stock?: SortOrder
    imageUrl?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    sku?: SortOrder
    nombre?: SortOrder
    precioUnitario?: SortOrder
    costoUnitario?: SortOrder
    stock?: SortOrder
    imageUrl?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    precioUnitario?: SortOrder
    costoUnitario?: SortOrder
    stock?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumMetodoPagoFilter<$PrismaModel = never> = {
    equals?: $Enums.MetodoPago | EnumMetodoPagoFieldRefInput<$PrismaModel>
    in?: $Enums.MetodoPago[] | ListEnumMetodoPagoFieldRefInput<$PrismaModel>
    notIn?: $Enums.MetodoPago[] | ListEnumMetodoPagoFieldRefInput<$PrismaModel>
    not?: NestedEnumMetodoPagoFilter<$PrismaModel> | $Enums.MetodoPago
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ClientNullableRelationFilter = {
    is?: ClientWhereInput | null
    isNot?: ClientWhereInput | null
  }

  export type InvoiceNullableRelationFilter = {
    is?: InvoiceWhereInput | null
    isNot?: InvoiceWhereInput | null
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type OrderNullableRelationFilter = {
    is?: OrderWhereInput | null
    isNot?: OrderWhereInput | null
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SaleCountOrderByAggregateInput = {
    id?: SortOrder
    fecha?: SortOrder
    subtotal?: SortOrder
    impuestos?: SortOrder
    total?: SortOrder
    metodoPago?: SortOrder
    userId?: SortOrder
    clientId?: SortOrder
    createdAt?: SortOrder
  }

  export type SaleAvgOrderByAggregateInput = {
    subtotal?: SortOrder
    impuestos?: SortOrder
    total?: SortOrder
  }

  export type SaleMaxOrderByAggregateInput = {
    id?: SortOrder
    fecha?: SortOrder
    subtotal?: SortOrder
    impuestos?: SortOrder
    total?: SortOrder
    metodoPago?: SortOrder
    userId?: SortOrder
    clientId?: SortOrder
    createdAt?: SortOrder
  }

  export type SaleMinOrderByAggregateInput = {
    id?: SortOrder
    fecha?: SortOrder
    subtotal?: SortOrder
    impuestos?: SortOrder
    total?: SortOrder
    metodoPago?: SortOrder
    userId?: SortOrder
    clientId?: SortOrder
    createdAt?: SortOrder
  }

  export type SaleSumOrderByAggregateInput = {
    subtotal?: SortOrder
    impuestos?: SortOrder
    total?: SortOrder
  }

  export type EnumMetodoPagoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MetodoPago | EnumMetodoPagoFieldRefInput<$PrismaModel>
    in?: $Enums.MetodoPago[] | ListEnumMetodoPagoFieldRefInput<$PrismaModel>
    notIn?: $Enums.MetodoPago[] | ListEnumMetodoPagoFieldRefInput<$PrismaModel>
    not?: NestedEnumMetodoPagoWithAggregatesFilter<$PrismaModel> | $Enums.MetodoPago
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMetodoPagoFilter<$PrismaModel>
    _max?: NestedEnumMetodoPagoFilter<$PrismaModel>
  }

  export type SaleRelationFilter = {
    is?: SaleWhereInput
    isNot?: SaleWhereInput
  }

  export type ProductNullableRelationFilter = {
    is?: ProductWhereInput | null
    isNot?: ProductWhereInput | null
  }

  export type SaleItemCountOrderByAggregateInput = {
    id?: SortOrder
    saleId?: SortOrder
    productId?: SortOrder
    descripcion?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    costoUnitario?: SortOrder
    total?: SortOrder
  }

  export type SaleItemAvgOrderByAggregateInput = {
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    costoUnitario?: SortOrder
    total?: SortOrder
  }

  export type SaleItemMaxOrderByAggregateInput = {
    id?: SortOrder
    saleId?: SortOrder
    productId?: SortOrder
    descripcion?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    costoUnitario?: SortOrder
    total?: SortOrder
  }

  export type SaleItemMinOrderByAggregateInput = {
    id?: SortOrder
    saleId?: SortOrder
    productId?: SortOrder
    descripcion?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    costoUnitario?: SortOrder
    total?: SortOrder
  }

  export type SaleItemSumOrderByAggregateInput = {
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    costoUnitario?: SortOrder
    total?: SortOrder
  }

  export type EnumEstadoFacturaFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoFactura | EnumEstadoFacturaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoFactura[] | ListEnumEstadoFacturaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoFactura[] | ListEnumEstadoFacturaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoFacturaFilter<$PrismaModel> | $Enums.EstadoFactura
  }

  export type InvoiceCountOrderByAggregateInput = {
    id?: SortOrder
    saleId?: SortOrder
    numero?: SortOrder
    estado?: SortOrder
    pdfUrl?: SortOrder
    pngUrl?: SortOrder
    sentWhatsappAt?: SortOrder
    ultimoError?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceMaxOrderByAggregateInput = {
    id?: SortOrder
    saleId?: SortOrder
    numero?: SortOrder
    estado?: SortOrder
    pdfUrl?: SortOrder
    pngUrl?: SortOrder
    sentWhatsappAt?: SortOrder
    ultimoError?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceMinOrderByAggregateInput = {
    id?: SortOrder
    saleId?: SortOrder
    numero?: SortOrder
    estado?: SortOrder
    pdfUrl?: SortOrder
    pngUrl?: SortOrder
    sentWhatsappAt?: SortOrder
    ultimoError?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumEstadoFacturaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoFactura | EnumEstadoFacturaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoFactura[] | ListEnumEstadoFacturaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoFactura[] | ListEnumEstadoFacturaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoFacturaWithAggregatesFilter<$PrismaModel> | $Enums.EstadoFactura
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoFacturaFilter<$PrismaModel>
    _max?: NestedEnumEstadoFacturaFilter<$PrismaModel>
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    saleId?: SortOrder
    amount?: SortOrder
    fecha?: SortOrder
    metodo?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    saleId?: SortOrder
    amount?: SortOrder
    fecha?: SortOrder
    metodo?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    saleId?: SortOrder
    amount?: SortOrder
    fecha?: SortOrder
    metodo?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumEstadoDeudaFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoDeuda | EnumEstadoDeudaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoDeuda[] | ListEnumEstadoDeudaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoDeuda[] | ListEnumEstadoDeudaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoDeudaFilter<$PrismaModel> | $Enums.EstadoDeuda
  }

  export type ClientRelationFilter = {
    is?: ClientWhereInput
    isNot?: ClientWhereInput
  }

  export type ClientDebtCountOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    saleId?: SortOrder
    amountTotal?: SortOrder
    amountPaid?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientDebtAvgOrderByAggregateInput = {
    amountTotal?: SortOrder
    amountPaid?: SortOrder
  }

  export type ClientDebtMaxOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    saleId?: SortOrder
    amountTotal?: SortOrder
    amountPaid?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientDebtMinOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    saleId?: SortOrder
    amountTotal?: SortOrder
    amountPaid?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientDebtSumOrderByAggregateInput = {
    amountTotal?: SortOrder
    amountPaid?: SortOrder
  }

  export type EnumEstadoDeudaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoDeuda | EnumEstadoDeudaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoDeuda[] | ListEnumEstadoDeudaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoDeuda[] | ListEnumEstadoDeudaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoDeudaWithAggregatesFilter<$PrismaModel> | $Enums.EstadoDeuda
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoDeudaFilter<$PrismaModel>
    _max?: NestedEnumEstadoDeudaFilter<$PrismaModel>
  }

  export type ExpenseCountOrderByAggregateInput = {
    id?: SortOrder
    fecha?: SortOrder
    categoria?: SortOrder
    descripcion?: SortOrder
    monto?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type ExpenseAvgOrderByAggregateInput = {
    monto?: SortOrder
  }

  export type ExpenseMaxOrderByAggregateInput = {
    id?: SortOrder
    fecha?: SortOrder
    categoria?: SortOrder
    descripcion?: SortOrder
    monto?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type ExpenseMinOrderByAggregateInput = {
    id?: SortOrder
    fecha?: SortOrder
    categoria?: SortOrder
    descripcion?: SortOrder
    monto?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type ExpenseSumOrderByAggregateInput = {
    monto?: SortOrder
  }

  export type EnumEstadoPedidoFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPedido | EnumEstadoPedidoFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPedido[] | ListEnumEstadoPedidoFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPedido[] | ListEnumEstadoPedidoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPedidoFilter<$PrismaModel> | $Enums.EstadoPedido
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    saleId?: SortOrder
    estado?: SortOrder
    fechaEntrega?: SortOrder
    notas?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    saleId?: SortOrder
    estado?: SortOrder
    fechaEntrega?: SortOrder
    notas?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    saleId?: SortOrder
    estado?: SortOrder
    fechaEntrega?: SortOrder
    notas?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumEstadoPedidoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPedido | EnumEstadoPedidoFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPedido[] | ListEnumEstadoPedidoFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPedido[] | ListEnumEstadoPedidoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPedidoWithAggregatesFilter<$PrismaModel> | $Enums.EstadoPedido
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoPedidoFilter<$PrismaModel>
    _max?: NestedEnumEstadoPedidoFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    userId?: SortOrder
    changes?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    userId?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    userId?: SortOrder
    timestamp?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BusinessProfileCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    logoUrl?: SortOrder
    direccion?: SortOrder
    identifFiscal?: SortOrder
    tasaImpuesto?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusinessProfileAvgOrderByAggregateInput = {
    tasaImpuesto?: SortOrder
  }

  export type BusinessProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    logoUrl?: SortOrder
    direccion?: SortOrder
    identifFiscal?: SortOrder
    tasaImpuesto?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusinessProfileMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    logoUrl?: SortOrder
    direccion?: SortOrder
    identifFiscal?: SortOrder
    tasaImpuesto?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusinessProfileSumOrderByAggregateInput = {
    tasaImpuesto?: SortOrder
  }

  export type SaleCreateNestedManyWithoutUserInput = {
    create?: XOR<SaleCreateWithoutUserInput, SaleUncheckedCreateWithoutUserInput> | SaleCreateWithoutUserInput[] | SaleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutUserInput | SaleCreateOrConnectWithoutUserInput[]
    createMany?: SaleCreateManyUserInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type ExpenseCreateNestedManyWithoutUserInput = {
    create?: XOR<ExpenseCreateWithoutUserInput, ExpenseUncheckedCreateWithoutUserInput> | ExpenseCreateWithoutUserInput[] | ExpenseUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutUserInput | ExpenseCreateOrConnectWithoutUserInput[]
    createMany?: ExpenseCreateManyUserInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type SaleUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SaleCreateWithoutUserInput, SaleUncheckedCreateWithoutUserInput> | SaleCreateWithoutUserInput[] | SaleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutUserInput | SaleCreateOrConnectWithoutUserInput[]
    createMany?: SaleCreateManyUserInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type ExpenseUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ExpenseCreateWithoutUserInput, ExpenseUncheckedCreateWithoutUserInput> | ExpenseCreateWithoutUserInput[] | ExpenseUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutUserInput | ExpenseCreateOrConnectWithoutUserInput[]
    createMany?: ExpenseCreateManyUserInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SaleUpdateManyWithoutUserNestedInput = {
    create?: XOR<SaleCreateWithoutUserInput, SaleUncheckedCreateWithoutUserInput> | SaleCreateWithoutUserInput[] | SaleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutUserInput | SaleCreateOrConnectWithoutUserInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutUserInput | SaleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SaleCreateManyUserInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutUserInput | SaleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutUserInput | SaleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type ExpenseUpdateManyWithoutUserNestedInput = {
    create?: XOR<ExpenseCreateWithoutUserInput, ExpenseUncheckedCreateWithoutUserInput> | ExpenseCreateWithoutUserInput[] | ExpenseUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutUserInput | ExpenseCreateOrConnectWithoutUserInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutUserInput | ExpenseUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ExpenseCreateManyUserInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutUserInput | ExpenseUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutUserInput | ExpenseUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type SaleUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SaleCreateWithoutUserInput, SaleUncheckedCreateWithoutUserInput> | SaleCreateWithoutUserInput[] | SaleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutUserInput | SaleCreateOrConnectWithoutUserInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutUserInput | SaleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SaleCreateManyUserInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutUserInput | SaleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutUserInput | SaleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type ExpenseUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ExpenseCreateWithoutUserInput, ExpenseUncheckedCreateWithoutUserInput> | ExpenseCreateWithoutUserInput[] | ExpenseUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutUserInput | ExpenseCreateOrConnectWithoutUserInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutUserInput | ExpenseUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ExpenseCreateManyUserInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutUserInput | ExpenseUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutUserInput | ExpenseUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type SaleCreateNestedManyWithoutClientInput = {
    create?: XOR<SaleCreateWithoutClientInput, SaleUncheckedCreateWithoutClientInput> | SaleCreateWithoutClientInput[] | SaleUncheckedCreateWithoutClientInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutClientInput | SaleCreateOrConnectWithoutClientInput[]
    createMany?: SaleCreateManyClientInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type ClientDebtCreateNestedManyWithoutClientInput = {
    create?: XOR<ClientDebtCreateWithoutClientInput, ClientDebtUncheckedCreateWithoutClientInput> | ClientDebtCreateWithoutClientInput[] | ClientDebtUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ClientDebtCreateOrConnectWithoutClientInput | ClientDebtCreateOrConnectWithoutClientInput[]
    createMany?: ClientDebtCreateManyClientInputEnvelope
    connect?: ClientDebtWhereUniqueInput | ClientDebtWhereUniqueInput[]
  }

  export type SaleUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<SaleCreateWithoutClientInput, SaleUncheckedCreateWithoutClientInput> | SaleCreateWithoutClientInput[] | SaleUncheckedCreateWithoutClientInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutClientInput | SaleCreateOrConnectWithoutClientInput[]
    createMany?: SaleCreateManyClientInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type ClientDebtUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<ClientDebtCreateWithoutClientInput, ClientDebtUncheckedCreateWithoutClientInput> | ClientDebtCreateWithoutClientInput[] | ClientDebtUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ClientDebtCreateOrConnectWithoutClientInput | ClientDebtCreateOrConnectWithoutClientInput[]
    createMany?: ClientDebtCreateManyClientInputEnvelope
    connect?: ClientDebtWhereUniqueInput | ClientDebtWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type SaleUpdateManyWithoutClientNestedInput = {
    create?: XOR<SaleCreateWithoutClientInput, SaleUncheckedCreateWithoutClientInput> | SaleCreateWithoutClientInput[] | SaleUncheckedCreateWithoutClientInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutClientInput | SaleCreateOrConnectWithoutClientInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutClientInput | SaleUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: SaleCreateManyClientInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutClientInput | SaleUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutClientInput | SaleUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type ClientDebtUpdateManyWithoutClientNestedInput = {
    create?: XOR<ClientDebtCreateWithoutClientInput, ClientDebtUncheckedCreateWithoutClientInput> | ClientDebtCreateWithoutClientInput[] | ClientDebtUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ClientDebtCreateOrConnectWithoutClientInput | ClientDebtCreateOrConnectWithoutClientInput[]
    upsert?: ClientDebtUpsertWithWhereUniqueWithoutClientInput | ClientDebtUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: ClientDebtCreateManyClientInputEnvelope
    set?: ClientDebtWhereUniqueInput | ClientDebtWhereUniqueInput[]
    disconnect?: ClientDebtWhereUniqueInput | ClientDebtWhereUniqueInput[]
    delete?: ClientDebtWhereUniqueInput | ClientDebtWhereUniqueInput[]
    connect?: ClientDebtWhereUniqueInput | ClientDebtWhereUniqueInput[]
    update?: ClientDebtUpdateWithWhereUniqueWithoutClientInput | ClientDebtUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: ClientDebtUpdateManyWithWhereWithoutClientInput | ClientDebtUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: ClientDebtScalarWhereInput | ClientDebtScalarWhereInput[]
  }

  export type SaleUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<SaleCreateWithoutClientInput, SaleUncheckedCreateWithoutClientInput> | SaleCreateWithoutClientInput[] | SaleUncheckedCreateWithoutClientInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutClientInput | SaleCreateOrConnectWithoutClientInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutClientInput | SaleUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: SaleCreateManyClientInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutClientInput | SaleUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutClientInput | SaleUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type ClientDebtUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<ClientDebtCreateWithoutClientInput, ClientDebtUncheckedCreateWithoutClientInput> | ClientDebtCreateWithoutClientInput[] | ClientDebtUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ClientDebtCreateOrConnectWithoutClientInput | ClientDebtCreateOrConnectWithoutClientInput[]
    upsert?: ClientDebtUpsertWithWhereUniqueWithoutClientInput | ClientDebtUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: ClientDebtCreateManyClientInputEnvelope
    set?: ClientDebtWhereUniqueInput | ClientDebtWhereUniqueInput[]
    disconnect?: ClientDebtWhereUniqueInput | ClientDebtWhereUniqueInput[]
    delete?: ClientDebtWhereUniqueInput | ClientDebtWhereUniqueInput[]
    connect?: ClientDebtWhereUniqueInput | ClientDebtWhereUniqueInput[]
    update?: ClientDebtUpdateWithWhereUniqueWithoutClientInput | ClientDebtUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: ClientDebtUpdateManyWithWhereWithoutClientInput | ClientDebtUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: ClientDebtScalarWhereInput | ClientDebtScalarWhereInput[]
  }

  export type SaleItemCreateNestedManyWithoutProductInput = {
    create?: XOR<SaleItemCreateWithoutProductInput, SaleItemUncheckedCreateWithoutProductInput> | SaleItemCreateWithoutProductInput[] | SaleItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SaleItemCreateOrConnectWithoutProductInput | SaleItemCreateOrConnectWithoutProductInput[]
    createMany?: SaleItemCreateManyProductInputEnvelope
    connect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
  }

  export type SaleItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<SaleItemCreateWithoutProductInput, SaleItemUncheckedCreateWithoutProductInput> | SaleItemCreateWithoutProductInput[] | SaleItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SaleItemCreateOrConnectWithoutProductInput | SaleItemCreateOrConnectWithoutProductInput[]
    createMany?: SaleItemCreateManyProductInputEnvelope
    connect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SaleItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<SaleItemCreateWithoutProductInput, SaleItemUncheckedCreateWithoutProductInput> | SaleItemCreateWithoutProductInput[] | SaleItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SaleItemCreateOrConnectWithoutProductInput | SaleItemCreateOrConnectWithoutProductInput[]
    upsert?: SaleItemUpsertWithWhereUniqueWithoutProductInput | SaleItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: SaleItemCreateManyProductInputEnvelope
    set?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    disconnect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    delete?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    connect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    update?: SaleItemUpdateWithWhereUniqueWithoutProductInput | SaleItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: SaleItemUpdateManyWithWhereWithoutProductInput | SaleItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: SaleItemScalarWhereInput | SaleItemScalarWhereInput[]
  }

  export type SaleItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<SaleItemCreateWithoutProductInput, SaleItemUncheckedCreateWithoutProductInput> | SaleItemCreateWithoutProductInput[] | SaleItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SaleItemCreateOrConnectWithoutProductInput | SaleItemCreateOrConnectWithoutProductInput[]
    upsert?: SaleItemUpsertWithWhereUniqueWithoutProductInput | SaleItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: SaleItemCreateManyProductInputEnvelope
    set?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    disconnect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    delete?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    connect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    update?: SaleItemUpdateWithWhereUniqueWithoutProductInput | SaleItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: SaleItemUpdateManyWithWhereWithoutProductInput | SaleItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: SaleItemScalarWhereInput | SaleItemScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSalesInput = {
    create?: XOR<UserCreateWithoutSalesInput, UserUncheckedCreateWithoutSalesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSalesInput
    connect?: UserWhereUniqueInput
  }

  export type ClientCreateNestedOneWithoutSalesInput = {
    create?: XOR<ClientCreateWithoutSalesInput, ClientUncheckedCreateWithoutSalesInput>
    connectOrCreate?: ClientCreateOrConnectWithoutSalesInput
    connect?: ClientWhereUniqueInput
  }

  export type SaleItemCreateNestedManyWithoutSaleInput = {
    create?: XOR<SaleItemCreateWithoutSaleInput, SaleItemUncheckedCreateWithoutSaleInput> | SaleItemCreateWithoutSaleInput[] | SaleItemUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: SaleItemCreateOrConnectWithoutSaleInput | SaleItemCreateOrConnectWithoutSaleInput[]
    createMany?: SaleItemCreateManySaleInputEnvelope
    connect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
  }

  export type InvoiceCreateNestedOneWithoutSaleInput = {
    create?: XOR<InvoiceCreateWithoutSaleInput, InvoiceUncheckedCreateWithoutSaleInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutSaleInput
    connect?: InvoiceWhereUniqueInput
  }

  export type PaymentCreateNestedManyWithoutSaleInput = {
    create?: XOR<PaymentCreateWithoutSaleInput, PaymentUncheckedCreateWithoutSaleInput> | PaymentCreateWithoutSaleInput[] | PaymentUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutSaleInput | PaymentCreateOrConnectWithoutSaleInput[]
    createMany?: PaymentCreateManySaleInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type OrderCreateNestedOneWithoutSaleInput = {
    create?: XOR<OrderCreateWithoutSaleInput, OrderUncheckedCreateWithoutSaleInput>
    connectOrCreate?: OrderCreateOrConnectWithoutSaleInput
    connect?: OrderWhereUniqueInput
  }

  export type SaleItemUncheckedCreateNestedManyWithoutSaleInput = {
    create?: XOR<SaleItemCreateWithoutSaleInput, SaleItemUncheckedCreateWithoutSaleInput> | SaleItemCreateWithoutSaleInput[] | SaleItemUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: SaleItemCreateOrConnectWithoutSaleInput | SaleItemCreateOrConnectWithoutSaleInput[]
    createMany?: SaleItemCreateManySaleInputEnvelope
    connect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
  }

  export type InvoiceUncheckedCreateNestedOneWithoutSaleInput = {
    create?: XOR<InvoiceCreateWithoutSaleInput, InvoiceUncheckedCreateWithoutSaleInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutSaleInput
    connect?: InvoiceWhereUniqueInput
  }

  export type PaymentUncheckedCreateNestedManyWithoutSaleInput = {
    create?: XOR<PaymentCreateWithoutSaleInput, PaymentUncheckedCreateWithoutSaleInput> | PaymentCreateWithoutSaleInput[] | PaymentUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutSaleInput | PaymentCreateOrConnectWithoutSaleInput[]
    createMany?: PaymentCreateManySaleInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedOneWithoutSaleInput = {
    create?: XOR<OrderCreateWithoutSaleInput, OrderUncheckedCreateWithoutSaleInput>
    connectOrCreate?: OrderCreateOrConnectWithoutSaleInput
    connect?: OrderWhereUniqueInput
  }

  export type EnumMetodoPagoFieldUpdateOperationsInput = {
    set?: $Enums.MetodoPago
  }

  export type UserUpdateOneRequiredWithoutSalesNestedInput = {
    create?: XOR<UserCreateWithoutSalesInput, UserUncheckedCreateWithoutSalesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSalesInput
    upsert?: UserUpsertWithoutSalesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSalesInput, UserUpdateWithoutSalesInput>, UserUncheckedUpdateWithoutSalesInput>
  }

  export type ClientUpdateOneWithoutSalesNestedInput = {
    create?: XOR<ClientCreateWithoutSalesInput, ClientUncheckedCreateWithoutSalesInput>
    connectOrCreate?: ClientCreateOrConnectWithoutSalesInput
    upsert?: ClientUpsertWithoutSalesInput
    disconnect?: ClientWhereInput | boolean
    delete?: ClientWhereInput | boolean
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutSalesInput, ClientUpdateWithoutSalesInput>, ClientUncheckedUpdateWithoutSalesInput>
  }

  export type SaleItemUpdateManyWithoutSaleNestedInput = {
    create?: XOR<SaleItemCreateWithoutSaleInput, SaleItemUncheckedCreateWithoutSaleInput> | SaleItemCreateWithoutSaleInput[] | SaleItemUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: SaleItemCreateOrConnectWithoutSaleInput | SaleItemCreateOrConnectWithoutSaleInput[]
    upsert?: SaleItemUpsertWithWhereUniqueWithoutSaleInput | SaleItemUpsertWithWhereUniqueWithoutSaleInput[]
    createMany?: SaleItemCreateManySaleInputEnvelope
    set?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    disconnect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    delete?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    connect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    update?: SaleItemUpdateWithWhereUniqueWithoutSaleInput | SaleItemUpdateWithWhereUniqueWithoutSaleInput[]
    updateMany?: SaleItemUpdateManyWithWhereWithoutSaleInput | SaleItemUpdateManyWithWhereWithoutSaleInput[]
    deleteMany?: SaleItemScalarWhereInput | SaleItemScalarWhereInput[]
  }

  export type InvoiceUpdateOneWithoutSaleNestedInput = {
    create?: XOR<InvoiceCreateWithoutSaleInput, InvoiceUncheckedCreateWithoutSaleInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutSaleInput
    upsert?: InvoiceUpsertWithoutSaleInput
    disconnect?: InvoiceWhereInput | boolean
    delete?: InvoiceWhereInput | boolean
    connect?: InvoiceWhereUniqueInput
    update?: XOR<XOR<InvoiceUpdateToOneWithWhereWithoutSaleInput, InvoiceUpdateWithoutSaleInput>, InvoiceUncheckedUpdateWithoutSaleInput>
  }

  export type PaymentUpdateManyWithoutSaleNestedInput = {
    create?: XOR<PaymentCreateWithoutSaleInput, PaymentUncheckedCreateWithoutSaleInput> | PaymentCreateWithoutSaleInput[] | PaymentUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutSaleInput | PaymentCreateOrConnectWithoutSaleInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutSaleInput | PaymentUpsertWithWhereUniqueWithoutSaleInput[]
    createMany?: PaymentCreateManySaleInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutSaleInput | PaymentUpdateWithWhereUniqueWithoutSaleInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutSaleInput | PaymentUpdateManyWithWhereWithoutSaleInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type OrderUpdateOneWithoutSaleNestedInput = {
    create?: XOR<OrderCreateWithoutSaleInput, OrderUncheckedCreateWithoutSaleInput>
    connectOrCreate?: OrderCreateOrConnectWithoutSaleInput
    upsert?: OrderUpsertWithoutSaleInput
    disconnect?: OrderWhereInput | boolean
    delete?: OrderWhereInput | boolean
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutSaleInput, OrderUpdateWithoutSaleInput>, OrderUncheckedUpdateWithoutSaleInput>
  }

  export type SaleItemUncheckedUpdateManyWithoutSaleNestedInput = {
    create?: XOR<SaleItemCreateWithoutSaleInput, SaleItemUncheckedCreateWithoutSaleInput> | SaleItemCreateWithoutSaleInput[] | SaleItemUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: SaleItemCreateOrConnectWithoutSaleInput | SaleItemCreateOrConnectWithoutSaleInput[]
    upsert?: SaleItemUpsertWithWhereUniqueWithoutSaleInput | SaleItemUpsertWithWhereUniqueWithoutSaleInput[]
    createMany?: SaleItemCreateManySaleInputEnvelope
    set?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    disconnect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    delete?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    connect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    update?: SaleItemUpdateWithWhereUniqueWithoutSaleInput | SaleItemUpdateWithWhereUniqueWithoutSaleInput[]
    updateMany?: SaleItemUpdateManyWithWhereWithoutSaleInput | SaleItemUpdateManyWithWhereWithoutSaleInput[]
    deleteMany?: SaleItemScalarWhereInput | SaleItemScalarWhereInput[]
  }

  export type InvoiceUncheckedUpdateOneWithoutSaleNestedInput = {
    create?: XOR<InvoiceCreateWithoutSaleInput, InvoiceUncheckedCreateWithoutSaleInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutSaleInput
    upsert?: InvoiceUpsertWithoutSaleInput
    disconnect?: InvoiceWhereInput | boolean
    delete?: InvoiceWhereInput | boolean
    connect?: InvoiceWhereUniqueInput
    update?: XOR<XOR<InvoiceUpdateToOneWithWhereWithoutSaleInput, InvoiceUpdateWithoutSaleInput>, InvoiceUncheckedUpdateWithoutSaleInput>
  }

  export type PaymentUncheckedUpdateManyWithoutSaleNestedInput = {
    create?: XOR<PaymentCreateWithoutSaleInput, PaymentUncheckedCreateWithoutSaleInput> | PaymentCreateWithoutSaleInput[] | PaymentUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutSaleInput | PaymentCreateOrConnectWithoutSaleInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutSaleInput | PaymentUpsertWithWhereUniqueWithoutSaleInput[]
    createMany?: PaymentCreateManySaleInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutSaleInput | PaymentUpdateWithWhereUniqueWithoutSaleInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutSaleInput | PaymentUpdateManyWithWhereWithoutSaleInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type OrderUncheckedUpdateOneWithoutSaleNestedInput = {
    create?: XOR<OrderCreateWithoutSaleInput, OrderUncheckedCreateWithoutSaleInput>
    connectOrCreate?: OrderCreateOrConnectWithoutSaleInput
    upsert?: OrderUpsertWithoutSaleInput
    disconnect?: OrderWhereInput | boolean
    delete?: OrderWhereInput | boolean
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutSaleInput, OrderUpdateWithoutSaleInput>, OrderUncheckedUpdateWithoutSaleInput>
  }

  export type SaleCreateNestedOneWithoutItemsInput = {
    create?: XOR<SaleCreateWithoutItemsInput, SaleUncheckedCreateWithoutItemsInput>
    connectOrCreate?: SaleCreateOrConnectWithoutItemsInput
    connect?: SaleWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutSaleItemsInput = {
    create?: XOR<ProductCreateWithoutSaleItemsInput, ProductUncheckedCreateWithoutSaleItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutSaleItemsInput
    connect?: ProductWhereUniqueInput
  }

  export type SaleUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<SaleCreateWithoutItemsInput, SaleUncheckedCreateWithoutItemsInput>
    connectOrCreate?: SaleCreateOrConnectWithoutItemsInput
    upsert?: SaleUpsertWithoutItemsInput
    connect?: SaleWhereUniqueInput
    update?: XOR<XOR<SaleUpdateToOneWithWhereWithoutItemsInput, SaleUpdateWithoutItemsInput>, SaleUncheckedUpdateWithoutItemsInput>
  }

  export type ProductUpdateOneWithoutSaleItemsNestedInput = {
    create?: XOR<ProductCreateWithoutSaleItemsInput, ProductUncheckedCreateWithoutSaleItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutSaleItemsInput
    upsert?: ProductUpsertWithoutSaleItemsInput
    disconnect?: ProductWhereInput | boolean
    delete?: ProductWhereInput | boolean
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutSaleItemsInput, ProductUpdateWithoutSaleItemsInput>, ProductUncheckedUpdateWithoutSaleItemsInput>
  }

  export type SaleCreateNestedOneWithoutInvoiceInput = {
    create?: XOR<SaleCreateWithoutInvoiceInput, SaleUncheckedCreateWithoutInvoiceInput>
    connectOrCreate?: SaleCreateOrConnectWithoutInvoiceInput
    connect?: SaleWhereUniqueInput
  }

  export type EnumEstadoFacturaFieldUpdateOperationsInput = {
    set?: $Enums.EstadoFactura
  }

  export type SaleUpdateOneRequiredWithoutInvoiceNestedInput = {
    create?: XOR<SaleCreateWithoutInvoiceInput, SaleUncheckedCreateWithoutInvoiceInput>
    connectOrCreate?: SaleCreateOrConnectWithoutInvoiceInput
    upsert?: SaleUpsertWithoutInvoiceInput
    connect?: SaleWhereUniqueInput
    update?: XOR<XOR<SaleUpdateToOneWithWhereWithoutInvoiceInput, SaleUpdateWithoutInvoiceInput>, SaleUncheckedUpdateWithoutInvoiceInput>
  }

  export type SaleCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<SaleCreateWithoutPaymentsInput, SaleUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: SaleCreateOrConnectWithoutPaymentsInput
    connect?: SaleWhereUniqueInput
  }

  export type SaleUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<SaleCreateWithoutPaymentsInput, SaleUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: SaleCreateOrConnectWithoutPaymentsInput
    upsert?: SaleUpsertWithoutPaymentsInput
    connect?: SaleWhereUniqueInput
    update?: XOR<XOR<SaleUpdateToOneWithWhereWithoutPaymentsInput, SaleUpdateWithoutPaymentsInput>, SaleUncheckedUpdateWithoutPaymentsInput>
  }

  export type ClientCreateNestedOneWithoutDebtsInput = {
    create?: XOR<ClientCreateWithoutDebtsInput, ClientUncheckedCreateWithoutDebtsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutDebtsInput
    connect?: ClientWhereUniqueInput
  }

  export type EnumEstadoDeudaFieldUpdateOperationsInput = {
    set?: $Enums.EstadoDeuda
  }

  export type ClientUpdateOneRequiredWithoutDebtsNestedInput = {
    create?: XOR<ClientCreateWithoutDebtsInput, ClientUncheckedCreateWithoutDebtsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutDebtsInput
    upsert?: ClientUpsertWithoutDebtsInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutDebtsInput, ClientUpdateWithoutDebtsInput>, ClientUncheckedUpdateWithoutDebtsInput>
  }

  export type UserCreateNestedOneWithoutExpensesInput = {
    create?: XOR<UserCreateWithoutExpensesInput, UserUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: UserCreateOrConnectWithoutExpensesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutExpensesNestedInput = {
    create?: XOR<UserCreateWithoutExpensesInput, UserUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: UserCreateOrConnectWithoutExpensesInput
    upsert?: UserUpsertWithoutExpensesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutExpensesInput, UserUpdateWithoutExpensesInput>, UserUncheckedUpdateWithoutExpensesInput>
  }

  export type SaleCreateNestedOneWithoutOrderInput = {
    create?: XOR<SaleCreateWithoutOrderInput, SaleUncheckedCreateWithoutOrderInput>
    connectOrCreate?: SaleCreateOrConnectWithoutOrderInput
    connect?: SaleWhereUniqueInput
  }

  export type EnumEstadoPedidoFieldUpdateOperationsInput = {
    set?: $Enums.EstadoPedido
  }

  export type SaleUpdateOneRequiredWithoutOrderNestedInput = {
    create?: XOR<SaleCreateWithoutOrderInput, SaleUncheckedCreateWithoutOrderInput>
    connectOrCreate?: SaleCreateOrConnectWithoutOrderInput
    upsert?: SaleUpsertWithoutOrderInput
    connect?: SaleWhereUniqueInput
    update?: XOR<XOR<SaleUpdateToOneWithWhereWithoutOrderInput, SaleUpdateWithoutOrderInput>, SaleUncheckedUpdateWithoutOrderInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumMetodoPagoFilter<$PrismaModel = never> = {
    equals?: $Enums.MetodoPago | EnumMetodoPagoFieldRefInput<$PrismaModel>
    in?: $Enums.MetodoPago[] | ListEnumMetodoPagoFieldRefInput<$PrismaModel>
    notIn?: $Enums.MetodoPago[] | ListEnumMetodoPagoFieldRefInput<$PrismaModel>
    not?: NestedEnumMetodoPagoFilter<$PrismaModel> | $Enums.MetodoPago
  }

  export type NestedEnumMetodoPagoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MetodoPago | EnumMetodoPagoFieldRefInput<$PrismaModel>
    in?: $Enums.MetodoPago[] | ListEnumMetodoPagoFieldRefInput<$PrismaModel>
    notIn?: $Enums.MetodoPago[] | ListEnumMetodoPagoFieldRefInput<$PrismaModel>
    not?: NestedEnumMetodoPagoWithAggregatesFilter<$PrismaModel> | $Enums.MetodoPago
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMetodoPagoFilter<$PrismaModel>
    _max?: NestedEnumMetodoPagoFilter<$PrismaModel>
  }

  export type NestedEnumEstadoFacturaFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoFactura | EnumEstadoFacturaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoFactura[] | ListEnumEstadoFacturaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoFactura[] | ListEnumEstadoFacturaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoFacturaFilter<$PrismaModel> | $Enums.EstadoFactura
  }

  export type NestedEnumEstadoFacturaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoFactura | EnumEstadoFacturaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoFactura[] | ListEnumEstadoFacturaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoFactura[] | ListEnumEstadoFacturaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoFacturaWithAggregatesFilter<$PrismaModel> | $Enums.EstadoFactura
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoFacturaFilter<$PrismaModel>
    _max?: NestedEnumEstadoFacturaFilter<$PrismaModel>
  }

  export type NestedEnumEstadoDeudaFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoDeuda | EnumEstadoDeudaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoDeuda[] | ListEnumEstadoDeudaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoDeuda[] | ListEnumEstadoDeudaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoDeudaFilter<$PrismaModel> | $Enums.EstadoDeuda
  }

  export type NestedEnumEstadoDeudaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoDeuda | EnumEstadoDeudaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoDeuda[] | ListEnumEstadoDeudaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoDeuda[] | ListEnumEstadoDeudaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoDeudaWithAggregatesFilter<$PrismaModel> | $Enums.EstadoDeuda
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoDeudaFilter<$PrismaModel>
    _max?: NestedEnumEstadoDeudaFilter<$PrismaModel>
  }

  export type NestedEnumEstadoPedidoFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPedido | EnumEstadoPedidoFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPedido[] | ListEnumEstadoPedidoFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPedido[] | ListEnumEstadoPedidoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPedidoFilter<$PrismaModel> | $Enums.EstadoPedido
  }

  export type NestedEnumEstadoPedidoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPedido | EnumEstadoPedidoFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPedido[] | ListEnumEstadoPedidoFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPedido[] | ListEnumEstadoPedidoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPedidoWithAggregatesFilter<$PrismaModel> | $Enums.EstadoPedido
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoPedidoFilter<$PrismaModel>
    _max?: NestedEnumEstadoPedidoFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SaleCreateWithoutUserInput = {
    id?: string
    fecha?: Date | string
    subtotal: Decimal | DecimalJsLike | number | string
    impuestos?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: $Enums.MetodoPago
    createdAt?: Date | string
    client?: ClientCreateNestedOneWithoutSalesInput
    items?: SaleItemCreateNestedManyWithoutSaleInput
    invoice?: InvoiceCreateNestedOneWithoutSaleInput
    payments?: PaymentCreateNestedManyWithoutSaleInput
    order?: OrderCreateNestedOneWithoutSaleInput
  }

  export type SaleUncheckedCreateWithoutUserInput = {
    id?: string
    fecha?: Date | string
    subtotal: Decimal | DecimalJsLike | number | string
    impuestos?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: $Enums.MetodoPago
    clientId?: string | null
    createdAt?: Date | string
    items?: SaleItemUncheckedCreateNestedManyWithoutSaleInput
    invoice?: InvoiceUncheckedCreateNestedOneWithoutSaleInput
    payments?: PaymentUncheckedCreateNestedManyWithoutSaleInput
    order?: OrderUncheckedCreateNestedOneWithoutSaleInput
  }

  export type SaleCreateOrConnectWithoutUserInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutUserInput, SaleUncheckedCreateWithoutUserInput>
  }

  export type SaleCreateManyUserInputEnvelope = {
    data: SaleCreateManyUserInput | SaleCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ExpenseCreateWithoutUserInput = {
    id?: string
    fecha?: Date | string
    categoria: string
    descripcion: string
    monto: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type ExpenseUncheckedCreateWithoutUserInput = {
    id?: string
    fecha?: Date | string
    categoria: string
    descripcion: string
    monto: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type ExpenseCreateOrConnectWithoutUserInput = {
    where: ExpenseWhereUniqueInput
    create: XOR<ExpenseCreateWithoutUserInput, ExpenseUncheckedCreateWithoutUserInput>
  }

  export type ExpenseCreateManyUserInputEnvelope = {
    data: ExpenseCreateManyUserInput | ExpenseCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutUserInput = {
    id?: string
    entity: string
    entityId: string
    action: string
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: string
    entity: string
    entityId: string
    action: string
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SaleUpsertWithWhereUniqueWithoutUserInput = {
    where: SaleWhereUniqueInput
    update: XOR<SaleUpdateWithoutUserInput, SaleUncheckedUpdateWithoutUserInput>
    create: XOR<SaleCreateWithoutUserInput, SaleUncheckedCreateWithoutUserInput>
  }

  export type SaleUpdateWithWhereUniqueWithoutUserInput = {
    where: SaleWhereUniqueInput
    data: XOR<SaleUpdateWithoutUserInput, SaleUncheckedUpdateWithoutUserInput>
  }

  export type SaleUpdateManyWithWhereWithoutUserInput = {
    where: SaleScalarWhereInput
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyWithoutUserInput>
  }

  export type SaleScalarWhereInput = {
    AND?: SaleScalarWhereInput | SaleScalarWhereInput[]
    OR?: SaleScalarWhereInput[]
    NOT?: SaleScalarWhereInput | SaleScalarWhereInput[]
    id?: StringFilter<"Sale"> | string
    fecha?: DateTimeFilter<"Sale"> | Date | string
    subtotal?: DecimalFilter<"Sale"> | Decimal | DecimalJsLike | number | string
    impuestos?: DecimalFilter<"Sale"> | Decimal | DecimalJsLike | number | string
    total?: DecimalFilter<"Sale"> | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFilter<"Sale"> | $Enums.MetodoPago
    userId?: StringFilter<"Sale"> | string
    clientId?: StringNullableFilter<"Sale"> | string | null
    createdAt?: DateTimeFilter<"Sale"> | Date | string
  }

  export type ExpenseUpsertWithWhereUniqueWithoutUserInput = {
    where: ExpenseWhereUniqueInput
    update: XOR<ExpenseUpdateWithoutUserInput, ExpenseUncheckedUpdateWithoutUserInput>
    create: XOR<ExpenseCreateWithoutUserInput, ExpenseUncheckedCreateWithoutUserInput>
  }

  export type ExpenseUpdateWithWhereUniqueWithoutUserInput = {
    where: ExpenseWhereUniqueInput
    data: XOR<ExpenseUpdateWithoutUserInput, ExpenseUncheckedUpdateWithoutUserInput>
  }

  export type ExpenseUpdateManyWithWhereWithoutUserInput = {
    where: ExpenseScalarWhereInput
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyWithoutUserInput>
  }

  export type ExpenseScalarWhereInput = {
    AND?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
    OR?: ExpenseScalarWhereInput[]
    NOT?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
    id?: StringFilter<"Expense"> | string
    fecha?: DateTimeFilter<"Expense"> | Date | string
    categoria?: StringFilter<"Expense"> | string
    descripcion?: StringFilter<"Expense"> | string
    monto?: DecimalFilter<"Expense"> | Decimal | DecimalJsLike | number | string
    userId?: StringFilter<"Expense"> | string
    createdAt?: DateTimeFilter<"Expense"> | Date | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    changes?: JsonNullableFilter<"AuditLog">
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type SaleCreateWithoutClientInput = {
    id?: string
    fecha?: Date | string
    subtotal: Decimal | DecimalJsLike | number | string
    impuestos?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: $Enums.MetodoPago
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSalesInput
    items?: SaleItemCreateNestedManyWithoutSaleInput
    invoice?: InvoiceCreateNestedOneWithoutSaleInput
    payments?: PaymentCreateNestedManyWithoutSaleInput
    order?: OrderCreateNestedOneWithoutSaleInput
  }

  export type SaleUncheckedCreateWithoutClientInput = {
    id?: string
    fecha?: Date | string
    subtotal: Decimal | DecimalJsLike | number | string
    impuestos?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: $Enums.MetodoPago
    userId: string
    createdAt?: Date | string
    items?: SaleItemUncheckedCreateNestedManyWithoutSaleInput
    invoice?: InvoiceUncheckedCreateNestedOneWithoutSaleInput
    payments?: PaymentUncheckedCreateNestedManyWithoutSaleInput
    order?: OrderUncheckedCreateNestedOneWithoutSaleInput
  }

  export type SaleCreateOrConnectWithoutClientInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutClientInput, SaleUncheckedCreateWithoutClientInput>
  }

  export type SaleCreateManyClientInputEnvelope = {
    data: SaleCreateManyClientInput | SaleCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type ClientDebtCreateWithoutClientInput = {
    id?: string
    saleId?: string | null
    amountTotal: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    dueDate?: Date | string | null
    status?: $Enums.EstadoDeuda
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientDebtUncheckedCreateWithoutClientInput = {
    id?: string
    saleId?: string | null
    amountTotal: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    dueDate?: Date | string | null
    status?: $Enums.EstadoDeuda
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientDebtCreateOrConnectWithoutClientInput = {
    where: ClientDebtWhereUniqueInput
    create: XOR<ClientDebtCreateWithoutClientInput, ClientDebtUncheckedCreateWithoutClientInput>
  }

  export type ClientDebtCreateManyClientInputEnvelope = {
    data: ClientDebtCreateManyClientInput | ClientDebtCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type SaleUpsertWithWhereUniqueWithoutClientInput = {
    where: SaleWhereUniqueInput
    update: XOR<SaleUpdateWithoutClientInput, SaleUncheckedUpdateWithoutClientInput>
    create: XOR<SaleCreateWithoutClientInput, SaleUncheckedCreateWithoutClientInput>
  }

  export type SaleUpdateWithWhereUniqueWithoutClientInput = {
    where: SaleWhereUniqueInput
    data: XOR<SaleUpdateWithoutClientInput, SaleUncheckedUpdateWithoutClientInput>
  }

  export type SaleUpdateManyWithWhereWithoutClientInput = {
    where: SaleScalarWhereInput
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyWithoutClientInput>
  }

  export type ClientDebtUpsertWithWhereUniqueWithoutClientInput = {
    where: ClientDebtWhereUniqueInput
    update: XOR<ClientDebtUpdateWithoutClientInput, ClientDebtUncheckedUpdateWithoutClientInput>
    create: XOR<ClientDebtCreateWithoutClientInput, ClientDebtUncheckedCreateWithoutClientInput>
  }

  export type ClientDebtUpdateWithWhereUniqueWithoutClientInput = {
    where: ClientDebtWhereUniqueInput
    data: XOR<ClientDebtUpdateWithoutClientInput, ClientDebtUncheckedUpdateWithoutClientInput>
  }

  export type ClientDebtUpdateManyWithWhereWithoutClientInput = {
    where: ClientDebtScalarWhereInput
    data: XOR<ClientDebtUpdateManyMutationInput, ClientDebtUncheckedUpdateManyWithoutClientInput>
  }

  export type ClientDebtScalarWhereInput = {
    AND?: ClientDebtScalarWhereInput | ClientDebtScalarWhereInput[]
    OR?: ClientDebtScalarWhereInput[]
    NOT?: ClientDebtScalarWhereInput | ClientDebtScalarWhereInput[]
    id?: StringFilter<"ClientDebt"> | string
    clientId?: StringFilter<"ClientDebt"> | string
    saleId?: StringNullableFilter<"ClientDebt"> | string | null
    amountTotal?: DecimalFilter<"ClientDebt"> | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFilter<"ClientDebt"> | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeNullableFilter<"ClientDebt"> | Date | string | null
    status?: EnumEstadoDeudaFilter<"ClientDebt"> | $Enums.EstadoDeuda
    createdAt?: DateTimeFilter<"ClientDebt"> | Date | string
    updatedAt?: DateTimeFilter<"ClientDebt"> | Date | string
  }

  export type SaleItemCreateWithoutProductInput = {
    id?: string
    descripcion: string
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    costoUnitario?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    sale: SaleCreateNestedOneWithoutItemsInput
  }

  export type SaleItemUncheckedCreateWithoutProductInput = {
    id?: string
    saleId: string
    descripcion: string
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    costoUnitario?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
  }

  export type SaleItemCreateOrConnectWithoutProductInput = {
    where: SaleItemWhereUniqueInput
    create: XOR<SaleItemCreateWithoutProductInput, SaleItemUncheckedCreateWithoutProductInput>
  }

  export type SaleItemCreateManyProductInputEnvelope = {
    data: SaleItemCreateManyProductInput | SaleItemCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type SaleItemUpsertWithWhereUniqueWithoutProductInput = {
    where: SaleItemWhereUniqueInput
    update: XOR<SaleItemUpdateWithoutProductInput, SaleItemUncheckedUpdateWithoutProductInput>
    create: XOR<SaleItemCreateWithoutProductInput, SaleItemUncheckedCreateWithoutProductInput>
  }

  export type SaleItemUpdateWithWhereUniqueWithoutProductInput = {
    where: SaleItemWhereUniqueInput
    data: XOR<SaleItemUpdateWithoutProductInput, SaleItemUncheckedUpdateWithoutProductInput>
  }

  export type SaleItemUpdateManyWithWhereWithoutProductInput = {
    where: SaleItemScalarWhereInput
    data: XOR<SaleItemUpdateManyMutationInput, SaleItemUncheckedUpdateManyWithoutProductInput>
  }

  export type SaleItemScalarWhereInput = {
    AND?: SaleItemScalarWhereInput | SaleItemScalarWhereInput[]
    OR?: SaleItemScalarWhereInput[]
    NOT?: SaleItemScalarWhereInput | SaleItemScalarWhereInput[]
    id?: StringFilter<"SaleItem"> | string
    saleId?: StringFilter<"SaleItem"> | string
    productId?: StringNullableFilter<"SaleItem"> | string | null
    descripcion?: StringFilter<"SaleItem"> | string
    cantidad?: IntFilter<"SaleItem"> | number
    precioUnitario?: DecimalFilter<"SaleItem"> | Decimal | DecimalJsLike | number | string
    costoUnitario?: DecimalFilter<"SaleItem"> | Decimal | DecimalJsLike | number | string
    total?: DecimalFilter<"SaleItem"> | Decimal | DecimalJsLike | number | string
  }

  export type UserCreateWithoutSalesInput = {
    id?: string
    nombre: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    expenses?: ExpenseCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSalesInput = {
    id?: string
    nombre: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    expenses?: ExpenseUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSalesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSalesInput, UserUncheckedCreateWithoutSalesInput>
  }

  export type ClientCreateWithoutSalesInput = {
    id?: string
    nombre: string
    telefono: string
    email?: string | null
    direccion?: string | null
    notas?: string | null
    lastReminderSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    debts?: ClientDebtCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutSalesInput = {
    id?: string
    nombre: string
    telefono: string
    email?: string | null
    direccion?: string | null
    notas?: string | null
    lastReminderSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    debts?: ClientDebtUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutSalesInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutSalesInput, ClientUncheckedCreateWithoutSalesInput>
  }

  export type SaleItemCreateWithoutSaleInput = {
    id?: string
    descripcion: string
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    costoUnitario?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    product?: ProductCreateNestedOneWithoutSaleItemsInput
  }

  export type SaleItemUncheckedCreateWithoutSaleInput = {
    id?: string
    productId?: string | null
    descripcion: string
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    costoUnitario?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
  }

  export type SaleItemCreateOrConnectWithoutSaleInput = {
    where: SaleItemWhereUniqueInput
    create: XOR<SaleItemCreateWithoutSaleInput, SaleItemUncheckedCreateWithoutSaleInput>
  }

  export type SaleItemCreateManySaleInputEnvelope = {
    data: SaleItemCreateManySaleInput | SaleItemCreateManySaleInput[]
    skipDuplicates?: boolean
  }

  export type InvoiceCreateWithoutSaleInput = {
    id?: string
    numero: string
    estado?: $Enums.EstadoFactura
    pdfUrl?: string | null
    pngUrl?: string | null
    sentWhatsappAt?: Date | string | null
    ultimoError?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceUncheckedCreateWithoutSaleInput = {
    id?: string
    numero: string
    estado?: $Enums.EstadoFactura
    pdfUrl?: string | null
    pngUrl?: string | null
    sentWhatsappAt?: Date | string | null
    ultimoError?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceCreateOrConnectWithoutSaleInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutSaleInput, InvoiceUncheckedCreateWithoutSaleInput>
  }

  export type PaymentCreateWithoutSaleInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    fecha?: Date | string
    metodo: $Enums.MetodoPago
    createdAt?: Date | string
  }

  export type PaymentUncheckedCreateWithoutSaleInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    fecha?: Date | string
    metodo: $Enums.MetodoPago
    createdAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutSaleInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutSaleInput, PaymentUncheckedCreateWithoutSaleInput>
  }

  export type PaymentCreateManySaleInputEnvelope = {
    data: PaymentCreateManySaleInput | PaymentCreateManySaleInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutSaleInput = {
    id?: string
    estado?: $Enums.EstadoPedido
    fechaEntrega?: Date | string | null
    notas?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUncheckedCreateWithoutSaleInput = {
    id?: string
    estado?: $Enums.EstadoPedido
    fechaEntrega?: Date | string | null
    notas?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateOrConnectWithoutSaleInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutSaleInput, OrderUncheckedCreateWithoutSaleInput>
  }

  export type UserUpsertWithoutSalesInput = {
    update: XOR<UserUpdateWithoutSalesInput, UserUncheckedUpdateWithoutSalesInput>
    create: XOR<UserCreateWithoutSalesInput, UserUncheckedCreateWithoutSalesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSalesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSalesInput, UserUncheckedUpdateWithoutSalesInput>
  }

  export type UserUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expenses?: ExpenseUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expenses?: ExpenseUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ClientUpsertWithoutSalesInput = {
    update: XOR<ClientUpdateWithoutSalesInput, ClientUncheckedUpdateWithoutSalesInput>
    create: XOR<ClientCreateWithoutSalesInput, ClientUncheckedCreateWithoutSalesInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutSalesInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutSalesInput, ClientUncheckedUpdateWithoutSalesInput>
  }

  export type ClientUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    telefono?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    lastReminderSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    debts?: ClientDebtUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    telefono?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    lastReminderSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    debts?: ClientDebtUncheckedUpdateManyWithoutClientNestedInput
  }

  export type SaleItemUpsertWithWhereUniqueWithoutSaleInput = {
    where: SaleItemWhereUniqueInput
    update: XOR<SaleItemUpdateWithoutSaleInput, SaleItemUncheckedUpdateWithoutSaleInput>
    create: XOR<SaleItemCreateWithoutSaleInput, SaleItemUncheckedCreateWithoutSaleInput>
  }

  export type SaleItemUpdateWithWhereUniqueWithoutSaleInput = {
    where: SaleItemWhereUniqueInput
    data: XOR<SaleItemUpdateWithoutSaleInput, SaleItemUncheckedUpdateWithoutSaleInput>
  }

  export type SaleItemUpdateManyWithWhereWithoutSaleInput = {
    where: SaleItemScalarWhereInput
    data: XOR<SaleItemUpdateManyMutationInput, SaleItemUncheckedUpdateManyWithoutSaleInput>
  }

  export type InvoiceUpsertWithoutSaleInput = {
    update: XOR<InvoiceUpdateWithoutSaleInput, InvoiceUncheckedUpdateWithoutSaleInput>
    create: XOR<InvoiceCreateWithoutSaleInput, InvoiceUncheckedCreateWithoutSaleInput>
    where?: InvoiceWhereInput
  }

  export type InvoiceUpdateToOneWithWhereWithoutSaleInput = {
    where?: InvoiceWhereInput
    data: XOR<InvoiceUpdateWithoutSaleInput, InvoiceUncheckedUpdateWithoutSaleInput>
  }

  export type InvoiceUpdateWithoutSaleInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoFacturaFieldUpdateOperationsInput | $Enums.EstadoFactura
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pngUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sentWhatsappAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ultimoError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceUncheckedUpdateWithoutSaleInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoFacturaFieldUpdateOperationsInput | $Enums.EstadoFactura
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pngUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sentWhatsappAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ultimoError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpsertWithWhereUniqueWithoutSaleInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutSaleInput, PaymentUncheckedUpdateWithoutSaleInput>
    create: XOR<PaymentCreateWithoutSaleInput, PaymentUncheckedCreateWithoutSaleInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutSaleInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutSaleInput, PaymentUncheckedUpdateWithoutSaleInput>
  }

  export type PaymentUpdateManyWithWhereWithoutSaleInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutSaleInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: StringFilter<"Payment"> | string
    saleId?: StringFilter<"Payment"> | string
    amount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    fecha?: DateTimeFilter<"Payment"> | Date | string
    metodo?: EnumMetodoPagoFilter<"Payment"> | $Enums.MetodoPago
    createdAt?: DateTimeFilter<"Payment"> | Date | string
  }

  export type OrderUpsertWithoutSaleInput = {
    update: XOR<OrderUpdateWithoutSaleInput, OrderUncheckedUpdateWithoutSaleInput>
    create: XOR<OrderCreateWithoutSaleInput, OrderUncheckedCreateWithoutSaleInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutSaleInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutSaleInput, OrderUncheckedUpdateWithoutSaleInput>
  }

  export type OrderUpdateWithoutSaleInput = {
    id?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    fechaEntrega?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateWithoutSaleInput = {
    id?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    fechaEntrega?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleCreateWithoutItemsInput = {
    id?: string
    fecha?: Date | string
    subtotal: Decimal | DecimalJsLike | number | string
    impuestos?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: $Enums.MetodoPago
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSalesInput
    client?: ClientCreateNestedOneWithoutSalesInput
    invoice?: InvoiceCreateNestedOneWithoutSaleInput
    payments?: PaymentCreateNestedManyWithoutSaleInput
    order?: OrderCreateNestedOneWithoutSaleInput
  }

  export type SaleUncheckedCreateWithoutItemsInput = {
    id?: string
    fecha?: Date | string
    subtotal: Decimal | DecimalJsLike | number | string
    impuestos?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: $Enums.MetodoPago
    userId: string
    clientId?: string | null
    createdAt?: Date | string
    invoice?: InvoiceUncheckedCreateNestedOneWithoutSaleInput
    payments?: PaymentUncheckedCreateNestedManyWithoutSaleInput
    order?: OrderUncheckedCreateNestedOneWithoutSaleInput
  }

  export type SaleCreateOrConnectWithoutItemsInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutItemsInput, SaleUncheckedCreateWithoutItemsInput>
  }

  export type ProductCreateWithoutSaleItemsInput = {
    id?: string
    sku: string
    nombre: string
    precioUnitario: Decimal | DecimalJsLike | number | string
    costoUnitario?: Decimal | DecimalJsLike | number | string
    stock?: number
    imageUrl?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUncheckedCreateWithoutSaleItemsInput = {
    id?: string
    sku: string
    nombre: string
    precioUnitario: Decimal | DecimalJsLike | number | string
    costoUnitario?: Decimal | DecimalJsLike | number | string
    stock?: number
    imageUrl?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductCreateOrConnectWithoutSaleItemsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutSaleItemsInput, ProductUncheckedCreateWithoutSaleItemsInput>
  }

  export type SaleUpsertWithoutItemsInput = {
    update: XOR<SaleUpdateWithoutItemsInput, SaleUncheckedUpdateWithoutItemsInput>
    create: XOR<SaleCreateWithoutItemsInput, SaleUncheckedCreateWithoutItemsInput>
    where?: SaleWhereInput
  }

  export type SaleUpdateToOneWithWhereWithoutItemsInput = {
    where?: SaleWhereInput
    data: XOR<SaleUpdateWithoutItemsInput, SaleUncheckedUpdateWithoutItemsInput>
  }

  export type SaleUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    impuestos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSalesNestedInput
    client?: ClientUpdateOneWithoutSalesNestedInput
    invoice?: InvoiceUpdateOneWithoutSaleNestedInput
    payments?: PaymentUpdateManyWithoutSaleNestedInput
    order?: OrderUpdateOneWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    impuestos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    userId?: StringFieldUpdateOperationsInput | string
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoice?: InvoiceUncheckedUpdateOneWithoutSaleNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutSaleNestedInput
    order?: OrderUncheckedUpdateOneWithoutSaleNestedInput
  }

  export type ProductUpsertWithoutSaleItemsInput = {
    update: XOR<ProductUpdateWithoutSaleItemsInput, ProductUncheckedUpdateWithoutSaleItemsInput>
    create: XOR<ProductCreateWithoutSaleItemsInput, ProductUncheckedCreateWithoutSaleItemsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutSaleItemsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutSaleItemsInput, ProductUncheckedUpdateWithoutSaleItemsInput>
  }

  export type ProductUpdateWithoutSaleItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateWithoutSaleItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleCreateWithoutInvoiceInput = {
    id?: string
    fecha?: Date | string
    subtotal: Decimal | DecimalJsLike | number | string
    impuestos?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: $Enums.MetodoPago
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSalesInput
    client?: ClientCreateNestedOneWithoutSalesInput
    items?: SaleItemCreateNestedManyWithoutSaleInput
    payments?: PaymentCreateNestedManyWithoutSaleInput
    order?: OrderCreateNestedOneWithoutSaleInput
  }

  export type SaleUncheckedCreateWithoutInvoiceInput = {
    id?: string
    fecha?: Date | string
    subtotal: Decimal | DecimalJsLike | number | string
    impuestos?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: $Enums.MetodoPago
    userId: string
    clientId?: string | null
    createdAt?: Date | string
    items?: SaleItemUncheckedCreateNestedManyWithoutSaleInput
    payments?: PaymentUncheckedCreateNestedManyWithoutSaleInput
    order?: OrderUncheckedCreateNestedOneWithoutSaleInput
  }

  export type SaleCreateOrConnectWithoutInvoiceInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutInvoiceInput, SaleUncheckedCreateWithoutInvoiceInput>
  }

  export type SaleUpsertWithoutInvoiceInput = {
    update: XOR<SaleUpdateWithoutInvoiceInput, SaleUncheckedUpdateWithoutInvoiceInput>
    create: XOR<SaleCreateWithoutInvoiceInput, SaleUncheckedCreateWithoutInvoiceInput>
    where?: SaleWhereInput
  }

  export type SaleUpdateToOneWithWhereWithoutInvoiceInput = {
    where?: SaleWhereInput
    data: XOR<SaleUpdateWithoutInvoiceInput, SaleUncheckedUpdateWithoutInvoiceInput>
  }

  export type SaleUpdateWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    impuestos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSalesNestedInput
    client?: ClientUpdateOneWithoutSalesNestedInput
    items?: SaleItemUpdateManyWithoutSaleNestedInput
    payments?: PaymentUpdateManyWithoutSaleNestedInput
    order?: OrderUpdateOneWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    impuestos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    userId?: StringFieldUpdateOperationsInput | string
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: SaleItemUncheckedUpdateManyWithoutSaleNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutSaleNestedInput
    order?: OrderUncheckedUpdateOneWithoutSaleNestedInput
  }

  export type SaleCreateWithoutPaymentsInput = {
    id?: string
    fecha?: Date | string
    subtotal: Decimal | DecimalJsLike | number | string
    impuestos?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: $Enums.MetodoPago
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSalesInput
    client?: ClientCreateNestedOneWithoutSalesInput
    items?: SaleItemCreateNestedManyWithoutSaleInput
    invoice?: InvoiceCreateNestedOneWithoutSaleInput
    order?: OrderCreateNestedOneWithoutSaleInput
  }

  export type SaleUncheckedCreateWithoutPaymentsInput = {
    id?: string
    fecha?: Date | string
    subtotal: Decimal | DecimalJsLike | number | string
    impuestos?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: $Enums.MetodoPago
    userId: string
    clientId?: string | null
    createdAt?: Date | string
    items?: SaleItemUncheckedCreateNestedManyWithoutSaleInput
    invoice?: InvoiceUncheckedCreateNestedOneWithoutSaleInput
    order?: OrderUncheckedCreateNestedOneWithoutSaleInput
  }

  export type SaleCreateOrConnectWithoutPaymentsInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutPaymentsInput, SaleUncheckedCreateWithoutPaymentsInput>
  }

  export type SaleUpsertWithoutPaymentsInput = {
    update: XOR<SaleUpdateWithoutPaymentsInput, SaleUncheckedUpdateWithoutPaymentsInput>
    create: XOR<SaleCreateWithoutPaymentsInput, SaleUncheckedCreateWithoutPaymentsInput>
    where?: SaleWhereInput
  }

  export type SaleUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: SaleWhereInput
    data: XOR<SaleUpdateWithoutPaymentsInput, SaleUncheckedUpdateWithoutPaymentsInput>
  }

  export type SaleUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    impuestos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSalesNestedInput
    client?: ClientUpdateOneWithoutSalesNestedInput
    items?: SaleItemUpdateManyWithoutSaleNestedInput
    invoice?: InvoiceUpdateOneWithoutSaleNestedInput
    order?: OrderUpdateOneWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    impuestos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    userId?: StringFieldUpdateOperationsInput | string
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: SaleItemUncheckedUpdateManyWithoutSaleNestedInput
    invoice?: InvoiceUncheckedUpdateOneWithoutSaleNestedInput
    order?: OrderUncheckedUpdateOneWithoutSaleNestedInput
  }

  export type ClientCreateWithoutDebtsInput = {
    id?: string
    nombre: string
    telefono: string
    email?: string | null
    direccion?: string | null
    notas?: string | null
    lastReminderSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sales?: SaleCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutDebtsInput = {
    id?: string
    nombre: string
    telefono: string
    email?: string | null
    direccion?: string | null
    notas?: string | null
    lastReminderSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sales?: SaleUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutDebtsInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutDebtsInput, ClientUncheckedCreateWithoutDebtsInput>
  }

  export type ClientUpsertWithoutDebtsInput = {
    update: XOR<ClientUpdateWithoutDebtsInput, ClientUncheckedUpdateWithoutDebtsInput>
    create: XOR<ClientCreateWithoutDebtsInput, ClientUncheckedCreateWithoutDebtsInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutDebtsInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutDebtsInput, ClientUncheckedUpdateWithoutDebtsInput>
  }

  export type ClientUpdateWithoutDebtsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    telefono?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    lastReminderSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SaleUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutDebtsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    telefono?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    lastReminderSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SaleUncheckedUpdateManyWithoutClientNestedInput
  }

  export type UserCreateWithoutExpensesInput = {
    id?: string
    nombre: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sales?: SaleCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutExpensesInput = {
    id?: string
    nombre: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sales?: SaleUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutExpensesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutExpensesInput, UserUncheckedCreateWithoutExpensesInput>
  }

  export type UserUpsertWithoutExpensesInput = {
    update: XOR<UserUpdateWithoutExpensesInput, UserUncheckedUpdateWithoutExpensesInput>
    create: XOR<UserCreateWithoutExpensesInput, UserUncheckedCreateWithoutExpensesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutExpensesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutExpensesInput, UserUncheckedUpdateWithoutExpensesInput>
  }

  export type UserUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SaleUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SaleUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SaleCreateWithoutOrderInput = {
    id?: string
    fecha?: Date | string
    subtotal: Decimal | DecimalJsLike | number | string
    impuestos?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: $Enums.MetodoPago
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSalesInput
    client?: ClientCreateNestedOneWithoutSalesInput
    items?: SaleItemCreateNestedManyWithoutSaleInput
    invoice?: InvoiceCreateNestedOneWithoutSaleInput
    payments?: PaymentCreateNestedManyWithoutSaleInput
  }

  export type SaleUncheckedCreateWithoutOrderInput = {
    id?: string
    fecha?: Date | string
    subtotal: Decimal | DecimalJsLike | number | string
    impuestos?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: $Enums.MetodoPago
    userId: string
    clientId?: string | null
    createdAt?: Date | string
    items?: SaleItemUncheckedCreateNestedManyWithoutSaleInput
    invoice?: InvoiceUncheckedCreateNestedOneWithoutSaleInput
    payments?: PaymentUncheckedCreateNestedManyWithoutSaleInput
  }

  export type SaleCreateOrConnectWithoutOrderInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutOrderInput, SaleUncheckedCreateWithoutOrderInput>
  }

  export type SaleUpsertWithoutOrderInput = {
    update: XOR<SaleUpdateWithoutOrderInput, SaleUncheckedUpdateWithoutOrderInput>
    create: XOR<SaleCreateWithoutOrderInput, SaleUncheckedCreateWithoutOrderInput>
    where?: SaleWhereInput
  }

  export type SaleUpdateToOneWithWhereWithoutOrderInput = {
    where?: SaleWhereInput
    data: XOR<SaleUpdateWithoutOrderInput, SaleUncheckedUpdateWithoutOrderInput>
  }

  export type SaleUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    impuestos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSalesNestedInput
    client?: ClientUpdateOneWithoutSalesNestedInput
    items?: SaleItemUpdateManyWithoutSaleNestedInput
    invoice?: InvoiceUpdateOneWithoutSaleNestedInput
    payments?: PaymentUpdateManyWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    impuestos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    userId?: StringFieldUpdateOperationsInput | string
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: SaleItemUncheckedUpdateManyWithoutSaleNestedInput
    invoice?: InvoiceUncheckedUpdateOneWithoutSaleNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutSaleNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    id?: string
    nombre: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sales?: SaleCreateNestedManyWithoutUserInput
    expenses?: ExpenseCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    nombre: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sales?: SaleUncheckedCreateNestedManyWithoutUserInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SaleUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SaleUncheckedUpdateManyWithoutUserNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SaleCreateManyUserInput = {
    id?: string
    fecha?: Date | string
    subtotal: Decimal | DecimalJsLike | number | string
    impuestos?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: $Enums.MetodoPago
    clientId?: string | null
    createdAt?: Date | string
  }

  export type ExpenseCreateManyUserInput = {
    id?: string
    fecha?: Date | string
    categoria: string
    descripcion: string
    monto: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type AuditLogCreateManyUserInput = {
    id?: string
    entity: string
    entityId: string
    action: string
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type SaleUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    impuestos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneWithoutSalesNestedInput
    items?: SaleItemUpdateManyWithoutSaleNestedInput
    invoice?: InvoiceUpdateOneWithoutSaleNestedInput
    payments?: PaymentUpdateManyWithoutSaleNestedInput
    order?: OrderUpdateOneWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    impuestos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: SaleItemUncheckedUpdateManyWithoutSaleNestedInput
    invoice?: InvoiceUncheckedUpdateOneWithoutSaleNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutSaleNestedInput
    order?: OrderUncheckedUpdateOneWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    impuestos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleCreateManyClientInput = {
    id?: string
    fecha?: Date | string
    subtotal: Decimal | DecimalJsLike | number | string
    impuestos?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: $Enums.MetodoPago
    userId: string
    createdAt?: Date | string
  }

  export type ClientDebtCreateManyClientInput = {
    id?: string
    saleId?: string | null
    amountTotal: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    dueDate?: Date | string | null
    status?: $Enums.EstadoDeuda
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SaleUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    impuestos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSalesNestedInput
    items?: SaleItemUpdateManyWithoutSaleNestedInput
    invoice?: InvoiceUpdateOneWithoutSaleNestedInput
    payments?: PaymentUpdateManyWithoutSaleNestedInput
    order?: OrderUpdateOneWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    impuestos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: SaleItemUncheckedUpdateManyWithoutSaleNestedInput
    invoice?: InvoiceUncheckedUpdateOneWithoutSaleNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutSaleNestedInput
    order?: OrderUncheckedUpdateOneWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    impuestos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientDebtUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleId?: NullableStringFieldUpdateOperationsInput | string | null
    amountTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumEstadoDeudaFieldUpdateOperationsInput | $Enums.EstadoDeuda
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientDebtUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleId?: NullableStringFieldUpdateOperationsInput | string | null
    amountTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumEstadoDeudaFieldUpdateOperationsInput | $Enums.EstadoDeuda
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientDebtUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleId?: NullableStringFieldUpdateOperationsInput | string | null
    amountTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumEstadoDeudaFieldUpdateOperationsInput | $Enums.EstadoDeuda
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleItemCreateManyProductInput = {
    id?: string
    saleId: string
    descripcion: string
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    costoUnitario?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
  }

  export type SaleItemUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sale?: SaleUpdateOneRequiredWithoutItemsNestedInput
  }

  export type SaleItemUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type SaleItemUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type SaleItemCreateManySaleInput = {
    id?: string
    productId?: string | null
    descripcion: string
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    costoUnitario?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
  }

  export type PaymentCreateManySaleInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    fecha?: Date | string
    metodo: $Enums.MetodoPago
    createdAt?: Date | string
  }

  export type SaleItemUpdateWithoutSaleInput = {
    id?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    product?: ProductUpdateOneWithoutSaleItemsNestedInput
  }

  export type SaleItemUncheckedUpdateWithoutSaleInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type SaleItemUncheckedUpdateManyWithoutSaleInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type PaymentUpdateWithoutSaleInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    metodo?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateWithoutSaleInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    metodo?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutSaleInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    metodo?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClientCountOutputTypeDefaultArgs instead
     */
    export type ClientCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClientCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductCountOutputTypeDefaultArgs instead
     */
    export type ProductCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SaleCountOutputTypeDefaultArgs instead
     */
    export type SaleCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SaleCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClientDefaultArgs instead
     */
    export type ClientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClientDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductDefaultArgs instead
     */
    export type ProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SaleDefaultArgs instead
     */
    export type SaleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SaleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SaleItemDefaultArgs instead
     */
    export type SaleItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SaleItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InvoiceDefaultArgs instead
     */
    export type InvoiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InvoiceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PaymentDefaultArgs instead
     */
    export type PaymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PaymentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClientDebtDefaultArgs instead
     */
    export type ClientDebtArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClientDebtDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExpenseDefaultArgs instead
     */
    export type ExpenseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExpenseDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OrderDefaultArgs instead
     */
    export type OrderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrderDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BusinessProfileDefaultArgs instead
     */
    export type BusinessProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BusinessProfileDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}