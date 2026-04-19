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
exports.WipService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wip_entity_1 = require("./wip.entity");
let WipService = class WipService {
    constructor(wipRepo) {
        this.wipRepo = wipRepo;
    }
    findAll() {
        return this.wipRepo.find();
    }
    findOne(id) {
        return this.wipRepo.findOneBy({ id });
    }
    async getEcarts() {
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
    create(data) {
        const wip = this.wipRepo.create(data);
        return this.wipRepo.save(wip);
    }
    async update(id, data) {
        await this.wipRepo.update(id, data);
        return this.findOne(id);
    }
};
exports.WipService = WipService;
exports.WipService = WipService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wip_entity_1.Wip)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WipService);
//# sourceMappingURL=wip.service.js.map