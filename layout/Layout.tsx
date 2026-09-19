'use client';

import { LayoutProps } from './Layout.props';
import { useState, KeyboardEvent, useRef, Suspense } from 'react';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { Footer } from './Footer/Footer';
import styles from './Layout.module.css';
import { AppContextProvider } from '../context/app.context';
import { Up } from '../components';
import cn from 'classnames';

export const Layout = ({ menu, firstCategory, year, children }: LayoutProps) => {
  const [isSkipLinkShown, setIsSkipLinkShown] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const skipContentAction = (key: KeyboardEvent) => {
    if (key.code === 'Enter' || key.code === 'Space') {
      key.preventDefault();
      bodyRef.current?.focus();
    }
    setIsSkipLinkShown(false);
  };

  return (
    <AppContextProvider menu={menu} firstCategory={firstCategory}>
      <div className={styles.wrapper}>
        <a
          href='#main-content'
          onFocus={() => setIsSkipLinkShown(true)}
          onBlur={() => setIsSkipLinkShown(false)}
          onKeyDown={skipContentAction}
          className={cn(styles.skipLink, {
            [styles.shown]: isSkipLinkShown
          })}>К содержанию</a>
        <Suspense fallback={<header className={styles.header} />}>
          <Header className={styles.header} />
        </Suspense>
        <Suspense fallback={<div className={styles.sidebar} />}>
          <Sidebar className={styles.sidebar} />
        </Suspense>
        <main id='main-content' className={styles.body} ref={bodyRef} tabIndex={-1}>
          {children}
        </main>
        <Footer className={styles.footer} year={year} />
        <Up />
      </div>
    </AppContextProvider>
  );
};
