import {
  Body,
  Post,
  Delete,
  Headers,
  HttpStatus,
  Controller,
  Param,
} from '@nestjs/common';
import { NotifyService } from './notify.service';
import { PublisherDto } from '@fit-friends/core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('notify')
@Controller('notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @Post('/subscriber')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new subscriber has been successfully created.',
  })
  public async create(
    @Body() publisher: PublisherDto,
    @Headers('authorization') authHeader: string
  ) {
    return this.notifyService.addSubscriber(publisher, authHeader);
  }

  @Delete('/subscriber')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The subscriber has been successfully deleted.',
  })
  public async delete(
    @Param('id') publisherId: string,
    @Headers('authorization') authHeader: string
  ) {
    return this.notifyService.delSubscriber(publisherId, authHeader);
  }
}
