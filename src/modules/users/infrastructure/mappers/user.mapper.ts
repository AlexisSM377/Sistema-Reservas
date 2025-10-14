import { User } from '../../domain/entities/user.entity';
import { UserOrmEntity } from '../entities/user.orm-entity';

export class UserMapper {
  static toDomain(userOrm: UserOrmEntity): User {
    return new User(
      userOrm.id,
      userOrm.name,
      userOrm.email,
      userOrm.password,
      userOrm.role as 'user' | 'admin',
    );
  }
  static toOrm(user: User): UserOrmEntity {
    const orm = new UserOrmEntity();
    orm.id = user.id;
    orm.name = user.name;
    orm.email = user.email;
    orm.password = user.password;
    orm.role = user.role;
    return orm;
  }
}
