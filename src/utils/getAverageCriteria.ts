export const getAverageCriteria = (
  assessmentDto: number[],
  importance = 5,
): number => {
  // функция посчета средних для каждого критерия
  let sum = 0;
  assessmentDto.forEach((item) => (sum += item));
  const goal = 5;
  const weight = importance / goal;
  const commonGoal = goal * assessmentDto.length;
  return goal - ((commonGoal - sum) / assessmentDto.length) * weight;
};
