import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { DEFAULT_PAGE, TrainingQueryValue } from '../../app.constant';

export class TrainingQuery {
  @Transform(({value}) => +value || TrainingQueryValue.DefaultCountLimit)
  @IsNumber()
  @IsOptional()
  public limit?: number | undefined = TrainingQueryValue.DefaultCountLimit;

  @Transform(({value}) => +value || DEFAULT_PAGE)
  @IsNumber()
  @IsOptional()
  public page?: number = DEFAULT_PAGE;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' | undefined = TrainingQueryValue.DefaultSortDirection;

  @IsString()
  @IsOptional()
  public sortType?: 'registerDate' | undefined = TrainingQueryValue.DefaultSortType;

  @Transform(({value}) => Number(value))
  @IsNumber()
  @IsOptional()
  public rating?: number | undefined;

  @Transform(({value}) => Number(value))
  @IsNumber()
  @IsOptional()
  public priceGTE?: number | undefined;

  @Transform(({value}) => Number(value))
  @IsNumber()
  @IsOptional()
  public priceLTE?: number | undefined;

  @Transform(({value}) => Number(value))
  @IsNumber()
  @IsOptional()
  public caloriesGTE?: number | undefined;

  @Transform(({value}) => Number(value))
  @IsNumber()
  @IsOptional()
  public caloriesLTE?: number | undefined;

  @Transform(({ value }) => value.replaceAll('_', ' '))
  @IsString()
  @IsOptional()
  public duration?: string | undefined;
}
