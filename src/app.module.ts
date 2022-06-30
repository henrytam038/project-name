import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { connectionSource } from './config/ormconfig';
import { MarketDate } from './entities/marketDate.entity';
import { ProcessModule } from './process/process.module';
import { MarketFeedModule } from './marketFeed/marketFeed.module';
import { MarketDateModule } from './marketDate/marketDate.module';

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
    ProcessModule,
    MarketFeedModule,
    MarketDateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
