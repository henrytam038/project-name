import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'src/entities/result.entity';
import { MarketDate } from 'src/entities/marketDate.entity';

@Injectable()
export class MarketDateService {
  constructor(
    @InjectRepository(Result)
    private resultRepository: Repository<Result>, //connect to "Result"
    @InjectRepository(MarketDate)
    private marketDateRepository: Repository<MarketDate>, //connect to "MarketDate"
  ) {}
  async fetchAllMarketDates(): Promise<any> {
    const marketDateDoc = await this.marketDateRepository
      .createQueryBuilder('market_dates')
      .getMany();

    const returnObj = {};

    marketDateDoc.forEach((marketDate) => {
      const date = marketDate.date.split(' ')[0];

      if (!returnObj[date]) {
        returnObj[date] = 1;
      } else if (returnObj[date] && marketDate.date.includes(date)) {
        returnObj[date]++;
      }
    });

    return returnObj;
  }
}
