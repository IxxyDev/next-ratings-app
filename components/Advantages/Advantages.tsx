import { AdvantagesProps } from './Advantages.props';
import styles from './Advantages.module.css';
import CheckIcon from './check.svg';

export const Advantages = ({ advantages }: AdvantagesProps) => {
  return (
    <>
      {advantages.map(adv => (
        <div key={adv._id} className={styles.advantage}>
          <CheckIcon />
          <div className={styles.title}>{adv.title}</div>
          <hr className={styles.vline} />
          <div className={styles.description}>{adv.description}</div>
        </div>
      ))}
    </>
  );
};
