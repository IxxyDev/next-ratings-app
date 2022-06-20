import styles from "./Up.module.css";
import {FC, useEffect} from "react";
import {useScrollY} from "../../hooks/useScrollY";
import {useAnimation, motion} from "framer-motion";
import {ButtonIcon} from "../ButtonIcon/ButtonIcon";

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
    <motion.div
      className={styles.up}

      animate={controls}
      initial={{ opacity: 0 }}
    >
      <ButtonIcon icon='up' appearance='primary' onClick={scrollToTop} />
    </motion.div>
  );
};
