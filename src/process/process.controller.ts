import { Controller, Get, Post } from '@nestjs/common';
import { ProcessService } from './process.service';
import { WarrantDataDto } from './dto/warrant-data.dto';

@Controller('result')
export class ResultController {
  constructor(private readonly processService: ProcessService) {}

  @Get()
  test(): Promise<WarrantDataDto> {
    return this.processService.fetchDataFromClient();
  }

  // @Post()
  // testAddData(@Body ): any {
  //   this.processService.createResult();
  // }
}
