import { criterias } from 'src/constants/criterias';
import { monthNames } from 'src/constants/monthNames';

type HalfYearAssessmentListDTO = {
  month: string;
  customerOrientationCoefficient: number;
  delta?: 'up' | 'down';
  assessmentCount?: number;
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

export type {
  HalfYearAssessmentListDTO,
  Criteria,
  Month,
  MonthAssessment,
  CriteriasMonthDTO,
};
