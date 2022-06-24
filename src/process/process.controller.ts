import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProcessService } from './process.service';
import { WarrantDataDto } from './dto/warrant-data.dto';
import { ResultDataDto } from './dto/result-data.dto';
import { MarketFeedDataDto } from './dto/marketFeed-data.dto';

@Controller('result')
export class ResultController {
  constructor(private readonly processService: ProcessService) {}

  @Post()
  storeResultToDb(): Promise<ResultDataDto> {
    return this.processService.storeResult();
  }

  @Get() // need param
  async fetchMarketFeedByDate(): Promise<MarketFeedDataDto> {
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
