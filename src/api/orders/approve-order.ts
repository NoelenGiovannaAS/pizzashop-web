import { api } from '@/lib/axios'

export interface approvedParams {
  orderId: string
}

export async function approved({ orderId }: approvedParams) {
  await api.patch(`/orders/${orderId}/cancel`)
}
