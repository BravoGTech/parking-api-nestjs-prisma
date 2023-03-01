import { IsNotEmpty, IsString, IsISO8601, IsDecimal } from 'class-validator';

export class CreateSaleDto {
  @IsNotEmpty()
  @IsString()
  carPlate: string;

  @IsNotEmpty()
  @IsString()
  carBrand: string;

  @IsNotEmpty()
  spotNumber: number;
}

export class SalesDTO {
  @IsString()
  carPlate: string;

  @IsString()
  carBrand: string;

  @IsISO8601()
  checkinTime: Date;

  @IsISO8601()
  checkoutTime?: Date;

  @IsDecimal({ decimal_digits: '2' })
  price?: number | null;

  @IsNotEmpty()
  sale_date: Date;

  @IsString()
  userId: string;

  @IsString()
  parkingSlotId: string;
}
