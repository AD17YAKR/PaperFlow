import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import commonConfig from './config/common.config';
import * as dotenv from 'dotenv';
import { HttpExceptionFilter } from './middleware/HttpExceptionFilter';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(commonConfig.port);
}
bootstrap();
