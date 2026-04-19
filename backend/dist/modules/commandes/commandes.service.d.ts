import { Repository } from 'typeorm';
import { Commande } from './commande.entity';
export declare class CommandesService {
    private commandeRepo;
    constructor(commandeRepo: Repository<Commande>);
    findAll(): Promise<Commande[]>;
    findOne(id: number): Promise<Commande>;
    create(data: Partial<Commande>): Promise<Commande>;
    valider(id: number): Promise<Commande>;
    bloquer(id: number): Promise<Commande>;
}
