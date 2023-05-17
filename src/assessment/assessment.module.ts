import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssessmentService } from './assessment.service';
import { AssessmentController } from './assessment.controller';
import { Assessment } from '../typeorm/entities/assessment.entity';
import { UsersService } from '../users/users.service';
import { Employee } from '../typeorm/entities/employee.entity';
import { EmployeeService } from '../employee/employee.service';
import { EmployeeController } from '../employee/employee.controller';
import { Subdivision } from '../typeorm/entities/subdivision.entity';
import { SubdivisionService } from '../subdivision/subdivision.service';
import { SubdivisionController } from '../subdivision/subdivision.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Assessment, Employee, Subdivision])],
  exports: [TypeOrmModule],
  providers: [
    AssessmentService,
    UsersService,
    EmployeeService,
    SubdivisionService,
  ],
  controllers: [
    AssessmentController,
    EmployeeController,
    SubdivisionController,
  ],
})
export class AssessmentModule {}
