import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('nationality')
export class Nationality {
  // nest g class coffees/entities/flavor.entity --no-spec

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToMany((type) => User, (user) => user.nationality)
  users!: string[];
}
