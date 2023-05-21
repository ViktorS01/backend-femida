import { HttpException, HttpStatus } from '@nestjs/common';
import { getCurrentCriteria } from './getCurrentCriteria';
import {
  CriteriasMonthDTO,
  HalfYearAssessmentListDTO,
} from 'src/assessment/dto/types';
import { criterias } from 'src/constants/criterias';

export const getCriteriaCoefficient = (
  groupedAssessments: Partial<CriteriasMonthDTO>,
  criteria: number,
): HalfYearAssessmentListDTO[] => {
  if (criteria < 1 || criteria > 7) {
    throw new HttpException('Criteria not found.', HttpStatus.BAD_REQUEST);
  }

  const res: HalfYearAssessmentListDTO[] = [];

  if (criteria == 1) {
    for (const month in groupedAssessments) {
      let sum = 0;
      let assessmentCount = 0;

      for (const key in groupedAssessments[month]) {
        sum += getCurrentCriteria(groupedAssessments[month][key]);
        assessmentCount += groupedAssessments[month][key].length;
      }

      res.push({
        month,
        customerOrientationCoefficient: Number((sum / 6).toFixed(1)),
        assessmentCount,
      });
    }

    return res;
  }

  for (const month in groupedAssessments) {
    res.push({
      month,
      customerOrientationCoefficient: getCurrentCriteria(
        groupedAssessments[month][criterias[criteria - 2]],
      ),
      assessmentCount:
        groupedAssessments[month][criterias[criteria - 2]].length,
    });
  }

  return res;
};
