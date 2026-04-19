import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StocksModule } from './modules/stocks/stocks.module';
import { WipModule } from './modules/wip/wip.module';
import { CommandesModule } from './modules/commandes/commandes.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AuthModule } from './modules/auth/auth.module';
import { UtilisateursModule } from './modules/utilisateurs/utilisateurs.module';

@Module({
  imports: [
   TypeOrmModule.forRoot({
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  username: 'root',             
  password: '',   
  database: 'LogistiqueDB',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  options: { 
    encrypt: false,
    trustServerCertificate: true,  // ← ajouter ça
  },
}),
    AuthModule,
    UtilisateursModule,
    StocksModule,
    WipModule,
    CommandesModule,
    DashboardModule,
  ],
})
export class AppModule {}
