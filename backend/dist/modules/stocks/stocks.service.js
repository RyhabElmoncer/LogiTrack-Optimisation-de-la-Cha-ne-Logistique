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
exports.StocksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const stock_entity_1 = require("./stock.entity");
let StocksService = class StocksService {
    constructor(stockRepo) {
        this.stockRepo = stockRepo;
    }
    findAll(search) {
        if (search) {
            return this.stockRepo.find({
                where: [
                    { code_article: (0, typeorm_2.Like)(`%${search}%`) },
                    { designation: (0, typeorm_2.Like)(`%${search}%`) },
                    { fournisseur: (0, typeorm_2.Like)(`%${search}%`) },
                ],
            });
        }
        return this.stockRepo.find();
    }
    findOne(id) {
        return this.stockRepo.findOneBy({ id });
    }
    async calculerDOH(id) {
        const stock = await this.findOne(id);
        if (!stock || stock.consommation_journaliere === 0) {
            return { doh: 0, statut: 'inconnu' };
        }
        const doh = stock.quantite_disponible / stock.consommation_journaliere;
        let statut = 'normal';
        if (doh < 3)
            statut = 'critique';
        else if (doh > 30)
            statut = 'surstock';
        return { doh: Math.round(doh), statut };
    }
    async getArticlesSurstock() {
        const stocks = await this.stockRepo.find();
        return stocks.filter(s => {
            if (s.consommation_journaliere === 0)
                return false;
            const doh = s.quantite_disponible / s.consommation_journaliere;
            return doh > 30;
        });
    }
    create(data) {
        const stock = this.stockRepo.create(data);
        return this.stockRepo.save(stock);
    }
    async update(id, data) {
        await this.stockRepo.update(id, data);
        return this.findOne(id);
    }
    async remove(id) {
        await this.stockRepo.delete(id);
    }
};
exports.StocksService = StocksService;
exports.StocksService = StocksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(stock_entity_1.Stock)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StocksService);
//# sourceMappingURL=stocks.service.js.map