import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { AssessmentCriteria } from './assessmentCriteria.entity';

@Entity()
export class Assessment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: true })
  idFromEmployee: number;

  @Column({ nullable: true })
  idToEmployee: number;

  @Column({ nullable: true })
  comment: string;

  @OneToOne(() => AssessmentCriteria)
  @JoinColumn()
  speed: AssessmentCriteria;

  @OneToOne(() => AssessmentCriteria)
  @JoinColumn()
  information: AssessmentCriteria;

  @OneToOne(() => AssessmentCriteria)
  @JoinColumn()
  qualityWork: AssessmentCriteria;

  @OneToOne(() => AssessmentCriteria)
  @JoinColumn()
  resultWork: AssessmentCriteria;

  @OneToOne(() => AssessmentCriteria)
  @JoinColumn()
  teamWork: AssessmentCriteria;

  @OneToOne(() => AssessmentCriteria)
  @JoinColumn()
  respect: AssessmentCriteria;
}
