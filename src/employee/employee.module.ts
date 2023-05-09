import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../typeorm/entities/employee.entity';
import { SubdivisionService } from '../subdivision/subdivision.service';
import { Subdivision } from '../typeorm/entities/subdivision.entity';
import { SubdivisionController } from '../subdivision/subdivision.controller';
import { Assessment } from '../typeorm/entities/assessment.entity';
import { AssessmentService } from '../assessment/assessment.service';
import { AssessmentController } from '../assessment/assessment.controller';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Subdivision, Assessment])],
  exports: [TypeOrmModule],
  providers: [
    EmployeeService,
    SubdivisionService,
    AssessmentService,
    UsersService,
  ],
  controllers: [
    EmployeeController,
    SubdivisionController,
    AssessmentController,
  ],
})
export class EmployeeModule {}
