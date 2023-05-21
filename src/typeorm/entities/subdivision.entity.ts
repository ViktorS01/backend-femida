import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Assessment } from './assessment.entity';
import { Employee } from './employee.entity';

@Entity()
export class Subdivision {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  idTopSubdivision: number;

  @Column({ nullable: true })
  subdivisionCurrentAssessment: number;

  @Column({ nullable: true })
  delta: string;

  @Column({ nullable: true })
  assessmentsCount: number;

  @Column({ nullable: true })
  lastAssessment: number;

  @Column({ nullable: true })
  employeeCount: number;

  @OneToOne(() => Assessment)
  @JoinColumn()
  employees: Employee[];

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

  @OneToOne(() => Assessment)
  @JoinColumn()
  assessment: Assessment[];
}
