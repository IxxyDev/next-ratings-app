import React from "react";
import { FooterProps } from "./Footer.props";
import styles from "./Footer.module.css";
import cn from 'classnames';
import { format } from 'date-fns';
import Link from 'next/link';

export const Footer = ({className, ...props }: FooterProps): JSX.Element => {
  return (
    <footer className={cn(className, styles.footer)} {...props}>
      <div>OwlTop 2021 - {format(new Date(), 'yyyy')}</div>
      <Link href='/agreement'>Пользовательское соглашение</Link>
      <Link href='/privacy'>Политика конфиденциальности</Link>
    </footer>
  );
};
