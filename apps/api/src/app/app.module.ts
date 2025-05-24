import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '@nestjs-fundamentals-boiler-temple/common';
import { UserModule } from '@nestjs-fundamentals-boiler-temple/user';
import { UserRatingModule } from '@nestjs-fundamentals-boiler-temple/user-rating';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () =>
        process.env['DATABASE_URL']
          ? {
              type: 'postgres' as const,
              url: process.env['DATABASE_URL'],
              autoLoadEntities: true,
              synchronize: false,
            }
          : {
              type: 'postgres' as const, // type of our database
              // host: process.env['DATABASE_HOST'] as string, // database host
              host: 'localhost', // database host
              // port: parseInt(process.env['DATABASE_PORT'] || '5432'), // database port
              port: 5432, // database port
              // username: process.env['DATABASE_USERNAME'],
              username: 'user', // username
              // password: process.env['DATABASE_PASSWORD'], // user password
              password: 'pass123', // user password
              // database: process.env['DATABASE_NAME'], // name of our database,
              database: 'api', // name of our database,
              autoLoadEntities: true, // models will be loaded automatically (you don't have to explicitly specify the entities: [] array)
              synchronize: true, // your entities will be synced with the database (ORM will map entity definitions to corresponding SQL tabled), every time you run the application (recommended: disable in the production)
            },
    }),

    CommonModule,
    UserRatingModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
