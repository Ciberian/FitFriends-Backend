import {
  Body,
  Post,
  Delete,
  UseGuards,
  HttpStatus,
  Controller,
  Param,
} from '@nestjs/common';
import {
  User,
  JwtAuthGuard,
  PublisherDto,
  NewTrainingDto
} from '@fit-friends/core';
import { EventPattern } from '@nestjs/microservices';
import { CommandEvent, ITokenPayload } from '@fit-friends/shared-types';
import { EmailSubscriberService } from './email-subscriber.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('notify')
@Controller('notify')
export class EmailSubscriberController {
  constructor(private readonly subscriberService: EmailSubscriberService) {}

  @Post('/subscriber')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new subscriber has been successfully created.',
  })
  @UseGuards(JwtAuthGuard)
  public async create(@Body() publisher: PublisherDto, @User() subscriber: ITokenPayload) {
    return this.subscriberService.addSubscriber(publisher, subscriber);
  }

  @Delete('/:id/subscriber')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The subscriber has been successfully deleted.',
  })
  @UseGuards(JwtAuthGuard)
  public async delete(@Param('id') publisherId: string, @User() subscriber: ITokenPayload) {
    return this.subscriberService.delSubscriber(publisherId, subscriber);
  }

  @EventPattern({ cmd: CommandEvent.SendNewTraining })
  public async send(newTraining: NewTrainingDto) {
    return this.subscriberService.sendNewTraining(newTraining);
  }
}
