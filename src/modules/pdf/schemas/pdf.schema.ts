import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/modules/user/schemas/user.schema';
import uniqueValidator from 'mongoose-unique-validator';

export type PdfDocument = HydratedDocument<Pdf>;

@Schema()
export class Pdf extends Document {
  @Prop()
  fileName: string;

  @Prop()
  url: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: User;
}

export const PdfSchema = SchemaFactory.createForClass(Pdf);

PdfSchema.plugin(uniqueValidator, { type: 'MongooseError' });
