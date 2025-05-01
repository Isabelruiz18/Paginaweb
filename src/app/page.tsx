import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] rounded-lg overflow-hidden shadow-lg">
        <Image
          src="https://picsum.photos/1600/900"
          alt="Novae artists performing"
          layout="fill"
          objectFit="cover"
          priority
          data-ai-hint="performance stage concert"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-8 md:p-12">
          <div className="text-background max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">Únete a NOVAE</h1>
            <p className="text-lg md:text-xl mb-6 drop-shadow-sm">
              Buscamos el talento del mañana. ¿Tienes lo que se necesita para brillar?
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/auditions?section=ongoing">APLICAR AHORA</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="text-center">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-primary">Bienvenido a NOVAE AUDITION</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground">
              Novae Entertainment abre sus puertas a la próxima generación de estrellas.
              Si sueñas con el escenario, la música y conectar con el mundo a través de tu arte,
              este es tu momento. Explora nuestras audiciones y da el primer paso hacia tu futuro.
            </p>
          </CardContent>
        </Card>
      </section>

    </div>
  );
}
