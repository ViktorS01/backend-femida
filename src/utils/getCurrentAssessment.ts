import { Assessment } from '../typeorm/entities/assessment.entity';

export const getCurrentAssessment = (assessmentDto: Assessment[]): number => {
  // функция посчета средних
  const res: number[] = assessmentDto.map((item) => {
    return (
      (item.speed +
        item.respect +
        item.information +
        item.teamWork +
        item.resultWork +
        item.qualityWork) /
      6
    );
  });
  let sum = 0;
  res.forEach((item) => (sum += item));
  return Number((sum / res.length).toFixed(1));
};
