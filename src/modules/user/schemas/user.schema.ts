import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Pdf } from 'src/modules/pdf/schemas/pdf.schema';
import { Document, HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { Type } from 'class-transformer';

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
  pdfs: string[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Pdf' }])
  sharedPdfs: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('sharedPdfDetails', {
  ref: 'Pdf',
  localField: 'sharedPdfs',
  foreignField: '_id',
});

UserSchema.plugin(uniqueValidator, { type: 'MongooseError' });
