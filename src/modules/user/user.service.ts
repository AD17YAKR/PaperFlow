import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // Add PDF ID to the user's list of PDFs
  async addPdfToUserId(userId: string, pdfId: string) {
    const userDetail = await this.userRepository.findUserById(userId);
    const pdfs = userDetail.pdfs;
    pdfs.push(pdfId);
    return this.userRepository.addPdfToUserId(userId, pdfs);
  }

  // Add User ID to the shared PDF's list of shared users
  async addUserIdToSharedPdf(userId: string, pdfId: string) {
    const userDetail = await this.userRepository.findUserById(userId);
    const sharedPdfs = new Set(userDetail.sharedPdfs);

    const foundPdf = userDetail.sharedPdfs.find(
      (pdf) => pdf.toString() == pdfId,
    );
    if (foundPdf) {
      return userDetail;
    } else {
      sharedPdfs.add(pdfId);
      return this.userRepository.addUserIdToSharedPdf(
        userId,
        Array.from(sharedPdfs),
      );
    }
  }

  // Find a user by their ID
  async findUserById(userId: string) {
    return await this.userRepository.findUserById(userId);
  }

  // Get all users (consider adding pagination or filtering options)
  async getAllUsers(userId: string) {
    return await this.userRepository.getAllUsers(userId);
  }
}
