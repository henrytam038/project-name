import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { MarketDate } from './marketDate.entity';

@Entity()
export class Result extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rank: number; // 1

  @Column()
  code: string; // 10429

  @Column()
  type: string; //Warrant / Call

  @Column()
  underlying_id: string; // SPX

  @Column()
  name: string; // 標普

  @Column()
  comment: string; // logic 1

  @Column()
  selected_by: string;

  @Column()
  underlying_pchng: string;

  @ManyToOne(() => MarketDate, (marketDate) => marketDate.date)
  market_date: MarketDate;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
