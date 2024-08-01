import { api } from '@/lib/axios'

export type IGetPopularProducsResponse = {
  product: string
  amount: number
}[]

export async function getPopularProducs() {
  const response = await api.get<IGetPopularProducsResponse>(
    '/metrics/popular-products',
  )

  return response.data
}
