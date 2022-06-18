import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import React, { FC, useState } from 'react';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { declOfNum, priceRu } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';
import Image from 'next/image';
import cn from 'classnames';
import { Review } from '../Review/Review';
import {ReviewForm} from "../ReviewForm/ReviewForm";

export const Product: FC<ProductProps> = ({ product, className, ...props }) => {
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

  return (
    <>
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
        <div className={styles.price}>{priceRu(product.price)}</div>
        <div className={styles.credit}>
          {priceRu(product.credit)}/<span className={styles.month}>мес</span>
          {product.oldPrice && (
            <Tag className={styles.oldPrice} color='green'>
              {priceRu(product.price - product.oldPrice)}
            </Tag>
          )}
        </div>
        <div className={styles.credit}>
          <Rating rating={product.reviewAvg ?? product.initialRating} />
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
          {product.reviewCount}{' '}
          {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
        </div>
        <Divider className={cn(styles.hr, styles.hr2)} />
        <div className={styles.feature}>
          {product.characteristics.map((c) => (
            <div className={styles.characteristic} key={c.name}>
              <span className={styles.characteristicsName}>{c.name}</span>
              <span className={styles.dots} />
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
        <Divider className={styles.hr} />
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
      <Card
        color='blue'
        className={cn(styles.reviews, {
          [styles.opened]: isReviewOpened,
          [styles.closed]: !isReviewOpened,
        })}
      >
        {product.reviews.map((review) => (
          <>
            <Review key={review._id} review={review} />
            <Divider />
          </>
        ))}
        <ReviewForm productId={product._id} />
      </Card>
    </>
  );
};
