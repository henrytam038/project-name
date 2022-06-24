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

  // @Get('add_market_date')
  // testAddMarketDate() {
  //   this.processService.addMarketDate({
  //     lastUpdated: '2022-06-23 15:00:00',
  //     isMarketOpen: 'true',
  //   });
  // }

  // @Get('add_underlying')
  // testAddUnderlying() {
  //   this.processService.addUnderlying({
  //     id: 'NDX',
  //     underlying_pchng: '-0.16',
  //     moneyflow_long: 1240215,
  //     moneyflow_short: -6635953,
  //     result: [
  //       {
  //         code1: '10421',
  //         name1: '納指',
  //         strike1: '13500',
  //         egearing1: '8.5',
  //         maturity1: '2022-12-16',
  //         type1: '認購',
  //         comment1: '低街貨兼高槓桿',
  //       },
  //       {
  //         code2: '10386',
  //         name2: '納指',
  //         strike2: '10450',
  //         egearing2: '7.6',
  //         maturity2: '2022-09-16',
  //         type2: '認沽',
  //         comment2: '全場最高槓桿',
  //       },
  //     ],
  //   });
  // }

  // @Post()
  // testAddData(@Body() resultDataDto: ResultDataDto[]) {
  //   this.processService.createResult(resultDataDto);
  // }
}
