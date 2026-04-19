import { JwtService } from '@nestjs/jwt';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';
export declare class AuthService {
    private utilisateursService;
    private jwtService;
    constructor(utilisateursService: UtilisateursService, jwtService: JwtService);
    login(email: string, motDePasse: string): Promise<{
        access_token: string;
        user: {
            id: number;
            nom: string;
            email: string;
            role: string;
        };
    }>;
}
