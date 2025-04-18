import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PostVerifySignatureDto } from './dtos/post-verify-signature.dto';
import { PostSignupDto } from './dtos/post-signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('verifySignature')
  async verifySignature(
    @Body() postVerifySignatureDto: PostVerifySignatureDto,
  ) {
    return await this.authService.verifySignature(
      postVerifySignatureDto.signature,
      postVerifySignatureDto.walletAddress,
    );
  }

  @Post('signup')
  async signup(@Body() postSignupDto: PostSignupDto) {
    return await this.authService.signup(
      postSignupDto.signature,
      postSignupDto.walletAddress,
      postSignupDto.handle,
    );
  }

  @Get('users')
  async getAllUsers() {
    return await this.authService.getAllUsers();
  }
}
