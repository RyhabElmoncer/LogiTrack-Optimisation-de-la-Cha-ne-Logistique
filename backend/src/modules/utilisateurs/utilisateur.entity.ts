import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('utilisateurs')
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 100 })
  nom: string;

  @Column()
  mot_de_passe: string;

  @Column({ length: 50 })
  role: string; // admin | responsable_logistique | approvisionneur | magasinier | direction

  @Column({ default: true })
  actif: boolean;

  @CreateDateColumn()
  date_creation: Date;
}
