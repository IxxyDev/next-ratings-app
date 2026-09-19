'use client';

import { SortEnum, SortProps } from './Sort.props';
import styles from './Sort.module.css';
import cn from 'classnames';
import SortIcon from './sort.svg';

export const Sort = ({ sort, setSort, className, ...props }: SortProps) => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <div className={styles.sortName} id='sort'>Сортировка</div>
      <button
        id='rating'
        aria-pressed={sort === SortEnum.Rating}
        aria-labelledby='sort rating'
        onClick={() => setSort(SortEnum.Rating)}
        className={cn({
          [styles.active]: sort === SortEnum.Rating
        })}
      >
        <SortIcon className={styles.sortIcon} />По рейтингу
      </button>
      <button
        id='price'
        aria-pressed={sort === SortEnum.Price}
        aria-labelledby='sort price'
        onClick={() => setSort(SortEnum.Price)}
        className={cn({
          [styles.active]: sort === SortEnum.Price
        })}
      >
        <SortIcon className={styles.sortIcon} />По цене
      </button>
    </div>
  );
};
