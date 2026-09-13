import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../../common/decorators/auth.decorator';
import { BillerService } from './biller.service';
import { CreateBillerDto } from './dto/create-biller.dto';
import { ListBillersQueryDto } from './dto/list-billers-query.dto';

@ApiTags('Bill Payment — Biller')
@Auth()
@Controller('bill-payment/biller')
export class BillerController {
  constructor(private readonly service: BillerService) {}

  @Get('categories')
  @ApiOperation({ summary: 'List distinct biller categories (active billers only)' })
  getCategories() {
    return this.service.getCategories();
  }

  @Get()
  @ApiOperation({
    summary: 'List billers',
    description: 'Optional `category` query returns only active billers in that category.',
  })
  findAll(@Query() query: ListBillersQueryDto) {
    return this.service.findAll(query.category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get biller by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateBillerDto) {
    return this.service.create(dto);
  }
}
