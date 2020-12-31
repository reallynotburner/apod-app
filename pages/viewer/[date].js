import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/Viewer.module.css';

const INITIAL_DATE_QUERY = gql`
  query GetThisDate ($date: String) {
    getRecordByIsoDate (date: $date){
        date
        title
        thumbnailUrl
        url
        explanation
        id
    }
  }
`;

const Viewer = ({ initialData }) => {
  const router = useRouter();
  const { date } = router.query;
  let visibleTimer = 0;
  const [visibleState, setVisibleState] = useState(false);

  useEffect(() => {
    // visibleTimer = setInterval(() => {
    //   setVisibleState(!visibleState);
    // }, 2000);
    // return () => {
    //   clearInterval(visibleTimer);
    // };
  });
  
  const { loading, error, data } = useQuery(INITIAL_DATE_QUERY, {
    skip: !!initialData || !date, // if SSG got the data, we can skip the call to get Home data
    variables: {
      date,
    }
  });

  if (!date) {
    return <h1>Waiting for Date...</h1>;
  }

  /**
   * Be aware! When deeplinking to this view, the useRouter() initially runs without
   * knowing what the date is, it's undefined.  Then it triggers another render with
   * the date known from the url path, as intended.  When directly linking to the
   * view, the date is immediately defined.
   * 
   * AS-IS, this is generated from scratch on the server every time it's requested,
   * see getStaticProps and getInitialPaths for pregeneration, and Incrementall
   * Static Generation of these view pages.
   */



  if (!data) {
    return <h1>Loading...</h1>;
  }

  const { title, explanation, url} = data.getRecordByIsoDate;
  
  return (

    <div className={styles.viewerContainer}>
      <div className={styles.imageContainer}>
        <img
          alt={explanation}
          src={url}
          className={styles.image}
          />
      </div>

      <label for="vehicle1"> I have a dsfdsds</label>

      <article className={`${styles.article} ${visibleState ? styles.articleVisible : ''}`}>
        <h1>{title}</h1>
        <p className={styles.explanation}>
          {explanation}
        </p>
      </article>

      <label className={styles.articleVisibleInputContainer}>
      <input
        className={styles.articleVisibleInput}
        type="checkbox"
        id="vehicle1"
        name="vehicle1"
        value="Bike"
        onChange={e => setVisibleState(e.target.checked)}
        /> {visibleState ? 'Hide' : 'Show'} Information
      </label>
    </div>
  )
}

export default Viewer;