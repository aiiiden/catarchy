// src/cats/cats.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { CatsService } from './cats.service';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { PostVirtuesDto } from './dtos/post-virtues.dto';
import { User } from 'src/commons/decorators/user.decorator';
import { AuthUser } from 'src/types';
import { PostMintDto } from './dtos/post-mint.dto';

@ApiTags('cats')
@Controller('cats')
@ApiBearerAuth('token')
@UseGuards(AuthGuard)
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  /* ─────────── ① 성격 테스트 → Cat 생성 ─────────── */

  @ApiOperation({ summary: 'Create Cat with virtue scores (pre-mint)' })
  @ApiBody({ type: PostVirtuesDto })
  @ApiCreatedResponse({
    description: 'Created Cat',
    schema: { $ref: '#/components/schemas/Cat' },
  })
  @Post('virtues')
  public async create(@Body() dto: PostVirtuesDto, @User() user: AuthUser) {
    return this.catService.createWithVirtues(dto, user.id!);
  }

  /* ─────────── ② 민트 콜백 → tokenId 업데이트 ─────────── */
  @ApiOperation({ summary: 'Register on-chain mint (update tokenId)' })
  @ApiBody({ type: PostMintDto })
  @ApiCreatedResponse({ schema: { $ref: '#/components/schemas/Cat' } })
  @Post('mint')
  public async registerMint(@Body() dto: PostMintDto, @User() user: AuthUser) {
    return this.catService.registerMint(
      BigInt(dto.tokenId),
      BigInt(dto.birthBlock),
      dto.mintTx,
      user.id!,
    );
  }

  /* ─────────── ③ Care 액션 ─────────── */
  @ApiOperation({ summary: 'Give care (emotion +10, growth +1)' })
  @ApiParam({ name: 'catId', example: '1' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        cat: { $ref: '#/components/schemas/Cat' },
        careEvent: { $ref: '#/components/schemas/CareEvent' },
      },
    },
  })
  @Post(':tokenId/care')
  public async care(@Param('catId') catId: number, @User() user: AuthUser) {
    return this.catService.care(catId, user.id!);
  }

  /* ─────────── ④ 내 고양이 목록 ─────────── */
  @ApiOperation({ summary: 'List cats owned by current user' })
  @ApiOkResponse({
    isArray: true,
    schema: { $ref: '#/components/schemas/Cat' },
  })
  @Get('myCats')
  public async myCats(@User() user: AuthUser) {
    return this.catService.listMyCats(user.id!);
  }

  /* ─────────── ⑤ 히스토리 조회 ─────────── */
  @ApiOperation({ summary: 'Emotion / growth history' })
  @ApiParam({ name: 'catId', example: '1' })
  @ApiQuery({ name: 'days', required: false, example: 2 })
  @Get(':tokenId/history')
  public async history(@Param('catId') catId: number, @Query('days') days = 2) {
    return this.catService.getHistory(catId, Number(days));
  }
}
