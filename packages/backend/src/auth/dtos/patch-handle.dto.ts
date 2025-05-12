import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, Length } from 'class-validator';

export class PatchHandleDto {
  @ApiProperty()
  @IsAlphanumeric()
  handle: string;
}
