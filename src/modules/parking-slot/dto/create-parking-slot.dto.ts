import { IsBoolean, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateParkingSlotDto {
  @IsNotEmpty()
  @IsNumber()
  number: number;
  @IsOptional()
  @IsBoolean()
  isAvaliable: boolean;
  @IsNotEmpty()
  @IsNumber()
  parkingInfoId: number;
}
