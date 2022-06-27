import { Injectable } from '@nestjs/common';
import { Result } from 'src/entities/result.entity';
import { connectionSource } from 'src/config/ormconfig';
import { MarketDate } from 'src/entities/marketDate.entity';

@Injectable()
export class ProcessService {
  resultRepository = connectionSource.getRepository(Result); // connect to 'Result' entity
  marketDateRepository = connectionSource.getRepository(MarketDate); //connect to "MarketDate"

  async fetchMarketFeedByDate(): Promise<any> {
    const resultRepository = connectionSource.getRepository(Result); // connect to 'Result' entity

    return resultRepository
      .createQueryBuilder('result')
      .leftJoinAndSelect('result.market_date', 'market_date')
      .where('marketDateId = 2')
      .getMany();
  }

  async fetchCurrentMarketFeed(): Promise<any> {
    const resultRepository = connectionSource.getRepository(Result); // connect to 'Result' entity'
    const marketDateRepository = connectionSource.getRepository(MarketDate);

    const marketDateDoc = await marketDateRepository.findOne({
      where: { isOpen: true },
      order: { id: 'DESC' },
    });
    const id = marketDateDoc.id;
    console.log(id);

    return resultRepository
      .createQueryBuilder('result')
      .leftJoinAndSelect('result.market_date', 'market_date')
      .where('marketDateId = :marketDateId', { marketDateId: id })
      .getMany();
  }
}
