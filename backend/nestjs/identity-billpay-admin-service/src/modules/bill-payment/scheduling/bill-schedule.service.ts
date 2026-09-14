import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  assertScheduleOwnedByActor,
  requireActorSub,
} from '../common/bbps-access.util';
import { BillSchedule } from './entities/bill-schedule.entity';
import { CreateBillScheduleDto } from './dto/create-bill-schedule.dto';

@Injectable()
export class BillScheduleService {
  constructor(
    @InjectRepository(BillSchedule)
    private readonly repository: Repository<BillSchedule>,
  ) {}

  findAll(actor: Record<string, unknown>) {
    const sub = requireActorSub(actor);
    return this.repository.find({ where: { keycloakUserId: sub } });
  }

  async findOne(id: string, actor: Record<string, unknown>) {
    const schedule = await this.repository.findOne({
      where: { id },
    });
    if (!schedule) {
      throw new NotFoundException({
        code: 'SCHEDULE_NOT_FOUND',
        message: 'Bill schedule not found',
      });
    }
    assertScheduleOwnedByActor(schedule, actor);
    return schedule;
  }

  async create(dto: CreateBillScheduleDto, actor: Record<string, unknown>) {
    const keycloakUserId = requireActorSub(actor);
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
      keycloakUserId,
    });

    return this.repository.save(schedule);
  }
}