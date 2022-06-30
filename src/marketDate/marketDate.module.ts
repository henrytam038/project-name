import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from '../entities/result.entity';
import { MarketDate } from 'src/entities/marketDate.entity';
import { MarketDateController } from './marketDate.controller';
import { MarketDateService } from './marketDate.service';
@Module({
  imports: [TypeOrmModule.forFeature([Result, MarketDate])],
  controllers: [MarketDateController],
  providers: [MarketDateService],
  exports: [MarketDateService],
})
export class MarketDateModule {}
