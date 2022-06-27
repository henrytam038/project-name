import { Controller, Get } from '@nestjs/common';
import { MarketFeedData, MarketFeedService } from './marketFeed.service';
import { Result } from 'src/entities/result.entity';

@Controller('feed')
export class MarketFeedController {
  constructor(private readonly marketFeedService: MarketFeedService) {}

  @Get() // need param
  async fethMarketFeedByDate(): Promise<Result[]> {
    const res = await this.marketFeedService.fetchMarketFeedByDate();
    console.log(res);
    return res;
  }

  @Get('current')
  async fetchCurrentMarketFeed(): Promise<Result[]> {
    const res = await this.marketFeedService.fetchCurrentMarketFeed();
    console.log(res);
    return res;
  }
}
