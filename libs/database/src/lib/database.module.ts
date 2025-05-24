import { DynamicModule, Module } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

/**
 * DatabaseModule provides a configurable TypeORM DataSource instance
 * using the provided options.
 *
 * Usage:
 *
 * ```ts
 * import { DatabaseModule } from './database.module';
 *
 * @Module({
 *   imports: [
 *     DatabaseModule.register({
 *       type: 'postgres',
 *       host: 'localhost',
 *       port: 5432,
 *       username: 'user',
 *       password: 'pass',
 *       database: 'mydb',
 *       entities: [...],
 *       synchronize: true,
 *     }),
 *   ],
 * })
 * export class AppModule {}
 * ```
 *
 * You can inject the connection using the 'CONNECTION' token:
 *
 * ```ts
 * @Inject('CONNECTION') private dataSource: DataSource
 * ```
 */
@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class DatabaseModule {
  static register(options: DataSourceOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'CONNECTION',
          useFactory: async () => {
            const dataSource = new DataSource(options);
            return dataSource.initialize();
          },
        },
      ],
      exports: ['CONNECTION'],
    };
  }
}
