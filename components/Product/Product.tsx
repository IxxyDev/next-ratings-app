import {ProductProps} from './Product.props';
import styles from './Product.module.css';
import React, {ForwardedRef, forwardRef, useRef, useState} from 'react';
import {Card} from '../Card/Card';
import {Rating} from '../Rating/Rating';
import {Tag} from '../Tag/Tag';
import {Button} from '../Button/Button';
import {declOfNum, priceRu} from '../../helpers/helpers';
import {Divider} from '../Divider/Divider';
import Image from 'next/image';
import cn from 'classnames';
import {Review} from '../Review/Review';
import {ReviewForm} from "../ReviewForm/ReviewForm";
import {motion} from "framer-motion";

export const Product = motion(forwardRef(({
                                            product,
                                            className,
                                            ...props
                                          }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
  const reviewRef = useRef<HTMLDivElement>(null);

  const variants = {
    visible: {opacity: 1, height: 'auto'},
    hidden: {opacity: 0, height: 0}
  };

  const scrollToReview = () => {
    setIsReviewOpened(true);
    reviewRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    reviewRef.current?.focus();
  };

  return (
    <div className={className} {...props} ref={ref}>
      <Card className={styles.product}>
        <div className={styles.logo}>
          <Image
            src={product.image}
            alt={product.title}
            width={70}
            height={70}
          />
        </div>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>
          <span>
            <span className='visuallyHidden'>Цена</span>
            {priceRu(product.price)}
          </span>
          {product.oldPrice && (
            <Tag className={styles.oldPrice} color='green'>
              <span className='visuallyHidden'>Скидка</span>
              {priceRu(product.price - product.oldPrice)}
            </Tag>
          )}
        </div>
        <div className={styles.credit}>
          <span className='visuallyHidden'>Кредит</span>
          {priceRu(product.credit)}/<span className={styles.month}>мес</span>
        </div>
        <div className={styles.rating}>
          <span className='visuallyHidden'>{'Рейтинг' + (product.reviewAvg ?? product.initialRating)}</span>
          <Rating rating={product.reviewAvg ?? product.initialRating}/>
        </div>
        <div className={styles.tags}>
          {product.categories.map((c) => (
            <Tag className={styles.category} color='ghost' key={c}>
              {c}
            </Tag>
          ))}
        </div>
        <div className={styles.priceTitle}>цена</div>
        <div className={styles.creditTitle}>кредит</div>
        <div className={styles.rateTitle}>
          <a href="#" onClick={scrollToReview}>
            {product.reviewCount}{' '}
            {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
          </a>
        </div>
        <Divider className={cn(styles.hr, styles.hr2)}/>
        <div className={styles.feature}>
          {product.characteristics.map((c) => (
            <div className={styles.characteristic} key={c.name}>
              <span className={styles.characteristicsName}>{c.name}</span>
              <span className={styles.dots}/>
              <span className={styles.characteristicsValue}>{c.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advBlock}>
          {product.advantages && (
            <div className={styles.advantages}>
              <div className={styles.advTitle}>Преимущества</div>
              <div>{product.advantages}</div>
            </div>
          )}
          {product.disadvantages && (
            <div className={product.disadvantages}>
              <div>Недостатки</div>
              <div>{product.disadvantages}</div>
            </div>
          )}
        </div>
        <Divider className={styles.hr}/>
        <div className={styles.actions}>
          <Button appearance='primary'>Узнать подробнее</Button>
          <Button
            className={styles.reviewButton}
            appearance='ghost'
            arrow={isReviewOpened ? 'down' : 'right'}
            onClick={() => setIsReviewOpened(!isReviewOpened)}
          >
            Читать отзывы
          </Button>
        </div>
      </Card>
      <motion.div animate={isReviewOpened ? 'visible' : 'hidden' } variants={variants} initial={'hidden'}>
        <Card
          color='blue'
          className={cn(styles.reviews)}
          ref={reviewRef}
          tabIndex={isReviewOpened ? 0 : -1}
        >
          {product.reviews.map((review) => (
            <div key={review._id}>
              <Review review={review}/>
              <Divider/>
            </div>
          ))}
          <ReviewForm productId={product._id} isOpened={isReviewOpened}/>
        </Card>
      </motion.div>
    </div>
  );
}));
