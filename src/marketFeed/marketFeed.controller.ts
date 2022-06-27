import { Controller, Get, Param } from '@nestjs/common';
import { MarketFeedData, MarketFeedService } from './marketFeed.service';
import { Result } from 'src/entities/result.entity';

@Controller('feed')
export class MarketFeedController {
  constructor(private readonly marketFeedService: MarketFeedService) {}

  @Get('/current')
  async fetchCurrentMarketFeed(): Promise<Result[]> {
    const res = await this.marketFeedService.fetchCurrentMarketFeed();
    console.log(res);
    return res;
  }

  @Get(':date') // need param
  async fetchMarketFeedByDate(@Param('date') date): Promise<Result[]> {
    console.log(date);
    const res = await this.marketFeedService.fetchMarketFeedByDate(date);
    return res;
  }
}
