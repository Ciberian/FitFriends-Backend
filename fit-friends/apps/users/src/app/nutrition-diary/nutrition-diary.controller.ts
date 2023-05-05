import {
  Get,
  Body,
  Patch,
  Controller,
  HttpStatus,
  UseGuards
} from '@nestjs/common';
import {
  User,
  fillDTO,
  JwtAuthGuard,
  NutritionDiaryRdo,
  UpdateNutritionDiaryDto,
} from '@fit-friends/core';
import { ITokenPayload } from '@fit-friends/shared-types';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NutritionDiaryService } from './nutrition-diary.service';

@ApiTags('users')
@Controller('users')
export class NutritionDiaryController {
  constructor(private readonly nutritionDiaryService: NutritionDiaryService) {}

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
  @UseGuards(JwtAuthGuard)
  public async showNutritionDiary(@User() user: ITokenPayload) {
    const { id, role } = user;
    const nutritionDairy = await this.nutritionDiaryService.getNutritionDiary(id, role);

    return fillDTO(NutritionDiaryRdo, nutritionDairy);
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
  @UseGuards(JwtAuthGuard)
  public async updateNutritionDiary(
    @Body() dto: UpdateNutritionDiaryDto,
    @User() user: ITokenPayload
  ) {
    const { id, role } = user;
    const updatedNutritionDiary = await this.nutritionDiaryService.changeNutritionDiary(id,  role, dto);

    return fillDTO(NutritionDiaryRdo, updatedNutritionDiary);
  }
}
