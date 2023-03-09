import { IsString } from 'class-validator';

export class UpdateSaleDto {
  @IsString()
  paymentMethod?: string;
}
