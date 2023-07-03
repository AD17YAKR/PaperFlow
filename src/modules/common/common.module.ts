import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { S3UploadService } from './s3-upload.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [S3UploadService],
  exports: [S3UploadService],
})
export class S3UploadModule {}
