import { getMonthOrdersAmount } from '@/api/metrics/get-month-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Utensils } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthOrdersAmountCard() {
  const { data: monthOrdersAmount } = useQuery({
    queryFn: getMonthOrdersAmount,
    queryKey: ['metrics', 'month-orders-amount'],
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidor (mês)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthOrdersAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthOrdersAmount.amount}
            </span>
            {monthOrdersAmount.diffFromLastMonth >= 0 ? (
              <>
                <p className="foreground text-xs text-muted">
                  <span className="text-emerald-500 dark:text-emerald-400">
                    +{monthOrdersAmount.diffFromLastMonth}% em relação ao mês
                    passado
                  </span>
                </p>
              </>
            ) : (
              <>
                <p className="foreground text-xs text-muted">
                  <span className="text-rose-500 dark:text-rose-400">
                    {monthOrdersAmount.diffFromLastMonth}% em relação ao mês
                    passado
                  </span>
                </p>
              </>
            )}
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
