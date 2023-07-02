import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3UploadService } from '../common/s3-upload/s3-upload.service';

@Controller('pdf')
export class PdfController {
  constructor(private readonly s3UploadService: S3UploadService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file) {
    const url = await this.s3UploadService.upload(file);
    return { url: url };
  }
}
