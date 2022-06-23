import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ResultController } from './process/process.controller';
import { ProcessService } from './process/process.service';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { join } from 'path';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123',
      database: 'test',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Result]),
  ],
  controllers: [AppController, ResultController],
  providers: [AppService, ProcessService],
})
export class AppModule {}
