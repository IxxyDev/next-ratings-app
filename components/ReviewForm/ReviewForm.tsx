import {ReviewFormProps} from "./ReviewForm.props";
import cn from "classnames";
import styles from './ReviewForm.module.css';
import React, {FC, useState} from "react";
import {Input} from "../Input/Input";
import {Rating} from "../Rating/Rating";
import {Textarea} from "../Textarea/Textarea";
import {Button} from "../Button/Button";
import CloseIcon from './close.svg';
import {useForm, Controller} from "react-hook-form";
import {IReviewForm, IReviewSentResponse} from "./ReviewForm.interface";
import axios from "axios";
import {API} from "../../helpers/api";

export const ReviewForm: FC<ReviewFormProps> = ({productId, isOpened, className, ...props}) => {
  const {register, control, handleSubmit, formState: { errors }, reset} = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, {...formData, productId});

      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError('Что-то пошло не так');
      }
    } catch (e) {
      let message;
      if (e instanceof Error) message = e.message;

      setError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          {...register('name', { required: { value: true, message: 'Заполните имя' }})}
          placeholder='Имя'
          error={errors.name}
          tabIndex={isOpened ? 0 : -1}
        />
        <Input
          {...register('title', { required: { value: true, message: 'Заполните заголовок' }})}
          placeholder='Заголовок отзыва'
          className={styles.title}
          error={errors.title}
          tabIndex={isOpened ? 0 : -1}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            rules={{ required: { value: true, message: 'Укажите рейтинг'} }}
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                setRating={field.onChange}
                ref={field.ref}
                error={errors.rating}
                tabIndex={isOpened ? 0 : -1}
              />
            )}
            name='rating'
          />
        </div>
        <Textarea
          {...register('description', { required: { value: true, message: 'Заполните описание' }})}
          placeholder='Текст отзыва'
          className={styles.description}
          error={errors.description}
          tabIndex={isOpened ? 0 : -1}
        />
        <div className={styles.submit}>
          <Button type='submit' appearance='primary' tabIndex={isOpened ? 0 : -1}>Отправить</Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
        {isSuccess &&
          <div className={cn(styles.success, styles.panel)}>
            <p className={styles.successTitle}>Ваш отзыв отправлен</p>
            <p>Спасибо, ваш отзыв будет опубликован после проверки</p>
            <CloseIcon className={styles.close} onClick={() => setIsSuccess(false)}/>
        </div>
        }
        {error !== '' &&
          <div className={cn(styles.error, styles.panel)}>
            Что-то пошло не так, попробуйте обновить страницу
            <CloseIcon className={styles.close} onClick={() => setError('')}/>
          </div>
        }
      </div>
    </form>
  );
};
