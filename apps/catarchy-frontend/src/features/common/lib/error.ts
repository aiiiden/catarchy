export class ServerError<T = unknown> extends Error {
  public readonly code: number;
  public readonly data?: T;
  constructor({
    message,
    code,
    data,
  }: {
    message: string;
    code: number;
    data?: T;
  }) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.data = data;
  }
}

export class ClientError extends Error {}

export class NetworkError extends ClientError {}

export class ServerConnectionError extends ClientError {}
