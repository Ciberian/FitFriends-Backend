import {
  Get,
  Body,
  Post,
  Param,
  Headers,
  Controller,
  HttpStatus,
} from '@nestjs/common';
import { ReviewRdo } from '@fit-friends/core';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from '@fit-friends/core';
import { ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('/create')
  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.CREATED,
    description: 'The new review has been successfully created.',
  })
  public async create(
    @Body() dto: CreateReviewDto,
    @Headers('authorization') authHeader: string
  ) {
    return await this.reviewsService.createReview(dto, authHeader);
  }

  @Get(':id')
  @ApiResponse({
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(ReviewRdo) },
    },
    status: HttpStatus.OK,
    description: 'The review has been successfully found.',
  })
  public async showTrainingReviews(
    @Param('id') trainingId: number,
    @Headers('authorization') authHeader: string
  ) {
    return await this.reviewsService.getReviews(trainingId, authHeader);
  }
}
