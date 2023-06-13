const getSquareDiviation = (rates: number[]) => {
  const averageRate =
    rates.reduce((prev, current) => prev + current, 0) / rates.length;

  const squareRates = rates.map((value) => (value - averageRate) ** 2);
  const variance =
    squareRates.reduce((prev, current) => prev + current, 0) / rates.length;
  return Math.sqrt(variance);
};

export { getSquareDiviation };
