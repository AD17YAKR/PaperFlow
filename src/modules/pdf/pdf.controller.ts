import {
  Controller,
  Post,
  Get,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PdfService } from './pdf.service';
import { PdfFileInterceptor } from '../common/file.filter';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('pdf')
export class PdfController {
  constructor(private pdfService: PdfService) {}

  @Post('upload')
  @UseGuards(AuthGuard())
  @UseInterceptors(PdfFileInterceptor)
  async uploadFile(@UploadedFile() file, @Req() req: any) {
    const data = await this.pdfService.uploadFile(file, req);
    return { ...data };
  }

  @Get(':userId')
  @UseGuards(AuthGuard())
  async getAllPdfsForUser(@Param('userId') userId: string) {
    const pdfs = await this.pdfService.getPdfsByUserId(userId);
    return pdfs;
  }
}
