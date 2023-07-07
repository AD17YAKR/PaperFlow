import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { S3UploadService } from '../common/s3-upload.service';
import { PdfRepository } from './pdf.repository';
import { UploadedFile } from '@nestjs/common';
import { AddNewUserDto, CreatePdfDetailsDto } from './dto/pdf.dto';
import { CreateCommentDto, InputCommentDto } from './dto/comment.dto';
import * as _ from 'lodash';
import { UserService } from '../user/user.service';

@Injectable()
export class PdfService {
  constructor(
    private readonly pdfRepository: PdfRepository,
    private readonly s3UploadService: S3UploadService,
    private readonly userService: UserService,
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

    await this.userService.addPdfToUserId(userId, newPdfDetails._id);

    return newPdfDetails.toJSON();
  }

  async getPdfsByUserId(userId: string) {
    const pdfs = await this.pdfRepository.getPdfsByUserId(userId);
    return { pdfs };
  }

  async sharePdfToUser(pdfId: string, userId: string, payload: AddNewUserDto) {
    const pdfDetail = await this.pdfRepository.getPdfById(pdfId);
    if (pdfDetail.userId.toString() !== userId.toString()) {
      throw new UnauthorizedException();
    }
    const sharedUsers = new Set(pdfDetail.sharedUserIds);
    sharedUsers.add(payload.sharedUserId);

    const findPdf = pdfDetail.sharedUserIds.find(
      (uid) => uid.toString() == userId,
    );
    if (findPdf) {
      return pdfDetail;
    }
    await this.userService.addUserIdToSharedPdf(payload.sharedUserId, pdfId);

    const pdfs = await this.pdfRepository.sharePdfToUser(
      pdfId,
      Array.from(sharedUsers),
    );
    return pdfs;
  }

  async getPdfById(id, userId: string) {
    const pdfDetail = await this.pdfRepository.getPdfById(id);
    return pdfDetail;
  }

  async addCommentToPdf(
    pdfId: string,
    userId: string,
    payload: InputCommentDto,
  ) {
    const { comment } = payload;

    const pdfDetail = await this.pdfRepository.getPdfById(pdfId);

    const sharedUser = _.some(
      pdfDetail.sharedUserIds,
      (elementId) => elementId.toString() === userId.toString(),
    );

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
