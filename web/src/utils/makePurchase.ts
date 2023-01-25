export const makePurchase = async (sessionId: string, consumerId: string) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_SERVER
    }/api/purchase/make?session_id=${sessionId}&consumer_id=${consumerId}`,
    {
      method: 'POST',
    }
  )

  if (!res.ok) return

  const data = await res.json()
  const products = data.session.data

  return products
}
