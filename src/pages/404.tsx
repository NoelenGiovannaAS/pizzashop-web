import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Página não encontrada</h1>
      <p className="text-aceent-foreground">
        Voltar para o{' '}
        <Link to="/" className="text-yellow-500 dark:text-yellow-600">
          Dashboard
        </Link>
      </p>
    </div>
  )
}
