import type { ReactNode } from 'react';
import { Layout } from '../../layout/Layout';
import { getCurrentYear, getMenu } from '../../helpers/data';
import { TopLevelCategory } from '../../interfaces/page.interface';

export default async function MainLayout({ children }: { children: ReactNode }) {
  const [menu, year] = await Promise.all([getMenu(TopLevelCategory.Courses), getCurrentYear()]);
  return (
    <Layout menu={menu} firstCategory={TopLevelCategory.Courses} year={year}>
      {children}
    </Layout>
  );
}
