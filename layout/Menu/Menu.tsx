import {AppContext} from '../../context/app.context';
import styles from './Menu.module.css';
import cn from 'classnames';
import React, {useContext, KeyboardEvent, useState} from 'react';
import {FirstLevelMenuItem, PageItem} from '../../interfaces/menu.interface';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {firstLevelMenu} from '../../helpers/helpers';
import {motion} from "framer-motion";

export const Menu = (): JSX.Element => {
  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
  const {menu, firstCategory, setMenu} = useContext(AppContext);
  const router = useRouter();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    },
    hidden: {marginBottom: 0},
  };

  const variantsChildren = {
    visible: {opacity: 1, height: 38},
    hidden: {opacity: 0, height: 0},
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu && setMenu(menu.map(m => {
      if (m._id.secondCategory === secondCategory) {
        setAnnounce(m.isOpened ? 'closed' : 'opened');
        m.isOpened = !m.isOpened;
      }
      return m;
    }));
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
          <li key={m.route} aria-expanded={m.id === firstCategory}>
            <Link href={`/${m.route}`}>
              <a>
                <div
                  className={cn(styles.firstLevel, {
                    [styles.firstLevelActive]: m.id === firstCategory,
                  })}
                >
                  {m.icon}
                  <span>{m.name}</span>
                </div>
              </a>
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
          if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
            m.isOpened = true;
          }

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
                  initial={m.isOpened ? 'visible' : 'hidden'}
                  animate={m.isOpened ? 'visible' : 'hidden'}
                  className={cn(styles.secondLevelBlock)}
                >
                  {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
                </motion.ul>
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
    return pages.map(page => (
      <motion.li key={page._id} variants={variantsChildren} >
        <Link href={`/${route}/${page.alias}`}>
          <a
            tabIndex={isOpened ? 0 : -1}
            aria-current={router.asPath === `/${route}/${page.alias}` ? 'page' : false}
            className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]: router.asPath === `/${route}/${page.alias}`,
            })}
          >
            {page.category}
          </a>
        </Link>
      </motion.li>
    ));
  };

  return (
    <nav className={styles.menu} role='navigation'>
      {announce &&
        <span role='log' className='visuallyHidden'>{announce === 'opened' ? 'Развернуто' : 'Свернуто'}</span>}
      <ul>
        {buildFirstLevel()}
      </ul>
    </nav>
  );
};
