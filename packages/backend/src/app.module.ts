import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CatsModule } from './modules/cats/cats.module';
import { NftModule } from './modules/nft/nft.module';
import { DatabaseModule } from './providers/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule,
    CatsModule,
    NftModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
