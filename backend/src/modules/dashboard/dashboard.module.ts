import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Stock } from '../stocks/stock.entity';
import { Wip } from '../wip/wip.entity';
import { Commande } from '../commandes/commande.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stock, Wip, Commande])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
