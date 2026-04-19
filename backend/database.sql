CREATE DATABASE LogistiqueDB;
USE LogistiqueDB;

-- Table utilisateurs
CREATE TABLE utilisateurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  nom VARCHAR(100) NOT NULL,
  mot_de_passe VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  actif BOOLEAN DEFAULT TRUE,
  date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table stocks
CREATE TABLE stocks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code_article VARCHAR(50) NOT NULL,
  designation VARCHAR(200) NOT NULL,
  fournisseur VARCHAR(100),
  emplacement VARCHAR(100),
  quantite_disponible DECIMAL(10,2) DEFAULT 0,
  quantite_bloquee DECIMAL(10,2) DEFAULT 0,
  quantite_en_cours DECIMAL(10,2) DEFAULT 0,
  seuil_min DECIMAL(10,2) DEFAULT 0,
  seuil_max DECIMAL(10,2) DEFAULT 0,
  consommation_journaliere DECIMAL(10,2) DEFAULT 0,
  valeur_unitaire DECIMAL(15,2) DEFAULT 0,
  date_maj DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table wip
CREATE TABLE wip (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ligne VARCHAR(100) NOT NULL,
  zone VARCHAR(100) NOT NULL,
  designation VARCHAR(200) NOT NULL,
  quantite_reelle DECIMAL(10,2) DEFAULT 0,
  quantite_theorique DECIMAL(10,2) DEFAULT 0,
  statut VARCHAR(20) DEFAULT 'normal',
  date_maj DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table commandes
CREATE TABLE commandes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  numero_commande VARCHAR(50) NOT NULL,
  fournisseur VARCHAR(100) NOT NULL,
  code_article VARCHAR(50) NOT NULL,
  quantite DECIMAL(10,2) NOT NULL,
  montant_total DECIMAL(15,2) NOT NULL,
  statut VARCHAR(20) DEFAULT 'en_attente',
  date_livraison_prevue DATE,
  date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table mouvements_stock
CREATE TABLE mouvements_stock (
  id INT AUTO_INCREMENT PRIMARY KEY,
  stock_id INT,
  type_mouvement VARCHAR(50) NOT NULL,
  quantite DECIMAL(10,2) NOT NULL,
  commentaire VARCHAR(300),
  utilisateur_id INT,
  date_mouvement DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (stock_id) REFERENCES stocks(id),
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
);