import { Repository } from 'typeorm';
import { Stock } from '../stocks/stock.entity';
import { Wip } from '../wip/wip.entity';
import { Commande } from '../commandes/commande.entity';
export declare class DashboardService {
    private stockRepo;
    private wipRepo;
    private commandeRepo;
    constructor(stockRepo: Repository<Stock>, wipRepo: Repository<Wip>, commandeRepo: Repository<Commande>);
    getKPIs(): Promise<{
        totalArticles: number;
        valeurTotale: number;
        articlesEnAlerte: number;
        nombreSurstock: number;
        valeurSurstock: number;
        ecartsCritiques: number;
        commandesEnAttente: number;
    }>;
    getRotationStocks(): Promise<{
        article: string;
        tauxRotation: number;
    }[]>;
}
