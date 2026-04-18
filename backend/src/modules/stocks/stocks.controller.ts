import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get()
  findAll(@Query('search') search?: string) {
    return this.stocksService.findAll(search);
  }

  @Get('surstock')
  getSurstock() {
    return this.stocksService.getArticlesSurstock();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stocksService.findOne(+id);
  }

  @Get(':id/doh')
  calculerDOH(@Param('id') id: string) {
    return this.stocksService.calculerDOH(+id);
  }

  @Post()
  create(@Body() body: any) {
    return this.stocksService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.stocksService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stocksService.remove(+id);
  }
}
