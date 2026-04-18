import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('commandes')
export class Commande {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  numero_commande: string;

  @Column({ length: 100 })
  fournisseur: string;

  @Column({ length: 50 })
  code_article: string;

  @Column('decimal', { precision: 10, scale: 2 })
  quantite: number;

  @Column('decimal', { precision: 15, scale: 2 })
  montant_total: number;

  @Column({ length: 20, default: 'en_attente' })
  statut: string;

  @Column({ nullable: true })
  date_livraison_prevue: Date;

  @CreateDateColumn()
  date_creation: Date;
}
