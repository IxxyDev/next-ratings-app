import styles from "./Up.module.css";
import {FC, useEffect} from "react";
import UpIcon from './up.svg';
import {useScrollY} from "../../hooks/useScrollY";
import {useAnimation, motion} from "framer-motion";

export const Up: FC = () => {
  const controls = useAnimation();
  const scrollY = useScrollY();

  useEffect(() => {
    controls.start({ opacity: scrollY / document.body.scrollHeight });
  }, [scrollY, controls]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      className={styles.up}
      onClick={scrollToTop}
      animate={controls}
      initial={{ opacity: 0 }}
    >
      <UpIcon />
    </motion.button>
  );
};
