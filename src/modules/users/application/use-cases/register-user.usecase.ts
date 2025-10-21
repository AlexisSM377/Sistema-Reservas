import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepo: UserRepository,
  ) {}

  async execute(name: string, email: string, password: string): Promise<User> {
    const exists = await this.userRepo.findByEmail(email);
    if (exists) throw new ConflictException('El email ya está en uso');

    const hashed = await bcrypt.hash(password, 10);
    const user = User.create(name, email, hashed);

    return this.userRepo.save(user);
  }
}
