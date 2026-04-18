import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { CommandesService } from './commandes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('commandes')
export class CommandesController {
  constructor(private readonly commandesService: CommandesService) {}

  @Get()
  findAll() { return this.commandesService.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.commandesService.findOne(+id); }

  @Post()
  create(@Body() body: any) { return this.commandesService.create(body); }

  @Put(':id/valider')
  valider(@Param('id') id: string) { return this.commandesService.valider(+id); }

  @Put(':id/bloquer')
  bloquer(@Param('id') id: string) { return this.commandesService.bloquer(+id); }
}
