import styles from './Input.module.css';
import cn from 'classnames';
import { InputProps } from './Input.props';

export const Input = ({ className, error, ref, ...props }: InputProps) => {
  return (
    <div className={cn(styles.inputWrapper, className)}>
      <input className={cn(styles.input, {
        [styles.error]: error
      })} ref={ref} {...props} />
      {error && <span role='alert' className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
};
