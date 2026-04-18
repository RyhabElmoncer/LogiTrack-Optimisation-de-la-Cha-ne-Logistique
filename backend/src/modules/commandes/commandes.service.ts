import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commande } from './commande.entity';

@Injectable()
export class CommandesService {
  constructor(
    @InjectRepository(Commande)
    private commandeRepo: Repository<Commande>,
  ) {}

  findAll(): Promise<Commande[]> { return this.commandeRepo.find({ order: { date_creation: 'DESC' } }); }
  findOne(id: number): Promise<Commande> { return this.commandeRepo.findOneBy({ id }); }

  create(data: Partial<Commande>): Promise<Commande> {
    const commande = this.commandeRepo.create(data);
    return this.commandeRepo.save(commande);
  }

  async valider(id: number): Promise<Commande> {
    await this.commandeRepo.update(id, { statut: 'validee' });
    return this.findOne(id);
  }

  async bloquer(id: number): Promise<Commande> {
    await this.commandeRepo.update(id, { statut: 'bloquee' });
    return this.findOne(id);
  }
}
