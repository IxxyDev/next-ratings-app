import Head from 'next/head';
import { Htag, P } from '../components';
import { withLayout } from '../layout/Layout';

function Privacy(): JSX.Element {
  return (
    <>
      <Head>
        <title>Политика конфиденциальности — MyTop</title>
        <meta name='robots' content='noindex' />
      </Head>
      <Htag tag='h1'>Политика конфиденциальности</Htag>
      <P>
        При отправке отзыва мы сохраняем только указанное вами имя и текст отзыва.
        Эти данные используются исключительно для публикации отзыва на сайте и не
        передаются третьим лицам.
      </P>
    </>
  );
}

export default withLayout(Privacy);

export const getStaticProps = async () => ({
  props: { menu: [], firstCategory: 0 },
});
