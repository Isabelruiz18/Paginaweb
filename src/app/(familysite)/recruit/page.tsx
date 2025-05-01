import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecruitPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">NOVAE RECRUIT</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground">
            Oportunidades de carrera en Novae Entertainment. Únete a nuestro equipo.
            <br />
            (Contenido Próximamente)
          </p>
          {/* Placeholder content area */}
        </CardContent>
      </Card>
    </div>
  );
}
