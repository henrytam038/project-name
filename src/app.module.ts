import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ResultController } from './process/process.controller';
import { MarketFeedController } from './marketFeed/marketFeed.controller';
import { ProcessService } from './process/process.service';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { MarketFeedService } from './marketFeed/marketFeed.service';
import { connectionSource } from './config/ormconfig';
import { MarketDateController } from './marketDate/marketDate.controller';
import { MarketDateService } from './marketDate/marketDate.service';
import { MarketDate } from './entities/marketDate.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return connectionSource.options as TypeOrmModuleOptions;
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'build'),
    }),
    TypeOrmModule.forFeature([Result, MarketDate]),
    ScheduleModule.forRoot(),
  ],
  controllers: [
    AppController,
    ResultController,
    MarketFeedController,
    MarketDateController,
  ],
  providers: [AppService, ProcessService, MarketFeedService, MarketDateService],
})
export class AppModule {}
