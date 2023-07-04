import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { S3UploadService } from '../common/s3-upload.service';
import { PdfRepository } from './pdf.repository';
import { UploadedFile } from '@nestjs/common';
import { CreatePdfDetailsDto } from './dto/pdf.dto';
import { CreateCommentDto, InputCommentDto } from './dto/comment.dto';
import * as _ from 'lodash';

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

  async getPdfById(id, userId: string) {
    const pdfDetail = await this.pdfRepository.getPdfById(id);
    if (pdfDetail.userId.toString() !== userId.toString()) {
      throw new UnauthorizedException();
    } else {
      return pdfDetail;
    }
  }

  async addCommentToPdf(
    pdfId: string,
    userId: string,
    payload: InputCommentDto,
  ) {
    const { comment } = payload;

    const pdfDetail = await this.pdfRepository.getPdfById(pdfId);

    console.log({ pdfDetail });

    const sharedUser = _.some(
      pdfDetail.sharedUserIds,
      (elementId) => elementId.toString() === userId.toString(),
    );

    console.log(sharedUser);

    if (pdfDetail.userId.toString() === userId.toString() || sharedUser) {
      const commentData: CreateCommentDto = {
        comment,
        pdfId,
        userId,
      };
      return this.pdfRepository.addCommentToPdf(commentData);
    } else {
      throw new UnauthorizedException();
    }
  }
}
