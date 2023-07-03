import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import commonConfig from './config/common.config';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  await app.listen(commonConfig.port);
}
bootstrap();
