import { Module } from '@nestjs/common';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Result } from '../entities/result.entity';
import { MarketDate } from 'src/entities/marketDate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Result, MarketDate])],
  controllers: [ProcessController],
  providers: [ProcessService],
  exports: [ProcessService],
})
export class ProcessModule {}
