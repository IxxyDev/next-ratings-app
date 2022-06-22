import {SearchProps} from "./Search.props";
import styles from "./Search.module.css";
import cn from 'classnames';
import {FC, useState, KeyboardEvent} from "react";
import {Input} from "../Input/Input";
import {Button} from "../Button/Button";
import SearchIcon from './search.svg';
import {useRouter} from "next/router";

export const Search: FC<SearchProps> = ({className, ...props}) => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  const goToSearch = () => {
    router.push({
      pathname: '/search',
      query: {
        q: search
      }
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      goToSearch();
    }
  };

  return (
    <div className={cn(className, styles.search)} {...props}>
      <Input className={styles.input}
             placeholder='Поиск...'
             value={search}
             onChange={e => setSearch(e.target.value)}
             onKeyDown={handleKeyDown}
      />
      <Button appearance='primary' className={styles.button} onClick={goToSearch} aria-label='Искать по сайту'>
        <SearchIcon/>
      </Button>
    </div>
  );
};
