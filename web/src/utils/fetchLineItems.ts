export const fetchLineItems = async (sessionId: string, consumerId: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_SERVER}/api/getSession?session_id=${sessionId}&consumer_id=${consumerId}`
  )

  if (!res.ok) return

  const data = await res.json()
  const products = data.session.data

  return products
}
