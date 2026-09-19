import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { Htag, P, Tag } from '../../../components';
import { getMenu } from '../../../helpers/data';
import { firstLevelMenu } from '../../../helpers/helpers';
import { TopLevelCategory } from '../../../interfaces/page.interface';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Поиск',
  robots: { index: false },
};

type SearchParams = Promise<{ q?: string | string[] }>;

export default function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <Htag tag='h1'>Поиск</Htag>
      <Suspense fallback={<P>Ищем…</P>}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function SearchResults({ searchParams }: { searchParams: SearchParams }) {
  const { q } = await searchParams;
  const query = (typeof q === 'string' ? q : '').trim();

  if (!query) {
    return <P>Введите запрос в поле поиска слева.</P>;
  }

  const menu = await getMenu(TopLevelCategory.Courses);
  const route = firstLevelMenu.find((f) => f.id === TopLevelCategory.Courses)?.route ?? 'courses';
  const needle = query.toLowerCase();
  const results = menu.flatMap((m) =>
    m.pages
      .filter(
        (page) =>
          page.title.toLowerCase().includes(needle) ||
          page.category.toLowerCase().includes(needle) ||
          m._id.secondCategory.toLowerCase().includes(needle),
      )
      .map((page) => ({ alias: page.alias, title: page.title, category: m._id.secondCategory })),
  );

  return (
    <>
      <P>
        Результаты по запросу <strong>«{query}»</strong>: найдено {results.length}.
      </P>
      <ul className={styles.results}>
        {results.map((r) => (
          <li key={r.alias} className={styles.result}>
            <Link href={`/${route}/${r.alias}`} className={styles.resultLink}>
              {r.title}
            </Link>
            <div className={styles.resultCategory}>
              <Tag color='ghost' size='sm'>{r.category}</Tag>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
