import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/modules/user/schemas/user.schema';
import uniqueValidator from 'mongoose-unique-validator';
import { Type } from 'class-transformer';
import { CommentDetails } from './comments.schema';

export type PdfDocument = HydratedDocument<Pdf>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Pdf extends Document {
  @Prop()
  fileName: string;

  @Prop()
  url: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Type(() => CommentDetails)
  comments: CommentDetails[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'User' }])
  sharedUserIds: string[];
}

export const PdfSchema = SchemaFactory.createForClass(Pdf);

PdfSchema.virtual('comments', {
  ref: 'CommentDetails',
  localField: '_id',
  foreignField: 'pdfId',
});

PdfSchema.plugin(uniqueValidator, { type: 'MongooseError' });
