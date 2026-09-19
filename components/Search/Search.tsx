'use client';

import { SearchProps } from './Search.props';
import styles from './Search.module.css';
import cn from 'classnames';
import { useState, FormEvent } from 'react';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import SearchIcon from './search.svg';
import { useRouter } from 'next/navigation';

export const Search = ({ className, ...props }: SearchProps) => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  const goToSearch = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <form className={cn(className, styles.search)} {...props} role='search' onSubmit={goToSearch}>
      <Input className={styles.input}
             placeholder='Поиск...'
             value={search}
             onChange={e => setSearch(e.target.value)}
      />
      <Button type='submit' appearance='primary' className={styles.button} aria-label='Искать по сайту'>
        <SearchIcon />
      </Button>
    </form>
  );
};
