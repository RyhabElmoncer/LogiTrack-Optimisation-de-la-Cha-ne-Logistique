#  LogiTrack — Optimisation de la Chaîne Logistique

Application web intelligente dédiée au **suivi, l’analyse et l’optimisation de la chaîne logistique**, visant à réduire les retards de production et améliorer la prise de décision.

---

##  Objectifs

* Réduire les ruptures et surstocks
* Optimiser la gestion des commandes fournisseurs
* Suivre les encours de production (WIP)
* Fournir des indicateurs KPI en temps réel

---

##  Stack Technique

* **Backend** : NestJS (Node.js) — port 3001
* **Frontend** : React.js + Recharts — port 3000
* **Base de données** : SQL Server
* **Authentification** : JWT

---

##  Installation & Lancement

###  1. Base de données

Ouvrir SQL Server Management Studio et exécuter :

```
backend/database.sql
```

✔️ Cela crée la base `LogistiqueDB` avec toutes les tables et données de test.

---

###  2. Backend (NestJS)

```bash
cd backend
npm install
```

Configurer la connexion dans `src/app.module.ts` :

```ts
host: 'localhost',
username: 'sa',
password: 'VotreMotDePasse',
database: 'LogistiqueDB',
```

Démarrer le serveur :

```bash
npm run start:dev
```

🔗 API disponible sur :
http://localhost:3001/api

---

### 📌 3. Frontend (React)

```bash
cd frontend
npm install
npm start
```

🌐 Application disponible sur :
http://localhost:3000

---

##  Comptes de Test

| Rôle                   | Email                                                           | Mot de passe |
| ---------------------- | --------------------------------------------------------------- | ------------ |
| Admin                  | [admin@logistique.com](mailto:admin@logistique.com)             | Admin123!    |
| Responsable Logistique | [responsable@logistique.com](mailto:responsable@logistique.com) | Admin123!    |
| Approvisionneur        | [appro@logistique.com](mailto:appro@logistique.com)             | Admin123!    |

---

## Fonctionnalités

###  Tableau de bord

* KPI en temps réel
* Graphiques dynamiques (Recharts)
* Alertes intelligentes

###  Gestion des Stocks

* CRUD des articles
* Calcul automatique du **DOH (Days on Hand)**
* Détection de surstock

###  WIP (Work In Progress)

* Suivi des encours par ligne / zone
* Détection des écarts

###  Commandes

* Création de commandes fournisseurs
* Validation / Blocage
* Suivi des statuts

###  Utilisateurs

* Gestion des comptes
* Attribution des rôles
* Accès sécurisé (admin uniquement)

---

##  Structure du Projet

```
logistique-app/
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── utilisateurs/
│   │   │   ├── stocks/
│   │   │   ├── wip/
│   │   │   ├── commandes/
│   │   │   └── dashboard/
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── database.sql
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/layout/
    │   ├── hooks/
    │   └── services/api.js
    └── package.json
```

---

## 🔌 API Endpoints

```
POST   /api/auth/login

GET    /api/stocks
GET    /api/stocks/:id/doh
GET    /api/stocks/surstock

GET    /api/wip
GET    /api/wip/ecarts

GET    /api/commandes
PUT    /api/commandes/:id/valider
PUT    /api/commandes/:id/bloquer

GET    /api/dashboard/kpis
GET    /api/dashboard/rotation

GET    /api/utilisateurs
```

---



##  Auteur

Ryhab Elmoncer
Passionné par le développement web & mobile

---

## Licence

Projet réalisé dans un cadre académique (PFE).
