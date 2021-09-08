import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface PProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>{
  children: ReactNode;
  fontSize?: 'm' | 'sm' | 'lg';
}