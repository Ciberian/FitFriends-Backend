import {
  Get,
  Body,
  Post,
  Param,
  UseGuards,
  Controller,
  HttpStatus,
} from '@nestjs/common';
import {
  User,
  fillDTO,
  JwtAuthGuard,
  CreateReviewDto,
  ReviewRdo,
} from '@fit-friends/core';
import { ReviewService } from './review.service';
import { ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('/create')
  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.CREATED,
    description: 'The new review has been successfully created.',
  })
  @UseGuards(JwtAuthGuard)
  public async create(@Body() dto: CreateReviewDto, @User() user) {
    const newReview = await this.reviewService.createReview(user, dto);

    return fillDTO(ReviewRdo, newReview);
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
  @UseGuards(JwtAuthGuard)
  public async showTrainingReviews(@Param('id') trainingId: number) {
    const reviews = await this.reviewService.getReviews(trainingId);

    return reviews.map((review) => fillDTO(ReviewRdo, review));
  }
}
