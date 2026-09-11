import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BillSchedule } from './entities/bill-schedule.entity';
import { CreateBillScheduleDto } from './dto/create-bill-schedule.dto';

@Injectable()
export class BillScheduleService {
  constructor(
    @InjectRepository(BillSchedule)
    private readonly repository: Repository<BillSchedule>,
  ) {}

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(dto: CreateBillScheduleDto) {
    if (dto.scheduleType === 'RECURRING' && !dto.frequency) {
      throw new BadRequestException(
        'Frequency is required for recurring schedule',
      );
    }

    if (dto.scheduleType === 'ONE_TIME' && dto.frequency) {
      throw new BadRequestException(
        'Frequency should not be provided for one-time schedule',
      );
    }

    const schedule = this.repository.create({
      billerCode: dto.billerCode,
      consumerNumber: dto.consumerNumber,
      scheduleType: dto.scheduleType,
      frequency: dto.frequency,
      nextRunAt: new Date(dto.nextRunAt),
      maximumAmount: dto.maximumAmount,
      active: true,
    });

    return this.repository.save(schedule);
  }
}