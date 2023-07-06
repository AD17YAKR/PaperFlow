import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/modules/user/schemas/user.schema';
import uniqueValidator from 'mongoose-unique-validator';
import { Pdf } from './pdf.schema';
import { Type } from 'class-transformer';

export type CommentDetailsDocument = HydratedDocument<CommentDetails>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class CommentDetails extends Document {
  @Prop()
  comment: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Pdf' })
  pdfId: Pdf;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Type(() => User)
  userDetails: User;
}

export const CommentDetailsSchema =
  SchemaFactory.createForClass(CommentDetails);

CommentDetailsSchema.virtual('userDetails', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
});

CommentDetailsSchema.plugin(uniqueValidator, { type: 'MongooseError' });
