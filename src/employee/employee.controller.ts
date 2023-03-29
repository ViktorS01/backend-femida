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
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  getAll() {
    return this.employeeService.findAll();
  }
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.employeeService.findOne(id);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() employee: CreateEmployeeDto) {
    this.employeeService.create(employee);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    this.employeeService.remove(id);
  }
  @Put(':id')
  update(@Body() employeeDto: CreateEmployeeDto, @Param('id') id: number) {
    this.employeeService.update(id, employeeDto);
  }
}
