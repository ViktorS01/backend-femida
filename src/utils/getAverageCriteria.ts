import { Importances } from '../constants/importances';
import { Assessment } from '../typeorm/entities/assessment.entity';
import { getCurrentCriteria } from './getCurrentCriteria';

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
