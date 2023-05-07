import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assessment } from '../typeorm/entities/assessment.entity';
import { AssessmentCriteriaService } from './assessmentCriteria.service';
import { AssessmentCriteriaController } from './assessmentCriteria.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Assessment])],
  exports: [TypeOrmModule],
  providers: [AssessmentCriteriaService],
  controllers: [AssessmentCriteriaController],
})
export class AssessmentCriteriaModule {}
