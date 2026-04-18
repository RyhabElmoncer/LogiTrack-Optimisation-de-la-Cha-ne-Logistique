import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UtilisateursModule } from '../utilisateurs/utilisateurs.module';

@Module({
  imports: [
    UtilisateursModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'logistique_secret_key_2024',
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
