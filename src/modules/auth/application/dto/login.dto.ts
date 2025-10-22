import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email is required' })
  email: string;

  @IsString({ message: 'Password is required' })
  password: string;
}
