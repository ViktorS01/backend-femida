import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  speed: number;

  @Column()
  information: number;

  @Column()
  qualityWork: number;

  @Column()
  resultWork: number;

  @Column()
  teamWork: number;

  @Column()
  respect: number;
}
