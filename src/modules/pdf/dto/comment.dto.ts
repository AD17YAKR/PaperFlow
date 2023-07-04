import { IsDefined, IsNotEmpty, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsDefined()
  comment: string;

  @IsDefined()
  pdfId: string;

  @IsDefined()
  userId: string;
}

export class InputCommentDto {
  @IsNotEmpty()
  @MinLength(2)
  comment: string;
}
