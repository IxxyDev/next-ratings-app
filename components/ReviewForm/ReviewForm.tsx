import {ReviewFormProps} from "./ReviewForm.props";
import cn from "classnames";
import styles from './ReviewForm.module.css';
import React, {FC} from "react";
import {Input} from "../Input/Input";
import {Rating} from "../Rating/Rating";
import {Textarea} from "../Textarea/Textarea";
import {Button} from "../Button/Button";
import CloseIcon from './close.svg';

export const ReviewForm: FC<ReviewFormProps> = ({productId, className, ...props}) => {
  return (
    <div className={cn(styles.reviewForm, className)} {...props}>
      <Input placeholder='Имя'/>
      <Input placeholder='Заголовок отзыва' className={styles.title}/>
      <div className={styles.rating}>
        <span>Оценка:</span>
        <Rating rating={0}/>
      </div>
      <Textarea placeholder='Текст отзыва' className={styles.description}/>
      <div className={styles.submit}>
        <Button appearance='primary'>Отправить</Button>
        <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
      </div>
      <div className={styles.success}>
        <p className={styles.successTitle}>Ваш отзыв отправлен</p>
        <p>Спасибо, ваш отзыв будет опубликован после проверки</p>
        <CloseIcon className={styles.close} />
      </div>
    </div>
  );
};
