import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserService } from '../../application/services/create-user.service';
import { CreateUserDto } from '../../application/dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.createUserService.execute(dto.name, dto.email, dto.password);
  }
}
