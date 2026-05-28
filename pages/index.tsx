import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Htag, P, Tag } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';
import { firstLevelMenu } from '../helpers/helpers';
import styles from '../styles/Home.module.css';

function Home({ menu }: HomeProps): JSX.Element {
  return (
    <>
      <Head>
        <title>MyTop — рейтинги и отзывы о курсах, сервисах, книгах и продуктах</title>
        <meta name='description' content='Рейтинги, обзоры и отзывы о лучших курсах, сервисах, книгах и продуктах.'/>
      </Head>
      <Htag tag='h1'>Рейтинги, обзоры, отзывы</Htag>
      <P fontSize='m' className={styles.intro}>
        Выберите интересующий раздел, чтобы найти лучшие предложения и реальные отзывы.
      </P>
      <ul className={styles.categories}>
        {firstLevelMenu.map((m) => (
          <li key={m.route} className={styles.category}>
            <Link href={`/${m.route}`} className={styles.categoryLink}>
              {m.icon}
              <span>{m.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      {menu.length > 0 && (
        <>
          <Htag tag='h2'>Популярные темы</Htag>
          <div className={styles.tags}>
            {menu.slice(0, 12).map((m) => (
              <Tag key={m._id.secondCategory} color='primary'>
                {m._id.secondCategory}
              </Tag>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  try {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, { firstCategory });
    return { props: { menu, firstCategory } };
  } catch {
    return { props: { menu: [], firstCategory } };
  }
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
