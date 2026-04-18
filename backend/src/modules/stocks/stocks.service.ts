import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Stock } from './stock.entity';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stock)
    private stockRepo: Repository<Stock>,
  ) {}

  findAll(search?: string): Promise<Stock[]> {
    if (search) {
      return this.stockRepo.find({
        where: [
          { code_article: Like(`%${search}%`) },
          { designation: Like(`%${search}%`) },
          { fournisseur: Like(`%${search}%`) },
        ],
      });
    }
    return this.stockRepo.find();
  }

  findOne(id: number): Promise<Stock> {
    return this.stockRepo.findOneBy({ id });
  }

  async calculerDOH(id: number): Promise<{ doh: number; statut: string }> {
    const stock = await this.findOne(id);
    if (!stock || stock.consommation_journaliere === 0) {
      return { doh: 0, statut: 'inconnu' };
    }
    const doh = stock.quantite_disponible / stock.consommation_journaliere;
    let statut = 'normal';
    if (doh < 3) statut = 'critique';
    else if (doh > 30) statut = 'surstock';
    return { doh: Math.round(doh), statut };
  }

  async getArticlesSurstock(): Promise<Stock[]> {
    const stocks = await this.stockRepo.find();
    return stocks.filter(s => {
      if (s.consommation_journaliere === 0) return false;
      const doh = s.quantite_disponible / s.consommation_journaliere;
      return doh > 30;
    });
  }

  create(data: Partial<Stock>): Promise<Stock> {
    const stock = this.stockRepo.create(data);
    return this.stockRepo.save(stock);
  }

  async update(id: number, data: Partial<Stock>): Promise<Stock> {
    await this.stockRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.stockRepo.delete(id);
  }
}
