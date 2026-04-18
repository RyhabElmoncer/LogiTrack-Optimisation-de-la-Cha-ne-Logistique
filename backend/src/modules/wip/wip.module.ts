import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WipController } from './wip.controller';
import { WipService } from './wip.service';
import { Wip } from './wip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wip])],
  controllers: [WipController],
  providers: [WipService],
  exports: [WipService],
})
export class WipModule {}
