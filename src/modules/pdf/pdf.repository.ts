import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pdf } from './schemas/pdf.schema';
import { CreatePdfDetailsDto } from './dto/pdf.dto';
import { CreateCommentDto } from './dto/comment.dto';
import { CommentDetails } from './schemas/comments.schema';

@Injectable()
export class PdfRepository {
  constructor(
    @InjectModel(Pdf.name) private readonly pdfModel: Model<Pdf>,
    @InjectModel(CommentDetails.name)
    private readonly commentDetailsModel: Model<CommentDetails>,
  ) {}

  async createPdf(createPdfDetailsDto: CreatePdfDetailsDto): Promise<Pdf> {
    const newPdf = new this.pdfModel(createPdfDetailsDto);
    return newPdf.save();
  }

  async getPdfsByUserId(userId: string): Promise<Pdf[]> {
    return this.pdfModel.find({ userId }).populate('comments');
  }

  async getPdfById(_id: string): Promise<Pdf> {
    return (await this.pdfModel.findOne({ _id })).populate('comments');
  }

  async addCommentToPdf(
    createCommentDto: CreateCommentDto,
  ): Promise<CommentDetails> {
    const newComment = new this.commentDetailsModel(createCommentDto);
    return newComment.save();
  }
}
