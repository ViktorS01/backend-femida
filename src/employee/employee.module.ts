import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../typeorm/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  exports: [TypeOrmModule],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
