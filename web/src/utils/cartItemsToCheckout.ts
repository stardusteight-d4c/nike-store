export const cartItemsToCheckout = (cartItems: any) => {
  const newItem = cartItems.map((item: any) => {
    return {
      id: item.id,
      quantity: item.cartQuantity,
    }
  })
  return newItem
}
