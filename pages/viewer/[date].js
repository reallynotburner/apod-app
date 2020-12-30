import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const INITIAL_DATE_QUERY = gql`
  query GetThisDate ($date: String) {
    getRecordByIsoDate (date: $date){
        date
        title
        thumbnailUrl
        url
        explanation
    }
  }
`;

const Viewer = ({ initialData }) => {
  const router = useRouter();
  const { date } = router.query;
  
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
  
  console.log('What is my date?', date, data);

  return (
    <article>
      <h1>{title}</h1>
      <img src={url}></img>
      <p>
        {explanation}
      </p>
    </article>
  )
}




export default Viewer;