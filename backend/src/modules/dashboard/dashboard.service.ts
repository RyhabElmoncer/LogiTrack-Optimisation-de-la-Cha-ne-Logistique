import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from '../stocks/stock.entity';
import { Wip } from '../wip/wip.entity';
import { Commande } from '../commandes/commande.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Stock) private stockRepo: Repository<Stock>,
    @InjectRepository(Wip) private wipRepo: Repository<Wip>,
    @InjectRepository(Commande) private commandeRepo: Repository<Commande>,
  ) {}

  async getKPIs() {
    const stocks = await this.stockRepo.find();
    const wips = await this.wipRepo.find();
    const commandes = await this.commandeRepo.find();

    const totalArticles = stocks.length;
    const valeurTotale = stocks.reduce((sum, s) => sum + (s.quantite_disponible * s.valeur_unitaire), 0);

    const articlesEnAlerte = stocks.filter(s => s.quantite_disponible < s.seuil_min).length;

    const articlesSurstock = stocks.filter(s => {
      if (s.consommation_journaliere === 0) return false;
      return (s.quantite_disponible / s.consommation_journaliere) > 30;
    });
    const valeurSurstock = articlesSurstock.reduce((sum, s) => sum + (s.quantite_disponible * s.valeur_unitaire), 0);

    const ecartsCritiques = wips.filter(w => {
      const ecart = Math.abs(w.quantite_reelle - w.quantite_theorique);
      return w.quantite_theorique > 0 && ecart / w.quantite_theorique > 0.1;
    }).length;

    const commandesEnAttente = commandes.filter(c => c.statut === 'en_attente').length;

    return {
      totalArticles,
      valeurTotale: Math.round(valeurTotale),
      articlesEnAlerte,
      nombreSurstock: articlesSurstock.length,
      valeurSurstock: Math.round(valeurSurstock),
      ecartsCritiques,
      commandesEnAttente,
    };
  }

  async getRotationStocks() {
    const stocks = await this.stockRepo.find();
    return stocks.slice(0, 10).map(s => ({
      article: s.code_article,
      tauxRotation: s.quantite_disponible > 0
        ? Math.round((s.consommation_journaliere * 30) / s.quantite_disponible * 10) / 10
        : 0,
    }));
  }
}
