import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AssessmentCriteria {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  value: number;

  @Column()
  delta: string;
}
