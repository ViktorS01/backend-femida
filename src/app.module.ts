import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './typeorm/entities/employee.entity';
import { SubdivisionModule } from './subdivision/subdivision.module';
import { Subdivision } from './typeorm/entities/subdivision.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Assessment } from './typeorm/entities/assessment.entity';
import { AssessmentCriteriaModule } from './assessmentCriteria/assessmentCriteria.module';
import { AssessmentModule } from './assessment/assessment.module';
import { AssessmentCriteria } from './typeorm/entities/assessmentCriteria.entity';

@Module({
  imports: [
    EmployeeModule,
    SubdivisionModule,
    AuthModule,
    UsersModule,
    AssessmentModule,
    AssessmentCriteriaModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'femida_database',
      entities: [Employee, Subdivision, Assessment, AssessmentCriteria],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}