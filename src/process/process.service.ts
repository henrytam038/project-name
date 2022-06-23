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
  constructor(
    @InjectRepository(Result) private resultRepository: Repository<Result>,
  ) {}
  async createResult(result: ResultDataDto, marketMetaData: FeedMetadata) {
    const resultRepository = connectionSource.getRepository(Result); // connect to 'Result' entity

    const marketDate = new MarketDate({
      date: marketMetaData.lastUpdated,
    });

    let resultList: Result[] = [];

    result.map((r, i) => {
      const newResult = resultRepository.create({
        rank: i + 1,
        underlying_id: r.id,
        name: r.result[0].name1,
        market_date: marketDate,
        underlying_pchng: r.underlying_pchng,
      }); // add columns to database

      resultList.push(newResult);
      resultRepository.save(newResult);
    });

    await this.addMarketDate(marketMetaData, resultList); // store market date

    return result;
  }

  async addMarketDate(marketDate: FeedMetadata, result: Result[]) {
    const marketDateRepository = connectionSource.getRepository(MarketDate);

    const newMarketDate = marketDateRepository.create({
      date: marketDate.lastUpdated,
      isOpen: Boolean(marketDate.isMarketOpen),
      result: result,
    });

    marketDateRepository.save(newMarketDate);
  }

  async addUnderlying(underlying: any) {
    const underlyingRepository = connectionSource.getRepository(Underlying);

    const oldUnderlying = await underlyingRepository.find(underlying.id);

    if (oldUnderlying) return;
    else {
      const newUnderlying = underlyingRepository.create({
        id: underlying.id,
        name: underlying.result[0].name1,
      });
      const response = underlyingRepository.save(newUnderlying);

      return response;
    }
  }

  async storeResult(): Promise<ResultDataDto> {
    const { data } = await request<WarrantDataDto>({
      method: 'GET',
      url: 'https://www.gswarrants.com.hk/banner/fivestone/warrant_data.cgi',
    }); // fetch data

    await this.addUnderlying(data); // store the underlying invovled

    const marketMetaData: FeedMetadata = data[0];

    const result = this.processData(data); // create result with logic

    await this.createResult(result, marketMetaData); // store result
    return this.processData(data);
  }

  processData(data: any) {
    data = data.filter((d) => PREDEFINED_UNDERLYING.includes(d.id)); // filter out major underlying predefined by GS

    const result = this.logicOneProcess(data); //process the data with logic 1

    return result;
  }

  private logicOneProcess(data: UnderlyingData[]): any {
    let resultList = [];

    console.log(resultList);

    //rank 1
    data.map((d) => {
      if (
        parseInt(d.underlying_pchng) <= -2 &&
        d.moneyflow_long >= 0 &&
        this.countCall(d) === 2
      ) {
        resultList.push(d);
      }
    });
    //rank 2
    data.map((d) => {
      if (
        parseInt(d.underlying_pchng) >= 2 &&
        d.moneyflow_short >= 0 &&
        this.countPut(d) === 2
      ) {
        resultList.push(d);
      }
    });
    //rank 3
    data.map((d) => {
      if (
        parseInt(d.underlying_pchng) >= -2 &&
        parseInt(d.underlying_pchng) < 0 &&
        d.moneyflow_long >= 0 &&
        this.countCall(d) === 2
      ) {
        resultList.push(d);
      }
    });
    //rank 4
    data.map((d) => {
      if (
        parseInt(d.underlying_pchng) < 2 &&
        parseInt(d.underlying_pchng) > 0 &&
        d.moneyflow_long > 0 &&
        this.countCall(d) === 1 &&
        this.countPut(d) === 1
      ) {
        resultList.push(d);
      }
    });
    //rank 5
    data.map((d) => {
      if (
        parseInt(d.underlying_pchng) < 2 &&
        parseInt(d.underlying_pchng) > 0 &&
        d.moneyflow_long < 0 &&
        this.countCall(d) === 1 &&
        this.countPut(d) === 1
      ) {
        resultList.push(d);
      }
    });
    // rank 6
    data.map((d) => {
      if (
        parseInt(d.underlying_pchng) >= -2 &&
        parseInt(d.underlying_pchng) < 0 &&
        d.moneyflow_long > 0 &&
        this.countCall(d) === 1 &&
        this.countPut(d) === 1
      ) {
        resultList.push(d);
      }
    });

    resultList.map((r, i) => {
      console.log(`rank ${i + 1}: ${r.id} ${r.underlying_pchng}`);
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
