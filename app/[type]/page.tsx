import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Htag, P } from '../../components';
import { getMenu } from '../../helpers/data';
import { firstLevelMenu } from '../../helpers/helpers';
import styles from './page.module.css';

type Params = Promise<{ type: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { type } = await params;
  const category = firstLevelMenu.find((m) => m.route === type);
  return category ? { title: category.name, openGraph: { url: `/${type}` } } : {};
}

export default async function TypePage({ params }: { params: Params }) {
  const { type } = await params;
  const category = firstLevelMenu.find((m) => m.route === type);
  if (!category) notFound();

  const menu = await getMenu(category.id);

  return (
    <>
      <Htag tag='h1'>{category.name}</Htag>
      {menu.length === 0 && <P>В этом разделе пока нет страниц.</P>}
      {menu.map((section) => (
        <section key={section._id.secondCategory} className={styles.section}>
          <Htag tag='h2'>{section._id.secondCategory}</Htag>
          <ul className={styles.pages}>
            {section.pages.map((page) => (
              <li key={page._id}>
                <Link href={`/${type}/${page.alias}`} className={styles.pageLink}>
                  {page.category}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
