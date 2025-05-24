import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index(['name'])
@Entity('UserRating')
export class UserRating {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ default: 0 })
  ratings!: number;
}
