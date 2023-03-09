import { PartialType } from '@nestjs/swagger';

export class UpdateParkingSlotDto {
  isAvaliable: boolean;
  number?: number;
}
