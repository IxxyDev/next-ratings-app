'use client';

import { ButtonProps } from "./Button.props";
import styles from "./Button.module.css";
import cn from "classnames";
import ArrowIcon from './arrow.svg';
import { motion } from 'motion/react';

export const Button = ({ appearance, arrow = 'none', children, className, ...props }: ButtonProps) => {
  const classes = cn(styles.button, className, {
    [styles.primary]: appearance === "primary",
    [styles.ghost]: appearance === "ghost",
  });
  const content = (
    <>
      {children}
      {arrow !== 'none' && <span className={cn(styles.arrow, {
        [styles.down]: arrow === 'down'
      })}><ArrowIcon /></span>
      }
    </>
  );

  if (props.href !== undefined) {
    return (
      <motion.a whileHover={{ scale: 1.05 }} className={classes} {...props}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button whileHover={{ scale: 1.05 }} className={classes} {...props}>
      {content}
    </motion.button>
  );
};
