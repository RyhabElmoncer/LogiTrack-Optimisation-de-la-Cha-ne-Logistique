import { CommandesService } from './commandes.service';
export declare class CommandesController {
    private readonly commandesService;
    constructor(commandesService: CommandesService);
    findAll(): Promise<import("./commande.entity").Commande[]>;
    findOne(id: string): Promise<import("./commande.entity").Commande>;
    create(body: any): Promise<import("./commande.entity").Commande>;
    valider(id: string): Promise<import("./commande.entity").Commande>;
    bloquer(id: string): Promise<import("./commande.entity").Commande>;
}
