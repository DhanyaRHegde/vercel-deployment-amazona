// lib/utils.ts
export const paginate = <T>(
  array: T[],
  page_size: number,
  page_number: number
): T[] => {
  return array.slice((page_number - 1) * page_size, page_number * page_size)
}

export const round2 = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100

export function convertDocToObj(doc: any) {
  doc._id = doc._id.toString()
  return doc
}

export const formatNumber = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const formatId = (x: string) => {
  return `..${x.substring(20, 24)}`
}

export const itemsPerPage = 20
