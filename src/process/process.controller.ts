import { Controller, Get } from '@nestjs/common';
import { ProcessService } from './process.service';
import { UnderlyingData } from './dto/warrant-data.dto';
import { AppEngineCronValidated } from '../auth/app-engine-cron-validated.decorator';

@Controller('result')
@AppEngineCronValidated()
export class ResultController {
  constructor(private readonly processService: ProcessService) {}

  @Get()
  fetchDataAndStoreResult(): Promise<UnderlyingData[]> {
    return this.processService.fetchDataAndStoreResult();
  }
}
