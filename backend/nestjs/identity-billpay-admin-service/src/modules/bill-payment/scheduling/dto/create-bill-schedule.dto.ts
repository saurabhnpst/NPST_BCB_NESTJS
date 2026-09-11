import {
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateBillScheduleDto {
  @IsString()
  billerCode: string;

  @IsString()
  consumerNumber: string;

  @IsIn(['ONE_TIME', 'RECURRING'])
  scheduleType: string;

  @IsOptional()
  @IsIn(['MONTHLY'])
  frequency?: string;

  @IsDateString()
  nextRunAt: string;

  @IsNumber()
  @Min(1)
  maximumAmount: number;
}