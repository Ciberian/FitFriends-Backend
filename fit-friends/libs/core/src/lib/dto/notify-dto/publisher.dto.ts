import { IsNotEmpty } from 'class-validator';
import { NotifyErrorMessage } from '../../constants/notify.constants';

export class PublisherDto {
  @IsNotEmpty({ message: NotifyErrorMessage.EmptyTrainerId })
  trainerId: string;

  @IsNotEmpty({ message: NotifyErrorMessage.EmptyName })
  trainerName: string;
}
