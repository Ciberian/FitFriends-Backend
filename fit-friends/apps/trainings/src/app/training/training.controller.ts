import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Query,
  UseGuards,
  Controller,
  HttpStatus,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  getSchemaPath,
  ApiHeader,
  ApiConsumes,
  ApiOkResponse
} from '@nestjs/swagger';
import {
  User,
  fillDTO,
  JwtAuthGuard,
  CreateTrainingDto,
  UpdateTrainingDto,
  TrainingRdo,
  UserTrainingsDto,
} from '@fit-friends/core';
import { TrainingService } from './training.service';
import { TrainingQuery } from './query/training.query';
import { ITokenPayload, UserRole } from '@fit-friends/shared-types';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoType } from '@fit-friends/core';

@ApiTags('trainings')
@Controller('trainings')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post('/create')
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.CREATED,
    description: 'The new training has been successfully created.',
  })
  @UseGuards(JwtAuthGuard)
  public async create(
    @Body() dto: CreateTrainingDto,
    @User() user: ITokenPayload
  ) {
    const { id, role } = user;
    const newTraining = await this.trainingService.create(dto, id, role);

    return fillDTO(TrainingRdo, newTraining);
  }

  @Patch(':id')
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.CREATED,
    description: 'The training has been successfully updated.',
  })
  @UseGuards(JwtAuthGuard)
  public async update(
    @Param('id') trainingId: number,
    @Body() dto: UpdateTrainingDto,
    @User() user: ITokenPayload
  ) {
    const { id, role } = user;
    const updatedTraining = await this.trainingService.updateTraining(
      id,
      role,
      trainingId,
      dto
    );

    return fillDTO(TrainingRdo, updatedTraining);
  }

  @Get('/')
  @ApiResponse({
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(TrainingRdo) },
    },
    status: HttpStatus.OK,
    description: 'Trainings has been successfully found.',
  })
  @UseGuards(JwtAuthGuard)
  public async index(@Query() query: TrainingQuery, @User('role') userRole: UserRole) {
    const trainings = await this.trainingService.getTrainings(query, userRole);

    return trainings.map((training) => fillDTO(TrainingRdo, training));
  }

  @Get('/personal')
  @ApiResponse({
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(TrainingRdo) },
    },
    status: HttpStatus.OK,
    description: 'Personal trainings has been successfully found.',
  })
  @UseGuards(JwtAuthGuard)
  public async showPersonalTrainings(
    @Query() query: TrainingQuery,
    @User() user: ITokenPayload
  ) {
    const { id, role } = user;
    const trainings = await this.trainingService.getPersonalTrainings(query, id, role);

    return trainings.map((training) => fillDTO(TrainingRdo, training));
  }

  @Get('/on-balance')
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'The user trainings has been successfully found.',
  })
  @UseGuards(JwtAuthGuard)
  public async showTrainingsOnBalance(@Body() { trainingsOnUserBalance }: UserTrainingsDto) {
    const trainings = await this.trainingService.getUserTrainings(trainingsOnUserBalance);

    return trainings.map((training) => fillDTO(TrainingRdo, training));
  }

  @Get(':id')
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'The training has been successfully found.',
  })
  @UseGuards(JwtAuthGuard)
  public async show(@Param('id') trainingId: number) {
    const training = await this.trainingService.getTraining(trainingId);

    return fillDTO(TrainingRdo, training);
  }

  @Post('/:id/video')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({
    description: 'Video sussessfully uploaded',
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('video'))
  async uploadVideo(
    @User() user: ITokenPayload,
    @Param('id') trainingId: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: VideoType }),
        ],
      })
    )
    file: Express.Multer.File
  ) {
    const { id: userId, role } = user;
    const updatedTraining = await this.trainingService.updateTraining(
      userId,
      role,
      trainingId,
      { video: file.filename }
    );

    return fillDTO(TrainingRdo, updatedTraining);
  }
}
