import {
  Get,
  Body,
  Patch,
  UseGuards,
  Controller,
  HttpStatus,
} from '@nestjs/common';
import {
  User,
  fillDTO,
  JwtAuthGuard,
  ClientBalanceRdo,
  UpdateClientBalanceDto,
  DecreaseClientBalanceDto,
} from '@fit-friends/core';
import { ITokenPayload } from '@fit-friends/shared-types';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientBalanceService } from './client-balance.service';

@ApiTags('users')
@Controller('users')
export class ClientBalanceController {
  constructor(private readonly clientBalanceService: ClientBalanceService) {}

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
  @UseGuards(JwtAuthGuard)
  public async showClientBalance(@User() user: ITokenPayload) {
    const { id, role } = user;
    const clientBalance = await this.clientBalanceService.getClientBalance(id, role);

    return fillDTO(ClientBalanceRdo, clientBalance);
  }

  @Patch('/client-balance/add')
  @ApiResponse({
    type: ClientBalanceRdo,
    status: HttpStatus.OK,
    description: 'The client balance has been successfully updated.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @UseGuards(JwtAuthGuard)
  public async updateClientBalance(
    @Body() dto: UpdateClientBalanceDto,
    @User() user: ITokenPayload
  ) {
    const { id, role } = user;
    const updatedClientBalance = await this.clientBalanceService.changeClientBalance(id, role, dto);

    return fillDTO(ClientBalanceRdo, updatedClientBalance);
  }

  @Patch('client-balance/dec')
  @ApiResponse({
    type: ClientBalanceRdo,
    status: HttpStatus.OK,
    description: 'The client balance has been successfully updated.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @UseGuards(JwtAuthGuard)
  public async decreaseClientBalance(
    @Body() dto: DecreaseClientBalanceDto,
    @User() user: ITokenPayload
  ) {
    const { id, role } = user;
    const updatedTrainingDiary = await this.clientBalanceService.decreaseClientTrainings(id, role, dto);

    return fillDTO(ClientBalanceRdo, updatedTrainingDiary);
  }
}
