
/**
 * Client
**/

import * as runtime from './runtime/client.js';
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
 * Model ServiceCategory
 * 
 */
export type ServiceCategory = $Result.DefaultSelection<Prisma.$ServiceCategoryPayload>
/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model Estimate
 * 
 */
export type Estimate = $Result.DefaultSelection<Prisma.$EstimatePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  TECHNICIAN: 'TECHNICIAN',
  CLIENT: 'CLIENT'
};

export type Role = (typeof Role)[keyof typeof Role]


export const ServiceStatus: {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  CLOSED: 'CLOSED'
};

export type ServiceStatus = (typeof ServiceStatus)[keyof typeof ServiceStatus]


export const PaymentMethod: {
  CASH: 'CASH',
  TRANSFER: 'TRANSFER',
  CARD: 'CARD',
  OTHER: 'OTHER'
};

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod]


export const EstimateStatus: {
  SENT: 'SENT',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type EstimateStatus = (typeof EstimateStatus)[keyof typeof EstimateStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type ServiceStatus = $Enums.ServiceStatus

export const ServiceStatus: typeof $Enums.ServiceStatus

export type PaymentMethod = $Enums.PaymentMethod

export const PaymentMethod: typeof $Enums.PaymentMethod

export type EstimateStatus = $Enums.EstimateStatus

export const EstimateStatus: typeof $Enums.EstimateStatus

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
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.client`: Exposes CRUD operations for the **Client** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clients
    * const clients = await prisma.client.findMany()
    * ```
    */
  get client(): Prisma.ClientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serviceCategory`: Exposes CRUD operations for the **ServiceCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiceCategories
    * const serviceCategories = await prisma.serviceCategory.findMany()
    * ```
    */
  get serviceCategory(): Prisma.ServiceCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.estimate`: Exposes CRUD operations for the **Estimate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Estimates
    * const estimates = await prisma.estimate.findMany()
    * ```
    */
  get estimate(): Prisma.EstimateDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.3.0
   * Query Engine version: 9d6ad21cbbceab97458517b147a6a09ff43aa735
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    ServiceCategory: 'ServiceCategory',
    Service: 'Service',
    Payment: 'Payment',
    Estimate: 'Estimate'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "client" | "serviceCategory" | "service" | "payment" | "estimate"
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
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
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
          updateManyAndReturn: {
            args: Prisma.ClientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
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
      ServiceCategory: {
        payload: Prisma.$ServiceCategoryPayload<ExtArgs>
        fields: Prisma.ServiceCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>
          }
          findFirst: {
            args: Prisma.ServiceCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>
          }
          findMany: {
            args: Prisma.ServiceCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>[]
          }
          create: {
            args: Prisma.ServiceCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>
          }
          createMany: {
            args: Prisma.ServiceCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>[]
          }
          delete: {
            args: Prisma.ServiceCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>
          }
          update: {
            args: Prisma.ServiceCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>
          }
          deleteMany: {
            args: Prisma.ServiceCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceCategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>[]
          }
          upsert: {
            args: Prisma.ServiceCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>
          }
          aggregate: {
            args: Prisma.ServiceCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServiceCategory>
          }
          groupBy: {
            args: Prisma.ServiceCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCategoryCountAggregateOutputType> | number
          }
        }
      }
      Service: {
        payload: Prisma.$ServicePayload<ExtArgs>
        fields: Prisma.ServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findFirst: {
            args: Prisma.ServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findMany: {
            args: Prisma.ServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          create: {
            args: Prisma.ServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          createMany: {
            args: Prisma.ServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          delete: {
            args: Prisma.ServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          update: {
            args: Prisma.ServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          deleteMany: {
            args: Prisma.ServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          upsert: {
            args: Prisma.ServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          aggregate: {
            args: Prisma.ServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService>
          }
          groupBy: {
            args: Prisma.ServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCountAggregateOutputType> | number
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
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
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
      Estimate: {
        payload: Prisma.$EstimatePayload<ExtArgs>
        fields: Prisma.EstimateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EstimateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstimatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EstimateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstimatePayload>
          }
          findFirst: {
            args: Prisma.EstimateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstimatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EstimateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstimatePayload>
          }
          findMany: {
            args: Prisma.EstimateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstimatePayload>[]
          }
          create: {
            args: Prisma.EstimateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstimatePayload>
          }
          createMany: {
            args: Prisma.EstimateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EstimateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstimatePayload>[]
          }
          delete: {
            args: Prisma.EstimateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstimatePayload>
          }
          update: {
            args: Prisma.EstimateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstimatePayload>
          }
          deleteMany: {
            args: Prisma.EstimateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EstimateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EstimateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstimatePayload>[]
          }
          upsert: {
            args: Prisma.EstimateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstimatePayload>
          }
          aggregate: {
            args: Prisma.EstimateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEstimate>
          }
          groupBy: {
            args: Prisma.EstimateGroupByArgs<ExtArgs>
            result: $Utils.Optional<EstimateGroupByOutputType>[]
          }
          count: {
            args: Prisma.EstimateCountArgs<ExtArgs>
            result: $Utils.Optional<EstimateCountAggregateOutputType> | number
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
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
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
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    client?: ClientOmit
    serviceCategory?: ServiceCategoryOmit
    service?: ServiceOmit
    payment?: PaymentOmit
    estimate?: EstimateOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'updateManyAndReturn'
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
    servicesAsTechnician: number
    servicesCreated: number
    servicesClosed: number
    payments: number
    estimates: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    servicesAsTechnician?: boolean | UserCountOutputTypeCountServicesAsTechnicianArgs
    servicesCreated?: boolean | UserCountOutputTypeCountServicesCreatedArgs
    servicesClosed?: boolean | UserCountOutputTypeCountServicesClosedArgs
    payments?: boolean | UserCountOutputTypeCountPaymentsArgs
    estimates?: boolean | UserCountOutputTypeCountEstimatesArgs
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
  export type UserCountOutputTypeCountServicesAsTechnicianArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountServicesCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountServicesClosedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEstimatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EstimateWhereInput
  }


  /**
   * Count Type ClientCountOutputType
   */

  export type ClientCountOutputType = {
    services: number
    estimates: number
  }

  export type ClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    services?: boolean | ClientCountOutputTypeCountServicesArgs
    estimates?: boolean | ClientCountOutputTypeCountEstimatesArgs
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
  export type ClientCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountEstimatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EstimateWhereInput
  }


  /**
   * Count Type ServiceCategoryCountOutputType
   */

  export type ServiceCategoryCountOutputType = {
    services: number
  }

  export type ServiceCategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    services?: boolean | ServiceCategoryCountOutputTypeCountServicesArgs
  }

  // Custom InputTypes
  /**
   * ServiceCategoryCountOutputType without action
   */
  export type ServiceCategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategoryCountOutputType
     */
    select?: ServiceCategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceCategoryCountOutputType without action
   */
  export type ServiceCategoryCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
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
    email: string | null
    name: string | null
    role: $Enums.Role | null
    avatar: string | null
    passwordHash: string | null
    phone: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    role: $Enums.Role | null
    avatar: string | null
    passwordHash: string | null
    phone: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    role: number
    avatar: number
    passwordHash: number
    phone: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    avatar?: true
    passwordHash?: true
    phone?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    avatar?: true
    passwordHash?: true
    phone?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    avatar?: true
    passwordHash?: true
    phone?: true
    isActive?: true
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
    email: string
    name: string
    role: $Enums.Role
    avatar: string | null
    passwordHash: string
    phone: string | null
    isActive: boolean
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
    email?: boolean
    name?: boolean
    role?: boolean
    avatar?: boolean
    passwordHash?: boolean
    phone?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    servicesAsTechnician?: boolean | User$servicesAsTechnicianArgs<ExtArgs>
    servicesCreated?: boolean | User$servicesCreatedArgs<ExtArgs>
    servicesClosed?: boolean | User$servicesClosedArgs<ExtArgs>
    payments?: boolean | User$paymentsArgs<ExtArgs>
    estimates?: boolean | User$estimatesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    avatar?: boolean
    passwordHash?: boolean
    phone?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    avatar?: boolean
    passwordHash?: boolean
    phone?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    avatar?: boolean
    passwordHash?: boolean
    phone?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "role" | "avatar" | "passwordHash" | "phone" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    servicesAsTechnician?: boolean | User$servicesAsTechnicianArgs<ExtArgs>
    servicesCreated?: boolean | User$servicesCreatedArgs<ExtArgs>
    servicesClosed?: boolean | User$servicesClosedArgs<ExtArgs>
    payments?: boolean | User$paymentsArgs<ExtArgs>
    estimates?: boolean | User$estimatesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      servicesAsTechnician: Prisma.$ServicePayload<ExtArgs>[]
      servicesCreated: Prisma.$ServicePayload<ExtArgs>[]
      servicesClosed: Prisma.$ServicePayload<ExtArgs>[]
      payments: Prisma.$PaymentPayload<ExtArgs>[]
      estimates: Prisma.$EstimatePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      role: $Enums.Role
      avatar: string | null
      passwordHash: string
      phone: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
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
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    servicesAsTechnician<T extends User$servicesAsTechnicianArgs<ExtArgs> = {}>(args?: Subset<T, User$servicesAsTechnicianArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    servicesCreated<T extends User$servicesCreatedArgs<ExtArgs> = {}>(args?: Subset<T, User$servicesCreatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    servicesClosed<T extends User$servicesClosedArgs<ExtArgs> = {}>(args?: Subset<T, User$servicesClosedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends User$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, User$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    estimates<T extends User$estimatesArgs<ExtArgs> = {}>(args?: Subset<T, User$estimatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EstimatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.servicesAsTechnician
   */
  export type User$servicesAsTechnicianArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * User.servicesCreated
   */
  export type User$servicesCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * User.servicesClosed
   */
  export type User$servicesClosedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * User.payments
   */
  export type User$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
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
   * User.estimates
   */
  export type User$estimatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estimate
     */
    omit?: EstimateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstimateInclude<ExtArgs> | null
    where?: EstimateWhereInput
    orderBy?: EstimateOrderByWithRelationInput | EstimateOrderByWithRelationInput[]
    cursor?: EstimateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EstimateScalarFieldEnum | EstimateScalarFieldEnum[]
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
    name: string | null
    email: string | null
    phone: string | null
    address: string | null
    city: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    address: string | null
    city: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phone: number
    address: number
    city: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClientMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    address?: true
    city?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    address?: true
    city?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    address?: true
    city?: true
    notes?: true
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
    name: string
    email: string
    phone: string | null
    address: string | null
    city: string | null
    notes: string | null
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
    name?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    city?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    services?: boolean | Client$servicesArgs<ExtArgs>
    estimates?: boolean | Client$estimatesArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    city?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["client"]>

  export type ClientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    city?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["client"]>

  export type ClientSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    city?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "phone" | "address" | "city" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["client"]>
  export type ClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    services?: boolean | Client$servicesArgs<ExtArgs>
    estimates?: boolean | Client$estimatesArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ClientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Client"
    objects: {
      services: Prisma.$ServicePayload<ExtArgs>[]
      estimates: Prisma.$EstimatePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      phone: string | null
      address: string | null
      city: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["client"]>
    composites: {}
  }

  type ClientGetPayload<S extends boolean | null | undefined | ClientDefaultArgs> = $Result.GetResult<Prisma.$ClientPayload, S>

  type ClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientCountAggregateInputType | true
    }

  export interface ClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
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
    findUnique<T extends ClientFindUniqueArgs>(args: SelectSubset<T, ClientFindUniqueArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findUniqueOrThrow<T extends ClientFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findFirst<T extends ClientFindFirstArgs>(args?: SelectSubset<T, ClientFindFirstArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findFirstOrThrow<T extends ClientFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findMany<T extends ClientFindManyArgs>(args?: SelectSubset<T, ClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
    create<T extends ClientCreateArgs>(args: SelectSubset<T, ClientCreateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    createManyAndReturn<T extends ClientCreateManyAndReturnArgs>(args?: SelectSubset<T, ClientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
    delete<T extends ClientDeleteArgs>(args: SelectSubset<T, ClientDeleteArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    update<T extends ClientUpdateArgs>(args: SelectSubset<T, ClientUpdateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     * Update zero or more Clients and returns the data updated in the database.
     * @param {ClientUpdateManyAndReturnArgs} args - Arguments to update many Clients.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClientUpdateManyAndReturnArgs>(args: SelectSubset<T, ClientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
    upsert<T extends ClientUpsertArgs>(args: SelectSubset<T, ClientUpsertArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
  export interface Prisma__ClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    services<T extends Client$servicesArgs<ExtArgs> = {}>(args?: Subset<T, Client$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    estimates<T extends Client$estimatesArgs<ExtArgs> = {}>(args?: Subset<T, Client$estimatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EstimatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly name: FieldRef<"Client", 'String'>
    readonly email: FieldRef<"Client", 'String'>
    readonly phone: FieldRef<"Client", 'String'>
    readonly address: FieldRef<"Client", 'String'>
    readonly city: FieldRef<"Client", 'String'>
    readonly notes: FieldRef<"Client", 'String'>
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
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
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
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
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
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
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
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
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
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
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
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
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
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
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
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
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
    /**
     * Limit how many Clients to update.
     */
    limit?: number
  }

  /**
   * Client updateManyAndReturn
   */
  export type ClientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
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
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
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
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
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
    /**
     * Limit how many Clients to delete.
     */
    limit?: number
  }

  /**
   * Client.services
   */
  export type Client$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Client.estimates
   */
  export type Client$estimatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estimate
     */
    omit?: EstimateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstimateInclude<ExtArgs> | null
    where?: EstimateWhereInput
    orderBy?: EstimateOrderByWithRelationInput | EstimateOrderByWithRelationInput[]
    cursor?: EstimateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EstimateScalarFieldEnum | EstimateScalarFieldEnum[]
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
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
  }


  /**
   * Model ServiceCategory
   */

  export type AggregateServiceCategory = {
    _count: ServiceCategoryCountAggregateOutputType | null
    _min: ServiceCategoryMinAggregateOutputType | null
    _max: ServiceCategoryMaxAggregateOutputType | null
  }

  export type ServiceCategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    color: string | null
    icon: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceCategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    color: string | null
    icon: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceCategoryCountAggregateOutputType = {
    id: number
    name: number
    description: number
    color: number
    icon: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceCategoryMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    color?: true
    icon?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceCategoryMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    color?: true
    icon?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceCategoryCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    color?: true
    icon?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceCategory to aggregate.
     */
    where?: ServiceCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceCategories to fetch.
     */
    orderBy?: ServiceCategoryOrderByWithRelationInput | ServiceCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServiceCategories
    **/
    _count?: true | ServiceCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceCategoryMaxAggregateInputType
  }

  export type GetServiceCategoryAggregateType<T extends ServiceCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateServiceCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServiceCategory[P]>
      : GetScalarType<T[P], AggregateServiceCategory[P]>
  }




  export type ServiceCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceCategoryWhereInput
    orderBy?: ServiceCategoryOrderByWithAggregationInput | ServiceCategoryOrderByWithAggregationInput[]
    by: ServiceCategoryScalarFieldEnum[] | ServiceCategoryScalarFieldEnum
    having?: ServiceCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCategoryCountAggregateInputType | true
    _min?: ServiceCategoryMinAggregateInputType
    _max?: ServiceCategoryMaxAggregateInputType
  }

  export type ServiceCategoryGroupByOutputType = {
    id: string
    name: string
    description: string | null
    color: string | null
    icon: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: ServiceCategoryCountAggregateOutputType | null
    _min: ServiceCategoryMinAggregateOutputType | null
    _max: ServiceCategoryMaxAggregateOutputType | null
  }

  type GetServiceCategoryGroupByPayload<T extends ServiceCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceCategoryGroupByOutputType[P]>
        }
      >
    >


  export type ServiceCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    color?: boolean
    icon?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    services?: boolean | ServiceCategory$servicesArgs<ExtArgs>
    _count?: boolean | ServiceCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceCategory"]>

  export type ServiceCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    color?: boolean
    icon?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["serviceCategory"]>

  export type ServiceCategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    color?: boolean
    icon?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["serviceCategory"]>

  export type ServiceCategorySelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    color?: boolean
    icon?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "color" | "icon" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["serviceCategory"]>
  export type ServiceCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    services?: boolean | ServiceCategory$servicesArgs<ExtArgs>
    _count?: boolean | ServiceCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceCategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ServiceCategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ServiceCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServiceCategory"
    objects: {
      services: Prisma.$ServicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      color: string | null
      icon: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["serviceCategory"]>
    composites: {}
  }

  type ServiceCategoryGetPayload<S extends boolean | null | undefined | ServiceCategoryDefaultArgs> = $Result.GetResult<Prisma.$ServiceCategoryPayload, S>

  type ServiceCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceCategoryCountAggregateInputType | true
    }

  export interface ServiceCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServiceCategory'], meta: { name: 'ServiceCategory' } }
    /**
     * Find zero or one ServiceCategory that matches the filter.
     * @param {ServiceCategoryFindUniqueArgs} args - Arguments to find a ServiceCategory
     * @example
     * // Get one ServiceCategory
     * const serviceCategory = await prisma.serviceCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceCategoryFindUniqueArgs>(args: SelectSubset<T, ServiceCategoryFindUniqueArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServiceCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceCategoryFindUniqueOrThrowArgs} args - Arguments to find a ServiceCategory
     * @example
     * // Get one ServiceCategory
     * const serviceCategory = await prisma.serviceCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCategoryFindFirstArgs} args - Arguments to find a ServiceCategory
     * @example
     * // Get one ServiceCategory
     * const serviceCategory = await prisma.serviceCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceCategoryFindFirstArgs>(args?: SelectSubset<T, ServiceCategoryFindFirstArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCategoryFindFirstOrThrowArgs} args - Arguments to find a ServiceCategory
     * @example
     * // Get one ServiceCategory
     * const serviceCategory = await prisma.serviceCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServiceCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServiceCategories
     * const serviceCategories = await prisma.serviceCategory.findMany()
     * 
     * // Get first 10 ServiceCategories
     * const serviceCategories = await prisma.serviceCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceCategoryWithIdOnly = await prisma.serviceCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceCategoryFindManyArgs>(args?: SelectSubset<T, ServiceCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServiceCategory.
     * @param {ServiceCategoryCreateArgs} args - Arguments to create a ServiceCategory.
     * @example
     * // Create one ServiceCategory
     * const ServiceCategory = await prisma.serviceCategory.create({
     *   data: {
     *     // ... data to create a ServiceCategory
     *   }
     * })
     * 
     */
    create<T extends ServiceCategoryCreateArgs>(args: SelectSubset<T, ServiceCategoryCreateArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServiceCategories.
     * @param {ServiceCategoryCreateManyArgs} args - Arguments to create many ServiceCategories.
     * @example
     * // Create many ServiceCategories
     * const serviceCategory = await prisma.serviceCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCategoryCreateManyArgs>(args?: SelectSubset<T, ServiceCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServiceCategories and returns the data saved in the database.
     * @param {ServiceCategoryCreateManyAndReturnArgs} args - Arguments to create many ServiceCategories.
     * @example
     * // Create many ServiceCategories
     * const serviceCategory = await prisma.serviceCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServiceCategories and only return the `id`
     * const serviceCategoryWithIdOnly = await prisma.serviceCategory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServiceCategory.
     * @param {ServiceCategoryDeleteArgs} args - Arguments to delete one ServiceCategory.
     * @example
     * // Delete one ServiceCategory
     * const ServiceCategory = await prisma.serviceCategory.delete({
     *   where: {
     *     // ... filter to delete one ServiceCategory
     *   }
     * })
     * 
     */
    delete<T extends ServiceCategoryDeleteArgs>(args: SelectSubset<T, ServiceCategoryDeleteArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServiceCategory.
     * @param {ServiceCategoryUpdateArgs} args - Arguments to update one ServiceCategory.
     * @example
     * // Update one ServiceCategory
     * const serviceCategory = await prisma.serviceCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceCategoryUpdateArgs>(args: SelectSubset<T, ServiceCategoryUpdateArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServiceCategories.
     * @param {ServiceCategoryDeleteManyArgs} args - Arguments to filter ServiceCategories to delete.
     * @example
     * // Delete a few ServiceCategories
     * const { count } = await prisma.serviceCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceCategoryDeleteManyArgs>(args?: SelectSubset<T, ServiceCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServiceCategories
     * const serviceCategory = await prisma.serviceCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceCategoryUpdateManyArgs>(args: SelectSubset<T, ServiceCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceCategories and returns the data updated in the database.
     * @param {ServiceCategoryUpdateManyAndReturnArgs} args - Arguments to update many ServiceCategories.
     * @example
     * // Update many ServiceCategories
     * const serviceCategory = await prisma.serviceCategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServiceCategories and only return the `id`
     * const serviceCategoryWithIdOnly = await prisma.serviceCategory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServiceCategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServiceCategory.
     * @param {ServiceCategoryUpsertArgs} args - Arguments to update or create a ServiceCategory.
     * @example
     * // Update or create a ServiceCategory
     * const serviceCategory = await prisma.serviceCategory.upsert({
     *   create: {
     *     // ... data to create a ServiceCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServiceCategory we want to update
     *   }
     * })
     */
    upsert<T extends ServiceCategoryUpsertArgs>(args: SelectSubset<T, ServiceCategoryUpsertArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServiceCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCategoryCountArgs} args - Arguments to filter ServiceCategories to count.
     * @example
     * // Count the number of ServiceCategories
     * const count = await prisma.serviceCategory.count({
     *   where: {
     *     // ... the filter for the ServiceCategories we want to count
     *   }
     * })
    **/
    count<T extends ServiceCategoryCountArgs>(
      args?: Subset<T, ServiceCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServiceCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ServiceCategoryAggregateArgs>(args: Subset<T, ServiceCategoryAggregateArgs>): Prisma.PrismaPromise<GetServiceCategoryAggregateType<T>>

    /**
     * Group by ServiceCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCategoryGroupByArgs} args - Group by arguments.
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
      T extends ServiceCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceCategoryGroupByArgs['orderBy'] }
        : { orderBy?: ServiceCategoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ServiceCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServiceCategory model
   */
  readonly fields: ServiceCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServiceCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    services<T extends ServiceCategory$servicesArgs<ExtArgs> = {}>(args?: Subset<T, ServiceCategory$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the ServiceCategory model
   */
  interface ServiceCategoryFieldRefs {
    readonly id: FieldRef<"ServiceCategory", 'String'>
    readonly name: FieldRef<"ServiceCategory", 'String'>
    readonly description: FieldRef<"ServiceCategory", 'String'>
    readonly color: FieldRef<"ServiceCategory", 'String'>
    readonly icon: FieldRef<"ServiceCategory", 'String'>
    readonly isActive: FieldRef<"ServiceCategory", 'Boolean'>
    readonly createdAt: FieldRef<"ServiceCategory", 'DateTime'>
    readonly updatedAt: FieldRef<"ServiceCategory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ServiceCategory findUnique
   */
  export type ServiceCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ServiceCategory to fetch.
     */
    where: ServiceCategoryWhereUniqueInput
  }

  /**
   * ServiceCategory findUniqueOrThrow
   */
  export type ServiceCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ServiceCategory to fetch.
     */
    where: ServiceCategoryWhereUniqueInput
  }

  /**
   * ServiceCategory findFirst
   */
  export type ServiceCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ServiceCategory to fetch.
     */
    where?: ServiceCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceCategories to fetch.
     */
    orderBy?: ServiceCategoryOrderByWithRelationInput | ServiceCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceCategories.
     */
    cursor?: ServiceCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceCategories.
     */
    distinct?: ServiceCategoryScalarFieldEnum | ServiceCategoryScalarFieldEnum[]
  }

  /**
   * ServiceCategory findFirstOrThrow
   */
  export type ServiceCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ServiceCategory to fetch.
     */
    where?: ServiceCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceCategories to fetch.
     */
    orderBy?: ServiceCategoryOrderByWithRelationInput | ServiceCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceCategories.
     */
    cursor?: ServiceCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceCategories.
     */
    distinct?: ServiceCategoryScalarFieldEnum | ServiceCategoryScalarFieldEnum[]
  }

  /**
   * ServiceCategory findMany
   */
  export type ServiceCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ServiceCategories to fetch.
     */
    where?: ServiceCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceCategories to fetch.
     */
    orderBy?: ServiceCategoryOrderByWithRelationInput | ServiceCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServiceCategories.
     */
    cursor?: ServiceCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceCategories.
     */
    skip?: number
    distinct?: ServiceCategoryScalarFieldEnum | ServiceCategoryScalarFieldEnum[]
  }

  /**
   * ServiceCategory create
   */
  export type ServiceCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a ServiceCategory.
     */
    data: XOR<ServiceCategoryCreateInput, ServiceCategoryUncheckedCreateInput>
  }

  /**
   * ServiceCategory createMany
   */
  export type ServiceCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServiceCategories.
     */
    data: ServiceCategoryCreateManyInput | ServiceCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceCategory createManyAndReturn
   */
  export type ServiceCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * The data used to create many ServiceCategories.
     */
    data: ServiceCategoryCreateManyInput | ServiceCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceCategory update
   */
  export type ServiceCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a ServiceCategory.
     */
    data: XOR<ServiceCategoryUpdateInput, ServiceCategoryUncheckedUpdateInput>
    /**
     * Choose, which ServiceCategory to update.
     */
    where: ServiceCategoryWhereUniqueInput
  }

  /**
   * ServiceCategory updateMany
   */
  export type ServiceCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServiceCategories.
     */
    data: XOR<ServiceCategoryUpdateManyMutationInput, ServiceCategoryUncheckedUpdateManyInput>
    /**
     * Filter which ServiceCategories to update
     */
    where?: ServiceCategoryWhereInput
    /**
     * Limit how many ServiceCategories to update.
     */
    limit?: number
  }

  /**
   * ServiceCategory updateManyAndReturn
   */
  export type ServiceCategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * The data used to update ServiceCategories.
     */
    data: XOR<ServiceCategoryUpdateManyMutationInput, ServiceCategoryUncheckedUpdateManyInput>
    /**
     * Filter which ServiceCategories to update
     */
    where?: ServiceCategoryWhereInput
    /**
     * Limit how many ServiceCategories to update.
     */
    limit?: number
  }

  /**
   * ServiceCategory upsert
   */
  export type ServiceCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the ServiceCategory to update in case it exists.
     */
    where: ServiceCategoryWhereUniqueInput
    /**
     * In case the ServiceCategory found by the `where` argument doesn't exist, create a new ServiceCategory with this data.
     */
    create: XOR<ServiceCategoryCreateInput, ServiceCategoryUncheckedCreateInput>
    /**
     * In case the ServiceCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceCategoryUpdateInput, ServiceCategoryUncheckedUpdateInput>
  }

  /**
   * ServiceCategory delete
   */
  export type ServiceCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * Filter which ServiceCategory to delete.
     */
    where: ServiceCategoryWhereUniqueInput
  }

  /**
   * ServiceCategory deleteMany
   */
  export type ServiceCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceCategories to delete
     */
    where?: ServiceCategoryWhereInput
    /**
     * Limit how many ServiceCategories to delete.
     */
    limit?: number
  }

  /**
   * ServiceCategory.services
   */
  export type ServiceCategory$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * ServiceCategory without action
   */
  export type ServiceCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
  }


  /**
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceAvgAggregateOutputType = {
    expectedAmount: Decimal | null
  }

  export type ServiceSumAggregateOutputType = {
    expectedAmount: Decimal | null
  }

  export type ServiceMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    status: $Enums.ServiceStatus | null
    scheduledDate: Date | null
    scheduledTime: string | null
    address: string | null
    completedAt: Date | null
    notes: string | null
    expectedAmount: Decimal | null
    closedAt: Date | null
    isLocked: boolean | null
    technicianId: string | null
    clientId: string | null
    createdById: string | null
    closedById: string | null
    categoryId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    status: $Enums.ServiceStatus | null
    scheduledDate: Date | null
    scheduledTime: string | null
    address: string | null
    completedAt: Date | null
    notes: string | null
    expectedAmount: Decimal | null
    closedAt: Date | null
    isLocked: boolean | null
    technicianId: string | null
    clientId: string | null
    createdById: string | null
    closedById: string | null
    categoryId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    title: number
    description: number
    status: number
    scheduledDate: number
    scheduledTime: number
    address: number
    completedAt: number
    notes: number
    expectedAmount: number
    closedAt: number
    isLocked: number
    technicianId: number
    clientId: number
    createdById: number
    closedById: number
    categoryId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceAvgAggregateInputType = {
    expectedAmount?: true
  }

  export type ServiceSumAggregateInputType = {
    expectedAmount?: true
  }

  export type ServiceMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    scheduledDate?: true
    scheduledTime?: true
    address?: true
    completedAt?: true
    notes?: true
    expectedAmount?: true
    closedAt?: true
    isLocked?: true
    technicianId?: true
    clientId?: true
    createdById?: true
    closedById?: true
    categoryId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    scheduledDate?: true
    scheduledTime?: true
    address?: true
    completedAt?: true
    notes?: true
    expectedAmount?: true
    closedAt?: true
    isLocked?: true
    technicianId?: true
    clientId?: true
    createdById?: true
    closedById?: true
    categoryId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    scheduledDate?: true
    scheduledTime?: true
    address?: true
    completedAt?: true
    notes?: true
    expectedAmount?: true
    closedAt?: true
    isLocked?: true
    technicianId?: true
    clientId?: true
    createdById?: true
    closedById?: true
    categoryId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Service to aggregate.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithAggregationInput | ServiceOrderByWithAggregationInput[]
    by: ServiceScalarFieldEnum[] | ServiceScalarFieldEnum
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _avg?: ServiceAvgAggregateInputType
    _sum?: ServiceSumAggregateInputType
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    id: string
    title: string
    description: string | null
    status: $Enums.ServiceStatus
    scheduledDate: Date
    scheduledTime: string
    address: string | null
    completedAt: Date | null
    notes: string | null
    expectedAmount: Decimal | null
    closedAt: Date | null
    isLocked: boolean
    technicianId: string | null
    clientId: string | null
    createdById: string
    closedById: string | null
    categoryId: string | null
    createdAt: Date
    updatedAt: Date
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    scheduledDate?: boolean
    scheduledTime?: boolean
    address?: boolean
    completedAt?: boolean
    notes?: boolean
    expectedAmount?: boolean
    closedAt?: boolean
    isLocked?: boolean
    technicianId?: boolean
    clientId?: boolean
    createdById?: boolean
    closedById?: boolean
    categoryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    technician?: boolean | Service$technicianArgs<ExtArgs>
    client?: boolean | Service$clientArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    closedBy?: boolean | Service$closedByArgs<ExtArgs>
    category?: boolean | Service$categoryArgs<ExtArgs>
    payment?: boolean | Service$paymentArgs<ExtArgs>
    estimate?: boolean | Service$estimateArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    scheduledDate?: boolean
    scheduledTime?: boolean
    address?: boolean
    completedAt?: boolean
    notes?: boolean
    expectedAmount?: boolean
    closedAt?: boolean
    isLocked?: boolean
    technicianId?: boolean
    clientId?: boolean
    createdById?: boolean
    closedById?: boolean
    categoryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    technician?: boolean | Service$technicianArgs<ExtArgs>
    client?: boolean | Service$clientArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    closedBy?: boolean | Service$closedByArgs<ExtArgs>
    category?: boolean | Service$categoryArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    scheduledDate?: boolean
    scheduledTime?: boolean
    address?: boolean
    completedAt?: boolean
    notes?: boolean
    expectedAmount?: boolean
    closedAt?: boolean
    isLocked?: boolean
    technicianId?: boolean
    clientId?: boolean
    createdById?: boolean
    closedById?: boolean
    categoryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    technician?: boolean | Service$technicianArgs<ExtArgs>
    client?: boolean | Service$clientArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    closedBy?: boolean | Service$closedByArgs<ExtArgs>
    category?: boolean | Service$categoryArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    scheduledDate?: boolean
    scheduledTime?: boolean
    address?: boolean
    completedAt?: boolean
    notes?: boolean
    expectedAmount?: boolean
    closedAt?: boolean
    isLocked?: boolean
    technicianId?: boolean
    clientId?: boolean
    createdById?: boolean
    closedById?: boolean
    categoryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "status" | "scheduledDate" | "scheduledTime" | "address" | "completedAt" | "notes" | "expectedAmount" | "closedAt" | "isLocked" | "technicianId" | "clientId" | "createdById" | "closedById" | "categoryId" | "createdAt" | "updatedAt", ExtArgs["result"]["service"]>
  export type ServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    technician?: boolean | Service$technicianArgs<ExtArgs>
    client?: boolean | Service$clientArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    closedBy?: boolean | Service$closedByArgs<ExtArgs>
    category?: boolean | Service$categoryArgs<ExtArgs>
    payment?: boolean | Service$paymentArgs<ExtArgs>
    estimate?: boolean | Service$estimateArgs<ExtArgs>
  }
  export type ServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    technician?: boolean | Service$technicianArgs<ExtArgs>
    client?: boolean | Service$clientArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    closedBy?: boolean | Service$closedByArgs<ExtArgs>
    category?: boolean | Service$categoryArgs<ExtArgs>
  }
  export type ServiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    technician?: boolean | Service$technicianArgs<ExtArgs>
    client?: boolean | Service$clientArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    closedBy?: boolean | Service$closedByArgs<ExtArgs>
    category?: boolean | Service$categoryArgs<ExtArgs>
  }

  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {
      technician: Prisma.$UserPayload<ExtArgs> | null
      client: Prisma.$ClientPayload<ExtArgs> | null
      createdBy: Prisma.$UserPayload<ExtArgs>
      closedBy: Prisma.$UserPayload<ExtArgs> | null
      category: Prisma.$ServiceCategoryPayload<ExtArgs> | null
      payment: Prisma.$PaymentPayload<ExtArgs> | null
      estimate: Prisma.$EstimatePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      status: $Enums.ServiceStatus
      scheduledDate: Date
      scheduledTime: string
      address: string | null
      completedAt: Date | null
      notes: string | null
      expectedAmount: Prisma.Decimal | null
      closedAt: Date | null
      isLocked: boolean
      technicianId: string | null
      clientId: string | null
      createdById: string
      closedById: string | null
      categoryId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["service"]>
    composites: {}
  }

  type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = $Result.GetResult<Prisma.$ServicePayload, S>

  type ServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceCountAggregateInputType | true
    }

  export interface ServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Service'], meta: { name: 'Service' } }
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceFindUniqueArgs>(args: SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Service that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceFindFirstArgs>(args?: SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceFindManyArgs>(args?: SelectSubset<T, ServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
     */
    create<T extends ServiceCreateArgs>(args: SelectSubset<T, ServiceCreateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Services.
     * @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCreateManyArgs>(args?: SelectSubset<T, ServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Services and returns the data saved in the database.
     * @param {ServiceCreateManyAndReturnArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
     */
    delete<T extends ServiceDeleteArgs>(args: SelectSubset<T, ServiceDeleteArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceUpdateArgs>(args: SelectSubset<T, ServiceUpdateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceDeleteManyArgs>(args?: SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceUpdateManyArgs>(args: SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services and returns the data updated in the database.
     * @param {ServiceUpdateManyAndReturnArgs} args - Arguments to update many Services.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServiceUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
     */
    upsert<T extends ServiceUpsertArgs>(args: SelectSubset<T, ServiceUpsertArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
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
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Service model
   */
  readonly fields: ServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    technician<T extends Service$technicianArgs<ExtArgs> = {}>(args?: Subset<T, Service$technicianArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    client<T extends Service$clientArgs<ExtArgs> = {}>(args?: Subset<T, Service$clientArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    closedBy<T extends Service$closedByArgs<ExtArgs> = {}>(args?: Subset<T, Service$closedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    category<T extends Service$categoryArgs<ExtArgs> = {}>(args?: Subset<T, Service$categoryArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    payment<T extends Service$paymentArgs<ExtArgs> = {}>(args?: Subset<T, Service$paymentArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    estimate<T extends Service$estimateArgs<ExtArgs> = {}>(args?: Subset<T, Service$estimateArgs<ExtArgs>>): Prisma__EstimateClient<$Result.GetResult<Prisma.$EstimatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Service model
   */
  interface ServiceFieldRefs {
    readonly id: FieldRef<"Service", 'String'>
    readonly title: FieldRef<"Service", 'String'>
    readonly description: FieldRef<"Service", 'String'>
    readonly status: FieldRef<"Service", 'ServiceStatus'>
    readonly scheduledDate: FieldRef<"Service", 'DateTime'>
    readonly scheduledTime: FieldRef<"Service", 'String'>
    readonly address: FieldRef<"Service", 'String'>
    readonly completedAt: FieldRef<"Service", 'DateTime'>
    readonly notes: FieldRef<"Service", 'String'>
    readonly expectedAmount: FieldRef<"Service", 'Decimal'>
    readonly closedAt: FieldRef<"Service", 'DateTime'>
    readonly isLocked: FieldRef<"Service", 'Boolean'>
    readonly technicianId: FieldRef<"Service", 'String'>
    readonly clientId: FieldRef<"Service", 'String'>
    readonly createdById: FieldRef<"Service", 'String'>
    readonly closedById: FieldRef<"Service", 'String'>
    readonly categoryId: FieldRef<"Service", 'String'>
    readonly createdAt: FieldRef<"Service", 'DateTime'>
    readonly updatedAt: FieldRef<"Service", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findMany
   */
  export type ServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Services to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service create
   */
  export type ServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Service.
     */
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }

  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service createManyAndReturn
   */
  export type ServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Service update
   */
  export type ServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Service.
     */
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
  }

  /**
   * Service updateManyAndReturn
   */
  export type ServiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Service upsert
   */
  export type ServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Service to update in case it exists.
     */
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     */
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }

  /**
   * Service delete
   */
  export type ServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter which Service to delete.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Services to delete
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to delete.
     */
    limit?: number
  }

  /**
   * Service.technician
   */
  export type Service$technicianArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Service.client
   */
  export type Service$clientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    where?: ClientWhereInput
  }

  /**
   * Service.closedBy
   */
  export type Service$closedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Service.category
   */
  export type Service$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    where?: ServiceCategoryWhereInput
  }

  /**
   * Service.payment
   */
  export type Service$paymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
  }

  /**
   * Service.estimate
   */
  export type Service$estimateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estimate
     */
    omit?: EstimateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstimateInclude<ExtArgs> | null
    where?: EstimateWhereInput
  }

  /**
   * Service without action
   */
  export type ServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
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
    amountPaid: Decimal | null
    sparePartsCost: Decimal | null
    debtAmount: Decimal | null
  }

  export type PaymentSumAggregateOutputType = {
    amountPaid: Decimal | null
    sparePartsCost: Decimal | null
    debtAmount: Decimal | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    method: $Enums.PaymentMethod | null
    amountPaid: Decimal | null
    sparePartsCost: Decimal | null
    debtAmount: Decimal | null
    hasDebt: boolean | null
    receiptPhotoUrl: string | null
    notes: string | null
    technicianId: string | null
    serviceId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    method: $Enums.PaymentMethod | null
    amountPaid: Decimal | null
    sparePartsCost: Decimal | null
    debtAmount: Decimal | null
    hasDebt: boolean | null
    receiptPhotoUrl: string | null
    notes: string | null
    technicianId: string | null
    serviceId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    method: number
    amountPaid: number
    sparePartsCost: number
    debtAmount: number
    hasDebt: number
    receiptPhotoUrl: number
    notes: number
    technicianId: number
    serviceId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    amountPaid?: true
    sparePartsCost?: true
    debtAmount?: true
  }

  export type PaymentSumAggregateInputType = {
    amountPaid?: true
    sparePartsCost?: true
    debtAmount?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    method?: true
    amountPaid?: true
    sparePartsCost?: true
    debtAmount?: true
    hasDebt?: true
    receiptPhotoUrl?: true
    notes?: true
    technicianId?: true
    serviceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    method?: true
    amountPaid?: true
    sparePartsCost?: true
    debtAmount?: true
    hasDebt?: true
    receiptPhotoUrl?: true
    notes?: true
    technicianId?: true
    serviceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    method?: true
    amountPaid?: true
    sparePartsCost?: true
    debtAmount?: true
    hasDebt?: true
    receiptPhotoUrl?: true
    notes?: true
    technicianId?: true
    serviceId?: true
    createdAt?: true
    updatedAt?: true
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
    method: $Enums.PaymentMethod
    amountPaid: Decimal
    sparePartsCost: Decimal
    debtAmount: Decimal
    hasDebt: boolean
    receiptPhotoUrl: string | null
    notes: string | null
    technicianId: string
    serviceId: string
    createdAt: Date
    updatedAt: Date
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
    method?: boolean
    amountPaid?: boolean
    sparePartsCost?: boolean
    debtAmount?: boolean
    hasDebt?: boolean
    receiptPhotoUrl?: boolean
    notes?: boolean
    technicianId?: boolean
    serviceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    technician?: boolean | UserDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    method?: boolean
    amountPaid?: boolean
    sparePartsCost?: boolean
    debtAmount?: boolean
    hasDebt?: boolean
    receiptPhotoUrl?: boolean
    notes?: boolean
    technicianId?: boolean
    serviceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    technician?: boolean | UserDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    method?: boolean
    amountPaid?: boolean
    sparePartsCost?: boolean
    debtAmount?: boolean
    hasDebt?: boolean
    receiptPhotoUrl?: boolean
    notes?: boolean
    technicianId?: boolean
    serviceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    technician?: boolean | UserDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    method?: boolean
    amountPaid?: boolean
    sparePartsCost?: boolean
    debtAmount?: boolean
    hasDebt?: boolean
    receiptPhotoUrl?: boolean
    notes?: boolean
    technicianId?: boolean
    serviceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "method" | "amountPaid" | "sparePartsCost" | "debtAmount" | "hasDebt" | "receiptPhotoUrl" | "notes" | "technicianId" | "serviceId" | "createdAt" | "updatedAt", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    technician?: boolean | UserDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    technician?: boolean | UserDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    technician?: boolean | UserDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      technician: Prisma.$UserPayload<ExtArgs>
      service: Prisma.$ServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      method: $Enums.PaymentMethod
      amountPaid: Prisma.Decimal
      sparePartsCost: Prisma.Decimal
      debtAmount: Prisma.Decimal
      hasDebt: boolean
      receiptPhotoUrl: string | null
      notes: string | null
      technicianId: string
      serviceId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
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
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    technician<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
    readonly method: FieldRef<"Payment", 'PaymentMethod'>
    readonly amountPaid: FieldRef<"Payment", 'Decimal'>
    readonly sparePartsCost: FieldRef<"Payment", 'Decimal'>
    readonly debtAmount: FieldRef<"Payment", 'Decimal'>
    readonly hasDebt: FieldRef<"Payment", 'Boolean'>
    readonly receiptPhotoUrl: FieldRef<"Payment", 'String'>
    readonly notes: FieldRef<"Payment", 'String'>
    readonly technicianId: FieldRef<"Payment", 'String'>
    readonly serviceId: FieldRef<"Payment", 'String'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
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
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
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
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
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
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
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
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
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
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
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
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
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
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
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
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
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
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
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
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
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
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
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
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
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
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model Estimate
   */

  export type AggregateEstimate = {
    _count: EstimateCountAggregateOutputType | null
    _avg: EstimateAvgAggregateOutputType | null
    _sum: EstimateSumAggregateOutputType | null
    _min: EstimateMinAggregateOutputType | null
    _max: EstimateMaxAggregateOutputType | null
  }

  export type EstimateAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type EstimateSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type EstimateMinAggregateOutputType = {
    id: string | null
    serviceId: string | null
    technicianId: string | null
    clientId: string | null
    amount: Decimal | null
    description: string | null
    status: $Enums.EstimateStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EstimateMaxAggregateOutputType = {
    id: string | null
    serviceId: string | null
    technicianId: string | null
    clientId: string | null
    amount: Decimal | null
    description: string | null
    status: $Enums.EstimateStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EstimateCountAggregateOutputType = {
    id: number
    serviceId: number
    technicianId: number
    clientId: number
    amount: number
    description: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EstimateAvgAggregateInputType = {
    amount?: true
  }

  export type EstimateSumAggregateInputType = {
    amount?: true
  }

  export type EstimateMinAggregateInputType = {
    id?: true
    serviceId?: true
    technicianId?: true
    clientId?: true
    amount?: true
    description?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EstimateMaxAggregateInputType = {
    id?: true
    serviceId?: true
    technicianId?: true
    clientId?: true
    amount?: true
    description?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EstimateCountAggregateInputType = {
    id?: true
    serviceId?: true
    technicianId?: true
    clientId?: true
    amount?: true
    description?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EstimateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Estimate to aggregate.
     */
    where?: EstimateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Estimates to fetch.
     */
    orderBy?: EstimateOrderByWithRelationInput | EstimateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EstimateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Estimates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Estimates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Estimates
    **/
    _count?: true | EstimateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EstimateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EstimateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EstimateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EstimateMaxAggregateInputType
  }

  export type GetEstimateAggregateType<T extends EstimateAggregateArgs> = {
        [P in keyof T & keyof AggregateEstimate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEstimate[P]>
      : GetScalarType<T[P], AggregateEstimate[P]>
  }




  export type EstimateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EstimateWhereInput
    orderBy?: EstimateOrderByWithAggregationInput | EstimateOrderByWithAggregationInput[]
    by: EstimateScalarFieldEnum[] | EstimateScalarFieldEnum
    having?: EstimateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EstimateCountAggregateInputType | true
    _avg?: EstimateAvgAggregateInputType
    _sum?: EstimateSumAggregateInputType
    _min?: EstimateMinAggregateInputType
    _max?: EstimateMaxAggregateInputType
  }

  export type EstimateGroupByOutputType = {
    id: string
    serviceId: string
    technicianId: string
    clientId: string
    amount: Decimal
    description: string | null
    status: $Enums.EstimateStatus
    createdAt: Date
    updatedAt: Date
    _count: EstimateCountAggregateOutputType | null
    _avg: EstimateAvgAggregateOutputType | null
    _sum: EstimateSumAggregateOutputType | null
    _min: EstimateMinAggregateOutputType | null
    _max: EstimateMaxAggregateOutputType | null
  }

  type GetEstimateGroupByPayload<T extends EstimateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EstimateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EstimateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EstimateGroupByOutputType[P]>
            : GetScalarType<T[P], EstimateGroupByOutputType[P]>
        }
      >
    >


  export type EstimateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceId?: boolean
    technicianId?: boolean
    clientId?: boolean
    amount?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    technician?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["estimate"]>

  export type EstimateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceId?: boolean
    technicianId?: boolean
    clientId?: boolean
    amount?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    technician?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["estimate"]>

  export type EstimateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceId?: boolean
    technicianId?: boolean
    clientId?: boolean
    amount?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    technician?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["estimate"]>

  export type EstimateSelectScalar = {
    id?: boolean
    serviceId?: boolean
    technicianId?: boolean
    clientId?: boolean
    amount?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EstimateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "serviceId" | "technicianId" | "clientId" | "amount" | "description" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["estimate"]>
  export type EstimateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    technician?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }
  export type EstimateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    technician?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }
  export type EstimateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    technician?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }

  export type $EstimatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Estimate"
    objects: {
      service: Prisma.$ServicePayload<ExtArgs>
      technician: Prisma.$UserPayload<ExtArgs>
      client: Prisma.$ClientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      serviceId: string
      technicianId: string
      clientId: string
      amount: Prisma.Decimal
      description: string | null
      status: $Enums.EstimateStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["estimate"]>
    composites: {}
  }

  type EstimateGetPayload<S extends boolean | null | undefined | EstimateDefaultArgs> = $Result.GetResult<Prisma.$EstimatePayload, S>

  type EstimateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EstimateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EstimateCountAggregateInputType | true
    }

  export interface EstimateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Estimate'], meta: { name: 'Estimate' } }
    /**
     * Find zero or one Estimate that matches the filter.
     * @param {EstimateFindUniqueArgs} args - Arguments to find a Estimate
     * @example
     * // Get one Estimate
     * const estimate = await prisma.estimate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EstimateFindUniqueArgs>(args: SelectSubset<T, EstimateFindUniqueArgs<ExtArgs>>): Prisma__EstimateClient<$Result.GetResult<Prisma.$EstimatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Estimate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EstimateFindUniqueOrThrowArgs} args - Arguments to find a Estimate
     * @example
     * // Get one Estimate
     * const estimate = await prisma.estimate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EstimateFindUniqueOrThrowArgs>(args: SelectSubset<T, EstimateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EstimateClient<$Result.GetResult<Prisma.$EstimatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Estimate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstimateFindFirstArgs} args - Arguments to find a Estimate
     * @example
     * // Get one Estimate
     * const estimate = await prisma.estimate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EstimateFindFirstArgs>(args?: SelectSubset<T, EstimateFindFirstArgs<ExtArgs>>): Prisma__EstimateClient<$Result.GetResult<Prisma.$EstimatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Estimate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstimateFindFirstOrThrowArgs} args - Arguments to find a Estimate
     * @example
     * // Get one Estimate
     * const estimate = await prisma.estimate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EstimateFindFirstOrThrowArgs>(args?: SelectSubset<T, EstimateFindFirstOrThrowArgs<ExtArgs>>): Prisma__EstimateClient<$Result.GetResult<Prisma.$EstimatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Estimates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstimateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Estimates
     * const estimates = await prisma.estimate.findMany()
     * 
     * // Get first 10 Estimates
     * const estimates = await prisma.estimate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const estimateWithIdOnly = await prisma.estimate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EstimateFindManyArgs>(args?: SelectSubset<T, EstimateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EstimatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Estimate.
     * @param {EstimateCreateArgs} args - Arguments to create a Estimate.
     * @example
     * // Create one Estimate
     * const Estimate = await prisma.estimate.create({
     *   data: {
     *     // ... data to create a Estimate
     *   }
     * })
     * 
     */
    create<T extends EstimateCreateArgs>(args: SelectSubset<T, EstimateCreateArgs<ExtArgs>>): Prisma__EstimateClient<$Result.GetResult<Prisma.$EstimatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Estimates.
     * @param {EstimateCreateManyArgs} args - Arguments to create many Estimates.
     * @example
     * // Create many Estimates
     * const estimate = await prisma.estimate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EstimateCreateManyArgs>(args?: SelectSubset<T, EstimateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Estimates and returns the data saved in the database.
     * @param {EstimateCreateManyAndReturnArgs} args - Arguments to create many Estimates.
     * @example
     * // Create many Estimates
     * const estimate = await prisma.estimate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Estimates and only return the `id`
     * const estimateWithIdOnly = await prisma.estimate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EstimateCreateManyAndReturnArgs>(args?: SelectSubset<T, EstimateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EstimatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Estimate.
     * @param {EstimateDeleteArgs} args - Arguments to delete one Estimate.
     * @example
     * // Delete one Estimate
     * const Estimate = await prisma.estimate.delete({
     *   where: {
     *     // ... filter to delete one Estimate
     *   }
     * })
     * 
     */
    delete<T extends EstimateDeleteArgs>(args: SelectSubset<T, EstimateDeleteArgs<ExtArgs>>): Prisma__EstimateClient<$Result.GetResult<Prisma.$EstimatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Estimate.
     * @param {EstimateUpdateArgs} args - Arguments to update one Estimate.
     * @example
     * // Update one Estimate
     * const estimate = await prisma.estimate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EstimateUpdateArgs>(args: SelectSubset<T, EstimateUpdateArgs<ExtArgs>>): Prisma__EstimateClient<$Result.GetResult<Prisma.$EstimatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Estimates.
     * @param {EstimateDeleteManyArgs} args - Arguments to filter Estimates to delete.
     * @example
     * // Delete a few Estimates
     * const { count } = await prisma.estimate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EstimateDeleteManyArgs>(args?: SelectSubset<T, EstimateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Estimates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstimateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Estimates
     * const estimate = await prisma.estimate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EstimateUpdateManyArgs>(args: SelectSubset<T, EstimateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Estimates and returns the data updated in the database.
     * @param {EstimateUpdateManyAndReturnArgs} args - Arguments to update many Estimates.
     * @example
     * // Update many Estimates
     * const estimate = await prisma.estimate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Estimates and only return the `id`
     * const estimateWithIdOnly = await prisma.estimate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EstimateUpdateManyAndReturnArgs>(args: SelectSubset<T, EstimateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EstimatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Estimate.
     * @param {EstimateUpsertArgs} args - Arguments to update or create a Estimate.
     * @example
     * // Update or create a Estimate
     * const estimate = await prisma.estimate.upsert({
     *   create: {
     *     // ... data to create a Estimate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Estimate we want to update
     *   }
     * })
     */
    upsert<T extends EstimateUpsertArgs>(args: SelectSubset<T, EstimateUpsertArgs<ExtArgs>>): Prisma__EstimateClient<$Result.GetResult<Prisma.$EstimatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Estimates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstimateCountArgs} args - Arguments to filter Estimates to count.
     * @example
     * // Count the number of Estimates
     * const count = await prisma.estimate.count({
     *   where: {
     *     // ... the filter for the Estimates we want to count
     *   }
     * })
    **/
    count<T extends EstimateCountArgs>(
      args?: Subset<T, EstimateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EstimateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Estimate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstimateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EstimateAggregateArgs>(args: Subset<T, EstimateAggregateArgs>): Prisma.PrismaPromise<GetEstimateAggregateType<T>>

    /**
     * Group by Estimate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstimateGroupByArgs} args - Group by arguments.
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
      T extends EstimateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EstimateGroupByArgs['orderBy'] }
        : { orderBy?: EstimateGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EstimateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEstimateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Estimate model
   */
  readonly fields: EstimateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Estimate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EstimateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    technician<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Estimate model
   */
  interface EstimateFieldRefs {
    readonly id: FieldRef<"Estimate", 'String'>
    readonly serviceId: FieldRef<"Estimate", 'String'>
    readonly technicianId: FieldRef<"Estimate", 'String'>
    readonly clientId: FieldRef<"Estimate", 'String'>
    readonly amount: FieldRef<"Estimate", 'Decimal'>
    readonly description: FieldRef<"Estimate", 'String'>
    readonly status: FieldRef<"Estimate", 'EstimateStatus'>
    readonly createdAt: FieldRef<"Estimate", 'DateTime'>
    readonly updatedAt: FieldRef<"Estimate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Estimate findUnique
   */
  export type EstimateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estimate
     */
    omit?: EstimateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstimateInclude<ExtArgs> | null
    /**
     * Filter, which Estimate to fetch.
     */
    where: EstimateWhereUniqueInput
  }

  /**
   * Estimate findUniqueOrThrow
   */
  export type EstimateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estimate
     */
    omit?: EstimateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstimateInclude<ExtArgs> | null
    /**
     * Filter, which Estimate to fetch.
     */
    where: EstimateWhereUniqueInput
  }

  /**
   * Estimate findFirst
   */
  export type EstimateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estimate
     */
    omit?: EstimateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstimateInclude<ExtArgs> | null
    /**
     * Filter, which Estimate to fetch.
     */
    where?: EstimateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Estimates to fetch.
     */
    orderBy?: EstimateOrderByWithRelationInput | EstimateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Estimates.
     */
    cursor?: EstimateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Estimates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Estimates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Estimates.
     */
    distinct?: EstimateScalarFieldEnum | EstimateScalarFieldEnum[]
  }

  /**
   * Estimate findFirstOrThrow
   */
  export type EstimateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estimate
     */
    omit?: EstimateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstimateInclude<ExtArgs> | null
    /**
     * Filter, which Estimate to fetch.
     */
    where?: EstimateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Estimates to fetch.
     */
    orderBy?: EstimateOrderByWithRelationInput | EstimateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Estimates.
     */
    cursor?: EstimateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Estimates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Estimates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Estimates.
     */
    distinct?: EstimateScalarFieldEnum | EstimateScalarFieldEnum[]
  }

  /**
   * Estimate findMany
   */
  export type EstimateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estimate
     */
    omit?: EstimateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstimateInclude<ExtArgs> | null
    /**
     * Filter, which Estimates to fetch.
     */
    where?: EstimateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Estimates to fetch.
     */
    orderBy?: EstimateOrderByWithRelationInput | EstimateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Estimates.
     */
    cursor?: EstimateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Estimates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Estimates.
     */
    skip?: number
    distinct?: EstimateScalarFieldEnum | EstimateScalarFieldEnum[]
  }

  /**
   * Estimate create
   */
  export type EstimateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estimate
     */
    omit?: EstimateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstimateInclude<ExtArgs> | null
    /**
     * The data needed to create a Estimate.
     */
    data: XOR<EstimateCreateInput, EstimateUncheckedCreateInput>
  }

  /**
   * Estimate createMany
   */
  export type EstimateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Estimates.
     */
    data: EstimateCreateManyInput | EstimateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Estimate createManyAndReturn
   */
  export type EstimateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Estimate
     */
    omit?: EstimateOmit<ExtArgs> | null
    /**
     * The data used to create many Estimates.
     */
    data: EstimateCreateManyInput | EstimateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstimateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Estimate update
   */
  export type EstimateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estimate
     */
    omit?: EstimateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstimateInclude<ExtArgs> | null
    /**
     * The data needed to update a Estimate.
     */
    data: XOR<EstimateUpdateInput, EstimateUncheckedUpdateInput>
    /**
     * Choose, which Estimate to update.
     */
    where: EstimateWhereUniqueInput
  }

  /**
   * Estimate updateMany
   */
  export type EstimateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Estimates.
     */
    data: XOR<EstimateUpdateManyMutationInput, EstimateUncheckedUpdateManyInput>
    /**
     * Filter which Estimates to update
     */
    where?: EstimateWhereInput
    /**
     * Limit how many Estimates to update.
     */
    limit?: number
  }

  /**
   * Estimate updateManyAndReturn
   */
  export type EstimateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Estimate
     */
    omit?: EstimateOmit<ExtArgs> | null
    /**
     * The data used to update Estimates.
     */
    data: XOR<EstimateUpdateManyMutationInput, EstimateUncheckedUpdateManyInput>
    /**
     * Filter which Estimates to update
     */
    where?: EstimateWhereInput
    /**
     * Limit how many Estimates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstimateIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Estimate upsert
   */
  export type EstimateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estimate
     */
    omit?: EstimateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstimateInclude<ExtArgs> | null
    /**
     * The filter to search for the Estimate to update in case it exists.
     */
    where: EstimateWhereUniqueInput
    /**
     * In case the Estimate found by the `where` argument doesn't exist, create a new Estimate with this data.
     */
    create: XOR<EstimateCreateInput, EstimateUncheckedCreateInput>
    /**
     * In case the Estimate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EstimateUpdateInput, EstimateUncheckedUpdateInput>
  }

  /**
   * Estimate delete
   */
  export type EstimateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estimate
     */
    omit?: EstimateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstimateInclude<ExtArgs> | null
    /**
     * Filter which Estimate to delete.
     */
    where: EstimateWhereUniqueInput
  }

  /**
   * Estimate deleteMany
   */
  export type EstimateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Estimates to delete
     */
    where?: EstimateWhereInput
    /**
     * Limit how many Estimates to delete.
     */
    limit?: number
  }

  /**
   * Estimate without action
   */
  export type EstimateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estimate
     */
    omit?: EstimateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EstimateInclude<ExtArgs> | null
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
    email: 'email',
    name: 'name',
    role: 'role',
    avatar: 'avatar',
    passwordHash: 'passwordHash',
    phone: 'phone',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ClientScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    address: 'address',
    city: 'city',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum]


  export const ServiceCategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    color: 'color',
    icon: 'icon',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceCategoryScalarFieldEnum = (typeof ServiceCategoryScalarFieldEnum)[keyof typeof ServiceCategoryScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    status: 'status',
    scheduledDate: 'scheduledDate',
    scheduledTime: 'scheduledTime',
    address: 'address',
    completedAt: 'completedAt',
    notes: 'notes',
    expectedAmount: 'expectedAmount',
    closedAt: 'closedAt',
    isLocked: 'isLocked',
    technicianId: 'technicianId',
    clientId: 'clientId',
    createdById: 'createdById',
    closedById: 'closedById',
    categoryId: 'categoryId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    method: 'method',
    amountPaid: 'amountPaid',
    sparePartsCost: 'sparePartsCost',
    debtAmount: 'debtAmount',
    hasDebt: 'hasDebt',
    receiptPhotoUrl: 'receiptPhotoUrl',
    notes: 'notes',
    technicianId: 'technicianId',
    serviceId: 'serviceId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const EstimateScalarFieldEnum: {
    id: 'id',
    serviceId: 'serviceId',
    technicianId: 'technicianId',
    clientId: 'clientId',
    amount: 'amount',
    description: 'description',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EstimateScalarFieldEnum = (typeof EstimateScalarFieldEnum)[keyof typeof EstimateScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'ServiceStatus'
   */
  export type EnumServiceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceStatus'>
    


  /**
   * Reference to a field of type 'ServiceStatus[]'
   */
  export type ListEnumServiceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceStatus[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'PaymentMethod'
   */
  export type EnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod'>
    


  /**
   * Reference to a field of type 'PaymentMethod[]'
   */
  export type ListEnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod[]'>
    


  /**
   * Reference to a field of type 'EstimateStatus'
   */
  export type EnumEstimateStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstimateStatus'>
    


  /**
   * Reference to a field of type 'EstimateStatus[]'
   */
  export type ListEnumEstimateStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstimateStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    avatar?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    servicesAsTechnician?: ServiceListRelationFilter
    servicesCreated?: ServiceListRelationFilter
    servicesClosed?: ServiceListRelationFilter
    payments?: PaymentListRelationFilter
    estimates?: EstimateListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatar?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    phone?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    servicesAsTechnician?: ServiceOrderByRelationAggregateInput
    servicesCreated?: ServiceOrderByRelationAggregateInput
    servicesClosed?: ServiceOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
    estimates?: EstimateOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    avatar?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    servicesAsTechnician?: ServiceListRelationFilter
    servicesCreated?: ServiceListRelationFilter
    servicesClosed?: ServiceListRelationFilter
    payments?: PaymentListRelationFilter
    estimates?: EstimateListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatar?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    phone?: SortOrderInput | SortOrder
    isActive?: SortOrder
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
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ClientWhereInput = {
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    id?: StringFilter<"Client"> | string
    name?: StringFilter<"Client"> | string
    email?: StringFilter<"Client"> | string
    phone?: StringNullableFilter<"Client"> | string | null
    address?: StringNullableFilter<"Client"> | string | null
    city?: StringNullableFilter<"Client"> | string | null
    notes?: StringNullableFilter<"Client"> | string | null
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    services?: ServiceListRelationFilter
    estimates?: EstimateListRelationFilter
  }

  export type ClientOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    services?: ServiceOrderByRelationAggregateInput
    estimates?: EstimateOrderByRelationAggregateInput
  }

  export type ClientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    name?: StringFilter<"Client"> | string
    phone?: StringNullableFilter<"Client"> | string | null
    address?: StringNullableFilter<"Client"> | string | null
    city?: StringNullableFilter<"Client"> | string | null
    notes?: StringNullableFilter<"Client"> | string | null
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    services?: ServiceListRelationFilter
    estimates?: EstimateListRelationFilter
  }, "id" | "email">

  export type ClientOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
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
    name?: StringWithAggregatesFilter<"Client"> | string
    email?: StringWithAggregatesFilter<"Client"> | string
    phone?: StringNullableWithAggregatesFilter<"Client"> | string | null
    address?: StringNullableWithAggregatesFilter<"Client"> | string | null
    city?: StringNullableWithAggregatesFilter<"Client"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Client"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
  }

  export type ServiceCategoryWhereInput = {
    AND?: ServiceCategoryWhereInput | ServiceCategoryWhereInput[]
    OR?: ServiceCategoryWhereInput[]
    NOT?: ServiceCategoryWhereInput | ServiceCategoryWhereInput[]
    id?: StringFilter<"ServiceCategory"> | string
    name?: StringFilter<"ServiceCategory"> | string
    description?: StringNullableFilter<"ServiceCategory"> | string | null
    color?: StringNullableFilter<"ServiceCategory"> | string | null
    icon?: StringNullableFilter<"ServiceCategory"> | string | null
    isActive?: BoolFilter<"ServiceCategory"> | boolean
    createdAt?: DateTimeFilter<"ServiceCategory"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceCategory"> | Date | string
    services?: ServiceListRelationFilter
  }

  export type ServiceCategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    icon?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    services?: ServiceOrderByRelationAggregateInput
  }

  export type ServiceCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: ServiceCategoryWhereInput | ServiceCategoryWhereInput[]
    OR?: ServiceCategoryWhereInput[]
    NOT?: ServiceCategoryWhereInput | ServiceCategoryWhereInput[]
    description?: StringNullableFilter<"ServiceCategory"> | string | null
    color?: StringNullableFilter<"ServiceCategory"> | string | null
    icon?: StringNullableFilter<"ServiceCategory"> | string | null
    isActive?: BoolFilter<"ServiceCategory"> | boolean
    createdAt?: DateTimeFilter<"ServiceCategory"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceCategory"> | Date | string
    services?: ServiceListRelationFilter
  }, "id" | "name">

  export type ServiceCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    icon?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceCategoryCountOrderByAggregateInput
    _max?: ServiceCategoryMaxOrderByAggregateInput
    _min?: ServiceCategoryMinOrderByAggregateInput
  }

  export type ServiceCategoryScalarWhereWithAggregatesInput = {
    AND?: ServiceCategoryScalarWhereWithAggregatesInput | ServiceCategoryScalarWhereWithAggregatesInput[]
    OR?: ServiceCategoryScalarWhereWithAggregatesInput[]
    NOT?: ServiceCategoryScalarWhereWithAggregatesInput | ServiceCategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServiceCategory"> | string
    name?: StringWithAggregatesFilter<"ServiceCategory"> | string
    description?: StringNullableWithAggregatesFilter<"ServiceCategory"> | string | null
    color?: StringNullableWithAggregatesFilter<"ServiceCategory"> | string | null
    icon?: StringNullableWithAggregatesFilter<"ServiceCategory"> | string | null
    isActive?: BoolWithAggregatesFilter<"ServiceCategory"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ServiceCategory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ServiceCategory"> | Date | string
  }

  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    id?: StringFilter<"Service"> | string
    title?: StringFilter<"Service"> | string
    description?: StringNullableFilter<"Service"> | string | null
    status?: EnumServiceStatusFilter<"Service"> | $Enums.ServiceStatus
    scheduledDate?: DateTimeFilter<"Service"> | Date | string
    scheduledTime?: StringFilter<"Service"> | string
    address?: StringNullableFilter<"Service"> | string | null
    completedAt?: DateTimeNullableFilter<"Service"> | Date | string | null
    notes?: StringNullableFilter<"Service"> | string | null
    expectedAmount?: DecimalNullableFilter<"Service"> | Decimal | DecimalJsLike | number | string | null
    closedAt?: DateTimeNullableFilter<"Service"> | Date | string | null
    isLocked?: BoolFilter<"Service"> | boolean
    technicianId?: StringNullableFilter<"Service"> | string | null
    clientId?: StringNullableFilter<"Service"> | string | null
    createdById?: StringFilter<"Service"> | string
    closedById?: StringNullableFilter<"Service"> | string | null
    categoryId?: StringNullableFilter<"Service"> | string | null
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    technician?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    client?: XOR<ClientNullableScalarRelationFilter, ClientWhereInput> | null
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    closedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    category?: XOR<ServiceCategoryNullableScalarRelationFilter, ServiceCategoryWhereInput> | null
    payment?: XOR<PaymentNullableScalarRelationFilter, PaymentWhereInput> | null
    estimate?: XOR<EstimateNullableScalarRelationFilter, EstimateWhereInput> | null
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    scheduledDate?: SortOrder
    scheduledTime?: SortOrder
    address?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    expectedAmount?: SortOrderInput | SortOrder
    closedAt?: SortOrderInput | SortOrder
    isLocked?: SortOrder
    technicianId?: SortOrderInput | SortOrder
    clientId?: SortOrderInput | SortOrder
    createdById?: SortOrder
    closedById?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    technician?: UserOrderByWithRelationInput
    client?: ClientOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
    closedBy?: UserOrderByWithRelationInput
    category?: ServiceCategoryOrderByWithRelationInput
    payment?: PaymentOrderByWithRelationInput
    estimate?: EstimateOrderByWithRelationInput
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    title?: StringFilter<"Service"> | string
    description?: StringNullableFilter<"Service"> | string | null
    status?: EnumServiceStatusFilter<"Service"> | $Enums.ServiceStatus
    scheduledDate?: DateTimeFilter<"Service"> | Date | string
    scheduledTime?: StringFilter<"Service"> | string
    address?: StringNullableFilter<"Service"> | string | null
    completedAt?: DateTimeNullableFilter<"Service"> | Date | string | null
    notes?: StringNullableFilter<"Service"> | string | null
    expectedAmount?: DecimalNullableFilter<"Service"> | Decimal | DecimalJsLike | number | string | null
    closedAt?: DateTimeNullableFilter<"Service"> | Date | string | null
    isLocked?: BoolFilter<"Service"> | boolean
    technicianId?: StringNullableFilter<"Service"> | string | null
    clientId?: StringNullableFilter<"Service"> | string | null
    createdById?: StringFilter<"Service"> | string
    closedById?: StringNullableFilter<"Service"> | string | null
    categoryId?: StringNullableFilter<"Service"> | string | null
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    technician?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    client?: XOR<ClientNullableScalarRelationFilter, ClientWhereInput> | null
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    closedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    category?: XOR<ServiceCategoryNullableScalarRelationFilter, ServiceCategoryWhereInput> | null
    payment?: XOR<PaymentNullableScalarRelationFilter, PaymentWhereInput> | null
    estimate?: XOR<EstimateNullableScalarRelationFilter, EstimateWhereInput> | null
  }, "id">

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    scheduledDate?: SortOrder
    scheduledTime?: SortOrder
    address?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    expectedAmount?: SortOrderInput | SortOrder
    closedAt?: SortOrderInput | SortOrder
    isLocked?: SortOrder
    technicianId?: SortOrderInput | SortOrder
    clientId?: SortOrderInput | SortOrder
    createdById?: SortOrder
    closedById?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _avg?: ServiceAvgOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
    _sum?: ServiceSumOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Service"> | string
    title?: StringWithAggregatesFilter<"Service"> | string
    description?: StringNullableWithAggregatesFilter<"Service"> | string | null
    status?: EnumServiceStatusWithAggregatesFilter<"Service"> | $Enums.ServiceStatus
    scheduledDate?: DateTimeWithAggregatesFilter<"Service"> | Date | string
    scheduledTime?: StringWithAggregatesFilter<"Service"> | string
    address?: StringNullableWithAggregatesFilter<"Service"> | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"Service"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"Service"> | string | null
    expectedAmount?: DecimalNullableWithAggregatesFilter<"Service"> | Decimal | DecimalJsLike | number | string | null
    closedAt?: DateTimeNullableWithAggregatesFilter<"Service"> | Date | string | null
    isLocked?: BoolWithAggregatesFilter<"Service"> | boolean
    technicianId?: StringNullableWithAggregatesFilter<"Service"> | string | null
    clientId?: StringNullableWithAggregatesFilter<"Service"> | string | null
    createdById?: StringWithAggregatesFilter<"Service"> | string
    closedById?: StringNullableWithAggregatesFilter<"Service"> | string | null
    categoryId?: StringNullableWithAggregatesFilter<"Service"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    method?: EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod
    amountPaid?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    sparePartsCost?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    hasDebt?: BoolFilter<"Payment"> | boolean
    receiptPhotoUrl?: StringNullableFilter<"Payment"> | string | null
    notes?: StringNullableFilter<"Payment"> | string | null
    technicianId?: StringFilter<"Payment"> | string
    serviceId?: StringFilter<"Payment"> | string
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    technician?: XOR<UserScalarRelationFilter, UserWhereInput>
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    method?: SortOrder
    amountPaid?: SortOrder
    sparePartsCost?: SortOrder
    debtAmount?: SortOrder
    hasDebt?: SortOrder
    receiptPhotoUrl?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    technicianId?: SortOrder
    serviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    technician?: UserOrderByWithRelationInput
    service?: ServiceOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    serviceId?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    method?: EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod
    amountPaid?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    sparePartsCost?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    hasDebt?: BoolFilter<"Payment"> | boolean
    receiptPhotoUrl?: StringNullableFilter<"Payment"> | string | null
    notes?: StringNullableFilter<"Payment"> | string | null
    technicianId?: StringFilter<"Payment"> | string
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    technician?: XOR<UserScalarRelationFilter, UserWhereInput>
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }, "id" | "serviceId">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    method?: SortOrder
    amountPaid?: SortOrder
    sparePartsCost?: SortOrder
    debtAmount?: SortOrder
    hasDebt?: SortOrder
    receiptPhotoUrl?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    technicianId?: SortOrder
    serviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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
    method?: EnumPaymentMethodWithAggregatesFilter<"Payment"> | $Enums.PaymentMethod
    amountPaid?: DecimalWithAggregatesFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    sparePartsCost?: DecimalWithAggregatesFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalWithAggregatesFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    hasDebt?: BoolWithAggregatesFilter<"Payment"> | boolean
    receiptPhotoUrl?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    technicianId?: StringWithAggregatesFilter<"Payment"> | string
    serviceId?: StringWithAggregatesFilter<"Payment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type EstimateWhereInput = {
    AND?: EstimateWhereInput | EstimateWhereInput[]
    OR?: EstimateWhereInput[]
    NOT?: EstimateWhereInput | EstimateWhereInput[]
    id?: StringFilter<"Estimate"> | string
    serviceId?: StringFilter<"Estimate"> | string
    technicianId?: StringFilter<"Estimate"> | string
    clientId?: StringFilter<"Estimate"> | string
    amount?: DecimalFilter<"Estimate"> | Decimal | DecimalJsLike | number | string
    description?: StringNullableFilter<"Estimate"> | string | null
    status?: EnumEstimateStatusFilter<"Estimate"> | $Enums.EstimateStatus
    createdAt?: DateTimeFilter<"Estimate"> | Date | string
    updatedAt?: DateTimeFilter<"Estimate"> | Date | string
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
    technician?: XOR<UserScalarRelationFilter, UserWhereInput>
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
  }

  export type EstimateOrderByWithRelationInput = {
    id?: SortOrder
    serviceId?: SortOrder
    technicianId?: SortOrder
    clientId?: SortOrder
    amount?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    service?: ServiceOrderByWithRelationInput
    technician?: UserOrderByWithRelationInput
    client?: ClientOrderByWithRelationInput
  }

  export type EstimateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    serviceId?: string
    AND?: EstimateWhereInput | EstimateWhereInput[]
    OR?: EstimateWhereInput[]
    NOT?: EstimateWhereInput | EstimateWhereInput[]
    technicianId?: StringFilter<"Estimate"> | string
    clientId?: StringFilter<"Estimate"> | string
    amount?: DecimalFilter<"Estimate"> | Decimal | DecimalJsLike | number | string
    description?: StringNullableFilter<"Estimate"> | string | null
    status?: EnumEstimateStatusFilter<"Estimate"> | $Enums.EstimateStatus
    createdAt?: DateTimeFilter<"Estimate"> | Date | string
    updatedAt?: DateTimeFilter<"Estimate"> | Date | string
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
    technician?: XOR<UserScalarRelationFilter, UserWhereInput>
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
  }, "id" | "serviceId">

  export type EstimateOrderByWithAggregationInput = {
    id?: SortOrder
    serviceId?: SortOrder
    technicianId?: SortOrder
    clientId?: SortOrder
    amount?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EstimateCountOrderByAggregateInput
    _avg?: EstimateAvgOrderByAggregateInput
    _max?: EstimateMaxOrderByAggregateInput
    _min?: EstimateMinOrderByAggregateInput
    _sum?: EstimateSumOrderByAggregateInput
  }

  export type EstimateScalarWhereWithAggregatesInput = {
    AND?: EstimateScalarWhereWithAggregatesInput | EstimateScalarWhereWithAggregatesInput[]
    OR?: EstimateScalarWhereWithAggregatesInput[]
    NOT?: EstimateScalarWhereWithAggregatesInput | EstimateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Estimate"> | string
    serviceId?: StringWithAggregatesFilter<"Estimate"> | string
    technicianId?: StringWithAggregatesFilter<"Estimate"> | string
    clientId?: StringWithAggregatesFilter<"Estimate"> | string
    amount?: DecimalWithAggregatesFilter<"Estimate"> | Decimal | DecimalJsLike | number | string
    description?: StringNullableWithAggregatesFilter<"Estimate"> | string | null
    status?: EnumEstimateStatusWithAggregatesFilter<"Estimate"> | $Enums.EstimateStatus
    createdAt?: DateTimeWithAggregatesFilter<"Estimate"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Estimate"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    role: $Enums.Role
    avatar?: string | null
    passwordHash: string
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    servicesAsTechnician?: ServiceCreateNestedManyWithoutTechnicianInput
    servicesCreated?: ServiceCreateNestedManyWithoutCreatedByInput
    servicesClosed?: ServiceCreateNestedManyWithoutClosedByInput
    payments?: PaymentCreateNestedManyWithoutTechnicianInput
    estimates?: EstimateCreateNestedManyWithoutTechnicianInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    role: $Enums.Role
    avatar?: string | null
    passwordHash: string
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    servicesAsTechnician?: ServiceUncheckedCreateNestedManyWithoutTechnicianInput
    servicesCreated?: ServiceUncheckedCreateNestedManyWithoutCreatedByInput
    servicesClosed?: ServiceUncheckedCreateNestedManyWithoutClosedByInput
    payments?: PaymentUncheckedCreateNestedManyWithoutTechnicianInput
    estimates?: EstimateUncheckedCreateNestedManyWithoutTechnicianInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servicesAsTechnician?: ServiceUpdateManyWithoutTechnicianNestedInput
    servicesCreated?: ServiceUpdateManyWithoutCreatedByNestedInput
    servicesClosed?: ServiceUpdateManyWithoutClosedByNestedInput
    payments?: PaymentUpdateManyWithoutTechnicianNestedInput
    estimates?: EstimateUpdateManyWithoutTechnicianNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servicesAsTechnician?: ServiceUncheckedUpdateManyWithoutTechnicianNestedInput
    servicesCreated?: ServiceUncheckedUpdateManyWithoutCreatedByNestedInput
    servicesClosed?: ServiceUncheckedUpdateManyWithoutClosedByNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutTechnicianNestedInput
    estimates?: EstimateUncheckedUpdateManyWithoutTechnicianNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    role: $Enums.Role
    avatar?: string | null
    passwordHash: string
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientCreateInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    address?: string | null
    city?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceCreateNestedManyWithoutClientInput
    estimates?: EstimateCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    address?: string | null
    city?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutClientInput
    estimates?: EstimateUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUpdateManyWithoutClientNestedInput
    estimates?: EstimateUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutClientNestedInput
    estimates?: EstimateUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientCreateManyInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    address?: string | null
    city?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCategoryCreateInput = {
    id?: string
    name: string
    description?: string | null
    color?: string | null
    icon?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceCreateNestedManyWithoutCategoryInput
  }

  export type ServiceCategoryUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    color?: string | null
    icon?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type ServiceCategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUpdateManyWithoutCategoryNestedInput
  }

  export type ServiceCategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type ServiceCategoryCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    color?: string | null
    icon?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ServiceStatus
    scheduledDate: Date | string
    scheduledTime: string
    address?: string | null
    completedAt?: Date | string | null
    notes?: string | null
    expectedAmount?: Decimal | DecimalJsLike | number | string | null
    closedAt?: Date | string | null
    isLocked?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    technician?: UserCreateNestedOneWithoutServicesAsTechnicianInput
    client?: ClientCreateNestedOneWithoutServicesInput
    createdBy: UserCreateNestedOneWithoutServicesCreatedInput
    closedBy?: UserCreateNestedOneWithoutServicesClosedInput
    category?: ServiceCategoryCreateNestedOneWithoutServicesInput
    payment?: PaymentCreateNestedOneWithoutServiceInput
    estimate?: EstimateCreateNestedOneWithoutServiceInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ServiceStatus
    scheduledDate: Date | string
    scheduledTime: string
    address?: string | null
    completedAt?: Date | string | null
    notes?: string | null
    expectedAmount?: Decimal | DecimalJsLike | number | string | null
    closedAt?: Date | string | null
    isLocked?: boolean
    technicianId?: string | null
    clientId?: string | null
    createdById: string
    closedById?: string | null
    categoryId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payment?: PaymentUncheckedCreateNestedOneWithoutServiceInput
    estimate?: EstimateUncheckedCreateNestedOneWithoutServiceInput
  }

  export type ServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTime?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    expectedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    technician?: UserUpdateOneWithoutServicesAsTechnicianNestedInput
    client?: ClientUpdateOneWithoutServicesNestedInput
    createdBy?: UserUpdateOneRequiredWithoutServicesCreatedNestedInput
    closedBy?: UserUpdateOneWithoutServicesClosedNestedInput
    category?: ServiceCategoryUpdateOneWithoutServicesNestedInput
    payment?: PaymentUpdateOneWithoutServiceNestedInput
    estimate?: EstimateUpdateOneWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTime?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    expectedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    technicianId?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    closedById?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUncheckedUpdateOneWithoutServiceNestedInput
    estimate?: EstimateUncheckedUpdateOneWithoutServiceNestedInput
  }

  export type ServiceCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ServiceStatus
    scheduledDate: Date | string
    scheduledTime: string
    address?: string | null
    completedAt?: Date | string | null
    notes?: string | null
    expectedAmount?: Decimal | DecimalJsLike | number | string | null
    closedAt?: Date | string | null
    isLocked?: boolean
    technicianId?: string | null
    clientId?: string | null
    createdById: string
    closedById?: string | null
    categoryId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTime?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    expectedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTime?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    expectedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    technicianId?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    closedById?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    id?: string
    method: $Enums.PaymentMethod
    amountPaid: Decimal | DecimalJsLike | number | string
    sparePartsCost?: Decimal | DecimalJsLike | number | string
    debtAmount?: Decimal | DecimalJsLike | number | string
    hasDebt?: boolean
    receiptPhotoUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    technician: UserCreateNestedOneWithoutPaymentsInput
    service: ServiceCreateNestedOneWithoutPaymentInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    method: $Enums.PaymentMethod
    amountPaid: Decimal | DecimalJsLike | number | string
    sparePartsCost?: Decimal | DecimalJsLike | number | string
    debtAmount?: Decimal | DecimalJsLike | number | string
    hasDebt?: boolean
    receiptPhotoUrl?: string | null
    notes?: string | null
    technicianId: string
    serviceId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sparePartsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    hasDebt?: BoolFieldUpdateOperationsInput | boolean
    receiptPhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    technician?: UserUpdateOneRequiredWithoutPaymentsNestedInput
    service?: ServiceUpdateOneRequiredWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sparePartsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    hasDebt?: BoolFieldUpdateOperationsInput | boolean
    receiptPhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    technicianId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInput = {
    id?: string
    method: $Enums.PaymentMethod
    amountPaid: Decimal | DecimalJsLike | number | string
    sparePartsCost?: Decimal | DecimalJsLike | number | string
    debtAmount?: Decimal | DecimalJsLike | number | string
    hasDebt?: boolean
    receiptPhotoUrl?: string | null
    notes?: string | null
    technicianId: string
    serviceId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sparePartsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    hasDebt?: BoolFieldUpdateOperationsInput | boolean
    receiptPhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sparePartsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    hasDebt?: BoolFieldUpdateOperationsInput | boolean
    receiptPhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    technicianId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EstimateCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    status?: $Enums.EstimateStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    service: ServiceCreateNestedOneWithoutEstimateInput
    technician: UserCreateNestedOneWithoutEstimatesInput
    client: ClientCreateNestedOneWithoutEstimatesInput
  }

  export type EstimateUncheckedCreateInput = {
    id?: string
    serviceId: string
    technicianId: string
    clientId: string
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    status?: $Enums.EstimateStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EstimateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEstimateStatusFieldUpdateOperationsInput | $Enums.EstimateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    service?: ServiceUpdateOneRequiredWithoutEstimateNestedInput
    technician?: UserUpdateOneRequiredWithoutEstimatesNestedInput
    client?: ClientUpdateOneRequiredWithoutEstimatesNestedInput
  }

  export type EstimateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    technicianId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEstimateStatusFieldUpdateOperationsInput | $Enums.EstimateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EstimateCreateManyInput = {
    id?: string
    serviceId: string
    technicianId: string
    clientId: string
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    status?: $Enums.EstimateStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EstimateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEstimateStatusFieldUpdateOperationsInput | $Enums.EstimateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EstimateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    technicianId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEstimateStatusFieldUpdateOperationsInput | $Enums.EstimateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type ServiceListRelationFilter = {
    every?: ServiceWhereInput
    some?: ServiceWhereInput
    none?: ServiceWhereInput
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type EstimateListRelationFilter = {
    every?: EstimateWhereInput
    some?: EstimateWhereInput
    none?: EstimateWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EstimateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatar?: SortOrder
    passwordHash?: SortOrder
    phone?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatar?: SortOrder
    passwordHash?: SortOrder
    phone?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatar?: SortOrder
    passwordHash?: SortOrder
    phone?: SortOrder
    isActive?: SortOrder
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

  export type ClientCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    city?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    city?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    city?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumServiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusFilter<$PrismaModel> | $Enums.ServiceStatus
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

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ClientNullableScalarRelationFilter = {
    is?: ClientWhereInput | null
    isNot?: ClientWhereInput | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ServiceCategoryNullableScalarRelationFilter = {
    is?: ServiceCategoryWhereInput | null
    isNot?: ServiceCategoryWhereInput | null
  }

  export type PaymentNullableScalarRelationFilter = {
    is?: PaymentWhereInput | null
    isNot?: PaymentWhereInput | null
  }

  export type EstimateNullableScalarRelationFilter = {
    is?: EstimateWhereInput | null
    isNot?: EstimateWhereInput | null
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    scheduledDate?: SortOrder
    scheduledTime?: SortOrder
    address?: SortOrder
    completedAt?: SortOrder
    notes?: SortOrder
    expectedAmount?: SortOrder
    closedAt?: SortOrder
    isLocked?: SortOrder
    technicianId?: SortOrder
    clientId?: SortOrder
    createdById?: SortOrder
    closedById?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceAvgOrderByAggregateInput = {
    expectedAmount?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    scheduledDate?: SortOrder
    scheduledTime?: SortOrder
    address?: SortOrder
    completedAt?: SortOrder
    notes?: SortOrder
    expectedAmount?: SortOrder
    closedAt?: SortOrder
    isLocked?: SortOrder
    technicianId?: SortOrder
    clientId?: SortOrder
    createdById?: SortOrder
    closedById?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    scheduledDate?: SortOrder
    scheduledTime?: SortOrder
    address?: SortOrder
    completedAt?: SortOrder
    notes?: SortOrder
    expectedAmount?: SortOrder
    closedAt?: SortOrder
    isLocked?: SortOrder
    technicianId?: SortOrder
    clientId?: SortOrder
    createdById?: SortOrder
    closedById?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceSumOrderByAggregateInput = {
    expectedAmount?: SortOrder
  }

  export type EnumServiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.ServiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceStatusFilter<$PrismaModel>
    _max?: NestedEnumServiceStatusFilter<$PrismaModel>
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

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type EnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
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

  export type ServiceScalarRelationFilter = {
    is?: ServiceWhereInput
    isNot?: ServiceWhereInput
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    method?: SortOrder
    amountPaid?: SortOrder
    sparePartsCost?: SortOrder
    debtAmount?: SortOrder
    hasDebt?: SortOrder
    receiptPhotoUrl?: SortOrder
    notes?: SortOrder
    technicianId?: SortOrder
    serviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    amountPaid?: SortOrder
    sparePartsCost?: SortOrder
    debtAmount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    method?: SortOrder
    amountPaid?: SortOrder
    sparePartsCost?: SortOrder
    debtAmount?: SortOrder
    hasDebt?: SortOrder
    receiptPhotoUrl?: SortOrder
    notes?: SortOrder
    technicianId?: SortOrder
    serviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    method?: SortOrder
    amountPaid?: SortOrder
    sparePartsCost?: SortOrder
    debtAmount?: SortOrder
    hasDebt?: SortOrder
    receiptPhotoUrl?: SortOrder
    notes?: SortOrder
    technicianId?: SortOrder
    serviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    amountPaid?: SortOrder
    sparePartsCost?: SortOrder
    debtAmount?: SortOrder
  }

  export type EnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
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

  export type EnumEstimateStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EstimateStatus | EnumEstimateStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EstimateStatus[] | ListEnumEstimateStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstimateStatus[] | ListEnumEstimateStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEstimateStatusFilter<$PrismaModel> | $Enums.EstimateStatus
  }

  export type ClientScalarRelationFilter = {
    is?: ClientWhereInput
    isNot?: ClientWhereInput
  }

  export type EstimateCountOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    technicianId?: SortOrder
    clientId?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EstimateAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EstimateMaxOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    technicianId?: SortOrder
    clientId?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EstimateMinOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    technicianId?: SortOrder
    clientId?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EstimateSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumEstimateStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstimateStatus | EnumEstimateStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EstimateStatus[] | ListEnumEstimateStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstimateStatus[] | ListEnumEstimateStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEstimateStatusWithAggregatesFilter<$PrismaModel> | $Enums.EstimateStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstimateStatusFilter<$PrismaModel>
    _max?: NestedEnumEstimateStatusFilter<$PrismaModel>
  }

  export type ServiceCreateNestedManyWithoutTechnicianInput = {
    create?: XOR<ServiceCreateWithoutTechnicianInput, ServiceUncheckedCreateWithoutTechnicianInput> | ServiceCreateWithoutTechnicianInput[] | ServiceUncheckedCreateWithoutTechnicianInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutTechnicianInput | ServiceCreateOrConnectWithoutTechnicianInput[]
    createMany?: ServiceCreateManyTechnicianInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type ServiceCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ServiceCreateWithoutCreatedByInput, ServiceUncheckedCreateWithoutCreatedByInput> | ServiceCreateWithoutCreatedByInput[] | ServiceUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCreatedByInput | ServiceCreateOrConnectWithoutCreatedByInput[]
    createMany?: ServiceCreateManyCreatedByInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type ServiceCreateNestedManyWithoutClosedByInput = {
    create?: XOR<ServiceCreateWithoutClosedByInput, ServiceUncheckedCreateWithoutClosedByInput> | ServiceCreateWithoutClosedByInput[] | ServiceUncheckedCreateWithoutClosedByInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutClosedByInput | ServiceCreateOrConnectWithoutClosedByInput[]
    createMany?: ServiceCreateManyClosedByInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutTechnicianInput = {
    create?: XOR<PaymentCreateWithoutTechnicianInput, PaymentUncheckedCreateWithoutTechnicianInput> | PaymentCreateWithoutTechnicianInput[] | PaymentUncheckedCreateWithoutTechnicianInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutTechnicianInput | PaymentCreateOrConnectWithoutTechnicianInput[]
    createMany?: PaymentCreateManyTechnicianInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type EstimateCreateNestedManyWithoutTechnicianInput = {
    create?: XOR<EstimateCreateWithoutTechnicianInput, EstimateUncheckedCreateWithoutTechnicianInput> | EstimateCreateWithoutTechnicianInput[] | EstimateUncheckedCreateWithoutTechnicianInput[]
    connectOrCreate?: EstimateCreateOrConnectWithoutTechnicianInput | EstimateCreateOrConnectWithoutTechnicianInput[]
    createMany?: EstimateCreateManyTechnicianInputEnvelope
    connect?: EstimateWhereUniqueInput | EstimateWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutTechnicianInput = {
    create?: XOR<ServiceCreateWithoutTechnicianInput, ServiceUncheckedCreateWithoutTechnicianInput> | ServiceCreateWithoutTechnicianInput[] | ServiceUncheckedCreateWithoutTechnicianInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutTechnicianInput | ServiceCreateOrConnectWithoutTechnicianInput[]
    createMany?: ServiceCreateManyTechnicianInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ServiceCreateWithoutCreatedByInput, ServiceUncheckedCreateWithoutCreatedByInput> | ServiceCreateWithoutCreatedByInput[] | ServiceUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCreatedByInput | ServiceCreateOrConnectWithoutCreatedByInput[]
    createMany?: ServiceCreateManyCreatedByInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutClosedByInput = {
    create?: XOR<ServiceCreateWithoutClosedByInput, ServiceUncheckedCreateWithoutClosedByInput> | ServiceCreateWithoutClosedByInput[] | ServiceUncheckedCreateWithoutClosedByInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutClosedByInput | ServiceCreateOrConnectWithoutClosedByInput[]
    createMany?: ServiceCreateManyClosedByInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutTechnicianInput = {
    create?: XOR<PaymentCreateWithoutTechnicianInput, PaymentUncheckedCreateWithoutTechnicianInput> | PaymentCreateWithoutTechnicianInput[] | PaymentUncheckedCreateWithoutTechnicianInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutTechnicianInput | PaymentCreateOrConnectWithoutTechnicianInput[]
    createMany?: PaymentCreateManyTechnicianInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type EstimateUncheckedCreateNestedManyWithoutTechnicianInput = {
    create?: XOR<EstimateCreateWithoutTechnicianInput, EstimateUncheckedCreateWithoutTechnicianInput> | EstimateCreateWithoutTechnicianInput[] | EstimateUncheckedCreateWithoutTechnicianInput[]
    connectOrCreate?: EstimateCreateOrConnectWithoutTechnicianInput | EstimateCreateOrConnectWithoutTechnicianInput[]
    createMany?: EstimateCreateManyTechnicianInputEnvelope
    connect?: EstimateWhereUniqueInput | EstimateWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ServiceUpdateManyWithoutTechnicianNestedInput = {
    create?: XOR<ServiceCreateWithoutTechnicianInput, ServiceUncheckedCreateWithoutTechnicianInput> | ServiceCreateWithoutTechnicianInput[] | ServiceUncheckedCreateWithoutTechnicianInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutTechnicianInput | ServiceCreateOrConnectWithoutTechnicianInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutTechnicianInput | ServiceUpsertWithWhereUniqueWithoutTechnicianInput[]
    createMany?: ServiceCreateManyTechnicianInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutTechnicianInput | ServiceUpdateWithWhereUniqueWithoutTechnicianInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutTechnicianInput | ServiceUpdateManyWithWhereWithoutTechnicianInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type ServiceUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ServiceCreateWithoutCreatedByInput, ServiceUncheckedCreateWithoutCreatedByInput> | ServiceCreateWithoutCreatedByInput[] | ServiceUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCreatedByInput | ServiceCreateOrConnectWithoutCreatedByInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutCreatedByInput | ServiceUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ServiceCreateManyCreatedByInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutCreatedByInput | ServiceUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutCreatedByInput | ServiceUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type ServiceUpdateManyWithoutClosedByNestedInput = {
    create?: XOR<ServiceCreateWithoutClosedByInput, ServiceUncheckedCreateWithoutClosedByInput> | ServiceCreateWithoutClosedByInput[] | ServiceUncheckedCreateWithoutClosedByInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutClosedByInput | ServiceCreateOrConnectWithoutClosedByInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutClosedByInput | ServiceUpsertWithWhereUniqueWithoutClosedByInput[]
    createMany?: ServiceCreateManyClosedByInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutClosedByInput | ServiceUpdateWithWhereUniqueWithoutClosedByInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutClosedByInput | ServiceUpdateManyWithWhereWithoutClosedByInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutTechnicianNestedInput = {
    create?: XOR<PaymentCreateWithoutTechnicianInput, PaymentUncheckedCreateWithoutTechnicianInput> | PaymentCreateWithoutTechnicianInput[] | PaymentUncheckedCreateWithoutTechnicianInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutTechnicianInput | PaymentCreateOrConnectWithoutTechnicianInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutTechnicianInput | PaymentUpsertWithWhereUniqueWithoutTechnicianInput[]
    createMany?: PaymentCreateManyTechnicianInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutTechnicianInput | PaymentUpdateWithWhereUniqueWithoutTechnicianInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutTechnicianInput | PaymentUpdateManyWithWhereWithoutTechnicianInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type EstimateUpdateManyWithoutTechnicianNestedInput = {
    create?: XOR<EstimateCreateWithoutTechnicianInput, EstimateUncheckedCreateWithoutTechnicianInput> | EstimateCreateWithoutTechnicianInput[] | EstimateUncheckedCreateWithoutTechnicianInput[]
    connectOrCreate?: EstimateCreateOrConnectWithoutTechnicianInput | EstimateCreateOrConnectWithoutTechnicianInput[]
    upsert?: EstimateUpsertWithWhereUniqueWithoutTechnicianInput | EstimateUpsertWithWhereUniqueWithoutTechnicianInput[]
    createMany?: EstimateCreateManyTechnicianInputEnvelope
    set?: EstimateWhereUniqueInput | EstimateWhereUniqueInput[]
    disconnect?: EstimateWhereUniqueInput | EstimateWhereUniqueInput[]
    delete?: EstimateWhereUniqueInput | EstimateWhereUniqueInput[]
    connect?: EstimateWhereUniqueInput | EstimateWhereUniqueInput[]
    update?: EstimateUpdateWithWhereUniqueWithoutTechnicianInput | EstimateUpdateWithWhereUniqueWithoutTechnicianInput[]
    updateMany?: EstimateUpdateManyWithWhereWithoutTechnicianInput | EstimateUpdateManyWithWhereWithoutTechnicianInput[]
    deleteMany?: EstimateScalarWhereInput | EstimateScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutTechnicianNestedInput = {
    create?: XOR<ServiceCreateWithoutTechnicianInput, ServiceUncheckedCreateWithoutTechnicianInput> | ServiceCreateWithoutTechnicianInput[] | ServiceUncheckedCreateWithoutTechnicianInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutTechnicianInput | ServiceCreateOrConnectWithoutTechnicianInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutTechnicianInput | ServiceUpsertWithWhereUniqueWithoutTechnicianInput[]
    createMany?: ServiceCreateManyTechnicianInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutTechnicianInput | ServiceUpdateWithWhereUniqueWithoutTechnicianInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutTechnicianInput | ServiceUpdateManyWithWhereWithoutTechnicianInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ServiceCreateWithoutCreatedByInput, ServiceUncheckedCreateWithoutCreatedByInput> | ServiceCreateWithoutCreatedByInput[] | ServiceUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCreatedByInput | ServiceCreateOrConnectWithoutCreatedByInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutCreatedByInput | ServiceUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ServiceCreateManyCreatedByInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutCreatedByInput | ServiceUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutCreatedByInput | ServiceUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutClosedByNestedInput = {
    create?: XOR<ServiceCreateWithoutClosedByInput, ServiceUncheckedCreateWithoutClosedByInput> | ServiceCreateWithoutClosedByInput[] | ServiceUncheckedCreateWithoutClosedByInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutClosedByInput | ServiceCreateOrConnectWithoutClosedByInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutClosedByInput | ServiceUpsertWithWhereUniqueWithoutClosedByInput[]
    createMany?: ServiceCreateManyClosedByInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutClosedByInput | ServiceUpdateWithWhereUniqueWithoutClosedByInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutClosedByInput | ServiceUpdateManyWithWhereWithoutClosedByInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutTechnicianNestedInput = {
    create?: XOR<PaymentCreateWithoutTechnicianInput, PaymentUncheckedCreateWithoutTechnicianInput> | PaymentCreateWithoutTechnicianInput[] | PaymentUncheckedCreateWithoutTechnicianInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutTechnicianInput | PaymentCreateOrConnectWithoutTechnicianInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutTechnicianInput | PaymentUpsertWithWhereUniqueWithoutTechnicianInput[]
    createMany?: PaymentCreateManyTechnicianInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutTechnicianInput | PaymentUpdateWithWhereUniqueWithoutTechnicianInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutTechnicianInput | PaymentUpdateManyWithWhereWithoutTechnicianInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type EstimateUncheckedUpdateManyWithoutTechnicianNestedInput = {
    create?: XOR<EstimateCreateWithoutTechnicianInput, EstimateUncheckedCreateWithoutTechnicianInput> | EstimateCreateWithoutTechnicianInput[] | EstimateUncheckedCreateWithoutTechnicianInput[]
    connectOrCreate?: EstimateCreateOrConnectWithoutTechnicianInput | EstimateCreateOrConnectWithoutTechnicianInput[]
    upsert?: EstimateUpsertWithWhereUniqueWithoutTechnicianInput | EstimateUpsertWithWhereUniqueWithoutTechnicianInput[]
    createMany?: EstimateCreateManyTechnicianInputEnvelope
    set?: EstimateWhereUniqueInput | EstimateWhereUniqueInput[]
    disconnect?: EstimateWhereUniqueInput | EstimateWhereUniqueInput[]
    delete?: EstimateWhereUniqueInput | EstimateWhereUniqueInput[]
    connect?: EstimateWhereUniqueInput | EstimateWhereUniqueInput[]
    update?: EstimateUpdateWithWhereUniqueWithoutTechnicianInput | EstimateUpdateWithWhereUniqueWithoutTechnicianInput[]
    updateMany?: EstimateUpdateManyWithWhereWithoutTechnicianInput | EstimateUpdateManyWithWhereWithoutTechnicianInput[]
    deleteMany?: EstimateScalarWhereInput | EstimateScalarWhereInput[]
  }

  export type ServiceCreateNestedManyWithoutClientInput = {
    create?: XOR<ServiceCreateWithoutClientInput, ServiceUncheckedCreateWithoutClientInput> | ServiceCreateWithoutClientInput[] | ServiceUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutClientInput | ServiceCreateOrConnectWithoutClientInput[]
    createMany?: ServiceCreateManyClientInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type EstimateCreateNestedManyWithoutClientInput = {
    create?: XOR<EstimateCreateWithoutClientInput, EstimateUncheckedCreateWithoutClientInput> | EstimateCreateWithoutClientInput[] | EstimateUncheckedCreateWithoutClientInput[]
    connectOrCreate?: EstimateCreateOrConnectWithoutClientInput | EstimateCreateOrConnectWithoutClientInput[]
    createMany?: EstimateCreateManyClientInputEnvelope
    connect?: EstimateWhereUniqueInput | EstimateWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<ServiceCreateWithoutClientInput, ServiceUncheckedCreateWithoutClientInput> | ServiceCreateWithoutClientInput[] | ServiceUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutClientInput | ServiceCreateOrConnectWithoutClientInput[]
    createMany?: ServiceCreateManyClientInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type EstimateUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<EstimateCreateWithoutClientInput, EstimateUncheckedCreateWithoutClientInput> | EstimateCreateWithoutClientInput[] | EstimateUncheckedCreateWithoutClientInput[]
    connectOrCreate?: EstimateCreateOrConnectWithoutClientInput | EstimateCreateOrConnectWithoutClientInput[]
    createMany?: EstimateCreateManyClientInputEnvelope
    connect?: EstimateWhereUniqueInput | EstimateWhereUniqueInput[]
  }

  export type ServiceUpdateManyWithoutClientNestedInput = {
    create?: XOR<ServiceCreateWithoutClientInput, ServiceUncheckedCreateWithoutClientInput> | ServiceCreateWithoutClientInput[] | ServiceUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutClientInput | ServiceCreateOrConnectWithoutClientInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutClientInput | ServiceUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: ServiceCreateManyClientInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutClientInput | ServiceUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutClientInput | ServiceUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type EstimateUpdateManyWithoutClientNestedInput = {
    create?: XOR<EstimateCreateWithoutClientInput, EstimateUncheckedCreateWithoutClientInput> | EstimateCreateWithoutClientInput[] | EstimateUncheckedCreateWithoutClientInput[]
    connectOrCreate?: EstimateCreateOrConnectWithoutClientInput | EstimateCreateOrConnectWithoutClientInput[]
    upsert?: EstimateUpsertWithWhereUniqueWithoutClientInput | EstimateUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: EstimateCreateManyClientInputEnvelope
    set?: EstimateWhereUniqueInput | EstimateWhereUniqueInput[]
    disconnect?: EstimateWhereUniqueInput | EstimateWhereUniqueInput[]
    delete?: EstimateWhereUniqueInput | EstimateWhereUniqueInput[]
    connect?: EstimateWhereUniqueInput | EstimateWhereUniqueInput[]
    update?: EstimateUpdateWithWhereUniqueWithoutClientInput | EstimateUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: EstimateUpdateManyWithWhereWithoutClientInput | EstimateUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: EstimateScalarWhereInput | EstimateScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<ServiceCreateWithoutClientInput, ServiceUncheckedCreateWithoutClientInput> | ServiceCreateWithoutClientInput[] | ServiceUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutClientInput | ServiceCreateOrConnectWithoutClientInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutClientInput | ServiceUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: ServiceCreateManyClientInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutClientInput | ServiceUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutClientInput | ServiceUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type EstimateUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<EstimateCreateWithoutClientInput, EstimateUncheckedCreateWithoutClientInput> | EstimateCreateWithoutClientInput[] | EstimateUncheckedCreateWithoutClientInput[]
    connectOrCreate?: EstimateCreateOrConnectWithoutClientInput | EstimateCreateOrConnectWithoutClientInput[]
    upsert?: EstimateUpsertWithWhereUniqueWithoutClientInput | EstimateUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: EstimateCreateManyClientInputEnvelope
    set?: EstimateWhereUniqueInput | EstimateWhereUniqueInput[]
    disconnect?: EstimateWhereUniqueInput | EstimateWhereUniqueInput[]
    delete?: EstimateWhereUniqueInput | EstimateWhereUniqueInput[]
    connect?: EstimateWhereUniqueInput | EstimateWhereUniqueInput[]
    update?: EstimateUpdateWithWhereUniqueWithoutClientInput | EstimateUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: EstimateUpdateManyWithWhereWithoutClientInput | EstimateUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: EstimateScalarWhereInput | EstimateScalarWhereInput[]
  }

  export type ServiceCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput> | ServiceCreateWithoutCategoryInput[] | ServiceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCategoryInput | ServiceCreateOrConnectWithoutCategoryInput[]
    createMany?: ServiceCreateManyCategoryInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput> | ServiceCreateWithoutCategoryInput[] | ServiceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCategoryInput | ServiceCreateOrConnectWithoutCategoryInput[]
    createMany?: ServiceCreateManyCategoryInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type ServiceUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput> | ServiceCreateWithoutCategoryInput[] | ServiceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCategoryInput | ServiceCreateOrConnectWithoutCategoryInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutCategoryInput | ServiceUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ServiceCreateManyCategoryInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutCategoryInput | ServiceUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutCategoryInput | ServiceUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput> | ServiceCreateWithoutCategoryInput[] | ServiceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCategoryInput | ServiceCreateOrConnectWithoutCategoryInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutCategoryInput | ServiceUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ServiceCreateManyCategoryInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutCategoryInput | ServiceUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutCategoryInput | ServiceUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutServicesAsTechnicianInput = {
    create?: XOR<UserCreateWithoutServicesAsTechnicianInput, UserUncheckedCreateWithoutServicesAsTechnicianInput>
    connectOrCreate?: UserCreateOrConnectWithoutServicesAsTechnicianInput
    connect?: UserWhereUniqueInput
  }

  export type ClientCreateNestedOneWithoutServicesInput = {
    create?: XOR<ClientCreateWithoutServicesInput, ClientUncheckedCreateWithoutServicesInput>
    connectOrCreate?: ClientCreateOrConnectWithoutServicesInput
    connect?: ClientWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutServicesCreatedInput = {
    create?: XOR<UserCreateWithoutServicesCreatedInput, UserUncheckedCreateWithoutServicesCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutServicesCreatedInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutServicesClosedInput = {
    create?: XOR<UserCreateWithoutServicesClosedInput, UserUncheckedCreateWithoutServicesClosedInput>
    connectOrCreate?: UserCreateOrConnectWithoutServicesClosedInput
    connect?: UserWhereUniqueInput
  }

  export type ServiceCategoryCreateNestedOneWithoutServicesInput = {
    create?: XOR<ServiceCategoryCreateWithoutServicesInput, ServiceCategoryUncheckedCreateWithoutServicesInput>
    connectOrCreate?: ServiceCategoryCreateOrConnectWithoutServicesInput
    connect?: ServiceCategoryWhereUniqueInput
  }

  export type PaymentCreateNestedOneWithoutServiceInput = {
    create?: XOR<PaymentCreateWithoutServiceInput, PaymentUncheckedCreateWithoutServiceInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutServiceInput
    connect?: PaymentWhereUniqueInput
  }

  export type EstimateCreateNestedOneWithoutServiceInput = {
    create?: XOR<EstimateCreateWithoutServiceInput, EstimateUncheckedCreateWithoutServiceInput>
    connectOrCreate?: EstimateCreateOrConnectWithoutServiceInput
    connect?: EstimateWhereUniqueInput
  }

  export type PaymentUncheckedCreateNestedOneWithoutServiceInput = {
    create?: XOR<PaymentCreateWithoutServiceInput, PaymentUncheckedCreateWithoutServiceInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutServiceInput
    connect?: PaymentWhereUniqueInput
  }

  export type EstimateUncheckedCreateNestedOneWithoutServiceInput = {
    create?: XOR<EstimateCreateWithoutServiceInput, EstimateUncheckedCreateWithoutServiceInput>
    connectOrCreate?: EstimateCreateOrConnectWithoutServiceInput
    connect?: EstimateWhereUniqueInput
  }

  export type EnumServiceStatusFieldUpdateOperationsInput = {
    set?: $Enums.ServiceStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type UserUpdateOneWithoutServicesAsTechnicianNestedInput = {
    create?: XOR<UserCreateWithoutServicesAsTechnicianInput, UserUncheckedCreateWithoutServicesAsTechnicianInput>
    connectOrCreate?: UserCreateOrConnectWithoutServicesAsTechnicianInput
    upsert?: UserUpsertWithoutServicesAsTechnicianInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutServicesAsTechnicianInput, UserUpdateWithoutServicesAsTechnicianInput>, UserUncheckedUpdateWithoutServicesAsTechnicianInput>
  }

  export type ClientUpdateOneWithoutServicesNestedInput = {
    create?: XOR<ClientCreateWithoutServicesInput, ClientUncheckedCreateWithoutServicesInput>
    connectOrCreate?: ClientCreateOrConnectWithoutServicesInput
    upsert?: ClientUpsertWithoutServicesInput
    disconnect?: ClientWhereInput | boolean
    delete?: ClientWhereInput | boolean
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutServicesInput, ClientUpdateWithoutServicesInput>, ClientUncheckedUpdateWithoutServicesInput>
  }

  export type UserUpdateOneRequiredWithoutServicesCreatedNestedInput = {
    create?: XOR<UserCreateWithoutServicesCreatedInput, UserUncheckedCreateWithoutServicesCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutServicesCreatedInput
    upsert?: UserUpsertWithoutServicesCreatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutServicesCreatedInput, UserUpdateWithoutServicesCreatedInput>, UserUncheckedUpdateWithoutServicesCreatedInput>
  }

  export type UserUpdateOneWithoutServicesClosedNestedInput = {
    create?: XOR<UserCreateWithoutServicesClosedInput, UserUncheckedCreateWithoutServicesClosedInput>
    connectOrCreate?: UserCreateOrConnectWithoutServicesClosedInput
    upsert?: UserUpsertWithoutServicesClosedInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutServicesClosedInput, UserUpdateWithoutServicesClosedInput>, UserUncheckedUpdateWithoutServicesClosedInput>
  }

  export type ServiceCategoryUpdateOneWithoutServicesNestedInput = {
    create?: XOR<ServiceCategoryCreateWithoutServicesInput, ServiceCategoryUncheckedCreateWithoutServicesInput>
    connectOrCreate?: ServiceCategoryCreateOrConnectWithoutServicesInput
    upsert?: ServiceCategoryUpsertWithoutServicesInput
    disconnect?: ServiceCategoryWhereInput | boolean
    delete?: ServiceCategoryWhereInput | boolean
    connect?: ServiceCategoryWhereUniqueInput
    update?: XOR<XOR<ServiceCategoryUpdateToOneWithWhereWithoutServicesInput, ServiceCategoryUpdateWithoutServicesInput>, ServiceCategoryUncheckedUpdateWithoutServicesInput>
  }

  export type PaymentUpdateOneWithoutServiceNestedInput = {
    create?: XOR<PaymentCreateWithoutServiceInput, PaymentUncheckedCreateWithoutServiceInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutServiceInput
    upsert?: PaymentUpsertWithoutServiceInput
    disconnect?: PaymentWhereInput | boolean
    delete?: PaymentWhereInput | boolean
    connect?: PaymentWhereUniqueInput
    update?: XOR<XOR<PaymentUpdateToOneWithWhereWithoutServiceInput, PaymentUpdateWithoutServiceInput>, PaymentUncheckedUpdateWithoutServiceInput>
  }

  export type EstimateUpdateOneWithoutServiceNestedInput = {
    create?: XOR<EstimateCreateWithoutServiceInput, EstimateUncheckedCreateWithoutServiceInput>
    connectOrCreate?: EstimateCreateOrConnectWithoutServiceInput
    upsert?: EstimateUpsertWithoutServiceInput
    disconnect?: EstimateWhereInput | boolean
    delete?: EstimateWhereInput | boolean
    connect?: EstimateWhereUniqueInput
    update?: XOR<XOR<EstimateUpdateToOneWithWhereWithoutServiceInput, EstimateUpdateWithoutServiceInput>, EstimateUncheckedUpdateWithoutServiceInput>
  }

  export type PaymentUncheckedUpdateOneWithoutServiceNestedInput = {
    create?: XOR<PaymentCreateWithoutServiceInput, PaymentUncheckedCreateWithoutServiceInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutServiceInput
    upsert?: PaymentUpsertWithoutServiceInput
    disconnect?: PaymentWhereInput | boolean
    delete?: PaymentWhereInput | boolean
    connect?: PaymentWhereUniqueInput
    update?: XOR<XOR<PaymentUpdateToOneWithWhereWithoutServiceInput, PaymentUpdateWithoutServiceInput>, PaymentUncheckedUpdateWithoutServiceInput>
  }

  export type EstimateUncheckedUpdateOneWithoutServiceNestedInput = {
    create?: XOR<EstimateCreateWithoutServiceInput, EstimateUncheckedCreateWithoutServiceInput>
    connectOrCreate?: EstimateCreateOrConnectWithoutServiceInput
    upsert?: EstimateUpsertWithoutServiceInput
    disconnect?: EstimateWhereInput | boolean
    delete?: EstimateWhereInput | boolean
    connect?: EstimateWhereUniqueInput
    update?: XOR<XOR<EstimateUpdateToOneWithWhereWithoutServiceInput, EstimateUpdateWithoutServiceInput>, EstimateUncheckedUpdateWithoutServiceInput>
  }

  export type UserCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsInput
    connect?: UserWhereUniqueInput
  }

  export type ServiceCreateNestedOneWithoutPaymentInput = {
    create?: XOR<ServiceCreateWithoutPaymentInput, ServiceUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutPaymentInput
    connect?: ServiceWhereUniqueInput
  }

  export type EnumPaymentMethodFieldUpdateOperationsInput = {
    set?: $Enums.PaymentMethod
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type UserUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsInput
    upsert?: UserUpsertWithoutPaymentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPaymentsInput, UserUpdateWithoutPaymentsInput>, UserUncheckedUpdateWithoutPaymentsInput>
  }

  export type ServiceUpdateOneRequiredWithoutPaymentNestedInput = {
    create?: XOR<ServiceCreateWithoutPaymentInput, ServiceUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutPaymentInput
    upsert?: ServiceUpsertWithoutPaymentInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutPaymentInput, ServiceUpdateWithoutPaymentInput>, ServiceUncheckedUpdateWithoutPaymentInput>
  }

  export type ServiceCreateNestedOneWithoutEstimateInput = {
    create?: XOR<ServiceCreateWithoutEstimateInput, ServiceUncheckedCreateWithoutEstimateInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutEstimateInput
    connect?: ServiceWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutEstimatesInput = {
    create?: XOR<UserCreateWithoutEstimatesInput, UserUncheckedCreateWithoutEstimatesInput>
    connectOrCreate?: UserCreateOrConnectWithoutEstimatesInput
    connect?: UserWhereUniqueInput
  }

  export type ClientCreateNestedOneWithoutEstimatesInput = {
    create?: XOR<ClientCreateWithoutEstimatesInput, ClientUncheckedCreateWithoutEstimatesInput>
    connectOrCreate?: ClientCreateOrConnectWithoutEstimatesInput
    connect?: ClientWhereUniqueInput
  }

  export type EnumEstimateStatusFieldUpdateOperationsInput = {
    set?: $Enums.EstimateStatus
  }

  export type ServiceUpdateOneRequiredWithoutEstimateNestedInput = {
    create?: XOR<ServiceCreateWithoutEstimateInput, ServiceUncheckedCreateWithoutEstimateInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutEstimateInput
    upsert?: ServiceUpsertWithoutEstimateInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutEstimateInput, ServiceUpdateWithoutEstimateInput>, ServiceUncheckedUpdateWithoutEstimateInput>
  }

  export type UserUpdateOneRequiredWithoutEstimatesNestedInput = {
    create?: XOR<UserCreateWithoutEstimatesInput, UserUncheckedCreateWithoutEstimatesInput>
    connectOrCreate?: UserCreateOrConnectWithoutEstimatesInput
    upsert?: UserUpsertWithoutEstimatesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEstimatesInput, UserUpdateWithoutEstimatesInput>, UserUncheckedUpdateWithoutEstimatesInput>
  }

  export type ClientUpdateOneRequiredWithoutEstimatesNestedInput = {
    create?: XOR<ClientCreateWithoutEstimatesInput, ClientUncheckedCreateWithoutEstimatesInput>
    connectOrCreate?: ClientCreateOrConnectWithoutEstimatesInput
    upsert?: ClientUpsertWithoutEstimatesInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutEstimatesInput, ClientUpdateWithoutEstimatesInput>, ClientUncheckedUpdateWithoutEstimatesInput>
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

  export type NestedEnumServiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusFilter<$PrismaModel> | $Enums.ServiceStatus
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

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedEnumServiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.ServiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceStatusFilter<$PrismaModel>
    _max?: NestedEnumServiceStatusFilter<$PrismaModel>
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

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedEnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
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

  export type NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
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

  export type NestedEnumEstimateStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EstimateStatus | EnumEstimateStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EstimateStatus[] | ListEnumEstimateStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstimateStatus[] | ListEnumEstimateStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEstimateStatusFilter<$PrismaModel> | $Enums.EstimateStatus
  }

  export type NestedEnumEstimateStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstimateStatus | EnumEstimateStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EstimateStatus[] | ListEnumEstimateStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstimateStatus[] | ListEnumEstimateStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEstimateStatusWithAggregatesFilter<$PrismaModel> | $Enums.EstimateStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstimateStatusFilter<$PrismaModel>
    _max?: NestedEnumEstimateStatusFilter<$PrismaModel>
  }

  export type ServiceCreateWithoutTechnicianInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ServiceStatus
    scheduledDate: Date | string
    scheduledTime: string
    address?: string | null
    completedAt?: Date | string | null
    notes?: string | null
    expectedAmount?: Decimal | DecimalJsLike | number | string | null
    closedAt?: Date | string | null
    isLocked?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    client?: ClientCreateNestedOneWithoutServicesInput
    createdBy: UserCreateNestedOneWithoutServicesCreatedInput
    closedBy?: UserCreateNestedOneWithoutServicesClosedInput
    category?: ServiceCategoryCreateNestedOneWithoutServicesInput
    payment?: PaymentCreateNestedOneWithoutServiceInput
    estimate?: EstimateCreateNestedOneWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutTechnicianInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ServiceStatus
    scheduledDate: Date | string
    scheduledTime: string
    address?: string | null
    completedAt?: Date | string | null
    notes?: string | null
    expectedAmount?: Decimal | DecimalJsLike | number | string | null
    closedAt?: Date | string | null
    isLocked?: boolean
    clientId?: string | null
    createdById: string
    closedById?: string | null
    categoryId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payment?: PaymentUncheckedCreateNestedOneWithoutServiceInput
    estimate?: EstimateUncheckedCreateNestedOneWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutTechnicianInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutTechnicianInput, ServiceUncheckedCreateWithoutTechnicianInput>
  }

  export type ServiceCreateManyTechnicianInputEnvelope = {
    data: ServiceCreateManyTechnicianInput | ServiceCreateManyTechnicianInput[]
    skipDuplicates?: boolean
  }

  export type ServiceCreateWithoutCreatedByInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ServiceStatus
    scheduledDate: Date | string
    scheduledTime: string
    address?: string | null
    completedAt?: Date | string | null
    notes?: string | null
    expectedAmount?: Decimal | DecimalJsLike | number | string | null
    closedAt?: Date | string | null
    isLocked?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    technician?: UserCreateNestedOneWithoutServicesAsTechnicianInput
    client?: ClientCreateNestedOneWithoutServicesInput
    closedBy?: UserCreateNestedOneWithoutServicesClosedInput
    category?: ServiceCategoryCreateNestedOneWithoutServicesInput
    payment?: PaymentCreateNestedOneWithoutServiceInput
    estimate?: EstimateCreateNestedOneWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutCreatedByInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ServiceStatus
    scheduledDate: Date | string
    scheduledTime: string
    address?: string | null
    completedAt?: Date | string | null
    notes?: string | null
    expectedAmount?: Decimal | DecimalJsLike | number | string | null
    closedAt?: Date | string | null
    isLocked?: boolean
    technicianId?: string | null
    clientId?: string | null
    closedById?: string | null
    categoryId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payment?: PaymentUncheckedCreateNestedOneWithoutServiceInput
    estimate?: EstimateUncheckedCreateNestedOneWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutCreatedByInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutCreatedByInput, ServiceUncheckedCreateWithoutCreatedByInput>
  }

  export type ServiceCreateManyCreatedByInputEnvelope = {
    data: ServiceCreateManyCreatedByInput | ServiceCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type ServiceCreateWithoutClosedByInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ServiceStatus
    scheduledDate: Date | string
    scheduledTime: string
    address?: string | null
    completedAt?: Date | string | null
    notes?: string | null
    expectedAmount?: Decimal | DecimalJsLike | number | string | null
    closedAt?: Date | string | null
    isLocked?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    technician?: UserCreateNestedOneWithoutServicesAsTechnicianInput
    client?: ClientCreateNestedOneWithoutServicesInput
    createdBy: UserCreateNestedOneWithoutServicesCreatedInput
    category?: ServiceCategoryCreateNestedOneWithoutServicesInput
    payment?: PaymentCreateNestedOneWithoutServiceInput
    estimate?: EstimateCreateNestedOneWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutClosedByInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ServiceStatus
    scheduledDate: Date | string
    scheduledTime: string
    address?: string | null
    completedAt?: Date | string | null
    notes?: string | null
    expectedAmount?: Decimal | DecimalJsLike | number | string | null
    closedAt?: Date | string | null
    isLocked?: boolean
    technicianId?: string | null
    clientId?: string | null
    createdById: string
    categoryId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payment?: PaymentUncheckedCreateNestedOneWithoutServiceInput
    estimate?: EstimateUncheckedCreateNestedOneWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutClosedByInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutClosedByInput, ServiceUncheckedCreateWithoutClosedByInput>
  }

  export type ServiceCreateManyClosedByInputEnvelope = {
    data: ServiceCreateManyClosedByInput | ServiceCreateManyClosedByInput[]
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutTechnicianInput = {
    id?: string
    method: $Enums.PaymentMethod
    amountPaid: Decimal | DecimalJsLike | number | string
    sparePartsCost?: Decimal | DecimalJsLike | number | string
    debtAmount?: Decimal | DecimalJsLike | number | string
    hasDebt?: boolean
    receiptPhotoUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    service: ServiceCreateNestedOneWithoutPaymentInput
  }

  export type PaymentUncheckedCreateWithoutTechnicianInput = {
    id?: string
    method: $Enums.PaymentMethod
    amountPaid: Decimal | DecimalJsLike | number | string
    sparePartsCost?: Decimal | DecimalJsLike | number | string
    debtAmount?: Decimal | DecimalJsLike | number | string
    hasDebt?: boolean
    receiptPhotoUrl?: string | null
    notes?: string | null
    serviceId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutTechnicianInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutTechnicianInput, PaymentUncheckedCreateWithoutTechnicianInput>
  }

  export type PaymentCreateManyTechnicianInputEnvelope = {
    data: PaymentCreateManyTechnicianInput | PaymentCreateManyTechnicianInput[]
    skipDuplicates?: boolean
  }

  export type EstimateCreateWithoutTechnicianInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    status?: $Enums.EstimateStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    service: ServiceCreateNestedOneWithoutEstimateInput
    client: ClientCreateNestedOneWithoutEstimatesInput
  }

  export type EstimateUncheckedCreateWithoutTechnicianInput = {
    id?: string
    serviceId: string
    clientId: string
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    status?: $Enums.EstimateStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EstimateCreateOrConnectWithoutTechnicianInput = {
    where: EstimateWhereUniqueInput
    create: XOR<EstimateCreateWithoutTechnicianInput, EstimateUncheckedCreateWithoutTechnicianInput>
  }

  export type EstimateCreateManyTechnicianInputEnvelope = {
    data: EstimateCreateManyTechnicianInput | EstimateCreateManyTechnicianInput[]
    skipDuplicates?: boolean
  }

  export type ServiceUpsertWithWhereUniqueWithoutTechnicianInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutTechnicianInput, ServiceUncheckedUpdateWithoutTechnicianInput>
    create: XOR<ServiceCreateWithoutTechnicianInput, ServiceUncheckedCreateWithoutTechnicianInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutTechnicianInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutTechnicianInput, ServiceUncheckedUpdateWithoutTechnicianInput>
  }

  export type ServiceUpdateManyWithWhereWithoutTechnicianInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutTechnicianInput>
  }

  export type ServiceScalarWhereInput = {
    AND?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    OR?: ServiceScalarWhereInput[]
    NOT?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    id?: StringFilter<"Service"> | string
    title?: StringFilter<"Service"> | string
    description?: StringNullableFilter<"Service"> | string | null
    status?: EnumServiceStatusFilter<"Service"> | $Enums.ServiceStatus
    scheduledDate?: DateTimeFilter<"Service"> | Date | string
    scheduledTime?: StringFilter<"Service"> | string
    address?: StringNullableFilter<"Service"> | string | null
    completedAt?: DateTimeNullableFilter<"Service"> | Date | string | null
    notes?: StringNullableFilter<"Service"> | string | null
    expectedAmount?: DecimalNullableFilter<"Service"> | Decimal | DecimalJsLike | number | string | null
    closedAt?: DateTimeNullableFilter<"Service"> | Date | string | null
    isLocked?: BoolFilter<"Service"> | boolean
    technicianId?: StringNullableFilter<"Service"> | string | null
    clientId?: StringNullableFilter<"Service"> | string | null
    createdById?: StringFilter<"Service"> | string
    closedById?: StringNullableFilter<"Service"> | string | null
    categoryId?: StringNullableFilter<"Service"> | string | null
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
  }

  export type ServiceUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutCreatedByInput, ServiceUncheckedUpdateWithoutCreatedByInput>
    create: XOR<ServiceCreateWithoutCreatedByInput, ServiceUncheckedCreateWithoutCreatedByInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutCreatedByInput, ServiceUncheckedUpdateWithoutCreatedByInput>
  }

  export type ServiceUpdateManyWithWhereWithoutCreatedByInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type ServiceUpsertWithWhereUniqueWithoutClosedByInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutClosedByInput, ServiceUncheckedUpdateWithoutClosedByInput>
    create: XOR<ServiceCreateWithoutClosedByInput, ServiceUncheckedCreateWithoutClosedByInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutClosedByInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutClosedByInput, ServiceUncheckedUpdateWithoutClosedByInput>
  }

  export type ServiceUpdateManyWithWhereWithoutClosedByInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutClosedByInput>
  }

  export type PaymentUpsertWithWhereUniqueWithoutTechnicianInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutTechnicianInput, PaymentUncheckedUpdateWithoutTechnicianInput>
    create: XOR<PaymentCreateWithoutTechnicianInput, PaymentUncheckedCreateWithoutTechnicianInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutTechnicianInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutTechnicianInput, PaymentUncheckedUpdateWithoutTechnicianInput>
  }

  export type PaymentUpdateManyWithWhereWithoutTechnicianInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutTechnicianInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: StringFilter<"Payment"> | string
    method?: EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod
    amountPaid?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    sparePartsCost?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    hasDebt?: BoolFilter<"Payment"> | boolean
    receiptPhotoUrl?: StringNullableFilter<"Payment"> | string | null
    notes?: StringNullableFilter<"Payment"> | string | null
    technicianId?: StringFilter<"Payment"> | string
    serviceId?: StringFilter<"Payment"> | string
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
  }

  export type EstimateUpsertWithWhereUniqueWithoutTechnicianInput = {
    where: EstimateWhereUniqueInput
    update: XOR<EstimateUpdateWithoutTechnicianInput, EstimateUncheckedUpdateWithoutTechnicianInput>
    create: XOR<EstimateCreateWithoutTechnicianInput, EstimateUncheckedCreateWithoutTechnicianInput>
  }

  export type EstimateUpdateWithWhereUniqueWithoutTechnicianInput = {
    where: EstimateWhereUniqueInput
    data: XOR<EstimateUpdateWithoutTechnicianInput, EstimateUncheckedUpdateWithoutTechnicianInput>
  }

  export type EstimateUpdateManyWithWhereWithoutTechnicianInput = {
    where: EstimateScalarWhereInput
    data: XOR<EstimateUpdateManyMutationInput, EstimateUncheckedUpdateManyWithoutTechnicianInput>
  }

  export type EstimateScalarWhereInput = {
    AND?: EstimateScalarWhereInput | EstimateScalarWhereInput[]
    OR?: EstimateScalarWhereInput[]
    NOT?: EstimateScalarWhereInput | EstimateScalarWhereInput[]
    id?: StringFilter<"Estimate"> | string
    serviceId?: StringFilter<"Estimate"> | string
    technicianId?: StringFilter<"Estimate"> | string
    clientId?: StringFilter<"Estimate"> | string
    amount?: DecimalFilter<"Estimate"> | Decimal | DecimalJsLike | number | string
    description?: StringNullableFilter<"Estimate"> | string | null
    status?: EnumEstimateStatusFilter<"Estimate"> | $Enums.EstimateStatus
    createdAt?: DateTimeFilter<"Estimate"> | Date | string
    updatedAt?: DateTimeFilter<"Estimate"> | Date | string
  }

  export type ServiceCreateWithoutClientInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ServiceStatus
    scheduledDate: Date | string
    scheduledTime: string
    address?: string | null
    completedAt?: Date | string | null
    notes?: string | null
    expectedAmount?: Decimal | DecimalJsLike | number | string | null
    closedAt?: Date | string | null
    isLocked?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    technician?: UserCreateNestedOneWithoutServicesAsTechnicianInput
    createdBy: UserCreateNestedOneWithoutServicesCreatedInput
    closedBy?: UserCreateNestedOneWithoutServicesClosedInput
    category?: ServiceCategoryCreateNestedOneWithoutServicesInput
    payment?: PaymentCreateNestedOneWithoutServiceInput
    estimate?: EstimateCreateNestedOneWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutClientInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ServiceStatus
    scheduledDate: Date | string
    scheduledTime: string
    address?: string | null
    completedAt?: Date | string | null
    notes?: string | null
    expectedAmount?: Decimal | DecimalJsLike | number | string | null
    closedAt?: Date | string | null
    isLocked?: boolean
    technicianId?: string | null
    createdById: string
    closedById?: string | null
    categoryId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payment?: PaymentUncheckedCreateNestedOneWithoutServiceInput
    estimate?: EstimateUncheckedCreateNestedOneWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutClientInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutClientInput, ServiceUncheckedCreateWithoutClientInput>
  }

  export type ServiceCreateManyClientInputEnvelope = {
    data: ServiceCreateManyClientInput | ServiceCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type EstimateCreateWithoutClientInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    status?: $Enums.EstimateStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    service: ServiceCreateNestedOneWithoutEstimateInput
    technician: UserCreateNestedOneWithoutEstimatesInput
  }

  export type EstimateUncheckedCreateWithoutClientInput = {
    id?: string
    serviceId: string
    technicianId: string
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    status?: $Enums.EstimateStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EstimateCreateOrConnectWithoutClientInput = {
    where: EstimateWhereUniqueInput
    create: XOR<EstimateCreateWithoutClientInput, EstimateUncheckedCreateWithoutClientInput>
  }

  export type EstimateCreateManyClientInputEnvelope = {
    data: EstimateCreateManyClientInput | EstimateCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type ServiceUpsertWithWhereUniqueWithoutClientInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutClientInput, ServiceUncheckedUpdateWithoutClientInput>
    create: XOR<ServiceCreateWithoutClientInput, ServiceUncheckedCreateWithoutClientInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutClientInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutClientInput, ServiceUncheckedUpdateWithoutClientInput>
  }

  export type ServiceUpdateManyWithWhereWithoutClientInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutClientInput>
  }

  export type EstimateUpsertWithWhereUniqueWithoutClientInput = {
    where: EstimateWhereUniqueInput
    update: XOR<EstimateUpdateWithoutClientInput, EstimateUncheckedUpdateWithoutClientInput>
    create: XOR<EstimateCreateWithoutClientInput, EstimateUncheckedCreateWithoutClientInput>
  }

  export type EstimateUpdateWithWhereUniqueWithoutClientInput = {
    where: EstimateWhereUniqueInput
    data: XOR<EstimateUpdateWithoutClientInput, EstimateUncheckedUpdateWithoutClientInput>
  }

  export type EstimateUpdateManyWithWhereWithoutClientInput = {
    where: EstimateScalarWhereInput
    data: XOR<EstimateUpdateManyMutationInput, EstimateUncheckedUpdateManyWithoutClientInput>
  }

  export type ServiceCreateWithoutCategoryInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ServiceStatus
    scheduledDate: Date | string
    scheduledTime: string
    address?: string | null
    completedAt?: Date | string | null
    notes?: string | null
    expectedAmount?: Decimal | DecimalJsLike | number | string | null
    closedAt?: Date | string | null
    isLocked?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    technician?: UserCreateNestedOneWithoutServicesAsTechnicianInput
    client?: ClientCreateNestedOneWithoutServicesInput
    createdBy: UserCreateNestedOneWithoutServicesCreatedInput
    closedBy?: UserCreateNestedOneWithoutServicesClosedInput
    payment?: PaymentCreateNestedOneWithoutServiceInput
    estimate?: EstimateCreateNestedOneWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutCategoryInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ServiceStatus
    scheduledDate: Date | string
    scheduledTime: string
    address?: string | null
    completedAt?: Date | string | null
    notes?: string | null
    expectedAmount?: Decimal | DecimalJsLike | number | string | null
    closedAt?: Date | string | null
    isLocked?: boolean
    technicianId?: string | null
    clientId?: string | null
    createdById: string
    closedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payment?: PaymentUncheckedCreateNestedOneWithoutServiceInput
    estimate?: EstimateUncheckedCreateNestedOneWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutCategoryInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput>
  }

  export type ServiceCreateManyCategoryInputEnvelope = {
    data: ServiceCreateManyCategoryInput | ServiceCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ServiceUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutCategoryInput, ServiceUncheckedUpdateWithoutCategoryInput>
    create: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutCategoryInput, ServiceUncheckedUpdateWithoutCategoryInput>
  }

  export type ServiceUpdateManyWithWhereWithoutCategoryInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutCategoryInput>
  }

  export type UserCreateWithoutServicesAsTechnicianInput = {
    id?: string
    email: string
    name: string
    role: $Enums.Role
    avatar?: string | null
    passwordHash: string
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    servicesCreated?: ServiceCreateNestedManyWithoutCreatedByInput
    servicesClosed?: ServiceCreateNestedManyWithoutClosedByInput
    payments?: PaymentCreateNestedManyWithoutTechnicianInput
    estimates?: EstimateCreateNestedManyWithoutTechnicianInput
  }

  export type UserUncheckedCreateWithoutServicesAsTechnicianInput = {
    id?: string
    email: string
    name: string
    role: $Enums.Role
    avatar?: string | null
    passwordHash: string
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    servicesCreated?: ServiceUncheckedCreateNestedManyWithoutCreatedByInput
    servicesClosed?: ServiceUncheckedCreateNestedManyWithoutClosedByInput
    payments?: PaymentUncheckedCreateNestedManyWithoutTechnicianInput
    estimates?: EstimateUncheckedCreateNestedManyWithoutTechnicianInput
  }

  export type UserCreateOrConnectWithoutServicesAsTechnicianInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutServicesAsTechnicianInput, UserUncheckedCreateWithoutServicesAsTechnicianInput>
  }

  export type ClientCreateWithoutServicesInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    address?: string | null
    city?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    estimates?: EstimateCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutServicesInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    address?: string | null
    city?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    estimates?: EstimateUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutServicesInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutServicesInput, ClientUncheckedCreateWithoutServicesInput>
  }

  export type UserCreateWithoutServicesCreatedInput = {
    id?: string
    email: string
    name: string
    role: $Enums.Role
    avatar?: string | null
    passwordHash: string
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    servicesAsTechnician?: ServiceCreateNestedManyWithoutTechnicianInput
    servicesClosed?: ServiceCreateNestedManyWithoutClosedByInput
    payments?: PaymentCreateNestedManyWithoutTechnicianInput
    estimates?: EstimateCreateNestedManyWithoutTechnicianInput
  }

  export type UserUncheckedCreateWithoutServicesCreatedInput = {
    id?: string
    email: string
    name: string
    role: $Enums.Role
    avatar?: string | null
    passwordHash: string
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    servicesAsTechnician?: ServiceUncheckedCreateNestedManyWithoutTechnicianInput
    servicesClosed?: ServiceUncheckedCreateNestedManyWithoutClosedByInput
    payments?: PaymentUncheckedCreateNestedManyWithoutTechnicianInput
    estimates?: EstimateUncheckedCreateNestedManyWithoutTechnicianInput
  }

  export type UserCreateOrConnectWithoutServicesCreatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutServicesCreatedInput, UserUncheckedCreateWithoutServicesCreatedInput>
  }

  export type UserCreateWithoutServicesClosedInput = {
    id?: string
    email: string
    name: string
    role: $Enums.Role
    avatar?: string | null
    passwordHash: string
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    servicesAsTechnician?: ServiceCreateNestedManyWithoutTechnicianInput
    servicesCreated?: ServiceCreateNestedManyWithoutCreatedByInput
    payments?: PaymentCreateNestedManyWithoutTechnicianInput
    estimates?: EstimateCreateNestedManyWithoutTechnicianInput
  }

  export type UserUncheckedCreateWithoutServicesClosedInput = {
    id?: string
    email: string
    name: string
    role: $Enums.Role
    avatar?: string | null
    passwordHash: string
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    servicesAsTechnician?: ServiceUncheckedCreateNestedManyWithoutTechnicianInput
    servicesCreated?: ServiceUncheckedCreateNestedManyWithoutCreatedByInput
    payments?: PaymentUncheckedCreateNestedManyWithoutTechnicianInput
    estimates?: EstimateUncheckedCreateNestedManyWithoutTechnicianInput
  }

  export type UserCreateOrConnectWithoutServicesClosedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutServicesClosedInput, UserUncheckedCreateWithoutServicesClosedInput>
  }

  export type ServiceCategoryCreateWithoutServicesInput = {
    id?: string
    name: string
    description?: string | null
    color?: string | null
    icon?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCategoryUncheckedCreateWithoutServicesInput = {
    id?: string
    name: string
    description?: string | null
    color?: string | null
    icon?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCategoryCreateOrConnectWithoutServicesInput = {
    where: ServiceCategoryWhereUniqueInput
    create: XOR<ServiceCategoryCreateWithoutServicesInput, ServiceCategoryUncheckedCreateWithoutServicesInput>
  }

  export type PaymentCreateWithoutServiceInput = {
    id?: string
    method: $Enums.PaymentMethod
    amountPaid: Decimal | DecimalJsLike | number | string
    sparePartsCost?: Decimal | DecimalJsLike | number | string
    debtAmount?: Decimal | DecimalJsLike | number | string
    hasDebt?: boolean
    receiptPhotoUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    technician: UserCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateWithoutServiceInput = {
    id?: string
    method: $Enums.PaymentMethod
    amountPaid: Decimal | DecimalJsLike | number | string
    sparePartsCost?: Decimal | DecimalJsLike | number | string
    debtAmount?: Decimal | DecimalJsLike | number | string
    hasDebt?: boolean
    receiptPhotoUrl?: string | null
    notes?: string | null
    technicianId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutServiceInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutServiceInput, PaymentUncheckedCreateWithoutServiceInput>
  }

  export type EstimateCreateWithoutServiceInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    status?: $Enums.EstimateStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    technician: UserCreateNestedOneWithoutEstimatesInput
    client: ClientCreateNestedOneWithoutEstimatesInput
  }

  export type EstimateUncheckedCreateWithoutServiceInput = {
    id?: string
    technicianId: string
    clientId: string
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    status?: $Enums.EstimateStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EstimateCreateOrConnectWithoutServiceInput = {
    where: EstimateWhereUniqueInput
    create: XOR<EstimateCreateWithoutServiceInput, EstimateUncheckedCreateWithoutServiceInput>
  }

  export type UserUpsertWithoutServicesAsTechnicianInput = {
    update: XOR<UserUpdateWithoutServicesAsTechnicianInput, UserUncheckedUpdateWithoutServicesAsTechnicianInput>
    create: XOR<UserCreateWithoutServicesAsTechnicianInput, UserUncheckedCreateWithoutServicesAsTechnicianInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutServicesAsTechnicianInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutServicesAsTechnicianInput, UserUncheckedUpdateWithoutServicesAsTechnicianInput>
  }

  export type UserUpdateWithoutServicesAsTechnicianInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servicesCreated?: ServiceUpdateManyWithoutCreatedByNestedInput
    servicesClosed?: ServiceUpdateManyWithoutClosedByNestedInput
    payments?: PaymentUpdateManyWithoutTechnicianNestedInput
    estimates?: EstimateUpdateManyWithoutTechnicianNestedInput
  }

  export type UserUncheckedUpdateWithoutServicesAsTechnicianInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servicesCreated?: ServiceUncheckedUpdateManyWithoutCreatedByNestedInput
    servicesClosed?: ServiceUncheckedUpdateManyWithoutClosedByNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutTechnicianNestedInput
    estimates?: EstimateUncheckedUpdateManyWithoutTechnicianNestedInput
  }

  export type ClientUpsertWithoutServicesInput = {
    update: XOR<ClientUpdateWithoutServicesInput, ClientUncheckedUpdateWithoutServicesInput>
    create: XOR<ClientCreateWithoutServicesInput, ClientUncheckedCreateWithoutServicesInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutServicesInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutServicesInput, ClientUncheckedUpdateWithoutServicesInput>
  }

  export type ClientUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    estimates?: EstimateUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    estimates?: EstimateUncheckedUpdateManyWithoutClientNestedInput
  }

  export type UserUpsertWithoutServicesCreatedInput = {
    update: XOR<UserUpdateWithoutServicesCreatedInput, UserUncheckedUpdateWithoutServicesCreatedInput>
    create: XOR<UserCreateWithoutServicesCreatedInput, UserUncheckedCreateWithoutServicesCreatedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutServicesCreatedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutServicesCreatedInput, UserUncheckedUpdateWithoutServicesCreatedInput>
  }

  export type UserUpdateWithoutServicesCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servicesAsTechnician?: ServiceUpdateManyWithoutTechnicianNestedInput
    servicesClosed?: ServiceUpdateManyWithoutClosedByNestedInput
    payments?: PaymentUpdateManyWithoutTechnicianNestedInput
    estimates?: EstimateUpdateManyWithoutTechnicianNestedInput
  }

  export type UserUncheckedUpdateWithoutServicesCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servicesAsTechnician?: ServiceUncheckedUpdateManyWithoutTechnicianNestedInput
    servicesClosed?: ServiceUncheckedUpdateManyWithoutClosedByNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutTechnicianNestedInput
    estimates?: EstimateUncheckedUpdateManyWithoutTechnicianNestedInput
  }

  export type UserUpsertWithoutServicesClosedInput = {
    update: XOR<UserUpdateWithoutServicesClosedInput, UserUncheckedUpdateWithoutServicesClosedInput>
    create: XOR<UserCreateWithoutServicesClosedInput, UserUncheckedCreateWithoutServicesClosedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutServicesClosedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutServicesClosedInput, UserUncheckedUpdateWithoutServicesClosedInput>
  }

  export type UserUpdateWithoutServicesClosedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servicesAsTechnician?: ServiceUpdateManyWithoutTechnicianNestedInput
    servicesCreated?: ServiceUpdateManyWithoutCreatedByNestedInput
    payments?: PaymentUpdateManyWithoutTechnicianNestedInput
    estimates?: EstimateUpdateManyWithoutTechnicianNestedInput
  }

  export type UserUncheckedUpdateWithoutServicesClosedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servicesAsTechnician?: ServiceUncheckedUpdateManyWithoutTechnicianNestedInput
    servicesCreated?: ServiceUncheckedUpdateManyWithoutCreatedByNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutTechnicianNestedInput
    estimates?: EstimateUncheckedUpdateManyWithoutTechnicianNestedInput
  }

  export type ServiceCategoryUpsertWithoutServicesInput = {
    update: XOR<ServiceCategoryUpdateWithoutServicesInput, ServiceCategoryUncheckedUpdateWithoutServicesInput>
    create: XOR<ServiceCategoryCreateWithoutServicesInput, ServiceCategoryUncheckedCreateWithoutServicesInput>
    where?: ServiceCategoryWhereInput
  }

  export type ServiceCategoryUpdateToOneWithWhereWithoutServicesInput = {
    where?: ServiceCategoryWhereInput
    data: XOR<ServiceCategoryUpdateWithoutServicesInput, ServiceCategoryUncheckedUpdateWithoutServicesInput>
  }

  export type ServiceCategoryUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCategoryUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpsertWithoutServiceInput = {
    update: XOR<PaymentUpdateWithoutServiceInput, PaymentUncheckedUpdateWithoutServiceInput>
    create: XOR<PaymentCreateWithoutServiceInput, PaymentUncheckedCreateWithoutServiceInput>
    where?: PaymentWhereInput
  }

  export type PaymentUpdateToOneWithWhereWithoutServiceInput = {
    where?: PaymentWhereInput
    data: XOR<PaymentUpdateWithoutServiceInput, PaymentUncheckedUpdateWithoutServiceInput>
  }

  export type PaymentUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sparePartsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    hasDebt?: BoolFieldUpdateOperationsInput | boolean
    receiptPhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    technician?: UserUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sparePartsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    hasDebt?: BoolFieldUpdateOperationsInput | boolean
    receiptPhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    technicianId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EstimateUpsertWithoutServiceInput = {
    update: XOR<EstimateUpdateWithoutServiceInput, EstimateUncheckedUpdateWithoutServiceInput>
    create: XOR<EstimateCreateWithoutServiceInput, EstimateUncheckedCreateWithoutServiceInput>
    where?: EstimateWhereInput
  }

  export type EstimateUpdateToOneWithWhereWithoutServiceInput = {
    where?: EstimateWhereInput
    data: XOR<EstimateUpdateWithoutServiceInput, EstimateUncheckedUpdateWithoutServiceInput>
  }

  export type EstimateUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEstimateStatusFieldUpdateOperationsInput | $Enums.EstimateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    technician?: UserUpdateOneRequiredWithoutEstimatesNestedInput
    client?: ClientUpdateOneRequiredWithoutEstimatesNestedInput
  }

  export type EstimateUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    technicianId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEstimateStatusFieldUpdateOperationsInput | $Enums.EstimateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutPaymentsInput = {
    id?: string
    email: string
    name: string
    role: $Enums.Role
    avatar?: string | null
    passwordHash: string
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    servicesAsTechnician?: ServiceCreateNestedManyWithoutTechnicianInput
    servicesCreated?: ServiceCreateNestedManyWithoutCreatedByInput
    servicesClosed?: ServiceCreateNestedManyWithoutClosedByInput
    estimates?: EstimateCreateNestedManyWithoutTechnicianInput
  }

  export type UserUncheckedCreateWithoutPaymentsInput = {
    id?: string
    email: string
    name: string
    role: $Enums.Role
    avatar?: string | null
    passwordHash: string
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    servicesAsTechnician?: ServiceUncheckedCreateNestedManyWithoutTechnicianInput
    servicesCreated?: ServiceUncheckedCreateNestedManyWithoutCreatedByInput
    servicesClosed?: ServiceUncheckedCreateNestedManyWithoutClosedByInput
    estimates?: EstimateUncheckedCreateNestedManyWithoutTechnicianInput
  }

  export type UserCreateOrConnectWithoutPaymentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
  }

  export type ServiceCreateWithoutPaymentInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ServiceStatus
    scheduledDate: Date | string
    scheduledTime: string
    address?: string | null
    completedAt?: Date | string | null
    notes?: string | null
    expectedAmount?: Decimal | DecimalJsLike | number | string | null
    closedAt?: Date | string | null
    isLocked?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    technician?: UserCreateNestedOneWithoutServicesAsTechnicianInput
    client?: ClientCreateNestedOneWithoutServicesInput
    createdBy: UserCreateNestedOneWithoutServicesCreatedInput
    closedBy?: UserCreateNestedOneWithoutServicesClosedInput
    category?: ServiceCategoryCreateNestedOneWithoutServicesInput
    estimate?: EstimateCreateNestedOneWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutPaymentInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ServiceStatus
    scheduledDate: Date | string
    scheduledTime: string
    address?: string | null
    completedAt?: Date | string | null
    notes?: string | null
    expectedAmount?: Decimal | DecimalJsLike | number | string | null
    closedAt?: Date | string | null
    isLocked?: boolean
    technicianId?: string | null
    clientId?: string | null
    createdById: string
    closedById?: string | null
    categoryId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    estimate?: EstimateUncheckedCreateNestedOneWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutPaymentInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutPaymentInput, ServiceUncheckedCreateWithoutPaymentInput>
  }

  export type UserUpsertWithoutPaymentsInput = {
    update: XOR<UserUpdateWithoutPaymentsInput, UserUncheckedUpdateWithoutPaymentsInput>
    create: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPaymentsInput, UserUncheckedUpdateWithoutPaymentsInput>
  }

  export type UserUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servicesAsTechnician?: ServiceUpdateManyWithoutTechnicianNestedInput
    servicesCreated?: ServiceUpdateManyWithoutCreatedByNestedInput
    servicesClosed?: ServiceUpdateManyWithoutClosedByNestedInput
    estimates?: EstimateUpdateManyWithoutTechnicianNestedInput
  }

  export type UserUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servicesAsTechnician?: ServiceUncheckedUpdateManyWithoutTechnicianNestedInput
    servicesCreated?: ServiceUncheckedUpdateManyWithoutCreatedByNestedInput
    servicesClosed?: ServiceUncheckedUpdateManyWithoutClosedByNestedInput
    estimates?: EstimateUncheckedUpdateManyWithoutTechnicianNestedInput
  }

  export type ServiceUpsertWithoutPaymentInput = {
    update: XOR<ServiceUpdateWithoutPaymentInput, ServiceUncheckedUpdateWithoutPaymentInput>
    create: XOR<ServiceCreateWithoutPaymentInput, ServiceUncheckedCreateWithoutPaymentInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutPaymentInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutPaymentInput, ServiceUncheckedUpdateWithoutPaymentInput>
  }

  export type ServiceUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTime?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    expectedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    technician?: UserUpdateOneWithoutServicesAsTechnicianNestedInput
    client?: ClientUpdateOneWithoutServicesNestedInput
    createdBy?: UserUpdateOneRequiredWithoutServicesCreatedNestedInput
    closedBy?: UserUpdateOneWithoutServicesClosedNestedInput
    category?: ServiceCategoryUpdateOneWithoutServicesNestedInput
    estimate?: EstimateUpdateOneWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTime?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    expectedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    technicianId?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    closedById?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    estimate?: EstimateUncheckedUpdateOneWithoutServiceNestedInput
  }

  export type ServiceCreateWithoutEstimateInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ServiceStatus
    scheduledDate: Date | string
    scheduledTime: string
    address?: string | null
    completedAt?: Date | string | null
    notes?: string | null
    expectedAmount?: Decimal | DecimalJsLike | number | string | null
    closedAt?: Date | string | null
    isLocked?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    technician?: UserCreateNestedOneWithoutServicesAsTechnicianInput
    client?: ClientCreateNestedOneWithoutServicesInput
    createdBy: UserCreateNestedOneWithoutServicesCreatedInput
    closedBy?: UserCreateNestedOneWithoutServicesClosedInput
    category?: ServiceCategoryCreateNestedOneWithoutServicesInput
    payment?: PaymentCreateNestedOneWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutEstimateInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ServiceStatus
    scheduledDate: Date | string
    scheduledTime: string
    address?: string | null
    completedAt?: Date | string | null
    notes?: string | null
    expectedAmount?: Decimal | DecimalJsLike | number | string | null
    closedAt?: Date | string | null
    isLocked?: boolean
    technicianId?: string | null
    clientId?: string | null
    createdById: string
    closedById?: string | null
    categoryId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payment?: PaymentUncheckedCreateNestedOneWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutEstimateInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutEstimateInput, ServiceUncheckedCreateWithoutEstimateInput>
  }

  export type UserCreateWithoutEstimatesInput = {
    id?: string
    email: string
    name: string
    role: $Enums.Role
    avatar?: string | null
    passwordHash: string
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    servicesAsTechnician?: ServiceCreateNestedManyWithoutTechnicianInput
    servicesCreated?: ServiceCreateNestedManyWithoutCreatedByInput
    servicesClosed?: ServiceCreateNestedManyWithoutClosedByInput
    payments?: PaymentCreateNestedManyWithoutTechnicianInput
  }

  export type UserUncheckedCreateWithoutEstimatesInput = {
    id?: string
    email: string
    name: string
    role: $Enums.Role
    avatar?: string | null
    passwordHash: string
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    servicesAsTechnician?: ServiceUncheckedCreateNestedManyWithoutTechnicianInput
    servicesCreated?: ServiceUncheckedCreateNestedManyWithoutCreatedByInput
    servicesClosed?: ServiceUncheckedCreateNestedManyWithoutClosedByInput
    payments?: PaymentUncheckedCreateNestedManyWithoutTechnicianInput
  }

  export type UserCreateOrConnectWithoutEstimatesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEstimatesInput, UserUncheckedCreateWithoutEstimatesInput>
  }

  export type ClientCreateWithoutEstimatesInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    address?: string | null
    city?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutEstimatesInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    address?: string | null
    city?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutEstimatesInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutEstimatesInput, ClientUncheckedCreateWithoutEstimatesInput>
  }

  export type ServiceUpsertWithoutEstimateInput = {
    update: XOR<ServiceUpdateWithoutEstimateInput, ServiceUncheckedUpdateWithoutEstimateInput>
    create: XOR<ServiceCreateWithoutEstimateInput, ServiceUncheckedCreateWithoutEstimateInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutEstimateInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutEstimateInput, ServiceUncheckedUpdateWithoutEstimateInput>
  }

  export type ServiceUpdateWithoutEstimateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTime?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    expectedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    technician?: UserUpdateOneWithoutServicesAsTechnicianNestedInput
    client?: ClientUpdateOneWithoutServicesNestedInput
    createdBy?: UserUpdateOneRequiredWithoutServicesCreatedNestedInput
    closedBy?: UserUpdateOneWithoutServicesClosedNestedInput
    category?: ServiceCategoryUpdateOneWithoutServicesNestedInput
    payment?: PaymentUpdateOneWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutEstimateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTime?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    expectedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    technicianId?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    closedById?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUncheckedUpdateOneWithoutServiceNestedInput
  }

  export type UserUpsertWithoutEstimatesInput = {
    update: XOR<UserUpdateWithoutEstimatesInput, UserUncheckedUpdateWithoutEstimatesInput>
    create: XOR<UserCreateWithoutEstimatesInput, UserUncheckedCreateWithoutEstimatesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEstimatesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEstimatesInput, UserUncheckedUpdateWithoutEstimatesInput>
  }

  export type UserUpdateWithoutEstimatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servicesAsTechnician?: ServiceUpdateManyWithoutTechnicianNestedInput
    servicesCreated?: ServiceUpdateManyWithoutCreatedByNestedInput
    servicesClosed?: ServiceUpdateManyWithoutClosedByNestedInput
    payments?: PaymentUpdateManyWithoutTechnicianNestedInput
  }

  export type UserUncheckedUpdateWithoutEstimatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servicesAsTechnician?: ServiceUncheckedUpdateManyWithoutTechnicianNestedInput
    servicesCreated?: ServiceUncheckedUpdateManyWithoutCreatedByNestedInput
    servicesClosed?: ServiceUncheckedUpdateManyWithoutClosedByNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutTechnicianNestedInput
  }

  export type ClientUpsertWithoutEstimatesInput = {
    update: XOR<ClientUpdateWithoutEstimatesInput, ClientUncheckedUpdateWithoutEstimatesInput>
    create: XOR<ClientCreateWithoutEstimatesInput, ClientUncheckedCreateWithoutEstimatesInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutEstimatesInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutEstimatesInput, ClientUncheckedUpdateWithoutEstimatesInput>
  }

  export type ClientUpdateWithoutEstimatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutEstimatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ServiceCreateManyTechnicianInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ServiceStatus
    scheduledDate: Date | string
    scheduledTime: string
    address?: string | null
    completedAt?: Date | string | null
    notes?: string | null
    expectedAmount?: Decimal | DecimalJsLike | number | string | null
    closedAt?: Date | string | null
    isLocked?: boolean
    clientId?: string | null
    createdById: string
    closedById?: string | null
    categoryId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCreateManyCreatedByInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ServiceStatus
    scheduledDate: Date | string
    scheduledTime: string
    address?: string | null
    completedAt?: Date | string | null
    notes?: string | null
    expectedAmount?: Decimal | DecimalJsLike | number | string | null
    closedAt?: Date | string | null
    isLocked?: boolean
    technicianId?: string | null
    clientId?: string | null
    closedById?: string | null
    categoryId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCreateManyClosedByInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ServiceStatus
    scheduledDate: Date | string
    scheduledTime: string
    address?: string | null
    completedAt?: Date | string | null
    notes?: string | null
    expectedAmount?: Decimal | DecimalJsLike | number | string | null
    closedAt?: Date | string | null
    isLocked?: boolean
    technicianId?: string | null
    clientId?: string | null
    createdById: string
    categoryId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateManyTechnicianInput = {
    id?: string
    method: $Enums.PaymentMethod
    amountPaid: Decimal | DecimalJsLike | number | string
    sparePartsCost?: Decimal | DecimalJsLike | number | string
    debtAmount?: Decimal | DecimalJsLike | number | string
    hasDebt?: boolean
    receiptPhotoUrl?: string | null
    notes?: string | null
    serviceId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EstimateCreateManyTechnicianInput = {
    id?: string
    serviceId: string
    clientId: string
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    status?: $Enums.EstimateStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateWithoutTechnicianInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTime?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    expectedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneWithoutServicesNestedInput
    createdBy?: UserUpdateOneRequiredWithoutServicesCreatedNestedInput
    closedBy?: UserUpdateOneWithoutServicesClosedNestedInput
    category?: ServiceCategoryUpdateOneWithoutServicesNestedInput
    payment?: PaymentUpdateOneWithoutServiceNestedInput
    estimate?: EstimateUpdateOneWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutTechnicianInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTime?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    expectedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    closedById?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUncheckedUpdateOneWithoutServiceNestedInput
    estimate?: EstimateUncheckedUpdateOneWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateManyWithoutTechnicianInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTime?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    expectedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    closedById?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTime?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    expectedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    technician?: UserUpdateOneWithoutServicesAsTechnicianNestedInput
    client?: ClientUpdateOneWithoutServicesNestedInput
    closedBy?: UserUpdateOneWithoutServicesClosedNestedInput
    category?: ServiceCategoryUpdateOneWithoutServicesNestedInput
    payment?: PaymentUpdateOneWithoutServiceNestedInput
    estimate?: EstimateUpdateOneWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTime?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    expectedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    technicianId?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    closedById?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUncheckedUpdateOneWithoutServiceNestedInput
    estimate?: EstimateUncheckedUpdateOneWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTime?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    expectedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    technicianId?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    closedById?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUpdateWithoutClosedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTime?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    expectedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    technician?: UserUpdateOneWithoutServicesAsTechnicianNestedInput
    client?: ClientUpdateOneWithoutServicesNestedInput
    createdBy?: UserUpdateOneRequiredWithoutServicesCreatedNestedInput
    category?: ServiceCategoryUpdateOneWithoutServicesNestedInput
    payment?: PaymentUpdateOneWithoutServiceNestedInput
    estimate?: EstimateUpdateOneWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutClosedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTime?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    expectedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    technicianId?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUncheckedUpdateOneWithoutServiceNestedInput
    estimate?: EstimateUncheckedUpdateOneWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateManyWithoutClosedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTime?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    expectedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    technicianId?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpdateWithoutTechnicianInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sparePartsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    hasDebt?: BoolFieldUpdateOperationsInput | boolean
    receiptPhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    service?: ServiceUpdateOneRequiredWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateWithoutTechnicianInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sparePartsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    hasDebt?: BoolFieldUpdateOperationsInput | boolean
    receiptPhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutTechnicianInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sparePartsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    hasDebt?: BoolFieldUpdateOperationsInput | boolean
    receiptPhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EstimateUpdateWithoutTechnicianInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEstimateStatusFieldUpdateOperationsInput | $Enums.EstimateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    service?: ServiceUpdateOneRequiredWithoutEstimateNestedInput
    client?: ClientUpdateOneRequiredWithoutEstimatesNestedInput
  }

  export type EstimateUncheckedUpdateWithoutTechnicianInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEstimateStatusFieldUpdateOperationsInput | $Enums.EstimateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EstimateUncheckedUpdateManyWithoutTechnicianInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEstimateStatusFieldUpdateOperationsInput | $Enums.EstimateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateManyClientInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ServiceStatus
    scheduledDate: Date | string
    scheduledTime: string
    address?: string | null
    completedAt?: Date | string | null
    notes?: string | null
    expectedAmount?: Decimal | DecimalJsLike | number | string | null
    closedAt?: Date | string | null
    isLocked?: boolean
    technicianId?: string | null
    createdById: string
    closedById?: string | null
    categoryId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EstimateCreateManyClientInput = {
    id?: string
    serviceId: string
    technicianId: string
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    status?: $Enums.EstimateStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTime?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    expectedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    technician?: UserUpdateOneWithoutServicesAsTechnicianNestedInput
    createdBy?: UserUpdateOneRequiredWithoutServicesCreatedNestedInput
    closedBy?: UserUpdateOneWithoutServicesClosedNestedInput
    category?: ServiceCategoryUpdateOneWithoutServicesNestedInput
    payment?: PaymentUpdateOneWithoutServiceNestedInput
    estimate?: EstimateUpdateOneWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTime?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    expectedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    technicianId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    closedById?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUncheckedUpdateOneWithoutServiceNestedInput
    estimate?: EstimateUncheckedUpdateOneWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTime?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    expectedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    technicianId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    closedById?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EstimateUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEstimateStatusFieldUpdateOperationsInput | $Enums.EstimateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    service?: ServiceUpdateOneRequiredWithoutEstimateNestedInput
    technician?: UserUpdateOneRequiredWithoutEstimatesNestedInput
  }

  export type EstimateUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    technicianId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEstimateStatusFieldUpdateOperationsInput | $Enums.EstimateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EstimateUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    technicianId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEstimateStatusFieldUpdateOperationsInput | $Enums.EstimateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateManyCategoryInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ServiceStatus
    scheduledDate: Date | string
    scheduledTime: string
    address?: string | null
    completedAt?: Date | string | null
    notes?: string | null
    expectedAmount?: Decimal | DecimalJsLike | number | string | null
    closedAt?: Date | string | null
    isLocked?: boolean
    technicianId?: string | null
    clientId?: string | null
    createdById: string
    closedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTime?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    expectedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    technician?: UserUpdateOneWithoutServicesAsTechnicianNestedInput
    client?: ClientUpdateOneWithoutServicesNestedInput
    createdBy?: UserUpdateOneRequiredWithoutServicesCreatedNestedInput
    closedBy?: UserUpdateOneWithoutServicesClosedNestedInput
    payment?: PaymentUpdateOneWithoutServiceNestedInput
    estimate?: EstimateUpdateOneWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTime?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    expectedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    technicianId?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    closedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUncheckedUpdateOneWithoutServiceNestedInput
    estimate?: EstimateUncheckedUpdateOneWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTime?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    expectedAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    technicianId?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    closedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



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