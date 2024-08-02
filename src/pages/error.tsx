import { Link, useRouteError } from 'react-router-dom'

export function ErrorPage() {
  const error = useRouteError() as Error

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Oooops, algo aconteceu!</h1>
      <p className="text-aceent-foreground">
        Um erro ocorreu. Entre em contato com o suporte
      </p>
      {/* <pre>{error?.message || JSON.stringify(error)}</pre> */}

      <p className="text-aceent-foreground">
        Voltar para o{' '}
        <Link to="/" className="text-yellow-500 dark:text-yellow-600">
          Dashboard
        </Link>
      </p>
    </div>
  )
}
