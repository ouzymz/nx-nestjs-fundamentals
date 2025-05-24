import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Nationality } from './entities/nationality.entity';
import { PaginationQueryDto } from '@nestjs-fundamentals-boiler-temple/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './events/entities/event.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      sirname: 'Buddy Brew',
      likes: 0,
      nationalities: [{ id: 1, name: 'turkish', users: [] }] as Nationality[],
    },
  ];

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Nationality)
    private readonly nationalityRepository: Repository<Nationality>,
    private readonly dataSource: DataSource
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
    const user = this.userRepository.findOne({
      where: { id: parseInt(id) },
      relations: ['nationalities'],
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const nationalities = await Promise.all(
      createUserDto.nationalities.map((name) =>
        this.preloadNationalityByName(name)
      )
    );
    const user = this.userRepository.create({
      ...createUserDto,
      nationalities,
    });
    return this.userRepository.save(user);
  }

  update(id: string, updateUserDto: any) {
    const existingCoffee = this.findOne(id);
  }

  remove(id: string) {
    const userIndex = this.users.findIndex((item) => item.id === +id);
    if (userIndex >= 0) {
      this.users.splice(userIndex, 1);
    }
  }

  async likeUser(user: User) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      user.likes++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { userId: user.id };

      await queryRunner.manager.save(user);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadNationalityByName(name: string): Promise<Nationality> {
    const existingNationality = await this.nationalityRepository.findOneBy({
      name,
    });
    if (existingNationality) {
      return existingNationality;
    }
    return this.nationalityRepository.create({ name });
  }
}
