import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { PostChallengeDto } from './dtos/post-challenge.dto';
import { PostVerifyDto } from './dtos/post-verify.dto';
import { PatchHandleDto } from './dtos/patch-handle.dto';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { User } from 'src/commons/decorators/user.decorator';
import { AuthUser } from 'src/types';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  /* ------------------------------------------------------------------ */
  /* Debug: list every registered user                                   */
  /* ------------------------------------------------------------------ */
  @ApiOperation({ summary: 'List all users (debug only)' })
  @ApiOkResponse({
    description: 'Array of registered wallets',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          walletAddress: { type: 'string', example: '0xAbc...' },
          handle: { type: 'string', nullable: true },
        },
      },
    },
  })
  @Get('users')
  getAllUsers() {
    return this.auth.getAllUsers();
  }

  /* ------------------------------------------------------------------ */
  /* ① Issue a nonce challenge                                           */
  /* ------------------------------------------------------------------ */
  @ApiOperation({ summary: 'Issue a nonce challenge for wallet login' })
  @ApiBody({ type: PostChallengeDto })
  @ApiCreatedResponse({
    description: 'challengeId plus EIP-712 typed data to be signed',
    schema: {
      type: 'object',
      properties: {
        challengeId: { type: 'integer', example: 42 },
        typedData: { type: 'object' },
      },
    },
  })
  @Post('challenge')
  createChallenge(@Body() dto: PostChallengeDto) {
    return this.auth.createChallenge(dto);
  }

  /* ------------------------------------------------------------------ */
  /* ② Verify signature & return JWT                                     */
  /* ------------------------------------------------------------------ */
  @ApiOperation({ summary: 'Verify signature and return an access token' })
  @ApiBody({ type: PostVerifyDto })
  @ApiOkResponse({
    description: 'JWT access token and basic user profile',
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string', example: 'eyJhbGciOiJ...' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            walletAddress: { type: 'string', example: '0xAbc...' },
            handle: { type: 'string', nullable: true },
          },
        },
      },
    },
  })
  @Post('verify')
  verify(@Body() dto: PostVerifyDto) {
    return this.auth.verify(dto);
  }

  /* ------------------------------------------------------------------ */
  /* ③ Set / change user handle                                         */
  /* ------------------------------------------------------------------ */
  @UseGuards(AuthGuard) // requires a valid JWT
  @Patch('handle')
  @ApiOperation({ summary: 'Update handle (nickname)' })
  @ApiBody({ type: PatchHandleDto })
  @ApiOkResponse({
    description: 'Updated user profile',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        walletAddress: { type: 'string', example: '0xAbc...' },
        handle: { type: 'string', example: 'catlover99' },
      },
    },
  })
  async patchHandle(@User() user: AuthUser, @Body() dto: PatchHandleDto) {
    return this.auth.updateHandle(user.id!, dto);
  }
}
