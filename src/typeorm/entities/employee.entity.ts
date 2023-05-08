import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Subdivision } from './subdivision.entity';
import { Assessment } from './assessment.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  patronymic: string;

  @Column()
  birthday: string;

  @Column()
  profession: string;

  @Column()
  gender: string;

  @Column({ nullable: true })
  createdAt: Date;

  @Column()
  role: string;

  @Column({ nullable: true })
  subdivisionId: number;

  @Column({ nullable: true })
  delta: string;

  @Column({ nullable: true })
  photo: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  employeeCurrentAssessment: number;

  @Column({ nullable: true })
  averageSpeed: number;

  @Column({ nullable: true })
  averageInformation: number;

  @Column({ nullable: true })
  averageQualityWork: number;

  @Column({ nullable: true })
  averageResultWork: number;

  @Column({ nullable: true })
  averageTeamWork: number;

  @Column({ nullable: true })
  averageRespect: number;

  @Column({ nullable: true })
  assessmentsCount: number;

  @OneToOne(() => Subdivision)
  @JoinColumn()
  subdivision: Subdivision;

  @OneToOne(() => Assessment)
  @JoinColumn()
  assessment: Assessment[];
}
