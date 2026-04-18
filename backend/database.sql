-- ============================================
-- Script de création de la base de données
-- LogistiqueDB - SQL Server
-- ============================================

CREATE DATABASE LogistiqueDB;
GO
USE LogistiqueDB;
GO

-- Table utilisateurs
CREATE TABLE utilisateurs (
  id INT IDENTITY(1,1) PRIMARY KEY,
  email NVARCHAR(100) NOT NULL UNIQUE,
  nom NVARCHAR(100) NOT NULL,
  mot_de_passe NVARCHAR(255) NOT NULL,
  role NVARCHAR(50) NOT NULL, -- admin | responsable_logistique | approvisionneur | magasinier | direction
  actif BIT DEFAULT 1,
  date_creation DATETIME DEFAULT GETDATE()
);

-- Table stocks
CREATE TABLE stocks (
  id INT IDENTITY(1,1) PRIMARY KEY,
  code_article NVARCHAR(50) NOT NULL,
  designation NVARCHAR(200) NOT NULL,
  fournisseur NVARCHAR(100),
  emplacement NVARCHAR(100),
  quantite_disponible DECIMAL(10,2) DEFAULT 0,
  quantite_bloquee DECIMAL(10,2) DEFAULT 0,
  quantite_en_cours DECIMAL(10,2) DEFAULT 0,
  seuil_min DECIMAL(10,2) DEFAULT 0,
  seuil_max DECIMAL(10,2) DEFAULT 0,
  consommation_journaliere DECIMAL(10,2) DEFAULT 0,
  valeur_unitaire DECIMAL(15,2) DEFAULT 0,
  date_maj DATETIME DEFAULT GETDATE()
);

-- Table WIP (Work In Progress)
CREATE TABLE wip (
  id INT IDENTITY(1,1) PRIMARY KEY,
  ligne NVARCHAR(100) NOT NULL,
  zone NVARCHAR(100) NOT NULL,
  designation NVARCHAR(200) NOT NULL,
  quantite_reelle DECIMAL(10,2) DEFAULT 0,
  quantite_theorique DECIMAL(10,2) DEFAULT 0,
  statut NVARCHAR(20) DEFAULT 'normal',
  date_maj DATETIME DEFAULT GETDATE()
);

-- Table commandes
CREATE TABLE commandes (
  id INT IDENTITY(1,1) PRIMARY KEY,
  numero_commande NVARCHAR(50) NOT NULL,
  fournisseur NVARCHAR(100) NOT NULL,
  code_article NVARCHAR(50) NOT NULL,
  quantite DECIMAL(10,2) NOT NULL,
  montant_total DECIMAL(15,2) NOT NULL,
  statut NVARCHAR(20) DEFAULT 'en_attente',
  date_livraison_prevue DATE,
  date_creation DATETIME DEFAULT GETDATE()
);

-- Table historique mouvements stock
CREATE TABLE mouvements_stock (
  id INT IDENTITY(1,1) PRIMARY KEY,
  stock_id INT FOREIGN KEY REFERENCES stocks(id),
  type_mouvement NVARCHAR(50) NOT NULL, -- entree | sortie | ajustement
  quantite DECIMAL(10,2) NOT NULL,
  commentaire NVARCHAR(300),
  utilisateur_id INT FOREIGN KEY REFERENCES utilisateurs(id),
  date_mouvement DATETIME DEFAULT GETDATE()
);

-- ============================================
-- Données de test
-- ============================================

-- Utilisateur admin par défaut (mot de passe: Admin123!)
INSERT INTO utilisateurs (email, nom, mot_de_passe, role) VALUES
('admin@logistique.com', 'Administrateur', '$2b$10$rKnMd5C2y6g1E3nP8vQx4OzL7wA9sJbM1uT0pY5cX2hN4kD6eGfWi', 'admin'),
('responsable@logistique.com', 'Ahmed Ben Ali', '$2b$10$rKnMd5C2y6g1E3nP8vQx4OzL7wA9sJbM1uT0pY5cX2hN4kD6eGfWi', 'responsable_logistique'),
('appro@logistique.com', 'Sarra Mansour', '$2b$10$rKnMd5C2y6g1E3nP8vQx4OzL7wA9sJbM1uT0pY5cX2hN4kD6eGfWi', 'approvisionneur');

-- Stocks de test
INSERT INTO stocks (code_article, designation, fournisseur, emplacement, quantite_disponible, quantite_bloquee, seuil_min, seuil_max, consommation_journaliere, valeur_unitaire) VALUES
('ART-001', 'Visserie M6 acier', 'Fournisseur A', 'Zone A - Étagère 1', 5000, 200, 500, 10000, 150, 0.05),
('ART-002', 'Câble électrique 2.5mm', 'Fournisseur B', 'Zone B - Étagère 3', 800, 0, 100, 2000, 20, 2.50),
('ART-003', 'Roulement à billes 6205', 'Fournisseur C', 'Zone A - Étagère 2', 45, 10, 50, 500, 8, 12.00),
('ART-004', 'Joint torique 50mm', 'Fournisseur A', 'Zone C - Étagère 1', 2000, 100, 200, 5000, 30, 0.80),
('ART-005', 'Moteur électrique 1.5kW', 'Fournisseur D', 'Zone D - Rack 2', 12, 0, 5, 30, 1, 450.00);

-- WIP de test
INSERT INTO wip (ligne, zone, designation, quantite_reelle, quantite_theorique, statut) VALUES
('Ligne 1', 'Assemblage', 'Composants moteur en cours', 85, 80, 'normal'),
('Ligne 2', 'Câblage', 'Faisceaux électriques', 40, 50, 'ecart'),
('Ligne 3', 'Contrôle qualité', 'Pièces en attente contrôle', 120, 100, 'ecart'),
('Ligne 1', 'Emballage', 'Produits finis emballage', 60, 60, 'normal');

-- Commandes de test
INSERT INTO commandes (numero_commande, fournisseur, code_article, quantite, montant_total, statut, date_livraison_prevue) VALUES
('CMD-2024-001', 'Fournisseur A', 'ART-001', 5000, 250.00, 'validee', '2024-02-15'),
('CMD-2024-002', 'Fournisseur C', 'ART-003', 100, 1200.00, 'en_attente', '2024-02-20'),
('CMD-2024-003', 'Fournisseur B', 'ART-002', 500, 1250.00, 'bloquee', '2024-03-01');
