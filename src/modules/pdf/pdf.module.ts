import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { S3UploadModule } from '../common/common.module';
import { PdfController } from './pdf.controller';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { Pdf, PdfSchema } from './schemas/pdf.schema';
import { PdfRepository } from './pdf.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pdf.name, schema: PdfSchema }]),
    S3UploadModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [PdfController],
  providers: [PdfService, PdfRepository],
  exports: [PdfService],
})
export class PdfModule {}
