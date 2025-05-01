'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Mail, Key, CheckCircle, XCircle } from 'lucide-react';
import { sendVerificationCode, checkVerificationCode } from '@/services/email-verification'; // Import service functions

interface EmailVerificationFormProps {
  auditionSlug: string;
}

export function EmailVerificationForm({ auditionSlug }: EmailVerificationFormProps) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const handleSendCode = async () => {
    if (!email) {
      toast({ title: "Error", description: "Por favor, ingresa tu correo electrónico.", variant: "destructive" });
      return;
    }
    setIsSendingCode(true);
    setVerificationError(null);
    try {
      // Replace with actual API call using sendVerificationCode
      // const response = await sendVerificationCode({ email });
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      console.log("Sending code to:", email);
      // Assuming the API call is successful:
      setIsCodeSent(true);
      toast({ title: "Código Enviado", description: `Se ha enviado un código de verificación a ${email}.` });
    } catch (error) {
      console.error("Error sending code:", error);
      toast({ title: "Error al Enviar Código", description: "No se pudo enviar el código. Inténtalo de nuevo.", variant: "destructive" });
      setVerificationError("Error al enviar el código.");
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code) {
      toast({ title: "Error", description: "Por favor, ingresa el código de verificación.", variant: "destructive" });
      return;
    }
    setIsVerifying(true);
    setVerificationError(null);
    try {
      // Replace with actual API call using checkVerificationCode
      // const response = await checkVerificationCode({ email, code });
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      const isValid = code === '12345'; // Example validation logic
      console.log("Verifying code:", code, "for email:", email);

      if (isValid) {
        toast({ title: "Verificación Exitosa", description: "Correo electrónico verificado correctamente.", className: "bg-green-100 border-green-500 text-green-700" });
        // Redirect to the application form page, passing the verified email
        router.push(`/apply/${auditionSlug}/form?email=${encodeURIComponent(email)}`);
      } else {
        setVerificationError("El código de verificación no es válido.");
        toast({ title: "Código Inválido", description: "El código ingresado no es correcto.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      toast({ title: "Error de Verificación", description: "No se pudo verificar el código. Inténtalo de nuevo.", variant: "destructive" });
      setVerificationError("Error al verificar el código.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-primary">Verificación de Correo Electrónico</CardTitle>
        <CardDescription className="text-muted-foreground">
          Se requiere la verificación de tu correo electrónico para confirmar tu identidad y continuar con la aplicación.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isCodeSent ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="verify-email" className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /> Correo Electrónico</Label>
              <Input
                id="verify-email"
                type="email"
                placeholder="tu@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSendingCode}
              />
            </div>
            <Button onClick={handleSendCode} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSendingCode || !email}>
              {isSendingCode ? 'Enviando...' : 'ENVIAR CÓDIGO DE VERIFICACIÓN'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
             <Alert variant="info" className="border-blue-500 text-blue-700 dark:border-blue-600 dark:text-blue-300 [&>svg]:text-blue-500 dark:[&>svg]:text-blue-400">
               <Mail className="h-4 w-4" />
               <AlertTitle>Código Enviado</AlertTitle>
               <AlertDescription>
                 Revisa tu bandeja de entrada (y spam) en <strong>{email}</strong> para encontrar el código de verificación.
               </AlertDescription>
             </Alert>
            <div className="space-y-2">
              <Label htmlFor="verification-pin" className="flex items-center gap-2"><Key className="h-4 w-4 text-accent" /> Código de Verificación</Label>
              <Input
                id="verification-pin"
                type="text" // Consider using inputmode="numeric" pattern="[0-9]*" for better mobile UX
                placeholder="Ingresa el código de 6 dígitos"
                maxLength={6} // Assuming a 6-digit code
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                disabled={isVerifying}
              />
            </div>
             {verificationError && (
               <Alert variant="destructive">
                 <XCircle className="h-4 w-4" />
                 <AlertTitle>Error</AlertTitle>
                 <AlertDescription>{verificationError}</AlertDescription>
               </Alert>
             )}
            <div className="flex gap-4">
               <Button onClick={handleSendCode} variant="outline" className="flex-1" disabled={isSendingCode}>
                {isSendingCode ? 'Reenviando...' : 'Reenviar Código'}
               </Button>
               <Button onClick={handleVerifyCode} className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isVerifying || !code || code.length < 6}>
                 {isVerifying ? 'Verificando...' : 'VERIFICAR'}
               </Button>
            </div>
             <Button variant="link" size="sm" onClick={() => setIsCodeSent(false)} className="text-sm text-muted-foreground">
               Cambiar correo electrónico
             </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


declare module "@/components/ui/alert" {
  interface AlertProps {
    variant?: "default" | "destructive" | "success" | "info";
  }
}
