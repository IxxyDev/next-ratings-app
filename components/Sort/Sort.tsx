import {SortEnum, SortProps} from "./Sort.props";
import styles from "./Sort.module.css";
import cn from 'classnames';
import {FC} from "react";
import SortIcon from './sort.svg';

export const Sort: FC<SortProps> = ({sort, setSort, className, ...props}) => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <div className={styles.sortName} id='sort'>Сортировка</div>
      <button
        id='rating'
        aria-selected={sort === SortEnum.Rating}
        aria-labelledby='sort rating'
        onClick={() => setSort(SortEnum.Rating)}
        className={cn({
          [styles.active]: sort === SortEnum.Rating
        })}
      >
        <SortIcon className={styles.sortIcon}/>По рейтингу
      </button>
      <button
        id='price'
        aria-selected={sort === SortEnum.Price}
        aria-labelledby='sort price'
        onClick={() => setSort(SortEnum.Price)}
        className={cn({
          [styles.active]: sort === SortEnum.Price
        })}
      >
        <SortIcon className={styles.sortIcon}/>По цене
      </button>
    </div>
  );
};
