import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserOrmEntity } from '../entities/user.orm-entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly ormRepo: Repository<UserOrmEntity>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const ormUser = await this.ormRepo.findOne({ where: { email } });
    return ormUser ? UserMapper.toDomain(ormUser) : null;
  }

  async save(user: User): Promise<User> {
    const entity = this.ormRepo.create(UserMapper.toOrm(user));
    const saved = await this.ormRepo.save(entity);
    return UserMapper.toDomain(saved);
  }
}
