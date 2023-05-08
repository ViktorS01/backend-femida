export class CreateAssessmentDto {
  readonly id?: number;
  readonly idFromEmployee: number;
  readonly idToEmployee: number;
  readonly comment: string;
  readonly speed: number;
  readonly information: number;
  readonly qualityWork: number;
  readonly resultWork: number;
  readonly teamWork: number;
  readonly respect: number;
  readonly createdAt?: Date;
}
