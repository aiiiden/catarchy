// src/system/system.controller.ts
import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { UpsertPolicyDto } from './dtos/upsert-policy.dto';
import { SystemService } from './system.service';

@ApiTags('system')
@Controller('system')
export class SystemController {
  constructor(private readonly svc: SystemService) {}

  /* ────────── 조회 (공개) ────────── */
  @ApiOperation({ summary: 'Get policy by key' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        key: { type: 'string' },
        value: { type: 'object' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @Get('policy/:key')
  public async get(@Param('key') key: string) {
    return this.svc.getPolicy(key);
  }

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Upsert policy (admin)' })
  @ApiBody({ type: UpsertPolicyDto })
  @ApiOkResponse({ description: 'Upserted row', type: Object })
  @Patch('policy')
  public async upsert(@Body() dto: UpsertPolicyDto) {
    return this.svc.upsertPolicy(dto.key, dto.value);
  }
}
