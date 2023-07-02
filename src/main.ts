import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import commonConfig from './config/common.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(commonConfig.port);
}
bootstrap();
