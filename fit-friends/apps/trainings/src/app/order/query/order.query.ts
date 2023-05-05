import { IsOptional, IsIn } from 'class-validator';
import { OrderQueryValue } from '../../app.constant';

export class OrderQuery {
  @IsIn(['asc', 'desc'])
  @IsOptional()
  public quantitySortDirection?:  'desc' | 'asc' | undefined = OrderQueryValue.DefaultSortDirection;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public totalPriceSortDirection?:  'desc' | 'asc' | undefined = OrderQueryValue.DefaultSortDirection;
}
