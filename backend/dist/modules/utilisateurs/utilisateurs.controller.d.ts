import { UtilisateursService } from './utilisateurs.service';
export declare class UtilisateursController {
    private readonly utilisateursService;
    constructor(utilisateursService: UtilisateursService);
    findAll(): Promise<import("./utilisateur.entity").Utilisateur[]>;
    findOne(id: string): Promise<import("./utilisateur.entity").Utilisateur>;
    create(body: any): Promise<import("./utilisateur.entity").Utilisateur>;
    update(id: string, body: any): Promise<import("./utilisateur.entity").Utilisateur>;
    remove(id: string): Promise<void>;
}
