import type { Metadata } from 'next';
import { Htag, P } from '../../../components';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  robots: { index: false },
};

export default function Privacy() {
  return (
    <>
      <Htag tag='h1'>Политика конфиденциальности</Htag>
      <P>
        При отправке отзыва мы сохраняем только указанное вами имя и текст отзыва.
        Эти данные используются исключительно для публикации отзыва на сайте и не
        передаются третьим лицам.
      </P>
    </>
  );
}
