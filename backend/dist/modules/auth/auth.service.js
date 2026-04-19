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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const utilisateurs_service_1 = require("../utilisateurs/utilisateurs.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(utilisateursService, jwtService) {
        this.utilisateursService = utilisateursService;
        this.jwtService = jwtService;
    }
    async login(email, motDePasse) {
        const user = await this.utilisateursService.findByEmail(email);
        if (!user || !user.actif)
            throw new common_1.UnauthorizedException('Identifiants invalides');
        const valid = await bcrypt.compare(motDePasse, user.mot_de_passe);
        if (!valid)
            throw new common_1.UnauthorizedException('Identifiants invalides');
        const payload = { sub: user.id, email: user.email, role: user.role, nom: user.nom };
        return {
            access_token: this.jwtService.sign(payload),
            user: { id: user.id, nom: user.nom, email: user.email, role: user.role },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [utilisateurs_service_1.UtilisateursService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map