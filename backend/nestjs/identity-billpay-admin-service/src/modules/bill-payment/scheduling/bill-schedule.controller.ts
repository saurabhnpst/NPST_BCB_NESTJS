import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Auth } from '../../../common/decorators/auth.decorator';
import { BillScheduleService } from './bill-schedule.service';
import { CreateBillScheduleDto } from './dto/create-bill-schedule.dto';

@ApiTags('Bill Payment — Schedule')
@Auth()
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
  @ApiOperation({
    summary: 'Create bill payment schedule',
    description:
      'Requires Swagger **Authorize** with `data.accessToken` from `POST /auth/login` (same as curl `Authorization: Bearer` header).',
  })
  create(@Body() dto: CreateBillScheduleDto) {
    return this.billScheduleService.create(dto);
  }
}