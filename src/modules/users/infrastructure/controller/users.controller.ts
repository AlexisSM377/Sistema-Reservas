import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.usecase';

@Controller('users')
export class UsersController {
  constructor(private readonly registerUser: RegisterUserUseCase) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const user = await this.registerUser.execute(
      dto.name,
      dto.email,
      dto.password,
    );
    return { message: 'Usuario registrado con éxito', user };
  }
}
