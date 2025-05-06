export class ServerError<T> extends Error {
  statusCode: number;
  message: string;
  data?: T;

  constructor(statusCode: number, message: string, data?: T) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.name = 'ServerError';
  }
}

export class NetworkError extends Error {
  constructor() {
    super('Cannot connect to server');
    this.name = 'NetworkError';
  }
}

export class ClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ClientError';
  }
}
