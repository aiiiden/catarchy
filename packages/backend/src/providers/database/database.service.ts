/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from 'prisma/db';

@Injectable()
export class DatabaseService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit, OnModuleDestroy
{
  private logger = new Logger('DatabaseService');

  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
  }

  async onModuleInit() {
    this.$on('error', (event) => {
      this.logger.error(event);
    });
    this.$on('warn', (event) => {
      this.logger.warn(event);
    });
    this.$on('info', (event) => {
      this.logger.verbose(event);
    });
    this.$on('query', (event) => {
      this.logger.log(event);
    });
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async disconnect() {
    await this.$disconnect();
  }
}
