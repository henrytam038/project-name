import { Injectable } from '@nestjs/common';
import { Result } from 'src/entities/result.entity';
import { connectionSource } from 'src/config/ormconfig';
import { MarketDate } from 'src/entities/marketDate.entity';

@Injectable()
export class MarketDateService {
  resultRepository = connectionSource.getRepository(Result); // connect to 'Result' repo
  marketDateRepository = connectionSource.getRepository(MarketDate); //connect to "MarketDate" repo

  async fetchAllMarketDates(): Promise<any> {
    const marketDateDoc = await this.marketDateRepository
      .createQueryBuilder('market_dates')
      .getMany();

    const returnObj = {};

    marketDateDoc.map((marketDate) => {
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
