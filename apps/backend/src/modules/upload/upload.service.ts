import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Checks if an image URL is still referenced in the database.
   * If it has 0 references, the physical file is deleted.
   * This should be called AFTER a record is deleted or updated with a new image.
   */
  async deleteImageIfOrphaned(imageUrl: string | null | undefined) {
    if (!imageUrl || !imageUrl.startsWith('/uploads/')) return;

    try {
      const [articleCount, eventCount, caseStudyCount] = await Promise.all([
        this.prisma.article.count({ where: { coverImage: imageUrl } }),
        this.prisma.event.count({ where: { coverImage: imageUrl } }),
        this.prisma.caseStudy.count({ where: { coverImage: imageUrl } }),
      ]);

      const totalOccurrences = articleCount + eventCount + caseStudyCount;

      if (totalOccurrences === 0) {
        const fileName = imageUrl.replace('/uploads/', '');
        const filePath = path.join(process.cwd(), 'uploads', fileName);

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          this.logger.log(`Orphaned file deleted successfully: ${fileName}`);
        }
      }
    } catch (error: any) {
      this.logger.error(`Failed to check or delete orphaned file: ${imageUrl}`, error.stack);
    }
  }
}
