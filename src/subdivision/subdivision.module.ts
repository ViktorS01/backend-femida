import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subdivision } from '../typeorm/entities/subdivision.entity';
import { SubdivisionService } from './subdivision.service';
import { SubdivisionController } from './subdivision.controller';
import { Assessment } from '../typeorm/entities/assessment.entity';
import { AssessmentService } from '../assessment/assessment.service';
import { AssessmentController } from '../assessment/assessment.controller';
import { Employee } from '../typeorm/entities/employee.entity';
import { EmployeeService } from '../employee/employee.service';
import { EmployeeController } from '../employee/employee.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subdivision, Assessment, Employee])],
  exports: [TypeOrmModule],
  providers: [SubdivisionService, AssessmentService, EmployeeService],
  controllers: [
    SubdivisionController,
    AssessmentController,
    EmployeeController,
  ],
})
export class SubdivisionModule {}
