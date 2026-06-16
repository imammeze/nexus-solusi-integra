import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto, UpdateArticleDto } from './dto/articles.dto';
import { Public } from '../../common/decorators';
import { JwtAuthGuard } from '../../common/guards';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  // ============ PUBLIC ENDPOINTS ============

  /** GET /api/articles — Published articles list (public) */
  @Public()
  @Get()
  async findAllPublished(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('category') category?: string,
  ) {
    return this.articlesService.findAllPublished(page, limit, category);
  }

  /** GET /api/articles/slug/:slug — Single article by slug (public) */
  @Public()
  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.articlesService.findBySlug(slug);
  }

  // ============ ADMIN ENDPOINTS ============

  /** GET /api/articles/admin — All articles (admin) */
  @UseGuards(JwtAuthGuard)
  @Get('admin')
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.articlesService.findAll(page, limit);
  }

  /** GET /api/articles/admin/:id — Single article by ID (admin) */
  @UseGuards(JwtAuthGuard)
  @Get('admin/:id')
  async findById(@Param('id') id: string) {
    return this.articlesService.findById(id);
  }

  /** POST /api/articles — Create article (admin) */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateArticleDto, @Request() req: any) {
    return this.articlesService.create(dto, req.user.sub);
  }

  /** PUT /api/articles/:id — Update article (admin) */
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateArticleDto) {
    return this.articlesService.update(id, dto);
  }

  /** DELETE /api/articles/:id — Delete article (admin) */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
