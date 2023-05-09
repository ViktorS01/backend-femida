import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeService } from './employee.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAll() {
    return this.employeeService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: number, @Request() req) {
    return this.employeeService.findOne(id, req.user.username);
  }

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() employee: CreateEmployeeDto) {
    this.employeeService.create(employee);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    this.employeeService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Body() employeeDto: CreateEmployeeDto, @Param('id') id: number) {
    this.employeeService.update(id, employeeDto);
  }
}
