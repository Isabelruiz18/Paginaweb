import { AuditionTabs } from '@/components/auditions/audition-tabs';

export default function AuditionsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center text-primary">Audiciones Novae</h1>
      <AuditionTabs />
    </div>
  );
}
