import { IClient } from './client.interface';
import { ITrainer } from './trainer.interface';
import { RequestStatus } from './enums/request-status.enum';

export interface IPersonalTraining {
  initiator: IClient;
  invitee: IClient | ITrainer;
  creationDate: Date;
  changeStatusDate: Date;
  status: RequestStatus;
}
