import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private utilisateursService: UtilisateursService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, motDePasse: string) {
    const user = await this.utilisateursService.findByEmail(email);
    if (!user || !user.actif) throw new UnauthorizedException('Identifiants invalides');

    const valid = await bcrypt.compare(motDePasse, user.mot_de_passe);
    if (!valid) throw new UnauthorizedException('Identifiants invalides');

    const payload = { sub: user.id, email: user.email, role: user.role, nom: user.nom };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, nom: user.nom, email: user.email, role: user.role },
    };
  }
}
