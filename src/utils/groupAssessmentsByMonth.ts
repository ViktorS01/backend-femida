import { Assessment } from 'src/typeorm/entities/assessment.entity';

type MonthAssessment = {
  speed: number[];
  information: number[];
  qualityWork: number[];
  resultWork: number[];
  teamWork: number[];
  respect: number[];
};

//TODO: добавить че возвращает
export const groupAssessmentsByMonth = (assessments: Assessment[]) => {
  const createMonthAssessment = (): MonthAssessment => {
    return {
      speed: [],
      information: [],
      qualityWork: [],
      resultWork: [],
      teamWork: [],
      respect: [],
    };
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const halfYearAssessments = {};

  assessments.forEach((assessment) => {
    const property = `${monthNames[new Date(assessment.createdAt).getMonth()]}`;
    if (!halfYearAssessments[property]) {
      halfYearAssessments[property] = createMonthAssessment();
    }

    //TODO: это полная *&^%$#@!. переделать
    halfYearAssessments[property].speed.push(assessment.speed);
    halfYearAssessments[property].information.push(assessment.information);
    halfYearAssessments[property].qualityWork.push(assessment.qualityWork);
    halfYearAssessments[property].resultWork.push(assessment.resultWork);
    halfYearAssessments[property].teamWork.push(assessment.teamWork);
    halfYearAssessments[property].respect.push(assessment.respect);
  });
  return halfYearAssessments;
};
