import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { email: string; mot_de_passe: string }) {
    return this.authService.login(body.email, body.mot_de_passe);
  }
}
