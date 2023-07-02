import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { S3UploadModule } from '../common/s3-upload/s3-upload.module';
import { PdfController } from './pdf.controller';

@Module({
  imports: [S3UploadModule],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
