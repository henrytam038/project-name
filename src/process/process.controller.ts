import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProcessService } from './process.service';
import { WarrantDataDto } from './dto/warrant-data.dto';
import { ResultDataDto } from './dto/result-data.dto';
import { get } from 'http';
import { MarketFeedDataDto } from './dto/marketFeed-data.dto';

@Controller('result')
export class ResultController {
  constructor(private readonly processService: ProcessService) {}

  @Post()
  storeResultToDb(): Promise<ResultDataDto> {
    return this.processService.storeResult();
  }

  @Get()
  async fetchMarketFeedByDate(): Promise<MarketFeedDataDto> {
    const res = await this.processService.fetchMarketFeedByDate();
    console.log(res);
    return res;
  }
}
