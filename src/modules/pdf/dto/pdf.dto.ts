import { IsDefined } from 'class-validator';

export class CreatePdfDetailsDto {
  @IsDefined()
  fileName: string;

  @IsDefined()
  url: string;

  @IsDefined()
  userId: string;
}
