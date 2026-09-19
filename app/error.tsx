'use client';

import { Button, Htag, P } from '../components';
import { Layout } from '../layout/Layout';
import { TopLevelCategory } from '../interfaces/page.interface';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Layout menu={[]} firstCategory={TopLevelCategory.Courses} year={new Date().getFullYear()}>
      <Htag tag='h1'>Ошибка 500</Htag>
      <P>Что-то пошло не так. Попробуйте ещё раз.</P>
      <Button appearance='primary' onClick={reset}>Повторить</Button>
    </Layout>
  );
}
