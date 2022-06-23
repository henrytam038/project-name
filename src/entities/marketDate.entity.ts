import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Result } from './result.entity';

@Entity({ name: 'market_dates' })
export class MarketDate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  //   @OneToOne(() => Result, (result) => result.market_date)
  //   result: Result;

  @OneToMany(() => Result, (result) => result.market_date)
  result: Result[];

  @Column({ default: true })
  isOpen: boolean;

  constructor(partial: Partial<MarketDate>) {
    super();
    Object.assign(this, partial);
  }
}
