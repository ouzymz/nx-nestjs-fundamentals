import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRating } from './entities/user-rating.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserRatingDto } from './dtos/create-user-rating.dto';

@Injectable()
export class UserRatingService {
  constructor(
    @InjectRepository(UserRating)
    private readonly userRatingRepository: Repository<UserRating>,
    private readonly dataSource: DataSource
  ) {}

  async createUserRating(createUserRatingDto: CreateUserRatingDto) {
    const userRating = this.userRatingRepository.create(createUserRatingDto);
    return this.userRatingRepository.save(userRating);
  }

  async likeUser(id: number) {
    const userRating = await this.userRatingRepository.findOne({
      where: { id },
    });

    if (!userRating) {
      throw new NotFoundException(`UserRating #${id} not found`);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      userRating.ratings++;
      await queryRunner.manager.save(userRating);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return userRating;
  }
}
