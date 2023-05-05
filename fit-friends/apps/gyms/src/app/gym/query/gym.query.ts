import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { DEFAULT_PAGE, GymsQueryDefaultValue } from '../../app.constant';

export class GymQuery {
  @Transform(({value}) => +value || GymsQueryDefaultValue.CountLimit)
  @IsNumber()
  @IsOptional()
  public limit?: number | undefined = GymsQueryDefaultValue.CountLimit;

  @Transform(({value}) => +value || DEFAULT_PAGE)
  @IsNumber()
  @IsOptional()
  public page?: number = DEFAULT_PAGE;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' | undefined = GymsQueryDefaultValue.SortDirection;

  @IsString()
  @IsOptional()
  public sortType?: 'registerDate' | undefined = GymsQueryDefaultValue.SortType;
}
