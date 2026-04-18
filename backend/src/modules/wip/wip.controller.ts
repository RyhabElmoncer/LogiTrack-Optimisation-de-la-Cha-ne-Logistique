import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { WipService } from './wip.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('wip')
export class WipController {
  constructor(private readonly wipService: WipService) {}

  @Get()
  findAll() { return this.wipService.findAll(); }

  @Get('ecarts')
  getEcarts() { return this.wipService.getEcarts(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.wipService.findOne(+id); }

  @Post()
  create(@Body() body: any) { return this.wipService.create(body); }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) { return this.wipService.update(+id, body); }
}
