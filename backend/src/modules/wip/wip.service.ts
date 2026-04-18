import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wip } from './wip.entity';

@Injectable()
export class WipService {
  constructor(
    @InjectRepository(Wip)
    private wipRepo: Repository<Wip>,
  ) {}

  findAll(): Promise<Wip[]> {
    return this.wipRepo.find();
  }

  findOne(id: number): Promise<Wip> {
    return this.wipRepo.findOneBy({ id });
  }

  async getEcarts(): Promise<any[]> {
    const wips = await this.wipRepo.find();
    return wips
      .map(w => ({
        ...w,
        ecart: w.quantite_reelle - w.quantite_theorique,
        ecart_pct: w.quantite_theorique > 0
          ? ((w.quantite_reelle - w.quantite_theorique) / w.quantite_theorique * 100).toFixed(1)
          : '0',
        alerte: Math.abs(w.quantite_reelle - w.quantite_theorique) > w.quantite_theorique * 0.1,
      }))
      .filter(w => w.alerte);
  }

  create(data: Partial<Wip>): Promise<Wip> {
    const wip = this.wipRepo.create(data);
    return this.wipRepo.save(wip);
  }

  async update(id: number, data: Partial<Wip>): Promise<Wip> {
    await this.wipRepo.update(id, data);
    return this.findOne(id);
  }
}
