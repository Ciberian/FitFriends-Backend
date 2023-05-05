import { Test } from '@nestjs/testing';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberController } from './email-subscriber.controller';
import { EmailSubscriberTest } from '../app.constant';

describe('EmailSubscriberController', () => {
  let emailSubscriberController: EmailSubscriberController;

  const mockEmailSubscriberService = {
    addSubscriber: jest.fn(() => EmailSubscriberTest.Result),
    delSubscriber: jest.fn(() => undefined),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [EmailSubscriberController],
      providers: [EmailSubscriberService],
    })
      .overrideProvider(EmailSubscriberService)
      .useValue(mockEmailSubscriberService)
      .compile();

    emailSubscriberController = module.get<EmailSubscriberController>(EmailSubscriberController);
  });

  describe('create', () => {
    it('should return subscriber', async () => {
      expect(await emailSubscriberController
        .create(EmailSubscriberTest.PublisherDto, EmailSubscriberTest.User))
        .toEqual(EmailSubscriberTest.Result);
    });
  });

  describe('delete', () => {
    it('should return nothing', async () => {
      expect(await emailSubscriberController
        .delete(EmailSubscriberTest.PublisherDto, EmailSubscriberTest.User))
        .toEqual(undefined);
    });
  });
});
