import {
  Controller,
  Post,
  Get,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PdfService } from './pdf.service';
import { PdfFileInterceptor } from '../common/file.filter';
import { InputCommentDto } from './dto/comment.dto';
import { AddNewUserDto } from './dto/pdf.dto';

@Controller('pdf')
export class PdfController {
  constructor(private pdfService: PdfService) {}

  @Post('upload')
  @UseGuards(AuthGuard())
  @UseInterceptors(PdfFileInterceptor)
  async uploadFile(@UploadedFile() file, @Req() req: any) {
    return await this.pdfService.uploadFile(file, req);
  }

  @Get('user')
  @UseGuards(AuthGuard())
  async getAllPdfsForUser(@Req() req: any) {
    return this.pdfService.getPdfsByUserId(req.user._id);
  }

  @Patch('user/share/:id')
  @UseGuards(AuthGuard())
  async sharePdfToUser(
    @Req() req: any,
    @Param('id') id: string,
    @Body() payload: AddNewUserDto,
  ) {
    return this.pdfService.sharePdfToUser(id, req.user._id, payload);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getPdfById(@Req() req: any, @Param('id') id: string) {
    return this.pdfService.getPdfById(id, req.user._id);
  }

  @Post('comment/:id')
  @UseGuards(AuthGuard())
  async addCommentToPdf(
    @Body() payload: InputCommentDto,
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return this.pdfService.addCommentToPdf(id, req.user._id, payload);
  }
}
