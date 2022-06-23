import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { MarketDate } from './marketDate.entity';

@Entity()
export class Result extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rank: number;

  underlying_id: string;

  @Column()
  underlying_pchng: string;

  // @Column('text', { array: true })
  // underlying_rank: string[];

  // @OneToOne(() => MarketDate, (marketDate) => marketDate.date)
  // market_date: MarketDate;

  @ManyToOne(() => MarketDate, (marketDate) => marketDate.date)
  market_date: MarketDate;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
