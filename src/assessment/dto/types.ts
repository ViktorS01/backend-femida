import { criterias } from 'src/constants/criterias';
import { monthNames } from 'src/constants/monthNames';
import { Assessment } from 'src/typeorm/entities/assessment.entity';

type HalfYearAssessmentListDTO = {
  month: string;
  customerOrientationCoefficient: number;
  delta?: Delta;
  assessmentCount: number;
};

type Criteria = (typeof criterias)[number];

type Month = (typeof monthNames)[number];

type MonthAssessment = {
  speed: number[];
  information: number[];
  qualityWork: number[];
  resultWork: number[];
  teamWork: number[];
  respect: number[];
};

type CriteriasMonthDTO = Record<Month, MonthAssessment>;

type Entity = 'subdivision' | 'employee';

type Comment = Assessment & {
  subdivisionName: string;
  currentAssessment: number;
};

type Delta = 'up' | 'down';

type AssessmentsFromSubdivision = {
  name: string;
  value: number;
};

export type {
  HalfYearAssessmentListDTO,
  Criteria,
  Month,
  MonthAssessment,
  CriteriasMonthDTO,
  AssessmentsFromSubdivision,
  Entity,
  Comment,
};
