import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async addPdfToUserId(userId: string, pdfId: string) {
    const userDetail = await this.userRepository.findUserById(userId);
    const pdfs = userDetail.pdfs;
    pdfs.push(pdfId);
    return this.userRepository.addPdfToUserId(userId, pdfs);
  }

  async addUserIdToSharedPdf(userId: string, pdfId: string) {
    const userDetail = await this.userRepository.findUserById(userId);
    const sharedPdfs = new Set(userDetail.sharedPdfs);

    const findPdf = userDetail.sharedPdfs.find(
      (pdf) => pdf.toString() == pdfId,
    );
    if (findPdf) {
      return userDetail;
    } else {
      sharedPdfs.add(pdfId);
      return this.userRepository.addUserIdToSharedPdf(
        userId,
        Array.from(sharedPdfs),
      );
    }
  }

  async findUserById(userId: string) {
    return await this.userRepository.findUserById(userId);
  }

  async getAllUsers() {
    return await this.userRepository.getAllUsers();
  }
}
