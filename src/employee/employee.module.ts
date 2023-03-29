import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../typeorm/entities/employee.entity';
import { SubdivisionService } from '../subdivision/subdivision.service';
import { Subdivision } from '../typeorm/entities/subdivision.entity';
import { SubdivisionController } from '../subdivision/subdivision.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Subdivision])],
  exports: [TypeOrmModule],
  providers: [EmployeeService, SubdivisionService],
  controllers: [EmployeeController, SubdivisionController],
})
export class EmployeeModule {}
