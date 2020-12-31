import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ImageOrThirdPartyVideo from '../../src/components/ImageOrThirdPartyVideo';
import styles from '../../styles/Viewer.module.css';

const INITIAL_DATE_QUERY = gql`
  query GetThisDate ($date: String) {
    getRecordByIsoDate (date: $date){
        date
        title
        url
        explanation
        media_type
    }
  }
`;

const Viewer = ({ initialData }) => {
  const router = useRouter();
  const { date } = router.query;
  const [visibleState, setVisibleState] = useState(false);
  
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

  if (!data.getRecordByIsoDate) {
    return <h1>No Record Found :(</h1>
  }

  const { title, explanation, url, media_type } = data.getRecordByIsoDate;
  
  return (

    <div className={styles.viewerContainer}>
      <div className={styles.imageContainer}>
        <ImageOrThirdPartyVideo
          mediaType={media_type}
          url={url}
          title={title}
        />

      </div>

      <article
        className={`${styles.article} ${visibleState ? styles.articleVisible : ''}`}
        style={{
          pointerEvents: visibleState ? 'auto' : 'none'
        }}
        >
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
          />
          {visibleState ? 'Hide' : 'Show'} Information
      </label>
    </div>
  )
}

export default Viewer;