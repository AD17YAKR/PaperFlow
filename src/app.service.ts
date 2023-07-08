import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AppService {
  getHello(): string {
    const documentationContent = fs.readFileSync(
      './documentation.html',
      'utf-8',
    );
    return documentationContent;
  }
}
