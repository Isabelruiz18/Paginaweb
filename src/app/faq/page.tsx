import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqItems = [
  {
    id: "item-1",
    question: "¿Quién puede aplicar a las audiciones de Novae?",
    answer: "Cualquier persona dentro del rango de edad especificado (generalmente 16-25 años, pero verifica la convocatoria actual) y que cumpla con los requisitos de la categoría a la que aplica. No importa tu nacionalidad o lugar de residencia.",
  },
  {
    id: "item-2",
    question: "¿Cuántas veces puedo aplicar?",
    answer: "Generalmente, se permite una aplicación por persona durante cada período de convocatoria (ej., mensual). Revisa los detalles específicos de la audición actual.",
  },
  {
    id: "item-3",
    question: "¿Qué debo incluir en mi video de audición?",
    answer: "Las especificaciones varían por categoría. Para Vocal/Rap, usualmente se pide una canción a capella y otra con música. Para Baile, una coreografía libre y/o una coreografía específica si se indica. Para Actuación, un monólogo. Revisa siempre los detalles de la convocatoria actual para los requisitos exactos de duración y contenido.",
  },
  {
    id: "item-4",
    question: "¿Cuándo recibiré noticias sobre mi solicitud?",
    answer: "El tiempo de revisión puede variar. Puedes verificar el estado de tu solicitud en la sección 'Estado de mi Solicitud' usando tu correo electrónico y el código de verificación. Se notificará directamente a los candidatos seleccionados para las siguientes fases.",
  },
   {
    id: "item-5",
    question: "¿Necesito experiencia previa?",
    answer: "No necesariamente. Buscamos potencial y talento. Si tienes experiencia, asegúrate de detallarla en el formulario, pero no es un requisito excluyente para aplicar.",
  },
];

export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">Preguntas Frecuentes (FAQ)</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-primary">Respuestas a tus dudas</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="text-left font-medium hover:text-accent">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
