import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Pdf } from 'src/modules/pdf/schemas/pdf.schema';
import { Document, HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Pdf' }])
  pdfs: Pdf[];
}

export const UserSchema = SchemaFactory.createForClass(User);
