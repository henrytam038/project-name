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

    const datesList = [];

    console.log(marketDateDoc);
    marketDateDoc.map((r) => {
      if (!datesList.includes(r.date.split(' ')[0])) {
        return datesList.push(r.date.split(' ')[0]);
      }
    });
    return datesList.reverse();
  }
}
