import { PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional({})
  readonly username: string;

  @IsString()
  @IsOptional()
  readonly password: string;

  @IsString()
  @IsOptional()
  readonly first_name: string;

  @IsString()
  @IsOptional()
  readonly last_name: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsBoolean()
  @IsOptional()
  readonly isAdmin: boolean;
}

export class UserDataWithNoPassword extends UpdateUserDto {
  @Exclude()
  password: string;
}
