export function stringPriceToNumber(price: string) {
  console.log('stringPriceToNumber price', price);
  
  return Number(price.replace(',', '.'))
}
