const player = (name, ai, symbol) => {
  const getName = () => name;
  const isAi = () => ai;
  const getSymbol = () => symbol;

  return { getName, isAi, getSymbol };
};

export { player };
