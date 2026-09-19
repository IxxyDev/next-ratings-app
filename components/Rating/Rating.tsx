'use client';

import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import StarIcon from './star.svg';
import { useState, KeyboardEvent, useRef } from 'react';

const STARS = [1, 2, 3, 4, 5];

export const Rating = ({ isEditable = false, rating, setRating, error, tabIndex, className, ref, ...props }: RatingProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const starsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const shownRating = isEditable && hovered !== null ? hovered : rating;

  const computeFocus = (idx: number): number => {
    if (!isEditable) return -1;
    if (!rating && idx === 0) return tabIndex ?? 0;
    if (rating === idx + 1) return tabIndex ?? 0;
    return -1;
  };

  const handleKeyClick = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (!isEditable || !setRating) return;

    if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
      e.preventDefault();
      const next = rating ? Math.min(rating + 1, 5) : 1;
      setRating(next);
      starsRef.current[next - 1]?.focus();
    }
    if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(rating - 1, 1);
      setRating(next);
      starsRef.current[next - 1]?.focus();
    }
  };

  return (
    <div
      className={cn(styles.ratingWrapper, className, { [styles.error]: error })}
      {...props}
      ref={ref}
    >
      {STARS.map((value, i) => (
        <span
          key={value}
          className={cn(styles.star, {
            [styles.filled]: value <= shownRating,
            [styles.editable]: isEditable,
          })}
          onMouseEnter={() => isEditable && setHovered(value)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => isEditable && setRating?.(value)}
          tabIndex={computeFocus(i)}
          onKeyDown={handleKeyClick}
          ref={(el) => { starsRef.current[i] = el; }}
          role={isEditable ? 'slider' : undefined}
          aria-valuenow={isEditable ? rating : undefined}
          aria-valuemax={isEditable ? 5 : undefined}
          aria-valuemin={isEditable ? 1 : undefined}
          aria-label={isEditable ? 'Укажите рейтинг' : `рейтинг ${rating}`}
          aria-invalid={isEditable ? Boolean(error) : undefined}
        >
          <StarIcon />
        </span>
      ))}
      {error && <span role='alert' className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
};
