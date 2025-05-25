import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  PaginationQueryDto,
  Public,
} from '@nestjs-fundamentals-boiler-temple/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user') //To group endpoints in swagger.
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Public()
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    // await new Promise(resolve => setTimeout(resolve, 5000));
    // const { limit, offset } = paginationQuery;
    // return `This action returns all coffees. Limit ${limit}, ${offset}`;
    return this.userService.findAll(paginationQuery);
  }

  @ApiResponse({ status: 403, description: 'Forbidden.' }) //to configure swagger response section
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    // only int ?? example
    // return `This action returns #${id} coffee`;
    return this.userService.findOne(String(id)); // "" + id;
  }

  @ApiForbiddenResponse({ description: 'Forbidden.' }) //to configure swagger response section
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // return body;
    // return `This action creates a coffee`;
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto
  ) {
    // return `This action updates #${id} coffee`;
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return `This action removes #${id} coffee`;
    return this.userService.remove(id);
  }
}
