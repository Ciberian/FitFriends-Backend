import {
  Get,
  Param,
  Headers,
  Controller,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { GymRdo, parseQueryFromUrl } from '@fit-friends/core';
import { ApiTags, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { GymsService } from './gyms.service';

@ApiTags('gyms')
@Controller('gyms')
export class GymsController {
  constructor(private readonly gymsService: GymsService) {}
  @Get('/')
  @ApiResponse({
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(GymRdo) },
    },
    status: HttpStatus.OK,
    description: 'Gyms has been successfully found.',
  })
  public async index(
    @Req() req: Request,
    @Headers('authorization') authHeader: string
  ) {
    const query = parseQueryFromUrl(req.url);
    
    return this.gymsService.getGyms(query, authHeader);
  }

  @Get('/favorite')
  @ApiResponse({
    type: GymRdo,
    status: HttpStatus.OK,
    description: 'The favorite gym has been successfully found.',
  })
  public async showFavoriteGyms(@Headers('authorization') authHeader: string) {
    return this.gymsService.getFavoriteGyms(authHeader);
  }

  @Get(':id')
  @ApiResponse({
    type: GymRdo,
    status: HttpStatus.OK,
    description: 'The gym has been successfully found.',
  })
  public async show(
    @Param('id') gymId: number,
    @Headers('authorization') authHeader: string
  ) {
    return this.gymsService.getGym(gymId, authHeader);
  }
}
