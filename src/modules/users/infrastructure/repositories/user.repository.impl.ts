import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { UserOrmEntity } from '../entities/user.orm-entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repo: Repository<UserOrmEntity>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const ormUser = await this.repo.findOne({ where: { email } });
    return ormUser ? UserMapper.toDomain(ormUser) : null;
  }

  async create(user: User): Promise<User> {
    const ormUser = this.repo.create(UserMapper.toOrm(user));
    const saved = await this.repo.save(ormUser);
    return UserMapper.toDomain(saved);
  }
}
