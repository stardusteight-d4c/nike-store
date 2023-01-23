export function stringPriceToNumber(price: string) {
  return Number(price.replace(',', '.'))
}
