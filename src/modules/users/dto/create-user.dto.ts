import { SalesDTO } from './../../sales/dto/create-sale.dto';
import { Exclude, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsBoolean()
  @IsOptional()
  isAdmin: boolean;
}

export class UserDataWithNoPassword extends CreateUserDto {
  @Exclude()
  password: string;
}

export class UserWithSales {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @Exclude()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsBoolean()
  isAdmin: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SalesDTO)
  sales: SalesDTO[];
}
