import { TagProps } from "./Tag.props";
import styles from "./Tag.module.css";
import cn from 'classnames';

export const Tag = ({ size = 'sm', children, color = 'ghost', href, className, ...props }: TagProps): JSX.Element => {
  return (
    <p
      className={cn(styles.tag, className, {
        [styles.sm]: size == "sm",
        [styles.m]: size == "m",
        [styles.ghost]: color == "ghost",
        [styles.gray]: color == "gray",
        [styles.red]: color == "red",
        [styles.green]: color == "green",
        [styles.primary]: color == "primary",
      })}
      {...props}
    >{
      href ? <a href={href}>{children}</a> : <>{children}</>
    }
    </p>
  );
};
