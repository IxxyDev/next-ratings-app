'use client';

import styles from './Up.module.css';
import { useScrollY } from '../../hooks/useScrollY';
import { motion } from 'motion/react';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';

export const Up = () => {
  const scrollY = useScrollY();
  const opacity = typeof document === 'undefined' || !scrollY
    ? 0
    : Math.min(1, scrollY / document.body.scrollHeight);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div
      className={styles.up}
      animate={{ opacity }}
      initial={{ opacity: 0 }}
    >
      <ButtonIcon icon='up' appearance='primary' aria-label='Наверх' onClick={scrollToTop} />
    </motion.div>
  );
};
