import { Test } from '@nestjs/testing';
import { TrainingService } from './training.service';
import { TrainingRepository } from './training.repository';
import { UserRole } from '@fit-friends/shared-types';
import { RABBITMQ_SERVICE, TrainingsTest } from '../app.constant';

describe('TrainingService', () => {
  let trainingService: TrainingService;
  const mockTrainingRepository = {
    create: jest.fn(() => TrainingsTest.TrainingResult),
    update: jest.fn(() => TrainingsTest.TrainingResult),
    findById: jest.fn(() => TrainingsTest.TrainingResult),
    find: jest.fn(() => [TrainingsTest.TrainingResult]),
    findPersonal: jest.fn(() => [TrainingsTest.TrainingResult]),
  };

  const mockRabbitClient = {
    emit: jest.fn(() => undefined)
  }

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [TrainingService, TrainingRepository, { provide: getModelToken(RABBITMQ_SERVICE), useValue: mockRabbitClient }],
    })
      .overrideProvider(TrainingRepository)
      .useValue(mockTrainingRepository)
      .compile();

    trainingService = app.get<TrainingService>(TrainingService);
  });

  describe('createTraining', () => {
    it('should return new training', async () => {
      expect(await trainingService
        .create(TrainingsTest.TrainingDto, TrainingsTest.User.id, UserRole.Trainer))
        .toEqual(TrainingsTest.TrainingResult);
    });
  });

  describe('updateTraining', () => {
    it('should return updated training', async () => {
      expect(await trainingService
        .updateTraining(TrainingsTest.User.id, UserRole.Trainer, 1, TrainingsTest.TrainingDto))
        .toEqual(TrainingsTest.TrainingResult);
    });
  });

  describe('getOneTraining', () => {
    it('should return the training by its ID', async () => {
      expect(await trainingService.getTraining(1)).toEqual(TrainingsTest.TrainingResult);
    });
  });

  describe('getTrainings', () => {
    it('should return an array of trainings', async () => {
      expect(await trainingService.getTrainings({limit: 1}, UserRole.Client)).toEqual([TrainingsTest.TrainingResult]);
    });
  });

  describe('getTrainings', () => {
    it('should return an array of personal trainings', async () => {
      expect(await trainingService.getPersonalTrainings({limit: 1}, TrainingsTest.User.id, UserRole.Trainer)).toEqual([TrainingsTest.TrainingResult]);
    });
  });
});


function getModelToken(name: symbol): import("@nestjs/common").InjectionToken {
  return name;
}

