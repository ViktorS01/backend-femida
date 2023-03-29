import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subdivision {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  idTopSubdivision: number;
}
