import { Injectable } from '@nestjs/common';
import { Result } from 'src/entities/result.entity';
import { connectionSource } from 'src/config/ormconfig';
import { MarketDate } from 'src/entities/marketDate.entity';
export interface MarketFeedData {
  id: number;
  rank: number;
  code: string;
  name: string;
  underlying_id: string;
  type: string;
  comment: string;
  selected_by: string;
}
@Injectable()
export class MarketFeedService {
  resultRepository = connectionSource.getRepository(Result); // connect to 'Result' repo
  marketDateRepository = connectionSource.getRepository(MarketDate); //connect to "MarketDate" repo

  async fetchMarketFeedByDate(): Promise<Result[]> {
    const data = this.resultRepository
      .createQueryBuilder('result')
      .leftJoinAndSelect('result.market_date', 'market_date')
      .where('marketDateId = 2')
      .getMany();
    return data;
  }

  async fetchCurrentMarketFeed(): Promise<Result[]> {
    const marketDateDoc = await this.marketDateRepository.findOne({
      where: { isOpen: true },
      order: { id: 'DESC' },
    });
    const id = marketDateDoc.id;
    console.log(id);

    const data = this.resultRepository
      .createQueryBuilder('result')
      .leftJoinAndSelect('result.market_date', 'market_date')
      .where('marketDateId = :marketDateId', { marketDateId: id })
      .getMany();

    return data;
  }
}
