import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, Clapperboard, MicVocal, Drama } from 'lucide-react'; // Example icons

const auditionCategories = [
  { value: 'vocal', label: 'Vocal', icon: MicVocal },
  { value: 'rap', label: 'Rap', icon: Music },
  { value: 'dance', label: 'Baile', icon: Clapperboard },
  { value: 'acting', label: 'Actuación', icon: Drama },
];

export function OngoingAuditionSection() {
  // TODO: Fetch current audition details from backend/API
  const currentAudition = {
    title: "CONVOCATORIA DE AUDICIONES 2025",
    startDate: "2024-08-01",
    endDate: "2024-12-31",
    slug: "audition-2025", // Example slug for linking
    categories: ['vocal', 'rap', 'dance'] // Example categories for this audition
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <Card className="border-accent border-2 shadow-lg">
      <CardHeader>
        <Link href={`/auditions/${currentAudition.slug}`} className="hover:underline">
           <CardTitle className="text-2xl font-bold text-accent cursor-pointer">
            {currentAudition.title}
          </CardTitle>
        </Link>
        <CardDescription className="text-muted-foreground">
          Inicio: {formatDate(currentAudition.startDate)} - Cierre: {formatDate(currentAudition.endDate)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-foreground">Categorías disponibles para esta convocatoria:</p>
        <Tabs defaultValue={currentAudition.categories[0]} className="w-full">
           <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 gap-2 mb-4">
            {auditionCategories
              .filter(cat => currentAudition.categories.includes(cat.value))
              .map((category) => (
              <TabsTrigger key={category.value} value={category.value} className="flex items-center gap-2">
                <category.icon className="h-4 w-4 text-accent" /> {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
           {auditionCategories
            .filter(cat => currentAudition.categories.includes(cat.value))
            .map((category) => (
            <TabsContent key={category.value} value={category.value}>
              <Card className="bg-secondary/50">
                <CardContent className="pt-6">
                  <p className="text-sm text-secondary-foreground">
                    {`Información específica sobre la audición de ${category.label}. Prepara tu mejor material.`}
                  </p>
                   <Button asChild className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Link href={`/auditions/${currentAudition.slug}`}>Ver Detalles y Aplicar</Link>
                    </Button>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
