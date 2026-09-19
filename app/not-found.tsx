import { Htag } from '../components';
import { Layout } from '../layout/Layout';
import { TopLevelCategory } from '../interfaces/page.interface';
import { getCurrentYear } from '../helpers/data';

export default async function NotFound() {
  const year = await getCurrentYear();
  return (
    <Layout menu={[]} firstCategory={TopLevelCategory.Courses} year={year}>
      <Htag tag='h1'>Ошибка 404</Htag>
    </Layout>
  );
}
