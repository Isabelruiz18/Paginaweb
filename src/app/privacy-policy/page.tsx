import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center text-primary">Política de Privacidad</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-primary">Compromiso con tu Privacidad</CardTitle>
          <CardDescription>Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground">
          <p>
            En Novae Entertainment ("Novae", "nosotros", "nuestro"), respetamos tu privacidad y estamos comprometidos a proteger tu información personal. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y salvaguardamos tu información cuando visitas nuestro sitio web [Tu URL del sitio web] y utilizas nuestros servicios de audición (colectivamente, los "Servicios").
          </p>

          <h2 className="text-lg font-semibold text-primary pt-2">1. Información que Recopilamos</h2>
          <p>
            Podemos recopilar información personal identificable, como tu nombre, dirección de correo electrónico, número de teléfono, fecha de nacimiento, nacionalidad, dirección postal, y cualquier otra información que nos proporciones voluntariamente a través del formulario de solicitud de audición. También podemos recopilar información opcional como ocupación, tipo de sangre, idiomas, hobbies, experiencia y enlaces a redes sociales. Además, recopilamos los archivos multimedia (fotos y videos) que adjuntas a tu solicitud.
          </p>

           <h2 className="text-lg font-semibold text-primary pt-2">2. Cómo Usamos Tu Información</h2>
          <p>
            Utilizamos la información recopilada principalmente para:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4">
             <li>Procesar y evaluar tu solicitud de audición.</li>
             <li>Verificar tu identidad a través de tu correo electrónico.</li>
            <li>Comunicarnos contigo sobre el estado de tu solicitud y futuras oportunidades.</li>
            <li>Cumplir con nuestras obligaciones legales y regulatorias.</li>
            <li>Mejorar nuestros Servicios y procesos de audición.</li>
          </ul>

           <h2 className="text-lg font-semibold text-primary pt-2">3. Compartir Tu Información</h2>
          <p>
            No vendemos ni alquilamos tu información personal a terceros. Podemos compartir tu información con:
          </p>
           <ul className="list-disc list-inside space-y-1 pl-4">
            <li>Personal interno de Novae involucrado en el proceso de selección y casting.</li>
             <li>Proveedores de servicios externos que nos ayudan a operar nuestros Servicios (ej., almacenamiento en la nube, servicios de correo electrónico), sujetos a acuerdos de confidencialidad.</li>
             <li>Autoridades legales si así lo exige la ley o para proteger nuestros derechos.</li>
           </ul>

           <h2 className="text-lg font-semibold text-primary pt-2">4. Seguridad de Tu Información</h2>
          <p>
             Implementamos medidas de seguridad administrativas, técnicas y físicas razonables para proteger tu información personal contra el acceso, uso o divulgación no autorizados. Sin embargo, ninguna transmisión por Internet o método de almacenamiento electrónico es 100% seguro.
           </p>

           <h2 className="text-lg font-semibold text-primary pt-2">5. Retención de Datos</h2>
          <p>
             Retendremos tu información personal durante el tiempo necesario para cumplir con los fines descritos en esta Política de Privacidad, a menos que la ley exija o permita un período de retención más largo.
           </p>

           <h2 className="text-lg font-semibold text-primary pt-2">6. Tus Derechos</h2>
          <p>
             Dependiendo de tu jurisdicción, puedes tener ciertos derechos sobre tu información personal, como el derecho a acceder, corregir o eliminar tus datos. Por favor, contáctanos si deseas ejercer alguno de estos derechos.
           </p>

           <h2 className="text-lg font-semibold text-primary pt-2">7. Cambios a esta Política</h2>
           <p>
             Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página y actualizando la fecha de "Última actualización".
           </p>

          <h2 className="text-lg font-semibold text-primary pt-2">8. Contacto</h2>
          <p>
            Si tienes alguna pregunta o inquietud sobre esta Política de Privacidad, contáctanos en: [Tu Email de Contacto de Privacidad]
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
