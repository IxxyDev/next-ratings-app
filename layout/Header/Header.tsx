'use client';

import { HeaderProps } from './Header.props';
import cn from 'classnames';
import Logo from '../logo.svg';
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon';
import styles from './Header.module.css';
import { motion, useReducedMotion } from 'motion/react';
import { Sidebar } from '../Sidebar/Sidebar';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export const Header = ({ className, ...props }: HeaderProps) => {
  const pathname = usePathname();
  // The menu is open only for the path it was opened on, so navigation closes it.
  const [openedFor, setOpenedFor] = useState<string | null>(null);
  const isOpened = openedFor === pathname;
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20
      }
    },
    closed: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: '100%'
    }
  };

  return (
    <header className={cn(className, styles.header)} {...props}>
      <Logo />
      <ButtonIcon icon='menu' appearance='white' onClick={() => setOpenedFor(pathname)} aria-label='Открыть меню' />
      <motion.div
        className={styles.mobileMenu}
        variants={variants}
        initial='closed'
        animate={isOpened ? 'opened' : 'closed'}
      >
        <Sidebar />
        <ButtonIcon className={styles.menuClose} icon='close' appearance='white' onClick={() => setOpenedFor(null)} aria-label='Закрыть меню' />
      </motion.div>
    </header>
  );
};
