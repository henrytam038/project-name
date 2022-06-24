import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Result } from './result.entity';

@Entity({ name: 'market_dates' })
export class MarketDate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @OneToMany(() => Result, (result) => result.market_date)
  results: Result[];

  @Column({ default: true })
  isOpen: boolean;

  constructor(partial: Partial<MarketDate>) {
    super();
    Object.assign(this, partial);
  }
}
