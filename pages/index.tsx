import React, { useState } from 'react';
import { Button, Htag, Rating } from '../components';

export default function Home(): JSX.Element {
  const [rating, setRating] = useState<number>(4);
  return (
    <>
      <Htag tag="h1">Текст</Htag>
      <Button appearance="primary" arrow='right'>Кнопка</Button>
      <Button appearance="ghost" arrow='down'>Кнопка</Button>
      <Rating rating={rating} isEditable setRating={setRating}/>
    </>
  );
}
