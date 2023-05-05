import { Test } from '@nestjs/testing';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { UserRole } from '@fit-friends/shared-types';
import { TrainingsTest } from '../app.constant';

describe('TrainingController', () => {
  let trainingController: TrainingController;
  const mockTrainingService = {
    create: jest.fn(() => TrainingsTest.TrainingResult),
    updateTraining: jest.fn(() => TrainingsTest.TrainingResult),
    getTrainings: jest.fn(() => [TrainingsTest.TrainingResult]),
    getPersonalTrainings: jest.fn(() => [TrainingsTest.TrainingResult]),
    getTraining: jest.fn(() => TrainingsTest.TrainingResult),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [TrainingController],
      providers: [TrainingService],
    })
      .overrideProvider(TrainingService)
      .useValue(mockTrainingService)
      .compile();

    trainingController = module.get<TrainingController>(TrainingController);
  });

  describe('createTraining', () => {
    it('should return new training', async () => {
      expect(await trainingController
        .create(TrainingsTest.TrainingDto, TrainingsTest.User))
        .toEqual(TrainingsTest.TrainingResult);
    });
  });

  describe('updateTraining', () => {
    it('should return updated training', async () => {
      expect(await trainingController
        .update(1, TrainingsTest.TrainingDto, TrainingsTest.User))
        .toEqual(TrainingsTest.TrainingResult);
    });
  });

  describe('showTrainings', () => {
    it('should return an array of trainings', async () => {
      expect(await trainingController
        .index({limit: 1}, UserRole.Client))
        .toEqual([TrainingsTest.TrainingResult]);
    });
  });

  describe('showPersonalTrainings', () => {
    it('should return an array of personal trainings', async () => {
      expect(await trainingController
        .showPersonalTrainings({limit: 1}, TrainingsTest.User))
        .toEqual([TrainingsTest.TrainingResult]);
    });
  });

  describe('showOneTraining', () => {
    it('should return the training by its ID', async () => {
      expect(await trainingController
        .show(1))
        .toEqual(TrainingsTest.TrainingResult);
    });
  });
});
