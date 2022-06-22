import { TopPageComponentProps } from './TopPageComponent.props';
import { Advantages, HhData, Htag, Product, Sort, Tag } from '../../components';
import styles from './TopPageComponent.module.css';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { SortEnum } from '../../components/Sort/Sort.props';

import { sortReducer } from './sort.reducer';
import {useEffect, useReducer} from 'react';
import {useReducedMotion} from "framer-motion";

export const TopPageComponent = ({
  page,
  products,
  firstCategory,
}: TopPageComponentProps): JSX.Element => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
    sortReducer,
    { products, sort: SortEnum.Rating }
  );
  const shouldReduceMotion = useReducedMotion();

  const setSort = (sort: SortEnum) => {
    dispatchSort({ type: sort });
  };

  useEffect(() => {
    dispatchSort({ type: 'reset', initialState: products });
  }, [products]);

  return (
    <div className='wrapper'>
      <div className={styles.title}>
        <Htag tag='h1'>{page.title}</Htag>
        {products && (
          <Tag color='gray' size='m' aria-label={products.length + 'элементов'}>
            {products.length}
          </Tag>
        )}
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div role='list'>
        {sortedProducts?.map((p) => (
          <Product layout={!shouldReduceMotion} key={p._id} product={p} role='listitem' />
        ))}
      </div>
      <div className={styles.hhTitle}>
        <Htag tag='h2'>Вакансии - {page.category}</Htag>
        <Tag color='red' size='m'>
          hh.ru
        </Tag>
      </div>
      {firstCategory === TopLevelCategory.Courses && page.hh && (
        <HhData {...page.hh} />
      )}
      {page.advantages && (
        <>
          <Htag tag='h2'>Преимущества</Htag>
          <Advantages advantages={page.advantages} />
        </>
      )}
      {page.seoText && (
        <div
          className={styles.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}
      <Htag tag='h2'>Получаемые навыки</Htag>
      {page.tags.map((tag) => (
        <Tag key={tag} color='primary'>
          {tag}
        </Tag>
      ))}
    </div>
  );
};
