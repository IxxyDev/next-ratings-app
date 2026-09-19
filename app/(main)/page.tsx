import type { Metadata } from 'next';
import Link from 'next/link';
import { Htag, P, Tag } from '../../components';
import { getMenu } from '../../helpers/data';
import { firstLevelMenu } from '../../helpers/helpers';
import { TopLevelCategory } from '../../interfaces/page.interface';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: { absolute: 'MyTop — рейтинги и отзывы о курсах, сервисах, книгах и продуктах' },
  description: 'Рейтинги, обзоры и отзывы о лучших курсах, сервисах, книгах и продуктах.',
  openGraph: { url: '/' },
};

export default async function Home() {
  const menu = await getMenu(TopLevelCategory.Courses);

  return (
    <>
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
