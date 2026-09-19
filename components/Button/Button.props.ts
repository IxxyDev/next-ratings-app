import { AnchorHTMLAttributes, ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

type MotionConflicts = 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref';

type NativeButtonProps = Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, MotionConflicts>;
type NativeAnchorProps = Omit<DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, MotionConflicts>;

interface CommonButtonProps {
  children: ReactNode;
  appearance: 'primary' | 'ghost';
  arrow?: 'right' | 'down' | 'none';
}

export type ButtonProps = CommonButtonProps & (
  | ({ href?: undefined } & NativeButtonProps)
  | ({ href: string } & NativeAnchorProps)
);
