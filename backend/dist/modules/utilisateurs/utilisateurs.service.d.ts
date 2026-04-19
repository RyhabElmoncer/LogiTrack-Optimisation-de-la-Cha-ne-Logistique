import { Repository } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';
export declare class UtilisateursService {
    private userRepo;
    constructor(userRepo: Repository<Utilisateur>);
    findAll(): Promise<Utilisateur[]>;
    findOne(id: number): Promise<Utilisateur>;
    findByEmail(email: string): Promise<Utilisateur>;
    create(data: Partial<Utilisateur>): Promise<Utilisateur>;
    update(id: number, data: Partial<Utilisateur>): Promise<Utilisateur>;
    remove(id: number): Promise<void>;
}
