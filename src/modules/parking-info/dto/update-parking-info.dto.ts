import { PartialType } from '@nestjs/swagger';
import { CreateParkingInfoDto } from './create-parking-info.dto';

export class UpdateParkingInfoDto extends PartialType(CreateParkingInfoDto) {}
