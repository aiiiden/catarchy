import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    if (process.env.ENV === 'dev') {
      return 'Hello World! (dev)';
    }

    return 'Hello World! (prod)';
  }
}
