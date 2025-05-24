import { Module } from '@nestjs/common';
import { UserRatingService } from './user-rating.service';
import { DatabaseModule } from '@nestjs-fundamentals-boiler-temple/database';
import { UserRatingController } from './user-rating.controller';
import { UserRating } from './entities/user-rating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    DatabaseModule.register({
      type: 'postgres' as const, // type of our database
      host: 'localhost', // database host
      port: 5433, // database port
      username: 'user-test', // username
      password: 'pass321', // user password
      database: 'api-test', // name of our database,
      entities: [UserRating],
      synchronize: true, // your entities will be synced with the database (ORM will map entity definitions to corresponding SQL tabled), every time you run the application (recommended: disable in the production)
    }),
    TypeOrmModule.forFeature([UserRating]),
  ],
  controllers: [UserRatingController],
  providers: [UserRatingService],
  exports: [],
})
export class UserRatingModule {}
