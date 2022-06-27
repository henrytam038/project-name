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

  async fetchMarketFeedByDate(date: string): Promise<any> {
    const marketDateDoc = await this.marketDateRepository
      .createQueryBuilder('market_dates')
      .where('market_dates.date LIKE :date', { date: `%${date}%` })
      .getMany();

    const idList = marketDateDoc.map((d) => d.id);

    const data = await this.resultRepository
      .createQueryBuilder('result')
      .leftJoinAndSelect('result.market_date', 'market_date')
      .where('marketDateId IN (:marketDateId)', { marketDateId: idList })
      .getMany();

    const newList = data.reduce((acc, obj) => {
      const key = obj.market_date['date'];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
    return newList;
  }

  async fetchCurrentMarketFeed(): Promise<Result[]> {
    const marketDateDoc = await this.marketDateRepository.findOne({
      where: { isOpen: true },
      order: { id: 'DESC' },
    });
    const id = marketDateDoc.id;

    const data = await this.resultRepository
      .createQueryBuilder('result')
      .leftJoinAndSelect('result.market_date', 'market_date')
      .where('marketDateId = :marketDateId', { marketDateId: id })
      .getMany();

    return data;
  }
}
