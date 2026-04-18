import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandesController } from './commandes.controller';
import { CommandesService } from './commandes.service';
import { Commande } from './commande.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Commande])],
  controllers: [CommandesController],
  providers: [CommandesService],
})
export class CommandesModule {}
