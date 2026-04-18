import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UtilisateursService } from './utilisateurs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('utilisateurs')
export class UtilisateursController {
  constructor(private readonly utilisateursService: UtilisateursService) {}

  @Get()
  findAll() { return this.utilisateursService.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.utilisateursService.findOne(+id); }

  @Post()
  create(@Body() body: any) { return this.utilisateursService.create(body); }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) { return this.utilisateursService.update(+id, body); }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.utilisateursService.remove(+id); }
}
