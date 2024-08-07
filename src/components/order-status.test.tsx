import { render } from '@testing-library/react'
import { OrderStatus, orderStatusMap } from './order-status'

describe('Order Status', () => {
  const status = [
    'canceled',
    'delivered',
    'delivering',
    'pending',
    'processing',
  ]

  it.each(status)(
    'should display the right text when status is %s',
    (orderStatus) => {
      const { getByText } = render(
        <OrderStatus status={orderStatus as OrderStatus} />,
      )
      expect(
        getByText(orderStatusMap[`${orderStatus as OrderStatus}`]),
      ).toBeInTheDocument()
    },
  )
})
