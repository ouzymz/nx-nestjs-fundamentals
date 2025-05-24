import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsString()
  sirname!: string;

  @IsString({ each: true })
  nationalities!: string[];
}
