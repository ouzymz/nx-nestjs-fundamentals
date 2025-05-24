import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit!: number;

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset!: number;
}
