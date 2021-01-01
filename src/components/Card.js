import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import styles from '../../styles/Home.module.css';

const Card = (props) => {
  const {
    title,
    date,
    thumbnailUrl,
    url,
    setFocus,
    focused
  } = props;

  const cardRef = useRef(null);
  
  useEffect(() => {
    if (cardRef) {
      if (focused) {
        cardRef.current.focus();
      } else {
        cardRef.current.blur();
      }
    }
  });

  return (
    <Link href={`/viewer/${date}`}>
      <a
        ref={cardRef}
        className={styles.card}
        tabIndex={0}
        href={url}
        >
        <img loading={'lazy'} src={thumbnailUrl} />
        <div className={styles.cardOpacity}></div>
        <span>{date} {title}</span>
      </a>
    </Link>
  );
}

export default Card;