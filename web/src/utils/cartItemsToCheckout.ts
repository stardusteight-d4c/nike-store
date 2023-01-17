export const cartItemsToCheckout = (cartItems: any) => {
  const newItem = cartItems.map((item: any) => {
    return {
      id: item.id,
      qty: item.cartQuantity,
    }
  })
  return newItem
}
