export const getAverageCriteria = (assessmentDto: number[]): number => {
  // функция посчета средних для каждого критерия
  let sum = 0;
  assessmentDto.forEach((item) => (sum += item));
  return Number((sum / assessmentDto.length).toFixed(1));
};
