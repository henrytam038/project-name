import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProcessService } from './marketFeed.service';
import { MarketFeedDataDto } from '../marketFeed/dto/marketFeed-data.dto';

@Controller('feed')
export class ResultController {
  constructor(private readonly processService: ProcessService) {}

  @Get() // need param
  async fethMarketFeedByDate(): Promise<MarketFeedDataDto> {
    const res = await this.processService.fetchMarketFeedByDate();
    console.log(res);
    return res;
  }

  @Get('current')
  async fetchCurrentMarketFeed(): Promise<MarketFeedDataDto> {
    const res = await this.processService.fetchCurrentMarketFeed();
    console.log(res);
    return res;
  }
}
