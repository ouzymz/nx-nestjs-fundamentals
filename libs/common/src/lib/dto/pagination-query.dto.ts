import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit!: number;

  @ApiProperty()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset!: number;
}
