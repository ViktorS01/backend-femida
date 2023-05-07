export const getAverageCriteria = (assessmentDto: number[]): number => {
  // функция посчета средних для каждого критерия
  let sum = 0;
  assessmentDto.forEach((item) => (sum += item));
  return Math.round(sum / assessmentDto.length);
};
