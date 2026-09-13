import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../../../common/decorators/auth.decorator';
import { ReportingService } from './reporting.service';
import { ReportQueryDto } from './dto/report-query.dto';

@ApiTags('Admin — Reporting')
@Auth()
@Controller('admin/reporting')
export class ReportingController {
  constructor(private readonly service: ReportingService) {}


  @Get('transactions/daily-summary')
  dailySummary(@Query() query: ReportQueryDto) {
  return this.service.dailySummary(query);
   }

   @Get('transactions/failed')
failedTransactions(@Query() query: ReportQueryDto) {
  return this.service.failedTransactions(query);
}

@Get('transactions/high-value')
highValueTransactions(@Query() query: ReportQueryDto) {
  return this.service.highValueTransactions(query);
}

@Get('transactions/branch-wise')
branchWise(@Query() query: ReportQueryDto) {
  return this.service.branchWise(query);
}

@Get('transactions/channel-wise')
channelWise(@Query() query: ReportQueryDto) {
  return this.service.channelWise(query);
}
  
}
