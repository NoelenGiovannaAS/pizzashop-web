import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Helmet } from 'react-helmet-async'
import { OrderTableFilters } from './order-table-filters'
import { OrderTableRow } from './order-table-row'
import { useQuery } from 'react-query'
import { getOrders } from '@/api/get-orders'



export function Orders() {
  const {data: result} = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  })

  return (
    <>
      <Helmet title="Pedidos" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="rouded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[140px]">Total do pedido</TableHead>
                  <TableHead className="w-[164px]">Total do pedido</TableHead>
                  <TableHead className="w-[132px]">Total do pedido</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {result?.data.orders && result.data.orders.map(order => {
                  return <OrderTableRow key={order.orderId} order={order}/>
                })}
              </TableBody>
            </Table>
          </div>

          <Pagination pageIndex={0} perPage={0} totalCount={0} />
        </div>
      </div>
    </>
  )
}
