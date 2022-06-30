import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from '../entities/result.entity';
import { MarketDate } from 'src/entities/marketDate.entity';
import { MarketFeedController } from './marketFeed.controller';
import { MarketFeedService } from './marketFeed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Result, MarketDate])],
  controllers: [MarketFeedController],
  providers: [MarketFeedService],
  exports: [MarketFeedService],
})
export class MarketFeedModule {}
