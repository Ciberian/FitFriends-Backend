import { Test } from '@nestjs/testing';
import { SmtpService } from '../smtp/smtp.service';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EmailSubscriberTest, SubscriberValidationMessage } from '../app.constant';
import { NotFoundException } from '@nestjs/common';

describe('EmailSubscriberService', () => {
  let emailSubscriberService: EmailSubscriberService;
  const mockEmailSubscriberRepository = {
    create: jest.fn(() => EmailSubscriberTest.Result),
    delete: jest.fn(() => undefined),
    findSubscriber: jest.fn(() => null),
  };
  const mockSmtpService = {
    notifyAddNewSubscriber: jest.fn(() => null),
    notifyDelSubscriber: jest.fn(() => null),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [EmailSubscriberService, EmailSubscriberRepository, SmtpService],
    })
      .overrideProvider(EmailSubscriberRepository)
      .useValue(mockEmailSubscriberRepository)
      .overrideProvider(SmtpService)
      .useValue(mockSmtpService)
      .compile();

    emailSubscriberService = module.get<EmailSubscriberService>(EmailSubscriberService);
  });

  describe('addSubscriber', () => {
    it('should return subscriber', async () => {
      expect(await emailSubscriberService
        .addSubscriber(EmailSubscriberTest.PublisherDto, EmailSubscriberTest.User))
        .toEqual(EmailSubscriberTest.Result);
    });
  });

  describe('delSubscriber', () => {
    it('should throw NotFoundException', async () => {
      await expect(emailSubscriberService
        .delSubscriber(EmailSubscriberTest.PublisherDto, EmailSubscriberTest.User))
        .rejects
        .toThrow(new NotFoundException(SubscriberValidationMessage.NotFoundSubscriber))
    });
  });
});
