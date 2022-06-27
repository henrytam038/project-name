import { Controller, Post } from '@nestjs/common';
import { ProcessService } from './process.service';
import { UnderlyingData } from './dto/warrant-data.dto';

@Controller('result')
export class ResultController {
  constructor(private readonly processService: ProcessService) {}

  @Post()
  fetchDataAndStoreResult(): Promise<UnderlyingData[]> {
    return this.processService.fetchDataAndStoreResult();
  }
}
