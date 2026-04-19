import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getKPIs(): Promise<{
        totalArticles: number;
        valeurTotale: number;
        articlesEnAlerte: number;
        nombreSurstock: number;
        valeurSurstock: number;
        ecartsCritiques: number;
        commandesEnAttente: number;
    }>;
    getRotation(): Promise<{
        article: string;
        tauxRotation: number;
    }[]>;
}
