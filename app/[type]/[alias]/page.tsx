import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageByAlias, getProducts } from '../../../helpers/data';
import { firstLevelMenu } from '../../../helpers/helpers';
import { TopPageComponent } from '../../../page-components';

type Params = Promise<{ type: string; alias: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { type, alias } = await params;
  const page = await getPageByAlias(alias);
  if (!page) return {};
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      type: 'article',
      url: `/${type}/${alias}`,
    },
  };
}

export default async function TopPage({ params }: { params: Params }) {
  const { type, alias } = await params;
  const category = firstLevelMenu.find((m) => m.route === type);
  if (!category) notFound();

  const page = await getPageByAlias(alias);
  if (!page) notFound();

  const products = await getProducts(page.category, 10);

  return (
    <TopPageComponent
      key={page._id}
      firstCategory={category.id}
      page={page}
      products={products}
    />
  );
}
