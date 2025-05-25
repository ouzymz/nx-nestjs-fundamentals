import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggingMiddleware } from './middleware/logging.middleware';
@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggingMiddleware)
      // .exclude('coffees')
      .forRoutes('*');
    // 'coffees'
    // {path: 'coffees', method: RequestMethod.GET }
  }
}
