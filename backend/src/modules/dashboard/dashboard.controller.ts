import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('kpis')
  getKPIs() { return this.dashboardService.getKPIs(); }

  @Get('rotation')
  getRotation() { return this.dashboardService.getRotationStocks(); }
}
