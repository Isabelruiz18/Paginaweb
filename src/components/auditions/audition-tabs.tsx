'use client';

import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarSection } from './calendar-section';
import { OngoingAuditionSection } from './ongoing-audition-section';
import { ApplicationStatusSection } from './application-status-section';

export function AuditionTabs() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('section') || 'calendar'; // Default to calendar or based on query param

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="calendar">CALENDARIO</TabsTrigger>
        <TabsTrigger value="ongoing">AUDICIÓN EN CURSO</TabsTrigger>
        <TabsTrigger value="status">ESTADO DE MI SOLICITUD</TabsTrigger>
      </TabsList>
      <TabsContent value="calendar">
        <CalendarSection />
      </TabsContent>
      <TabsContent value="ongoing">
        <OngoingAuditionSection />
      </TabsContent>
      <TabsContent value="status">
        <ApplicationStatusSection />
      </TabsContent>
    </Tabs>
  );
}
