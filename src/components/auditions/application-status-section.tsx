'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"; // Import useToast
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, CheckCircle, XCircle } from 'lucide-react';

// Mock function to simulate checking status - replace with actual API call
async function checkApplicationStatus(email: string, code: string): Promise<{ status: string, message: string }> {
  console.log("Checking status for:", email, code);
  // Placeholder logic: Replace with actual API call
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
  if (email === "test@example.com" && code === "12345") {
    return { status: "approved", message: "¡Felicidades! Tu solicitud ha sido aprobada para la siguiente fase." };
  } else if (email === "test@example.com" && code === "67890") {
    return { status: "pending", message: "Tu solicitud está siendo revisada. Te notificaremos pronto." };
   } else if (email === "test@example.com") {
     return { status: "invalid_code", message: "El código de verificación no es válido." };
  } else {
    return { status: "not_found", message: "No se encontró ninguna solicitud con ese correo electrónico y código." };
  }
}

export function ApplicationStatusSection() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusResult, setStatusResult] = useState<{ status: string, message: string } | null>(null);
  const { toast } = useToast(); // Initialize useToast

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setStatusResult(null); // Clear previous results

    if (!email || !code) {
      toast({
        title: "Error",
        description: "Por favor, ingresa tu correo electrónico y código de verificación.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const result = await checkApplicationStatus(email, code);
      setStatusResult(result);
      // Optional: Show toast on success/failure as well
      // toast({
      //   title: "Estado Verificado",
      //   description: result.message,
      // });
    } catch (error) {
      console.error("Error checking status:", error);
      toast({
        title: "Error del Servidor",
        description: "No se pudo verificar el estado. Inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
       setStatusResult({ status: "error", message: "Error al conectar con el servidor." });
    } finally {
      setIsLoading(false);
    }
  };

  const getAlertVariant = (status: string): "default" | "destructive" | "success" | "info" => {
     switch (status) {
        case "approved": return "success";
        case "pending": return "info";
        case "invalid_code":
        case "not_found":
        case "error":
           return "destructive";
        default: return "default";
     }
   }

   const getAlertIcon = (status: string): React.ReactNode => {
     switch(status) {
       case "approved": return <CheckCircle className="h-4 w-4" />;
       case "pending": return <Info className="h-4 w-4" />;
       case "invalid_code":
       case "not_found":
       case "error":
       default: return <XCircle className="h-4 w-4" />;
     }
   }

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-primary">Verificar el estado de tu aplicación</CardTitle>
        <CardDescription className="text-muted-foreground">
          Ingresa tu correo electrónico y el código de verificación que te enviamos para revisar el estado de tu solicitud.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="status-email">Correo Electrónico</Label>
            <Input
              id="status-email"
              type="email"
              placeholder="tu@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="verification-code">Código de Verificación</Label>
            <Input
              id="verification-code"
              type="text"
              placeholder="Ingresa tu código"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
            {isLoading ? 'Verificando...' : 'VERIFICAR ESTADO'}
          </Button>
        </form>
      </CardContent>
      {statusResult && (
         <CardFooter>
            <Alert variant={getAlertVariant(statusResult.status) === 'success' ? 'default' : getAlertVariant(statusResult.status)}
             className={
               statusResult.status === 'approved' ? 'border-green-500 text-green-700 dark:border-green-600 dark:text-green-300 [&>svg]:text-green-500 dark:[&>svg]:text-green-400'
               : statusResult.status === 'pending' ? 'border-blue-500 text-blue-700 dark:border-blue-600 dark:text-blue-300 [&>svg]:text-blue-500 dark:[&>svg]:text-blue-400'
               : 'border-destructive text-destructive dark:border-destructive [&>svg]:text-destructive' // Default destructive
              }
            >
               {getAlertIcon(statusResult.status)}
              <AlertTitle className="font-semibold">
                {statusResult.status === 'approved' ? '¡Aprobado!' :
                 statusResult.status === 'pending' ? 'Pendiente' :
                 statusResult.status === 'invalid_code' ? 'Código Inválido' :
                 statusResult.status === 'not_found' ? 'No Encontrado' :
                 'Resultado'}
              </AlertTitle>
              <AlertDescription>{statusResult.message}</AlertDescription>
            </Alert>
         </CardFooter>
       )}
    </Card>
  );
}

// Add custom variants to Alert if needed, or use className as above
declare module "@/components/ui/alert" {
  interface AlertProps {
    variant?: "default" | "destructive" | "success" | "info";
  }
}
