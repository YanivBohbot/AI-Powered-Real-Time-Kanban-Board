import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth') //
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') //
  @ApiOperation({ summary: 'Login to get JWT Token' })
  async login(@Body() loginDto: LoginDto) {
    // 1. Check if email/password are correct
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    // 2. If user is null, throw error
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. If correct, generate and return the Token
    return this.authService.login(user);
  }

  // 👇 ADD THIS SECTION 👇
  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(body);
  }
}
