import { RatingProps } from "./Rating.props";
import styles from "./Rating.module.css";
import cn from 'classnames';
import StarIcon from './star.svg';
import React, {useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef} from 'react';

export const Rating = forwardRef(({ isEditable = false, rating, setRating, error, tabIndex, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
  const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    constructRating(rating);
  }, [rating, tabIndex]);

  const computeFocus = (rating: number, idx: number): number => {
    if (!isEditable) {
      return -1;
    }
    if (!rating && idx === 0) {
      return tabIndex ?? 0;
    }
    if (rating === idx + 1) {
      return tabIndex ?? 0;
    }
    return -1;
  };

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
      return (
        <span
          className={cn(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable,
          })}
          onMouseEnter={() => changeDisplay(i + 1)}
          onMouseLeave={() => changeDisplay(rating)}
          onClick={() => onClick(i + 1)}
          tabIndex={computeFocus(rating, i)}
          onKeyDown={handleKeyClick}
          ref={ref => ratingArrayRef.current?.push(ref)}
          role={isEditable ? 'slider' : ''}
          aria-valuenow={rating}
          aria-valuemax={5}
          aria-valuemin={1}
          aria-label={isEditable ? 'Укажите рейтинг' : ('рейтинг' + rating)}
          aria-invalid={Boolean(error)}
        >
          <StarIcon/>
        </span>
      );
    });
    setRatingArray(updatedArray);
  };

  const changeDisplay = (i: number) => {
    if (!isEditable) return;
    constructRating(i);
  };

  const onClick = (i: number) => {
    if (!isEditable || !setRating) return;
    setRating(i);
  };

  const handleKeyClick = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isEditable || !setRating) {
      return;
    }

    if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
      if (!rating) {
        setRating(1);
      } else {
        e.preventDefault();
        setRating(rating < 5 ? rating + 1 : 5)
      }
      ratingArrayRef.current[rating]?.focus();
    }
    if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
      e.preventDefault();
      setRating(rating > 1 ? rating - 1 : 1);
      ratingArrayRef.current[rating - 2]?.focus();
    }
  };

  return (
    <div className={cn(styles.ratingWrapper, {
      [styles.error]: error
    })} {...props} ref={ref}>
      {ratingArray.map((r, i) => (<span key={i}>{r}</span>))}
      {error && <span role='alert' className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});
