import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Assessment } from './assessment.entity';

@Entity()
export class Subdivision {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  idTopSubdivision: number;

  @OneToOne(() => Assessment)
  @JoinColumn()
  assessment: Assessment[];
}
