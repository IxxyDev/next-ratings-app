import {SortEnum, SortProps} from "./Sort.props";
import styles from "./Sort.module.css";
import cn from 'classnames';
import {FC} from "react";
import SortIcon from './sort.svg';

export const Sort: FC<SortProps> = ({sort, setSort, className, ...props}) => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <span
        onClick={() => setSort(SortEnum.Rating)}
        className={cn({
          [styles.active]: sort === SortEnum.Rating
        })}
      ><SortIcon className={styles.sortIcon}/>По рейтингу</span>
      <span
        onClick={() => setSort(SortEnum.Price)}
        className={cn({
          [styles.active]: sort === SortEnum.Price
        })}
      ><SortIcon className={styles.sortIcon}/>По цене</span>
    </div>
  );
};
