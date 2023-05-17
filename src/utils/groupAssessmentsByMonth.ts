import { CriteriasMonthDTO } from 'src/assessment/dto/types';
import { criterias } from 'src/constants/criterias';
import { monthNames } from 'src/constants/monthNames';
import { Assessment } from 'src/typeorm/entities/assessment.entity';

//TODO: добавить че возвращает
export const groupAssessmentsByMonth = (halfYearAssessments: Assessment[]) => {
  const createHalfYearCriterias = (): Partial<CriteriasMonthDTO> => {
    const date = new Date();
    const halfYearCriterias: Partial<CriteriasMonthDTO> = {};

    for (let i = 0; i < 6; i++) {
      const currentMonth = date.getMonth();

      halfYearCriterias[monthNames[currentMonth]] = {
        speed: [],
        information: [],
        qualityWork: [],
        resultWork: [],
        teamWork: [],
        respect: [],
      };

      date.setMonth(currentMonth - 1, 1);
    }
    return halfYearCriterias;
  };

  const halfYearCriterias: Partial<CriteriasMonthDTO> =
    createHalfYearCriterias();

  halfYearAssessments.forEach((assessment) => {
    const property = `${monthNames[new Date(assessment.createdAt).getMonth()]}`;

    criterias.forEach((value) => {
      halfYearCriterias[property][value].push(assessment[value]);
    });
  });
  return halfYearCriterias;
};
