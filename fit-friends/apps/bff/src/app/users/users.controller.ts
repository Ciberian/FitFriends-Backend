import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Headers,
  HttpStatus,
  Controller,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Delete,
  Req,
} from '@nestjs/common';
import {
  refs,
  ApiBody,
  ApiTags,
  ApiHeader,
  ApiResponse,
  getSchemaPath,
  ApiExtraModels,
} from '@nestjs/swagger';
import {
  ClientBalanceRdo,
  DecreaseClientBalanceDto,
  NutritionDiaryRdo,
  TrainingDiaryRdo,
  UpdateNutritionDiaryDto,
  UpdateTrainingDiaryDto,
  parseQueryFromUrl
} from '@fit-friends/core';
import {
  LoginUserDto,
  CreateClientDto,
  UpdateClientDto,
  RefreshTokenDto,
  UpdateTrainerDto,
  CreateTrainerDto,
  ChangeFavoriteGymsDto,
  RequestToUserDto,
  LoggedUserRdo,
  TrainerRdo,
  ClientRdo,
} from '@fit-friends/core';
import { UsersService } from './users.service';
import { Image } from '@fit-friends/core';
import { Types } from 'mongoose';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiExtraModels(ClientRdo, TrainerRdo, CreateClientDto, CreateTrainerDto)
  @ApiResponse({
    schema: {anyOf: refs(ClientRdo, TrainerRdo)},
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @ApiBody({schema: {anyOf: refs(CreateClientDto, CreateTrainerDto)}})
  public async create(
    @Body() dto: CreateClientDto | CreateTrainerDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: Image.FileMaxSize }),
          new FileTypeValidator({ fileType: Image.FileType }),
        ],
      })
    )
    file: Express.Multer.File,
  ) {
    console.log('bff/dto--------------------------', dto);
    const newUser = await this.usersService.register(dto);
    console.log('bff/newUser------------------', newUser);

    if (newUser) {
      return this.usersService.uploadImage(file);
    }
  }

  @Post('login')
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  public async login(@Body() dto: LoginUserDto) {
    return this.usersService.loginUser(dto);
  }

  @Post(':id/refresh')
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'Tokens has been successfully updated.',
  })
  public async refresh(
    @Param('id') userId: Types.ObjectId,
    @Body() dto: RefreshTokenDto
  ) {
    return this.usersService.refresh(userId, dto);
  }

  @Post('/drop')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Refresh token has been successfully dropped.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  public async drop(@Headers('authorization') authHeader: string) {
    return await this.usersService.drop(authHeader);
  }

  @Get('/friends')
  @ApiExtraModels(ClientRdo, TrainerRdo)
  @ApiResponse({
    schema: {
      type: 'array',
      items: {
        oneOf: [
          { $ref: getSchemaPath(ClientRdo) },
          { $ref: getSchemaPath(TrainerRdo) },
        ],
      },
    },
    status: HttpStatus.OK,
    description: "The user's friends has been successfully found",
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  public async showFriends(@Headers('authorization') authHeader: string) {
    return this.usersService.getFriends(authHeader);
  }

  @Post('/friends/req')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The friendship request sent to user',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  public async requestFriendship(
    @Body() dto: RequestToUserDto,
    @Headers('authorization') authHeader: string,
  ) {
    return this.usersService.reqFriendship(dto, authHeader);
  }

  @Post('/friends/accept')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The friendship was accepted',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  public async acceptFriendship(
    @Body() dto: RequestToUserDto,
    @Headers('authorization') authHeader: string,
  ) {
    return this.usersService.accFriendship(dto, authHeader);
  }

  @Post('/friends/reject')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The friendship was rejected',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  public async rejectFriendship(
    @Body() dto: RequestToUserDto,
    @Headers('authorization') authHeader: string,
  ) {
    return this.usersService.rejFriendship(dto, authHeader);
  }

  @Delete('/friends/delete')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The friend was deleted from friends list',
  })
  public async deleteFriend(
    @Body() dto: RequestToUserDto,
    @Headers('authorization') authHeader: string,
  ) {
    await this.usersService.delFriend(dto, authHeader);
  }

  @Delete('/alerts')
  @ApiExtraModels(ClientRdo, TrainerRdo)
  @ApiResponse({
    schema: { anyOf: refs(ClientRdo, TrainerRdo) },
    status: HttpStatus.OK,
    description: 'The alerts was deleted',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  public async deleteAlerts(@Headers('authorization') authHeader: string,) {
    return this.usersService.delAlerts(authHeader);
  }

  @Post('/personal-training/req')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Request for personal training sent to user',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  public async requestPersonalTraining(
    @Body() dto: RequestToUserDto,
    @Headers('authorization') authHeader: string,
  ) {
    await this.usersService.reqPersonalTraining(dto, authHeader);
  }

  @Post('/personal-training/accept')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Request for personal training accepted',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  public async acceptPersonalTraining(
    @Body() dto: RequestToUserDto,
    @Headers('authorization') authHeader: string,
  ) {
    await this.usersService.accPersonalTraining(dto, authHeader);
  }

  @Post('/personal-training/reject')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Request for personal training rejected',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  public async rejectPersonalTraining(
    @Body() dto: RequestToUserDto,
    @Headers('authorization') authHeader: string,
  ) {
    await this.usersService.rejPersonalTraining(dto, authHeader);
  }

  @Get('user/:id')
  @ApiExtraModels(ClientRdo, TrainerRdo, CreateClientDto, CreateTrainerDto)
  @ApiResponse({
    schema: { anyOf: refs(ClientRdo, TrainerRdo) },
    status: HttpStatus.OK,
    description: 'The user has been successfully found.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  public async show(
    @Param('id') id: Types.ObjectId,
    @Headers('authorization') authHeader: string,
  ) {
    return this.usersService.getUser(id, authHeader);
  }

  @Get('/')
  @ApiExtraModels(ClientRdo, TrainerRdo)
  @ApiResponse({
    schema: {
      type: 'array',
      items: {
        oneOf: [
          { $ref: getSchemaPath(ClientRdo) },
          { $ref: getSchemaPath(TrainerRdo) },
        ],
      },
    },
    status: HttpStatus.OK,
    description: 'The users has been successfully found',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  public async index(
    @Req() req: Request,
    @Headers('authorization') authHeader: string,
  ) {
    const query = parseQueryFromUrl(req.url);

    return this.usersService.getUsers(query, authHeader);
  }

  @Patch('/')
  @ApiExtraModels(ClientRdo, TrainerRdo, UpdateClientDto, UpdateTrainerDto)
  @ApiResponse({
    schema: { anyOf: refs(ClientRdo, TrainerRdo) },
    status: HttpStatus.OK,
    description: 'The user has been successfully updated.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiBody({ schema: { anyOf: refs(UpdateClientDto, UpdateTrainerDto) } })
  public async update(
    @Body() dto: UpdateClientDto | UpdateTrainerDto,
    @Headers('authorization') authHeader: string,
  ) {
    return this.usersService.updateUser(dto, authHeader);
  }

  @Patch('favorite-gyms/add')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The gym has been successfully added to favorite list',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  public async addFavoriteGym(
    @Body() dto: ChangeFavoriteGymsDto,
    @Headers('authorization') authHeader: string,
  ) {
    return this.usersService.addGymToList(dto, authHeader);
  }

  @Patch('favorite-gyms/del')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The gym has been successfully deleted from favorite list',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  public async delFavoriteGym(
    @Body() dto: ChangeFavoriteGymsDto,
    @Headers('authorization') authHeader: string,
  ) {
    return this.usersService.delGymFromList(dto, authHeader);
  }

  @Get('/client-balance/')
  @ApiResponse({
    type: ClientBalanceRdo,
    status: HttpStatus.OK,
    description: 'The client balance has been successfully found',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  public async showClientBalance(@Headers('authorization') authHeader: string) {
    return this.usersService.getClientBalance(authHeader);
  }

  @Patch('end-training')
  @ApiResponse({
    type: ClientBalanceRdo,
    status: HttpStatus.OK,
    description: 'The client balance has been successfully updated.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  public async changeClientBalanceAndTrainingDiary(
    @Body() dto: DecreaseClientBalanceDto & UpdateTrainingDiaryDto,
    @Headers('authorization') authHeader: string,
  ) {
    return this.usersService.changeBalanceAndTrainingDiary(dto, authHeader);
  }

  @Get('/nutrition-diary')
  @ApiResponse({
    type: NutritionDiaryRdo,
    status: HttpStatus.OK,
    description: 'The nutrition diary has been successfully found',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  public async showNutritionDiary(@Headers('authorization') authHeader: string) {
    return this.usersService.getNutritionDiary(authHeader);
  }

  @Patch('nutrition-diary')
  @ApiResponse({
    type: NutritionDiaryRdo,
    status: HttpStatus.OK,
    description: 'The nutrition dairy has been successfully updated.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  public async updateNutritionDiary(
    @Body() dto: UpdateNutritionDiaryDto,
    @Headers('authorization') authHeader: string
  ) {
    return this.usersService.changeNutritionDiary(dto, authHeader);
  }

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
  public async showTrainingDiary(@Headers('authorization') authHeader: string) {
    return this.usersService.getTrainingDiary(authHeader);
  }
}
