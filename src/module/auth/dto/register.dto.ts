import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class RegisterDto {

  @IsEmail()
  email: string
  
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @MinLength(6)
  password: string;
}
