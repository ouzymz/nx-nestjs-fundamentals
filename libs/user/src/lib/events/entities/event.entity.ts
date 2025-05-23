import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/* Event */
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;

  @Column()
  name!: string;

  @Column('json')
  payload!: Record<string, any>;
}
