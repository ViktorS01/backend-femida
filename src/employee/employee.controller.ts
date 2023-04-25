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
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeService } from './employee.service';
import { AuthGuard } from '../auth/auth.guard';

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
  getOne(@Param('id') id: number) {
    return this.employeeService.findOne(id);
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
