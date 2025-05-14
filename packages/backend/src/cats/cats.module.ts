import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { ParseBigIntPipe } from 'src/commons/pipes/parse-bigint.pipe';
import { SystemModule } from 'src/\bsystem/system.module';

@Module({
  controllers: [CatsController],
  providers: [CatsService, ParseBigIntPipe],
})
export class CatsModule {}
