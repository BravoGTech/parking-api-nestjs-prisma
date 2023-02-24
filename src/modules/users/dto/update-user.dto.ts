import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Exclude } from 'class-transformer';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  first_name: string;

  @IsString()
  @IsOptional()
  last_name: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;

  @IsBoolean()
  @IsOptional()
  isAdmin: boolean;
}

export class UserDataWithNoPassword extends UpdateUserDto {
  @Exclude()
  password: string;
}
