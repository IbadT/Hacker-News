import { NewsPageContent } from './components/NewsPageContent';

// This is a Server Component
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  return <NewsPageContent id={resolvedParams.id} />;
}