import {
  Get,
  Param,
  Query,
  UseGuards,
  Controller,
  HttpStatus,
  Body,
} from '@nestjs/common';
import {
  User,
  fillDTO,
  JwtAuthGuard,
  GymRdo,
  UserGymsDto,
} from '@fit-friends/core';
import { ITokenPayload, UserRole } from '@fit-friends/shared-types';
import { ApiTags, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { GymQuery } from './query/gym.query';
import { GymService } from './gym.service';

@ApiTags('gyms')
@Controller('gyms')
export class GymController {
  constructor(private readonly gymService: GymService) {}
  @Get('/')
  @ApiResponse({
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(GymRdo) },
    },
    status: HttpStatus.OK,
    description: 'Gyms has been successfully found.',
  })
  @UseGuards(JwtAuthGuard)
  public async index(@Query() query: GymQuery, @User('role') userRole: UserRole) {
    const gyms = await this.gymService.getGyms(query, userRole);

    return gyms.map((gym) => fillDTO(GymRdo, gym));
  }

  @Get('/favorite')
  @ApiResponse({
    type: GymRdo,
    status: HttpStatus.OK,
    description: 'The favorite gym has been successfully found.',
  })
  @UseGuards(JwtAuthGuard)
  public async showFavoriteGyms(@User() user: ITokenPayload) {
    const { role, favoriteGyms } = user;
    const gyms = await this.gymService.getFavoriteGyms(favoriteGyms, role);

    return gyms.map((gym) => fillDTO(GymRdo, gym));
  }

  @Get('/on-balance')
  @ApiResponse({
    type: GymRdo,
    status: HttpStatus.OK,
    description: 'The user gyms has been successfully found.',
  })
  @UseGuards(JwtAuthGuard)
  public async showGymsOnBalance(
    @Body() { gymsOnUserBalance }: UserGymsDto,
    @User('role') userRole: UserRole
  ) {
    const gyms = await this.gymService.getFavoriteGyms(gymsOnUserBalance, userRole);

    return gyms.map((gym) => fillDTO(GymRdo, gym));
  }

  @Get(':id')
  @ApiResponse({
    type: GymRdo,
    status: HttpStatus.OK,
    description: 'The gym has been successfully found.',
  })
  @UseGuards(JwtAuthGuard)
  public async show(
    @Param('id') gymId: number,
    @User('role') userRole: UserRole
  ) {
    const gym = await this.gymService.getGym(gymId, userRole);

    return fillDTO(GymRdo, gym);
  }
}
