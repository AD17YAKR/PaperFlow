import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { S3UploadModule } from './modules/common/common.module';
import { PdfModule } from './modules/pdf/pdf.module';
import { databaseConfig } from './config/database.config';
import { UsersModule } from './modules/user/user.module';

@Module({
  imports: [
    AuthModule,
    S3UploadModule,
    PdfModule,
    UsersModule,
    MongooseModule.forRoot(databaseConfig.databaseUri),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
