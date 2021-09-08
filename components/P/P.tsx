import { PProps } from "./P.props";
import styles from "./P.module.css";
import cn from 'classnames';

export const P = ({ fontSize = 'm', children, className, ...props }: PProps): JSX.Element => {
  return (
    <p
      className={cn(styles.p, className, {
        [styles.lg]: fontSize == "lg",
        [styles.sm]: fontSize == "sm"
      })}
      {...props}
    >
      {children}
    </p>
  );
};
