import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  sirname!: string;

  @ApiProperty()
  @IsString({ each: true })
  nationalities!: string[];
}
