import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CaseStudiesService } from './case-studies.service';
import { CreateCaseStudyDto, UpdateCaseStudyDto } from './dto/case-studies.dto';
import { Public } from '../../common/decorators';
import { JwtAuthGuard } from '../../common/guards';

@Controller('case-studies')
export class CaseStudiesController {
  constructor(private readonly caseStudiesService: CaseStudiesService) {}

  // ============ PUBLIC ENDPOINTS ============

  /** GET /api/case-studies — Published case studies list (public) */
  @Public()
  @Get()
  async findAllPublished(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('category') category?: string,
  ) {
    return this.caseStudiesService.findAllPublished(page, limit, category);
  }

  /** GET /api/case-studies/slug/:slug — Single case study by slug (public) */
  @Public()
  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.caseStudiesService.findBySlug(slug);
  }

  // ============ ADMIN ENDPOINTS ============

  /** GET /api/case-studies/admin — All case studies (admin) */
  @UseGuards(JwtAuthGuard)
  @Get('admin')
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.caseStudiesService.findAll(page, limit);
  }

  /** GET /api/case-studies/admin/:id — Single case study by ID (admin) */
  @UseGuards(JwtAuthGuard)
  @Get('admin/:id')
  async findById(@Param('id') id: string) {
    return this.caseStudiesService.findById(id);
  }

  /** POST /api/case-studies — Create case study (admin) */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateCaseStudyDto) {
    return this.caseStudiesService.create(dto);
  }

  /** PUT /api/case-studies/:id — Update case study (admin) */
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCaseStudyDto) {
    return this.caseStudiesService.update(id, dto);
  }

  /** DELETE /api/case-studies/:id — Delete case study (admin) */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.caseStudiesService.remove(id);
  }
}
