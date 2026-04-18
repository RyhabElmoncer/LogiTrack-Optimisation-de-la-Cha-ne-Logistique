import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('wip')
export class Wip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  ligne: string;

  @Column({ length: 100 })
  zone: string;

  @Column({ length: 200 })
  designation: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  quantite_reelle: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  quantite_theorique: number;

  @Column({ length: 20, default: 'normal' })
  statut: string;

  @UpdateDateColumn()
  date_maj: Date;
}
