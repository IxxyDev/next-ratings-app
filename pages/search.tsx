import { useRouter } from 'next/router';
import Head from 'next/head';
import { useMemo } from 'react';
import { withLayout } from '../layout/Layout';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';
import { Htag, P, Tag } from '../components';
import Link from 'next/link';
import { firstLevelMenu } from '../helpers/helpers';

function Search({ menu }: SearchProps): JSX.Element {
  const router = useRouter();
  const query = typeof router.query.q === 'string' ? router.query.q : '';

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const matches: { route: string; alias: string; title: string; category: string }[] = [];
    for (const m of menu) {
      const firstRoute = firstLevelMenu.find(f => f.id === 0)?.route ?? 'courses';
      for (const page of m.pages) {
        if (
          page.title.toLowerCase().includes(q) ||
          page.category.toLowerCase().includes(q) ||
          m._id.secondCategory.toLowerCase().includes(q)
        ) {
          matches.push({
            route: firstRoute,
            alias: page.alias,
            title: page.title,
            category: m._id.secondCategory,
          });
        }
      }
    }
    return matches;
  }, [menu, query]);

  return (
    <>
      <Head>
        <title>{query ? `Поиск: ${query}` : 'Поиск'} — MyTop</title>
      </Head>
      <Htag tag='h1'>Поиск</Htag>
      {query
        ? <P>Результаты по запросу <strong>«{query}»</strong>: найдено {results.length}.</P>
        : <P>Введите запрос в поле поиска слева.</P>}
      <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
        {results.map((r) => (
          <li key={`${r.route}-${r.alias}`} style={{ padding: '12px 0', borderBottom: '1px solid #e8e8e8' }}>
            <Link href={`/${r.route}/${r.alias}`} style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>
              {r.title}
            </Link>
            <div style={{ marginTop: 4 }}>
              <Tag color='ghost' size='sm'>{r.category}</Tag>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps<SearchProps> = async () => {
  const firstCategory = 0;
  try {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, { firstCategory });
    return { props: { menu, firstCategory }, revalidate: 60 };
  } catch {
    return { props: { menu: [], firstCategory }, revalidate: 60 };
  }
};

interface SearchProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
