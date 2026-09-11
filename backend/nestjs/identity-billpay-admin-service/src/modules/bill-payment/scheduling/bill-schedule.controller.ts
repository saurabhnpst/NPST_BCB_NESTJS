import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { BillScheduleService } from './bill-schedule.service';
import { CreateBillScheduleDto } from './dto/create-bill-schedule.dto';

@Controller('bill-payment/schedule')
export class BillScheduleController {
  constructor(
    private readonly billScheduleService: BillScheduleService,
  ) {}

  @Get()
  findAll() {
    return this.billScheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billScheduleService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateBillScheduleDto) {
    return this.billScheduleService.create(dto);
  }
}