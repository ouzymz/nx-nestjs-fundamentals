import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Nationality } from './nationality.entity';

@Index(['name', 'sirname'])
@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
  @Column()
  sirname!: string;

  @Column({ default: 0 })
  likes!: number;

  @JoinTable()
  @ManyToMany((type) => Nationality, (nationality) => nationality.users, {
    cascade: true, // ['insert']
  })
  nationalities!: Nationality[];
}
