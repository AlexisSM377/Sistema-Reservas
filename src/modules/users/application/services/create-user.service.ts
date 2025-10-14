import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(name: string, email: string, password: string): Promise<User> {
    const exists = await this.userRepo.findByEmail(email);
    if (exists) throw new ConflictException('El email ya está en uso');

    const hash = await bcrypt.hash(password, 10);
    const user = new User(0, name, email, hash);
    return await this.userRepo.create(user);
  }
}
