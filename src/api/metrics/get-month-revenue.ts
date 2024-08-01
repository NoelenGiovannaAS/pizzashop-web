import { api } from '@/lib/axios'

export interface IGetMonthRevenueOrdersAmountResponse {
  receipt: number
  diffFromLastMonth: number
}
export async function getMonthRevenueOrdersAmount() {
  const response = await api.get<IGetMonthRevenueOrdersAmountResponse>(
    '/metrics/month-receipt',
  )

  return response.data
}
