import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './infrastructure/entities/user.orm-entity';
import { UsersController } from './infrastructure/controller/users.controller';
import { CreateUserService } from './application/services/create-user.service';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [UsersController],
  providers: [
    CreateUserService,
    { provide: 'IUserRepository', useClass: UserRepositoryImpl },
  ],
  exports: ['IUserRepository'],
})
export class UsersModule {}
