import { AssessmentCriteria } from '../../typeorm/entities/assessmentCriteria.entity';

export class CreateAssessmentDto {
  readonly id?: number;
  readonly idEmployee: number;
  readonly speed: AssessmentCriteria;
  readonly information: AssessmentCriteria;
  readonly qualityWork: AssessmentCriteria;
  readonly resultWork: AssessmentCriteria;
  readonly teamWork: AssessmentCriteria;
  readonly respect: AssessmentCriteria;
}
