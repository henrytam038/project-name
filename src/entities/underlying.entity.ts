import { BaseEntity, Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'underlying' })
export class Underlying extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
}
