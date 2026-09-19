import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { Layout } from '../../layout/Layout';
import { getCurrentYear, getMenu } from '../../helpers/data';
import { firstLevelMenu } from '../../helpers/helpers';

type Params = Promise<{ type: string }>;

export function generateStaticParams() {
  return firstLevelMenu.map((m) => ({ type: m.route }));
}

export default async function TypeLayout({ params, children }: { params: Params; children: ReactNode }) {
  const { type } = await params;
  const category = firstLevelMenu.find((m) => m.route === type);
  if (!category) notFound();

  const [menu, year] = await Promise.all([getMenu(category.id), getCurrentYear()]);
  return (
    <Layout menu={menu} firstCategory={category.id} year={year}>
      {children}
    </Layout>
  );
}
