import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Nationality } from './entities/nationality.entity';
import { PaginationQueryDto } from '@nestjs-fundamentals-boiler-temple/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      sirname: 'Buddy Brew',
      nationality: [{ id: 1, name: 'turkish', users: [] }] as Nationality[],
    },
  ];

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Nationality)
    private readonly nationalityRepository: Repository<Nationality>
  ) {}
  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;

    return this.userRepository.find({
      relations: ['nationalities'],
      skip: offset,
      take: limit,
    });
  }

  findOne(id: string) {
    const user = this.users.find((item) => item.id === +id);

    if (!user) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return user;
  }

  create(createUserDto: any) {
    this.users.push(createUserDto);
  }

  update(id: string, updateUserDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // update the existing entity
    }
  }

  remove(id: string) {
    const userIndex = this.users.findIndex((item) => item.id === +id);
    if (userIndex >= 0) {
      this.users.splice(userIndex, 1);
    }
  }
}
