import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, User, CalendarDays, Clock, ListChecks, Globe, Users, Ban } from 'lucide-react'; // Icons

// Mock function to get audition details - replace with actual data fetching
async function getAuditionDetails(slug: string) {
  console.log("Fetching details for slug:", slug);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 50));
  if (slug === 'audition-2025') {
    return {
      title: "CONVOCATORIA DE AUDICIONES 2025",
      categories: ['Vocal', 'Rap', 'Baile'],
      gender: 'Todos',
      ageRange: '16 - 25 años',
      applicationPeriod: 'Mensual',
      maxApplications: 'Una por período',
      startDate: '2024-08-01',
      endDate: '2024-12-31',
      description: 'Novae busca talento excepcional en canto, rap y baile para formar parte de nuestros próximos proyectos globales. ¡Muestra tu potencial!',
      requirements: [
        'Pasión por la música y el performance.',
        'Disponibilidad para entrenamiento intensivo.',
        'Sin contratos exclusivos vigentes con otras agencias.',
      ],
      howToApply: 'Completa el formulario en línea después de verificar tu correo electrónico.',
      slug: slug,
    };
  }
  return null; // Handle not found case
}

// Helper to format date ranges
const formatDateRange = (start: string, end: string) => {
  const startDate = new Date(start).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  const endDate = new Date(end).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  return `${startDate} - ${endDate}`;
};


export default async function AuditionDetailPage({ params }: { params: { slug: string } }) {
  const audition = await getAuditionDetails(params.slug);

  if (!audition) {
    return (
       <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-destructive mb-4">Audición No Encontrada</h1>
        <p className="text-muted-foreground mb-6">La audición que buscas no existe o ha finalizado.</p>
        <Button asChild variant="outline">
           <Link href="/auditions">Volver a Audiciones</Link>
         </Button>
       </div>
    );
  }

  return (
    <div className="space-y-8">
       {/* Back Button */}
       <Button asChild variant="outline" size="sm" className="mb-6">
           <Link href="/auditions?section=ongoing">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
             Volver a Audiciones en Curso
           </Link>
       </Button>

      <Card className="border-primary border shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">{audition.title}</CardTitle>
          <CardDescription className="text-muted-foreground pt-2">
            {audition.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Key Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoItem icon={ListChecks} label="Categorías" value={audition.categories.join(', ')} />
            <InfoItem icon={Users} label="Género" value={audition.gender} />
            <InfoItem icon={User} label="Rango de Edad" value={audition.ageRange} />
            <InfoItem icon={CalendarDays} label="Período Aplicación" value={formatDateRange(audition.startDate, audition.endDate)} />
            <InfoItem icon={Clock} label="Frecuencia" value={audition.applicationPeriod} />
            <InfoItem icon={Ban} label="# Aplicaciones Máx." value={audition.maxApplications} />
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-xl font-semibold mb-2 text-primary flex items-center gap-2"><CheckCircle className="text-accent"/>Requisitos</h3>
            <ul className="list-disc list-inside space-y-1 text-foreground pl-2">
              {audition.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

           {/* How to Apply */}
           <div>
            <h3 className="text-xl font-semibold mb-2 text-primary flex items-center gap-2"><Globe className="text-accent"/>Cómo Aplicar</h3>
            <p className="text-foreground">{audition.howToApply}</p>
          </div>


          <div className="text-center pt-6">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href={`/apply/${audition.slug}/verify-email`}>APLICAR AHORA</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper component for displaying info items
interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string | React.ReactNode;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start space-x-3 p-3 bg-secondary/30 rounded-md">
       <Icon className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
       <div>
         <p className="text-sm font-medium text-muted-foreground">{label}</p>
         <p className="text-base font-semibold text-foreground">{value}</p>
       </div>
     </div>
  );
}
