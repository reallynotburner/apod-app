import React from 'react';
import styles from '../../styles/Home.module.css';

const Card = (props) => {
  const {
    title,
    date,
    thumbnailUrl,
    url
  } = props;

  return (
    <a className={styles.card2} tabIndex={0} href={url}>
      <img loading={'lazy'} src={thumbnailUrl}/>
      <div className={styles.cardOpacity}></div>
      <span>{date} {title}</span>
    </a>
  );
}

export default Card;