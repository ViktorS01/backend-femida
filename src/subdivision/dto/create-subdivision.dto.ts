import { Assessment } from '../../typeorm/entities/assessment.entity';

export class CreateSubdivisionDto {
  readonly id?: number;
  readonly name: string;
  readonly subdivision?: {
    name: string;
    id: number;
  };
  readonly assessment?: Assessment[];
  readonly assessmentsCount: number;
  readonly subdivisionCurrentAssessment: number;
  readonly delta: string;
}
