import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ConsultationsService } from './consultations.service';
import { CreateConsultationDto, UpdateConsultationStatusDto } from './dto/consultations.dto';
import { Public } from '../../common/decorators';
import { JwtAuthGuard } from '../../common/guards';

@Controller('consultations')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  // ============ PUBLIC ENDPOINTS ============

  /** POST /api/consultations — Submit consultation booking (public) */
  @Public()
  @Post()
  async create(@Body() dto: CreateConsultationDto) {
    return this.consultationsService.create(dto);
  }

  /** GET /api/consultations/date/:date — Approved consultations on a date (public) */
  @Public()
  @Get('date/:date')
  async findByDate(@Param('date') date: string) {
    return this.consultationsService.findByDate(date);
  }

  // ============ ADMIN ENDPOINTS ============

  /** GET /api/consultations/admin — All consultations (admin) */
  @UseGuards(JwtAuthGuard)
  @Get('admin')
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: string,
  ) {
    return this.consultationsService.findAll(page, limit, status);
  }

  /** GET /api/consultations/admin/stats — Consultation stats (admin) */
  @UseGuards(JwtAuthGuard)
  @Get('admin/stats')
  async getStats() {
    return this.consultationsService.countByStatus();
  }

  /** PATCH /api/consultations/admin/:id/status — Approve/Reject (admin) */
  @UseGuards(JwtAuthGuard)
  @Patch('admin/:id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateConsultationStatusDto,
  ) {
    return this.consultationsService.updateStatus(id, dto);
  }

  /** DELETE /api/consultations/admin/:id — Delete consultation (admin) */
  @UseGuards(JwtAuthGuard)
  @Delete('admin/:id')
  async remove(@Param('id') id: string) {
    return this.consultationsService.remove(id);
  }
}
