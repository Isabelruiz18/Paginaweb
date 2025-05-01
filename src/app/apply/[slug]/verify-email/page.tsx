import { EmailVerificationForm } from '@/components/apply/email-verification-form';

export default function VerifyEmailPage({ params }: { params: { slug: string } }) {
  // You might want to fetch audition details here again to show context, or pass it differently
  const auditionSlug = params.slug;

  return (
    <div className="max-w-md mx-auto">
      <EmailVerificationForm auditionSlug={auditionSlug} />
    </div>
  );
}
