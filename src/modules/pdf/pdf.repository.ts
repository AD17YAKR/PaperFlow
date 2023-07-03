import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pdf } from './schemas/pdf.schema';
import { CreatePdfDetailsDto } from './dto/pdf.dto';

@Injectable()
export class PdfRepository {
  constructor(@InjectModel(Pdf.name) private readonly pdfModel: Model<Pdf>) {}

  async createPdf(createPdfDetailsDto: CreatePdfDetailsDto): Promise<Pdf> {
    const newPdf = new this.pdfModel(createPdfDetailsDto);
    return newPdf.save();
  }

  async getPdfsByUserId(userId: string): Promise<Pdf[]> {
    return this.pdfModel.find({ user: userId }).exec();
  }
}
