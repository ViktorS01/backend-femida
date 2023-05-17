// функция посчета средних для каждого критерия
const getCurrentCriteria = (currentCriteria: number[], importance = 5) => {
  let sum = 0;
  currentCriteria.forEach((item) => (sum += item));
  const goal = 5;
  const weight = importance / goal;
  const commonGoal = goal * currentCriteria.length;
  return (
    Number(
      (goal - ((commonGoal - sum) / currentCriteria.length) * weight).toFixed(
        1,
      ),
    ) || 0
  );
};

export { getCurrentCriteria };
