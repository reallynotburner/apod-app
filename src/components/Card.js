import React from 'react';
import styles from '../../styles/Home.module.css';

const Card = (props) => {
  const {
    title,
    date,
    thumbnailUrl
  } = props;

  return (
    <div className={styles.card2} tabIndex={0}>
      <img loading={'lazy'} src={thumbnailUrl}/>
    </div>
  );
}

export default Card;