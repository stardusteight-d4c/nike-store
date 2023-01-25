export function stringPriceToNumber(price: string) {
  return parseFloat(String(price)).toFixed(2).toString().replace(",", ".");
}
