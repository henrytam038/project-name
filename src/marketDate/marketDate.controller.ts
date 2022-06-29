import { Controller, Get, Param } from '@nestjs/common';
import { MarketDateService } from './marketDate.service';
import { Result } from 'src/entities/result.entity';

@Controller('market_dates')
export class MarketDateController {
  constructor(private readonly marketFeedService: MarketDateService) {}

  @Get()
  async fetchCurrentMarketFeed(): Promise<Result[]> {
    const res = await this.marketFeedService.fetchAllMarketDates();

    return res;
  }
}
