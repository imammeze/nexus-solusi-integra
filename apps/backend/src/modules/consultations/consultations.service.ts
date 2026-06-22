import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateConsultationDto, UpdateConsultationStatusDto } from './dto/consultations.dto';

@Injectable()
export class ConsultationsService {
  private readonly logger = new Logger(ConsultationsService.name);

  constructor(private readonly prisma: PrismaService) {}

  /** Submit a consultation booking (public) */
  async create(dto: CreateConsultationDto) {
    const consultation = await this.prisma.consultation.create({
      data: {
        fullName: dto.fullName,
        whatsapp: dto.whatsapp,
        service: dto.service as any,
        description: dto.description,
        consultDate: new Date(dto.consultDate),
        startTime: dto.startTime,
        endTime: dto.endTime,
      },
    });

    this.logger.log(`New consultation booking from: ${consultation.fullName} for ${dto.consultDate}`);
    return consultation;
  }

  /** Get APPROVED consultations for a specific date (public) */
  async findByDate(dateStr: string) {
    const date = new Date(dateStr); // this parses to UTC midnight

    const consultations = await this.prisma.consultation.findMany({
      where: {
        consultDate: date,
        status: 'APPROVED',
      },
      orderBy: { startTime: 'asc' },
      select: {
        id: true,
        fullName: true,
        service: true,
        consultDate: true,
        startTime: true,
        endTime: true,
        status: true,
      },
    });

    return consultations;
  }

  /** Get all consultations (admin) with pagination and optional status filter */
  async findAll(page = 1, limit = 10, status?: string) {
    const where: any = {};
    if (status) where.status = status;

    const [data, total] = await Promise.all([
      this.prisma.consultation.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: Number(limit),
      }),
      this.prisma.consultation.count({ where }),
    ]);

    return {
      data,
      meta: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) },
    };
  }

  /** Update consultation status (admin) */
  async updateStatus(id: string, dto: UpdateConsultationStatusDto) {
    const existing = await this.prisma.consultation.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Consultation with ID "${id}" not found`);
    }

    const updated = await this.prisma.consultation.update({
      where: { id },
      data: {
        status: dto.status as any,
        adminNotes: dto.adminNotes ?? existing.adminNotes,
      },
    });

    this.logger.log(`Consultation ${id} status changed to: ${dto.status}`);
    return updated;
  }

  /** Delete a consultation (admin) */
  async remove(id: string) {
    const existing = await this.prisma.consultation.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Consultation with ID "${id}" not found`);
    }

    await this.prisma.consultation.delete({ where: { id } });
    this.logger.log(`Consultation deleted: ${id}`);
    return { deleted: true };
  }

  /** Count consultations by status (for dashboard overview) */
  async countByStatus() {
    const [pending, approved, rejected, total] = await Promise.all([
      this.prisma.consultation.count({ where: { status: 'PENDING' } }),
      this.prisma.consultation.count({ where: { status: 'APPROVED' } }),
      this.prisma.consultation.count({ where: { status: 'REJECTED' } }),
      this.prisma.consultation.count(),
    ]);

    return { pending, approved, rejected, total };
  }
}
