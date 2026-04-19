"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const stock_entity_1 = require("../stocks/stock.entity");
const wip_entity_1 = require("../wip/wip.entity");
const commande_entity_1 = require("../commandes/commande.entity");
let DashboardService = class DashboardService {
    constructor(stockRepo, wipRepo, commandeRepo) {
        this.stockRepo = stockRepo;
        this.wipRepo = wipRepo;
        this.commandeRepo = commandeRepo;
    }
    async getKPIs() {
        const stocks = await this.stockRepo.find();
        const wips = await this.wipRepo.find();
        const commandes = await this.commandeRepo.find();
        const totalArticles = stocks.length;
        const valeurTotale = stocks.reduce((sum, s) => sum + (s.quantite_disponible * s.valeur_unitaire), 0);
        const articlesEnAlerte = stocks.filter(s => s.quantite_disponible < s.seuil_min).length;
        const articlesSurstock = stocks.filter(s => {
            if (s.consommation_journaliere === 0)
                return false;
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
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(stock_entity_1.Stock)),
    __param(1, (0, typeorm_1.InjectRepository)(wip_entity_1.Wip)),
    __param(2, (0, typeorm_1.InjectRepository)(commande_entity_1.Commande)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map