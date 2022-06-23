import { Body, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'src/entities/result.entity';
import { request } from 'gaxios';
import { UnderlyingData, WarrantDataDto } from './dto/warrant-data.dto';

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
];

@Injectable()
export class ProcessService {
  constructor(
    @InjectRepository(Result) private resultRepository: Repository<Result>,
  ) {}
  createResult(result: any) {
    const newReslt = this.resultRepository.create({
      rank: 1,
      name: 'test',
    });
    return this.resultRepository.save(newReslt);
  }

  async fetchDataFromClient(): Promise<WarrantDataDto> {
    const { data } = await request<WarrantDataDto>({
      method: 'GET',
      url: 'https://www.gswarrants.com.hk/banner/fivestone/warrant_data.cgi',
    }); // fetch data

    this.processData(data);

    return data;
  }

  processData(data: any) {
    data = data.filter((d) => PREDEFINED_UNDERLYING.includes(d.id)); // filter out major underlying predefined by GS

    const result = this.logicOneProcess(data); //process the data with logic 1

    // this.createResult(result);
  }

  private logicOneProcess(data: UnderlyingData[]): any {
    const resultList: any[] = [];

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

    return resultList;
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
