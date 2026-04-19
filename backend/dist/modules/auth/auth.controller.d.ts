import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        email: string;
        mot_de_passe: string;
    }): Promise<{
        access_token: string;
        user: {
            id: number;
            nom: string;
            email: string;
            role: string;
        };
    }>;
}
