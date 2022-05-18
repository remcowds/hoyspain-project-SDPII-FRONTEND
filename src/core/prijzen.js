export const fixprijs = (prijs) => {
  return Math.round(
    (prijs + Number.EPSILON) * 100
  ) / 100;
}

export const prijs2Decimals = (prijs) => {
  return (Math.round(prijs * 100) / 100).toFixed(2);
}