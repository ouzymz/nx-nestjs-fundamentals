import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Nationality } from './nationality.entity';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
  @Column()
  sirname!: string;

  @JoinTable()
  @ManyToMany((type) => Nationality, (nationality) => nationality.users, {
    cascade: true, // ['insert']
  })
  nationality!: Nationality[];
}
