import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// Mock news data - replace with actual data fetching
const newsItems = [
  {
    id: 1,
    title: "¡Se abren las Audiciones Globales 2025!",
    date: "2024-07-15",
    excerpt: "Novae Entertainment inicia su búsqueda anual de talento a nivel mundial. ¡Prepara tu aplicación ahora!",
    image: "https://picsum.photos/400/250?random=1",
    slug: "/auditions/audition-2025", // Link to the relevant audition
    imageHint: "global map spotlight",
  },
  {
    id: 2,
    title: "Consejos de nuestros Directores de Casting",
    date: "2024-07-10",
    excerpt: "Descubre qué busca el equipo de Novae en los aspirantes. Consejos clave para destacar en tu audición.",
    image: "https://picsum.photos/400/250?random=2",
    slug: "/news/casting-tips", // Link to a potential full article
     imageHint: "meeting discussion notes",
  },
   {
    id: 3,
    title: "Historias de Éxito: De Aspirante a Estrella Novae",
    date: "2024-07-05",
    excerpt: "Inspírate con las historias de artistas que comenzaron su viaje a través de las audiciones de Novae.",
    image: "https://picsum.photos/400/250?random=3",
    slug: "/news/success-stories",
    imageHint: "artist stage microphone",
  },
];


export default function NewsPage() {
   const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center text-primary">Noticias de Audiciones</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((item) => (
          <Card key={item.id} className="overflow-hidden flex flex-col">
             <div className="relative h-48 w-full">
                 <Image
                  src={item.image}
                  alt={item.title}
                   layout="fill"
                  objectFit="cover"
                  data-ai-hint={item.imageHint}
                />
             </div>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary hover:text-accent">
                 <Link href={item.slug}>{item.title}</Link>
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">{formatDate(item.date)}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-foreground">{item.excerpt}</p>
            </CardContent>
             <div className="p-4 pt-0">
                <Button asChild variant="link" className="text-accent p-0 h-auto">
                   <Link href={item.slug}>Leer más &rarr;</Link>
                 </Button>
             </div>
          </Card>
        ))}
      </div>
       {/* Placeholder for pagination if needed */}
        <div className="text-center mt-8">
          <Button variant="outline">Cargar más noticias</Button>
       </div>
    </div>
  );
}
