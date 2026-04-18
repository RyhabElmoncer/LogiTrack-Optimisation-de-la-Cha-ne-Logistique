import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilisateursService {
  constructor(
    @InjectRepository(Utilisateur)
    private userRepo: Repository<Utilisateur>,
  ) {}

  findAll(): Promise<Utilisateur[]> {
    return this.userRepo.find({ select: ['id', 'email', 'nom', 'role', 'actif', 'date_creation'] });
  }

  findOne(id: number): Promise<Utilisateur> {
    return this.userRepo.findOneBy({ id });
  }

  findByEmail(email: string): Promise<Utilisateur> {
    return this.userRepo.findOneBy({ email });
  }

  async create(data: Partial<Utilisateur>): Promise<Utilisateur> {
    const hash = await bcrypt.hash(data.mot_de_passe, 10);
    const user = this.userRepo.create({ ...data, mot_de_passe: hash });
    return this.userRepo.save(user);
  }

  async update(id: number, data: Partial<Utilisateur>): Promise<Utilisateur> {
    if (data.mot_de_passe) {
      data.mot_de_passe = await bcrypt.hash(data.mot_de_passe, 10);
    }
    await this.userRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }
}
