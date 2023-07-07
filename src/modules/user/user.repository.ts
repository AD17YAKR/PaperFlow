import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findUserById(userId: string): Promise<User> {
    return await this.userModel.findById(userId).populate([
      {
        path: 'sharedPdfs',
        model: 'Pdf',
      },
      {
        path: 'pdfs',
        model: 'Pdf',
      },
    ]);
  }

  async getAllUsers(userId: string): Promise<User[]> {
    return await this.userModel.find({ _id: { $ne: userId } });
  }

  async addPdfToUserId(userId: string, pdfs: string[]) {
    const res = await this.userModel.findOneAndUpdate(
      { _id: userId },
      { pdfs },
      { new: true },
    );
    return res;
  }

  async addUserIdToSharedPdf(userId: string, sharedPdfs: string[]) {
    const res = await this.userModel.findOneAndUpdate(
      { _id: userId },
      { sharedPdfs },
      { new: true },
    );
    return res;
  }
}
