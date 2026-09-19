'use client';

import { AppContext } from '../../context/app.context';
import styles from './Menu.module.css';
import cn from 'classnames';
import { use, KeyboardEvent, useState } from 'react';
import { FirstLevelMenuItem, MenuItem, PageItem } from '../../interfaces/menu.interface';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion, useReducedMotion } from 'motion/react';

export const Menu = () => {
  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
  const { menu, firstCategory, setMenu } = use(AppContext);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: shouldReduceMotion ? {} : {
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    },
    hidden: { marginBottom: 0 },
  };

  const variantsChildren = {
    visible: { opacity: 1, height: 38 },
    hidden: { opacity: shouldReduceMotion ? 1 : 0, height: 0 },
  };

  const currentAlias = pathname.split('/')[2];

  const isItemOpened = (m: MenuItem): boolean =>
    m.isOpened ?? m.pages.some(p => p.alias === currentAlias);

  const openSecondLevel = (secondCategory: string) => {
    const target = menu.find(m => m._id.secondCategory === secondCategory);
    if (!target) return;
    const nextOpened = !isItemOpened(target);
    setAnnounce(nextOpened ? 'opened' : 'closed');
    setMenu?.(menu.map(m =>
      m._id.secondCategory === secondCategory ? { ...m, isOpened: nextOpened } : m
    ));
  };

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code === 'Enter' || key.code === 'Space') {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
  };

  const buildFirstLevel = () => {
    return (
      <ul className={styles.firstLevelList}>
        {firstLevelMenu.map(m => (
          <li key={m.route}>
            <Link href={`/${m.route}`} className={cn(styles.firstLevel, {
              [styles.firstLevelActive]: m.id === firstCategory,
            })}>
              {m.icon}
              <span>{m.name}</span>
            </Link>
            {m.id === firstCategory && buildSecondLevel(m)}
          </li>
        ))}
      </ul>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <ul className={styles.secondBlock}>
        {menu.map(m => {
          const isOpened = isItemOpened(m);

          return (
            <li key={m._id.secondCategory}>
              <button
                onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)}
                className={styles.secondLevel}
                onClick={() => openSecondLevel(m._id.secondCategory)}>
                {m._id.secondCategory}
                <motion.ul
                  layout
                  variants={variants}
                  initial={isOpened ? 'visible' : 'hidden'}
                  animate={isOpened ? 'visible' : 'hidden'}
                  className={cn(styles.secondLevelBlock)}
                >
                  {buildThirdLevel(m.pages, menuItem.route, isOpened)}
                </motion.ul>
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
    return pages.map(page => {
      const href = `/${route}/${page.alias}`;
      return (
        <motion.li key={page._id} variants={variantsChildren}>
          <Link
            href={href}
            tabIndex={isOpened ? 0 : -1}
            aria-current={pathname === href ? 'page' : false}
            className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]: pathname === href,
            })}
          >
            {page.category}
          </Link>
        </motion.li>
      );
    });
  };

  return (
    <nav className={styles.menu}>
      {announce &&
        <span role='log' className='visuallyHidden'>{announce === 'opened' ? 'Развернуто' : 'Свернуто'}</span>}
      <ul>
        {buildFirstLevel()}
      </ul>
    </nav>
  );
};
