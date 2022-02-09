const rangeIncl = (from, to) =>
  Array.from(new Array(to))
  .map((_, index) => index + from)

const getRandomInt = (from, to) =>
  Math.floor(Math.random() * to) + from;

export const lottery = (max, rounds) => {
  const lotteryNums = [];
  let remainedNumbers = rangeIncl(1, max);

  rangeIncl(1, rounds).forEach(_ => {
    const nextIndex = getRandomInt(0, remainedNumbers.length - 1);
    const nextNumber = remainedNumbers[nextIndex];
    lotteryNums.push(nextNumber);
    remainedNumbers.splice(nextIndex, 1);
  });
  return lotteryNums;
}
