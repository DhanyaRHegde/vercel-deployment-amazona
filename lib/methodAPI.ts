export const addProduct = async (product: any) => {
  const res = await fetch(`/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
  if (!res.ok) {
    throw new Error('error adding product')
  }
  return res.json()
}
