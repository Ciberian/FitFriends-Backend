import {
  Req,
  Get,
  Body,
  Post,
  Patch,
  Param,
  Headers,
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
} from '@nestjs/swagger';
import {
  CreateTrainingDto,
  UpdateTrainingDto,
  TrainingRdo,
  parseQueryFromUrl,
} from '@fit-friends/core';
import { FileInterceptor } from '@nestjs/platform-express';
import { TrainingsService } from './trainings.service';
import { VideoType } from '@fit-friends/core';

@ApiTags('trainings')
@Controller('trainings')
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) {}

  @Post('/create')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.CREATED,
    description: 'The new training has been successfully created.',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('video'))
  public async create(
    @Body() dto: CreateTrainingDto,
    @Headers('authorization') authHeader: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: VideoType }),
        ],
      })
    )
    file: Express.Multer.File,
  ) {
    const newTraining = await this.trainingsService.create(dto, authHeader);

    if (newTraining) {
      return this.trainingsService.uploadVideo(newTraining.id, file, authHeader);
    }
  }

  @Patch(':id')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.CREATED,
    description: 'The training has been successfully updated.',
  })
  public async update(
    @Param('id') trainingId: number,
    @Body() dto: UpdateTrainingDto,
    @Headers('authorization') authHeader: string
  ) {
    return this.trainingsService.updateTraining(trainingId, dto, authHeader);
  }

  @Get('/')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiResponse({
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(TrainingRdo) },
    },
    status: HttpStatus.OK,
    description: 'Trainings has been successfully found.',
  })
  public async index(
    @Req() req: Request,
    @Headers('authorization') authHeader: string
  ) {
    const query = parseQueryFromUrl(req.url);

    return this.trainingsService.getTrainings(query, authHeader);
  }

  @Get('/personal')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiResponse({
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(TrainingRdo) },
    },
    status: HttpStatus.OK,
    description: 'Personal trainings has been successfully found.',
  })
  public async showPersonalTrainings(
    @Req() req: Request,
    @Headers('authorization') authHeader: string
  ) {
    const query = parseQueryFromUrl(req.url);

    return this.trainingsService.getPersonalTrainings(query, authHeader);
  }

  @Get(':id')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'The training has been successfully found.',
  })
  public async show(
    @Param('id') trainingId: number,
    @Headers('authorization') authHeader: string,
  ) {
    return this.trainingsService.getTraining(trainingId, authHeader);
  }
}
