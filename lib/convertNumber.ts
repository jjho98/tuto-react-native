export const convertNumber = (number: number) => {
  if (number >= 1000) {
    return Math.ceil(number / 1000) + "k+";
  }
  return number;
};
