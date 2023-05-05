import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { TrainingEntity } from './training.entity';
import { TrainingQuery } from './query/training.query';
import { TrainingRepository } from './training.repository';
import { CreateTrainingDto, UpdateTrainingDto } from '@fit-friends/core';
import { CommandEvent, ITraining, UserRole } from '@fit-friends/shared-types';
import { RABBITMQ_SERVICE, TrainingErrorMessage } from '../app.constant';

@Injectable()
export class TrainingService {
  constructor(
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
    private readonly trainingRepository: TrainingRepository
  ) {}

  public async create(dto: CreateTrainingDto, trainerId: Types.ObjectId, userRole: UserRole) {
    if (userRole !== UserRole.Trainer) {
      throw new ForbiddenException(TrainingErrorMessage.WrongUserRole);
    }

    const {
      title,
      image,
      level,
      type,
      duration,
      gender,
      caloriesToLose,
      description,
      video,
    } = dto;

    const training: ITraining = {
      title,
      image,
      level,
      type,
      duration,
      gender,
      caloriesToLose,
      description,
      video,
      price: dto?.price || 0,
      rating: 0,
      ratingSum: 0,
      reviewsCount: 0,
      trainer: String(trainerId),
      isSpecialOffer: dto?.isSpecialOffer || false,
    };

    const trainingEntity = new TrainingEntity(training);
    const newTraining = await this.trainingRepository.create(trainingEntity);

    this.rabbitClient.emit(
      { cmd: CommandEvent.SendNewTraining },
      {
        title: newTraining.title,
        level: newTraining.level,
        type: newTraining.type,
        gender: newTraining.gender,
        caloriesToLose: newTraining.caloriesToLose,
        description: newTraining.description,
        price: newTraining.price,
        trainer: newTraining.trainer,
      });

    return newTraining;
  }

  public async updateTraining(
    userId: Types.ObjectId,
    userRole: UserRole,
    trainingId: number,
    dto: UpdateTrainingDto
  ) {
    if (userRole !== UserRole.Trainer) {
      throw new ForbiddenException(TrainingErrorMessage.WrongUserRole);
    }

    const existTraining = await this.trainingRepository.findById(trainingId);

    if (!existTraining) {
      throw new NotFoundException(`Training with id - ${trainingId}, does not exist`);
    }

    if (existTraining.trainer !== String(userId)) {
      throw new ForbiddenException(TrainingErrorMessage.WrongUserId);
    }

    const trainingEntity = new TrainingEntity({ ...existTraining as ITraining, ...dto });
    const updatedTraining = await this.trainingRepository.update(trainingId, trainingEntity);

    return updatedTraining;
  }

  public async getTraining(id: number) {
    const training = await this.trainingRepository.findById(id);

    if (!training) {
      throw new NotFoundException(`Training with id - ${id}, not found`);
    }

    return training;
  }

  public async getTrainings(query: TrainingQuery, userRole: UserRole) {
    if (userRole !== UserRole.Client) {
      throw new ForbiddenException(TrainingErrorMessage.ActionNotAllowed);
    }

    return await this.trainingRepository.find(query);
  }

  public async getPersonalTrainings(
    query: TrainingQuery,
    trainerId: Types.ObjectId,
    userRole: UserRole
  ) {
    if (userRole !== UserRole.Trainer) {
      throw new ForbiddenException(TrainingErrorMessage.ActionNotAllowed);
    }

    return await this.trainingRepository.findPersonal(query, trainerId);
  }

  public async getUserTrainings(trainingIds: number[]) {
    return await this.trainingRepository.findUserTrainings(trainingIds);
  }
}
