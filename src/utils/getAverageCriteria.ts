import { Importances } from '../constants/importances';
import { Assessment } from '../typeorm/entities/assessment.entity';

type AverageCriteriaDTO = {
  averageRespect: number;
  averageResultWork: number;
  averageQualityWork: number;
  averageTeamWork: number;
  averageInformation: number;
  averageSpeed: number;
};

const getAverageCriteria = (
  assessmentDto: Assessment[],
): AverageCriteriaDTO => {
  // функция посчета средних для каждого критерия
  const getCurrentCriteria = (currentCriteria: number[], importance = 5) => {
    let sum = 0;
    currentCriteria.forEach((item) => (sum += item));
    const goal = 5;
    const weight = importance / goal;
    const commonGoal = goal * currentCriteria.length;
    return Number(
      (goal - ((commonGoal - sum) / currentCriteria.length) * weight).toFixed(
        1,
      ),
    );
  };

  return {
    averageRespect: getCurrentCriteria(
      assessmentDto.map((item) => item.respect),
      Importances.respect,
    ),
    averageResultWork: getCurrentCriteria(
      assessmentDto.map((item) => item.resultWork),
      Importances.resultWork,
    ),
    averageQualityWork: getCurrentCriteria(
      assessmentDto.map((item) => item.qualityWork),
      Importances.qualityWork,
    ),
    averageTeamWork: getCurrentCriteria(
      assessmentDto.map((item) => item.teamWork),
      Importances.teamWork,
    ),
    averageInformation: getCurrentCriteria(
      assessmentDto.map((item) => item.information),
      Importances.information,
    ),
    averageSpeed: getCurrentCriteria(
      assessmentDto.map((item) => item.speed),
      Importances.speed,
    ),
  };
};

export { getAverageCriteria };
