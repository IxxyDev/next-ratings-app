import {ReviewFormProps} from "./ReviewForm.props";
import cn from "classnames";
import styles from './ReviewForm.module.css';
import React, {FC} from "react";
import {Input} from "../Input/Input";
import {Rating} from "../Rating/Rating";
import {Textarea} from "../Textarea/Textarea";
import {Button} from "../Button/Button";
import CloseIcon from './close.svg';
import {useForm, Controller} from "react-hook-form";
import {IReviewForm} from "./ReviewForm.interface";

export const ReviewForm: FC<ReviewFormProps> = ({productId, className, ...props}) => {
  const {register, control, handleSubmit} = useForm<IReviewForm>();

  const onSubmit = (data: IReviewForm) => {

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input {...register('name')} placeholder='Имя'/>
        <Input {...register('title')} placeholder='Заголовок отзыва' className={styles.title}/>
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            render={({ field }) => (
              <Rating isEditable rating={field.value} setRating={field.onChange}/>
            )}
            name='rating'
          />
        </div>
        <Textarea {...register('description')} placeholder='Текст отзыва' className={styles.description}/>
        <div className={styles.submit}>
          <Button type='submit' appearance='primary'>Отправить</Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
        <div className={styles.success}>
          <p className={styles.successTitle}>Ваш отзыв отправлен</p>
          <p>Спасибо, ваш отзыв будет опубликован после проверки</p>
          <CloseIcon className={styles.close}/>
        </div>
      </div>
    </form>
  );
};
