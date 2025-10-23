import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.usecase';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req) {
    return req.user;
  }
}
