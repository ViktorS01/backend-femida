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
  Query,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeService } from './employee.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Employee } from '../typeorm/entities/employee.entity';

@ApiBearerAuth()
@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAll(@Request() req, @Query() query: { search: string }) {
    if (query?.search) {
      return this.employeeService.search(
        req.user.username,
        query?.search.toLowerCase(),
      );
    }
    return this.employeeService.findAll(req.user.username);
  }

  @UseGuards(AuthGuard)
  @Get('/divergences')
  getDivergences() {
    return this.employeeService.findAllDivergences();
  }

  @UseGuards(AuthGuard)
  @Get('/recommendation')
  async getRecommendation(@Request() req) {
    const employees: Employee[] = await this.employeeService.reccomendation(
      req.user.username,
    );
    return employees.filter((item) => !item.lockTime);
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
