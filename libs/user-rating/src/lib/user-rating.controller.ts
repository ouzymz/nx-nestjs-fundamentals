import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserRatingDto } from './dtos/create-user-rating.dto';
import { UserRatingService } from './user-rating.service';

@Controller('user-rating')
export class UserRatingController {
  constructor(private readonly userRatingService: UserRatingService) {}

  @Post()
  create(@Body() createUserRatingDto: CreateUserRatingDto) {
    // return body;
    // return `This action creates a coffee`;
    return this.userRatingService.createUserRating(createUserRatingDto);
  }

  @Get(':id')
  likeUser(@Param('id') id: string) {
    const intId = parseInt(id);
    // only int ?? example
    // return `This action returns #${id} coffee`;
    return this.userRatingService.likeUser(intId); // "" + id;
  }
}
