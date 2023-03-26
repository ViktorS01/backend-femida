import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  lastLoginAt: Date;

  @Column()
  role: string;

  @Column({ nullable: true })
  idSubdivision: string;

  @Column({ nullable: true })
  lastAssessment: string;

  @Column({ nullable: true })
  currentAssessment: string;

  @Column({ nullable: true })
  photo: string;

  @Column()
  password: string;
}
