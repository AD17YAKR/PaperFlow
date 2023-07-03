import { FileInterceptor } from '@nestjs/platform-express';

export const PdfFileInterceptor = FileInterceptor('file', {
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(pdf)$/)) {
      return callback(new Error('Only PDF files are allowed!'), false);
    }
    callback(null, true);
  },
});
