import { CriteriasMonthDTO, Month } from 'src/assessment/dto/types';
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

    //TODO: это полная *&^%$#@!. переделать
    halfYearCriterias[property].speed.push(assessment.speed);
    halfYearCriterias[property].information.push(assessment.information);
    halfYearCriterias[property].qualityWork.push(assessment.qualityWork);
    halfYearCriterias[property].resultWork.push(assessment.resultWork);
    halfYearCriterias[property].teamWork.push(assessment.teamWork);
    halfYearCriterias[property].respect.push(assessment.respect);
  });
  return halfYearCriterias;
};
