import type { Metadata } from 'next';
import { Htag, P } from '../../../components';

export const metadata: Metadata = {
  title: 'Пользовательское соглашение',
  robots: { index: false },
};

export default function Agreement() {
  return (
    <>
      <Htag tag='h1'>Пользовательское соглашение</Htag>
      <P>
        Используя сайт MyTop, вы соглашаетесь с тем, что рейтинги и отзывы носят
        информационный характер и не являются публичной офертой. Отзывы публикуются
        после модерации; администрация вправе отклонить отзыв без объяснения причин.
      </P>
    </>
  );
}
