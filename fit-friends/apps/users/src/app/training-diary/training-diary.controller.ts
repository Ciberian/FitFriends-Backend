import {
  Get,
  Body,
  Patch,
  Controller,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  User,
  fillDTO,
  JwtAuthGuard,
  TrainingDiaryRdo,
  UpdateTrainingDiaryDto,
} from '@fit-friends/core';
import { ITokenPayload } from '@fit-friends/shared-types';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrainingDiaryService } from './training-diary.service';

@ApiTags('users')
@Controller('users')
export class TrainingDiaryController {
  constructor(private readonly trainingDiaryService: TrainingDiaryService) {}

  @Get('/training-diary')
  @ApiResponse({
    type: TrainingDiaryRdo,
    status: HttpStatus.OK,
    description: 'The training diary has been successfully found',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @UseGuards(JwtAuthGuard)
  public async showTrainingDiary(@User() user: ITokenPayload) {
    const { id, role } = user;
    const trainingDairy = await this.trainingDiaryService.getTrainingDiary(id, role);

    return fillDTO(TrainingDiaryRdo, trainingDairy);
  }

  @Patch('training-diary')
  @ApiResponse({
    type: TrainingDiaryRdo,
    status: HttpStatus.OK,
    description: 'The training dairy has been successfully updated.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @UseGuards(JwtAuthGuard)
  public async updateTrainingDiary(
    @Body() dto: UpdateTrainingDiaryDto,
    @User() user: ITokenPayload
  ) {
    const { id, role } = user;
    const updatedTrainingDiary = await this.trainingDiaryService.changeTrainingDiary(id, role, dto);

    return fillDTO(TrainingDiaryRdo, updatedTrainingDiary);
  }
}
