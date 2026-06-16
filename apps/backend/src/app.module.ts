import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { CaseStudiesModule } from './modules/case-studies/case-studies.module';
import { ContactModule } from './modules/contact/contact.module';

@Module({
  imports: [
    // Global config — loads .env automatically
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Database (Prisma)
    DatabaseModule,

    // Feature modules
    AuthModule,
    ArticlesModule,
    CaseStudiesModule,
    ContactModule,
  ],
})
export class AppModule {}
