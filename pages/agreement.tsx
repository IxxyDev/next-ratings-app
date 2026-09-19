import Head from 'next/head';
import { Htag, P } from '../components';
import { withLayout } from '../layout/Layout';

function Agreement(): JSX.Element {
  return (
    <>
      <Head>
        <title>Пользовательское соглашение — MyTop</title>
        <meta name='robots' content='noindex' />
      </Head>
      <Htag tag='h1'>Пользовательское соглашение</Htag>
      <P>
        Используя сайт MyTop, вы соглашаетесь с тем, что рейтинги и отзывы носят
        информационный характер и не являются публичной офертой. Отзывы публикуются
        после модерации; администрация вправе отклонить отзыв без объяснения причин.
      </P>
    </>
  );
}

export default withLayout(Agreement);

export const getStaticProps = async () => ({
  props: { menu: [], firstCategory: 0 },
});
