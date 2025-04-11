import { NewsPage } from '@/pages/NewsPage';

export default function Page({ params }: { params: { id: string } }) {
  return <NewsPage id={params.id} />;
} 