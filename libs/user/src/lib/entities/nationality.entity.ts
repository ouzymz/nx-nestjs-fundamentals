import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('nationality')
export class Nationality {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToMany((type) => User, (user) => user.nationalities)
  users!: string[];
}
