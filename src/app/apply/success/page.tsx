'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ApplicationSuccessPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [displayEmail, setDisplayEmail] = useState<string | null>(null);

  useEffect(() => {
    // Ensure email is accessed only on the client-side after hydration
    setDisplayEmail(email);
  }, [email]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-lg w-full text-center shadow-lg border-green-500">
        <CardHeader>
          <div className="mx-auto bg-green-100 rounded-full p-3 w-fit mb-4">
             <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-700">¡Solicitud Enviada con Éxito!</CardTitle>
          <CardDescription className="text-muted-foreground pt-2">
            Gracias por aplicar a Novae Audition. Hemos recibido tu solicitud.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {displayEmail && (
            <p className="text-sm text-foreground">
              Hemos enviado una confirmación a tu correo electrónico: <strong>{displayEmail}</strong>.
               Por favor, revisa tu bandeja de entrada (y la carpeta de spam).
            </p>
          )}
           <p className="text-sm text-foreground">
             Puedes verificar el estado de tu aplicación en la sección "Estado de mi Solicitud" utilizando tu correo y el código de verificación que te enviamos previamente.
           </p>
          <div className="flex justify-center gap-4 pt-4">
             <Button asChild variant="outline">
               <Link href="/auditions?section=status">Verificar Estado</Link>
             </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/">Volver al Inicio</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
