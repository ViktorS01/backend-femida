import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssessmentService } from './assessment.service';
import { AssessmentController } from './assessment.controller';
import { Assessment } from '../typeorm/entities/assessment.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Assessment])],
  exports: [TypeOrmModule],
  providers: [AssessmentService, UsersService],
  controllers: [AssessmentController],
})
export class AssessmentModule {}
