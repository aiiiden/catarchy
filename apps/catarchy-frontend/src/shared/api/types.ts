type EdenEndpoint = (
  ...args: never[]
) => Promise<{ data: unknown; error: unknown }>;

/** Extracts the first parameter (body) type from an Eden treaty endpoint. */
export type InferInput<T extends EdenEndpoint> = NonNullable<Parameters<T>[0]>;

/** Extracts the non-null `data` type from an Eden treaty endpoint. */
export type InferData<T extends EdenEndpoint> = NonNullable<
  Awaited<ReturnType<T>>["data"]
>;

/** Extracts the non-null `error` type from an Eden treaty endpoint. */
export type InferError<T extends EdenEndpoint> = NonNullable<
  Awaited<ReturnType<T>>["error"]
>;
