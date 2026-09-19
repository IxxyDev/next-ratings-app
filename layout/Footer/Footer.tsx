import { FooterProps } from './Footer.props';
import styles from './Footer.module.css';
import cn from 'classnames';
import Link from 'next/link';

export const Footer = ({ className, year, ...props }: FooterProps) => {
  return (
    <footer className={cn(className, styles.footer)} {...props}>
      <div>OwlTop 2021 - {year}</div>
      <Link href='/agreement'>Пользовательское соглашение</Link>
      <Link href='/privacy'>Политика конфиденциальности</Link>
    </footer>
  );
};
