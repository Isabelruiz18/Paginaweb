'use client'; // Form needs client-side interaction

import { useSearchParams } from 'next/navigation';
import { ApplicationForm } from '@/components/apply/application-form';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ApplicationFormPage({ params }: { params: { slug: string } }) {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const auditionSlug = params.slug;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading or data fetching if needed
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
     return <LoadingSkeleton />;
   }

  if (!email) {
    // Handle cases where email is missing (e.g., direct access without verification)
    // Optionally redirect back to verification or show an error
    return (
      <Card className="max-w-lg mx-auto my-10">
        <CardHeader>
          <CardTitle className="text-destructive">Error: Verificación Requerida</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            No se encontró un correo electrónico verificado. Por favor, completa el proceso de
            verificación de correo electrónico antes de acceder al formulario.
          </p>
           {/* Optional: Add a button to go back */}
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">Formulario de Solicitud de Audición</h1>
      {/* Pass the verified email and slug to the form component */}
      <ApplicationForm auditionSlug={auditionSlug} verifiedEmail={email} />
    </div>
  );
}


function LoadingSkeleton() {
  return (
    <div className="space-y-8">
       <Skeleton className="h-8 w-1/2 mx-auto" />
       <Card className="p-6 space-y-6">
          <Skeleton className="h-6 w-1/4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
             <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-20 w-full" />
           <div className="flex justify-end gap-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
       </Card>
     </div>
   );
 }
