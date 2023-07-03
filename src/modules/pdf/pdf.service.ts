import { Injectable, Req } from '@nestjs/common';
import { S3UploadService } from '../common/s3-upload.service';
import { PdfRepository } from './pdf.repository';
import { UploadedFile } from '@nestjs/common';
import { CreatePdfDetailsDto } from './dto/pdf.dto';

@Injectable()
export class PdfService {
  constructor(
    private readonly pdfRepository: PdfRepository,
    private readonly s3UploadService: S3UploadService,
  ) {}

  async uploadFile(@UploadedFile() file, @Req() req: any) {
    const userId = req.user._id;
    const url = await this.s3UploadService.upload(file);

    const createPdfDetailsDto: CreatePdfDetailsDto = {
      fileName: file.originalname,
      url,
      userId,
    };

    const newPdfDetails = await this.pdfRepository.createPdf(
      createPdfDetailsDto,
    );

    return newPdfDetails.toJSON();
  }

  async getPdfsByUserId(userId: string) {
    const pdfs = await this.pdfRepository.getPdfsByUserId(userId);
    return { pdfs };
  }
}
