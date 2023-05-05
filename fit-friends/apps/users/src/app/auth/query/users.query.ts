import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString,  } from 'class-validator';
import { DEFAULT_PAGE, User } from '../../app.constant';

export class UsersQuery {
  @Transform(({value}) => +value || User.DefaultCountLimit)
  @IsNumber()
  @IsOptional()
  public limit?: number | undefined = User.DefaultCountLimit;

  @Transform(({value}) => +value || DEFAULT_PAGE)
  @IsNumber()
  @IsOptional()
  public page?: number = DEFAULT_PAGE;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' | undefined = User.DefaultSortDirection;

  @IsString()
  @IsOptional()
  public sortType?: 'registrationDate' | undefined = User.DefaultSortType;

  @IsString()
  @IsOptional()
  public location?: string | undefined;

  @IsString()
  @IsOptional()
  public trainingType?: string | undefined;

  @IsString()
  @IsOptional()
  public level?: string | undefined;

  @IsIn(['trainer', 'client'])
  @IsOptional()
  public userRole?: 'trainer' | 'client' | undefined;
}
