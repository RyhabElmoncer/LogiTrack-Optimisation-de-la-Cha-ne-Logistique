import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('stocks')
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  code_article: string;

  @Column({ length: 200 })
  designation: string;

  @Column({ length: 100, nullable: true })
  fournisseur: string;

  @Column({ length: 100, nullable: true })
  emplacement: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  quantite_disponible: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  quantite_bloquee: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  quantite_en_cours: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  seuil_min: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  seuil_max: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  consommation_journaliere: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  valeur_unitaire: number;

  @CreateDateColumn()
  date_maj: Date;
}
