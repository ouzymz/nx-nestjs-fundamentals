import { IsNumber, IsString } from 'class-validator';

export class CreateUserRatingDto {
  @IsString()
  name!: string;

  @IsNumber()
  ratings!: number;
}
