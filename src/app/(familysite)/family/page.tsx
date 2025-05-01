import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FamilyPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">NOVAE FAMILY</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground">
            Bienvenido a la página de Novae Family. Aquí encontrarás información sobre nuestros artistas y grupos.
            <br />
            (Contenido Próximamente)
          </p>
          {/* Placeholder content area */}
        </CardContent>
      </Card>
    </div>
  );
}
