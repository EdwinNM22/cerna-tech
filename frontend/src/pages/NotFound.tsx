import { Link } from 'react-router-dom'
import { PageContainer } from '@/components/PageContainer'
import { Button } from '@/components/ui/button'
import { DotPattern } from '@/components/ui/dot-pattern'
import { cn } from '@/lib/utils'

export function NotFound() {
  return (
    <PageContainer className="relative flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <DotPattern
        className={cn(
          'mask-[radial-gradient(320px_circle_at_center,white,transparent)] opacity-40',
        )}
      />
      <p className="font-mono text-[0.65rem] tracking-[0.28em] text-primary uppercase md:text-xs">
        Error 404
      </p>
      <h1 className="mt-4 text-6xl font-semibold tracking-tight text-foreground md:text-8xl">
        404
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        Esta ruta no existe o se movió. Vuelve al inicio o cuéntanos qué buscabas.
      </p>
      <div className="relative z-10 mt-10 flex flex-wrap justify-center gap-3">
        <Button
          nativeButton={false}
          render={<Link to="/" />}
          size="lg"
          className="h-11 rounded-xl px-8"
        >
          Ir al inicio
        </Button>
        <Button
          nativeButton={false}
          render={<Link to="/contacto" />}
          variant="outline"
          size="lg"
          className="h-11 rounded-xl px-8"
        >
          Contacto
        </Button>
      </div>
    </PageContainer>
  )
}
