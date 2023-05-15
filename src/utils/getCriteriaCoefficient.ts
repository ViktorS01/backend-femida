import { HttpException, HttpStatus } from '@nestjs/common';
import { getCurrentCriteria } from './getCurrentCriteria';

export const getCriteriaCoefficient = (
  groupedAssessments, // TODO: типизировать
  criteria: number,
): HalfYearAssessmentListDTO[] => {
  if (criteria < 1 || criteria > 7) {
    throw new HttpException('Criteria not found.', HttpStatus.BAD_REQUEST);
  }

  const criterias = [
    '',
    'OCP',
    'speed',
    'information',
    'qualityWork',
    'resultWork',
    'teamWork',
    'respect',
  ];
  const res: HalfYearAssessmentListDTO[] = [];

  if (criteria === 1) {
    for (const month in groupedAssessments) {
      let sum = 0;
      for (const key in groupedAssessments[month]) {
        sum += getCurrentCriteria(groupedAssessments[month][key]);
      }
      res.push({
        month,
        customerOrientationCoefficient: Number((sum / 6).toFixed(1)),
      });
    }

    return res;
  }

  for (const month in groupedAssessments) {
    res.push({
      month,
      customerOrientationCoefficient: getCurrentCriteria(
        groupedAssessments[month][criterias[criteria]],
      ),
    });
  }

  return res;
};
