import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'src/entities/result.entity';
import { request } from 'gaxios';
import {
  FeedMetadata,
  UnderlyingData,
  WarrantDataDto,
} from './dto/warrant-data.dto';
import { connectionSource } from 'src/config/ormconfig';
import { ResultDataDto } from './dto/result-data.dto';
import { MarketDate } from 'src/entities/marketDate.entity';
import { Underlying } from 'src/entities/underlying.entity';
import { MarketFeedDataDto } from './dto/marketFeed-data.dto';

const PREDEFINED_UNDERLYING: string[] = [
  '0700',
  '9988',
  '3690',
  '2318',
  '1024',
  '1810',
  '1211',
  '9618',
  '1299',
  '0388',
]; // predefined underlyings by GS

@Injectable()
export class ProcessService {
  // constructor(
  //   @InjectRepository(Result) private resultRepository: Repository<Result>,
  // ) {}
  resultRepository = connectionSource.getRepository(Result); // connect to 'Result' entity
  marketDateRepository = connectionSource.getRepository(MarketDate); //connect to "MarketDate"

  async createResult(result: ResultDataDto, marketMetaData: FeedMetadata) {
    const resultList: Result[] = [];

    const newMarketDate = this.marketDateRepository.create({
      date: marketMetaData.lastUpdated,
      isOpen: Boolean(marketMetaData.isMarketOpen),
    });

    await Promise.all(
      result.map(async (r, i) => {
        if (r.result[0].code1 !== '') {
          const newResult = this.resultRepository.create({
            rank: r.rank,
            underlying_id: r.id,
            code: r.result[0].code1,
            name: r.result[0].name1,
            type: r.result[0].type1,
            comment: r.result[0].comment1,
            selected_by: 'Logic 1',
            underlying_pchng: r.underlying_pchng,
          });
          resultList.push(newResult);
          await this.resultRepository.save(newResult); // add new Result to database
        }
        if (r.result[1].code2 !== '') {
          const newResult = this.resultRepository.create({
            rank: r.rank,
            underlying_id: r.id,
            code: r.result[1].code2,
            name: r.result[1].name2,
            type: r.result[1].type2,
            comment: r.result[1].comment2,
            selected_by: 'Logic 1',
            underlying_pchng: r.underlying_pchng,
          }); // add columns to database
          resultList.push(newResult);
          await this.resultRepository.save(newResult);
        }
      }),
    );

    console.log(resultList);
    newMarketDate.results = resultList;
    await this.marketDateRepository.save(newMarketDate);

    return result;
  }

  // async addMarketDate(marketDate: FeedMetadata, resultList: Result[]) {
  //   const marketDateRepository = connectionSource.getRepository(MarketDate);

  //   console.log(resultList);

  //   const newMarketDate = marketDateRepository.create({
  //     date: marketDate.lastUpdated,
  //     isOpen: Boolean(marketDate.isMarketOpen),
  //     results: resultList,
  //   });

  //   await marketDateRepository.save(newMarketDate);
  // }

  // private async addUnderlying(underlying: any) {
  //   const underlyingRepository = connectionSource.getRepository(Underlying);

  //   const oldUnderlying = await underlyingRepository.find(underlying.id);

  //   if (oldUnderlying) return;
  //   else {
  //     const newUnderlying = underlyingRepository.create({
  //       id: underlying.id,
  //       name: underlying.result[0].name1,
  //     });
  //     const response = underlyingRepository.save(newUnderlying);

  //     return response;
  //   }
  // }

  async storeResult(): Promise<ResultDataDto> {
    const { data } = await request<WarrantDataDto>({
      method: 'GET',
      url: 'https://www.gswarrants.com.hk/banner/fivestone/warrant_data.cgi',
    }); // fetch data

    // await this.addUnderlying(data); // store the underlying invovled

    const marketMetaData: FeedMetadata = data[0];

    const result = this.processData(data); // create result with logic

    await this.createResult(result, marketMetaData); // store result
    return result;
  }

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

  processData(data: any) {
    data = data.filter((d) => PREDEFINED_UNDERLYING.includes(d.id)); // filter out major underlying predefined by GS

    const result = this.logicOneProcess(data); //process the data with logic 1

    return result;
  }

  private logicOneProcess(data: UnderlyingData[]): any {
    const resultList = [];

    data.map((d) => {
      if (
        //rank 1
        parseFloat(d.underlying_pchng) <= -2 &&
        parseFloat(d.moneyflow_long) >= 0 &&
        this.countCall(d) === 2
      ) {
        resultList.push({ rank: 1, ...d });
      } else if (
        //rank 2
        parseFloat(d.underlying_pchng) >= 2 &&
        parseFloat(d.moneyflow_short) >= 0 &&
        this.countPut(d) === 2
      ) {
        resultList.push({ rank: 2, ...d });
      } else if (
        //rank 3
        parseFloat(d.underlying_pchng) >= -2 &&
        parseFloat(d.underlying_pchng) < 0 &&
        parseFloat(d.moneyflow_long) >= 0 &&
        this.countCall(d) === 2
      ) {
        resultList.push({ rank: 3, ...d });
      } else if (
        //rank 4
        parseFloat(d.underlying_pchng) < 2 &&
        parseFloat(d.underlying_pchng) > 0 &&
        parseFloat(d.moneyflow_long) > 0 &&
        this.countCall(d) === 1 &&
        this.countPut(d) === 1
      ) {
        resultList.push({ rank: 4, ...d });
      } else if (
        //rank 5
        parseFloat(d.underlying_pchng) < 2 &&
        parseFloat(d.underlying_pchng) > 0 &&
        parseFloat(d.moneyflow_long) < 0 &&
        this.countCall(d) === 1 &&
        this.countPut(d) === 1
      ) {
        resultList.push({ rank: 5, ...d });
      } else if (
        parseFloat(d.underlying_pchng) >= -2 &&
        parseFloat(d.underlying_pchng) < 0 &&
        parseFloat(d.moneyflow_long) > 0 &&
        this.countCall(d) === 1 &&
        this.countPut(d) === 1
      ) {
        resultList.push({ rank: 6, ...d });
      }
    });

    resultList.map((r, i) => {
      console.log(`rank ${r.rank}: ${r.id} ${r.underlying_pchng}`);
    });

    return resultList; // return the sorted list
  }

  private countCall(underlying: UnderlyingData): number {
    let callCount = 0;
    if (underlying.result[0].type1 === '認購') callCount++;
    if (underlying.result[1].type2 === '認購') callCount++;

    return callCount;
  }

  private countPut(underlying: UnderlyingData): number {
    let putCount = 0;

    if (underlying.result[0].type1 === '認沽') putCount++;
    if (underlying.result[1].type2 === '認沽') putCount++;

    return putCount;
  }
}
