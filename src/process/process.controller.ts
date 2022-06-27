import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProcessService } from './process.service';
import { UnderlyingData, WarrantDataDto } from './dto/warrant-data.dto';
import { ResultDataDto } from './dto/result-data.dto';

@Controller('result')
export class ResultController {
  constructor(private readonly processService: ProcessService) {}

  @Post()
  fetchDataAndStoreResult(): Promise<UnderlyingData[]> {
    return this.processService.fetchDataAndStoreResult();
  }
}
