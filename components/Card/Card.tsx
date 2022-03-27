import {CardProps} from './Card.props';
import styles from './Card.module.css';
import cn from 'classnames';
import {FC} from "react";

export const Card: FC<CardProps> = ({ color = 'white', children, className, ...props}) => {
  return (
    <div className={cn(styles.card, className, {
      [styles.blue]: color === 'blue'
    })} {...props}>
      {children}
    </div>
  );
};
