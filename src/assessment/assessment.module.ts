import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssessmentService } from './assessment.service';
import { AssessmentController } from './assessment.controller';
import { Assessment } from '../typeorm/entities/assessment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assessment])],
  exports: [TypeOrmModule],
  providers: [AssessmentService],
  controllers: [AssessmentController],
})
export class AssessmentModule {}
