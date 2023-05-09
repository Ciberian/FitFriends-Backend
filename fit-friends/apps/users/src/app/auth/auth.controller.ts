import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  HttpStatus,
  Controller,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Query,
  Delete,
} from '@nestjs/common';
import {
  refs,
  ApiBody,
  ApiTags,
  ApiHeader,
  ApiResponse,
  ApiConsumes,
  ApiOkResponse,
  getSchemaPath,
  ApiExtraModels,
} from '@nestjs/swagger';
import {
  User,
  fillDTO,
  JwtAuthGuard,
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
import { Types } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { UsersQuery } from './query/users.query';
import { FavoriteGymsAction } from '../app.constant';
import { Image } from '@fit-friends/core';
import {
  ITokenPayload,
  MongoidValidationPipe,
  UserRole,
} from '@fit-friends/shared-types';

@ApiTags('users')
@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiExtraModels(ClientRdo, TrainerRdo, CreateClientDto, CreateTrainerDto)
  @ApiResponse({
    schema: {anyOf: refs(ClientRdo, TrainerRdo)},
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @ApiBody({schema: {anyOf: refs(CreateClientDto, CreateTrainerDto)}})
  public async create(@Body() dto: CreateClientDto | CreateTrainerDto) {
    const newUser = await this.authService.register(dto);

    return (newUser.role === UserRole.Client) ?
      fillDTO(ClientRdo, newUser) :
      fillDTO(TrainerRdo, newUser);
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
    const user = await this.authService.verifyUser(dto);
    const tokens = await this.authService.loginUser(user);

    return fillDTO(LoggedUserRdo, { _id: user._id, email: user.email, ...tokens })
  }

  @Post(':id/refresh')
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'Tokens has been successfully updated.',
  })
  public async refresh(
    @Param('id', MongoidValidationPipe) userId: Types.ObjectId,
    @Body() { refreshToken }: RefreshTokenDto
  ) {
    const newTokens = await this.authService.refresh(userId, refreshToken);

    return fillDTO(LoggedUserRdo, newTokens);
  }

  @Post('/drop')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Refresh token has been successfully dropped.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @UseGuards(JwtAuthGuard)
  public async drop(@User('id') userId: Types.ObjectId) {
    return await this.authService.drop(userId);
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
  @UseGuards(JwtAuthGuard)
  public async showFriends(@User() user: ITokenPayload) {
    const { id, role } = user;
    const friends = await this.authService.getFriends(id, role);

    return friends.map((friend) =>
      friend.role === UserRole.Client
        ? fillDTO(ClientRdo, friend)
        : fillDTO(TrainerRdo, friend)
    );
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
  @UseGuards(JwtAuthGuard)
  public async requestFriendship(@Body() dto: RequestToUserDto, @User() user: ITokenPayload) {
    const { id, role } = user;
    await this.authService.reqFriendship(dto, id, role);
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
  @UseGuards(JwtAuthGuard)
  public async acceptFriendship(@Body() dto: RequestToUserDto, @User('id') respondentId: Types.ObjectId) {
    await this.authService.accFriendship(dto, respondentId);
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
  @UseGuards(JwtAuthGuard)
  public async rejectFriendship(@Body() dto: RequestToUserDto, @User('id') respondentId: Types.ObjectId) {
    await this.authService.rejFriendship(dto, respondentId);
  }

  @Delete('/friends/delete')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The friend was deleted from friends list',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @UseGuards(JwtAuthGuard)
  public async deleteFriend(@Body() dto: RequestToUserDto, @User('id') id: Types.ObjectId) {
    await this.authService.delFriend(dto, id);
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
  @UseGuards(JwtAuthGuard)
  public async deleteAlerts(@User('id') id: Types.ObjectId) {
    const updatedUser = await this.authService.delAlerts(id);

    return updatedUser.role === UserRole.Client
      ? fillDTO(ClientRdo, updatedUser)
      : fillDTO(TrainerRdo, updatedUser);
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
  @UseGuards(JwtAuthGuard)
  public async requestPersonalTraining(@Body() dto: RequestToUserDto, @User() user: ITokenPayload) {
    const { id, role } = user;
    await this.authService.reqPersonalTraining(dto, id, role);
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
  @UseGuards(JwtAuthGuard)
  public async acceptPersonalTraining(@Body() dto: RequestToUserDto, @User('id') respondentId: Types.ObjectId) {
    await this.authService.accPersonalTraining(dto, respondentId);
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
  @UseGuards(JwtAuthGuard)
  public async rejectPersonalTraining(@Body() dto: RequestToUserDto, @User('id') respondentId: Types.ObjectId) {
    await this.authService.rejPersonalTraining(dto, respondentId);
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
  @UseGuards(JwtAuthGuard)
  public async show(@Param('id', MongoidValidationPipe) id: Types.ObjectId) {
    const existUser = await this.authService.getUser(id);

    return existUser.role === UserRole.Client
      ? fillDTO(ClientRdo, existUser)
      : fillDTO(TrainerRdo, existUser);
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
  @UseGuards(JwtAuthGuard)
  public async index(@Query() query: UsersQuery, @User('role') userRole) {
    const users = await this.authService.getUsers(query, userRole);

    return users.map((user) =>
      user.role === UserRole.Client
        ? fillDTO(ClientRdo, user)
        : fillDTO(TrainerRdo, user)
    );
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
  @UseGuards(JwtAuthGuard)
  public async update(
    @Body() dto: UpdateClientDto | UpdateTrainerDto,
    @User('id') userId: Types.ObjectId
  ) {
    const updatedUser = await this.authService.updateUser(userId, dto);

    return updatedUser.role === UserRole.Client
      ? fillDTO(ClientRdo, updatedUser)
      : fillDTO(TrainerRdo, updatedUser);
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
  @UseGuards(JwtAuthGuard)
  public async addFavoriteGym(@Body() dto: ChangeFavoriteGymsDto, @User() user: ITokenPayload) {
    const { id, role } = user;

    await this.authService.updateFavoriteGymsList(id, role, dto, FavoriteGymsAction.Add);
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
  @UseGuards(JwtAuthGuard)
  public async delFavoriteGym(@Body() dto: ChangeFavoriteGymsDto, @User() user: ITokenPayload) {
    const { id, role } = user;

    await this.authService.updateFavoriteGymsList(id, role, dto, FavoriteGymsAction.Delete);
  }

  @Post('/avatar')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({
    description: 'Avatar sussessfully uploaded',
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  public async uploadAvatar(
    @User('id') userId: Types.ObjectId,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: Image.FileMaxSize }),
          new FileTypeValidator({ fileType: Image.FileType }),
        ],
      })
    )
    file: Express.Multer.File
  ) {

    const updatedUser = await this.authService.updateUser(userId, { avatar: file.filename });

    return updatedUser.role === UserRole.Client
      ? fillDTO(ClientRdo, updatedUser)
      : fillDTO(TrainerRdo, updatedUser);
  }
}
