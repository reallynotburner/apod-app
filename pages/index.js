import { ApolloClient, gql, InMemoryCache, useQuery } from '@apollo/client';
// import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const INITIAL_HOME_QUERY = gql`
  query InitialHomeQuery {
    getRecordsByDateRange(beginDate: "2019-10-01", endDate: "2020-10-01", descending: true) {
      date
      title
      thumbnailUrl
    }
  }
`;

export default function Home(props) {
  const { initialData } = props;
  console.log('HOME RENDER INITIAL DATA', initialData);

  const { loading, error, data } = useQuery(INITIAL_HOME_QUERY, {
    skip: !!initialData
  });

  const pickData = data ? data : initialData?.data

  return (
    <div className={styles.container}>
      <Head>
        <title>APOD App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? <span>Loading...</span> : null}
      {error ? <span>Ooops!</span> : null}
      {pickData ?
        (<div className={styles.resultContainer}>
          {pickData.getRecordsByDateRange.map(event => (<div key={event.title}>{event.title}</div>))}
        </div>)
        :
        null
      }
    </div>
  )
}

export async function getStaticProps() {

  
  return {
    props: {
      initialData: await getData()
    }
  }
}

async function getData () {
  const client = new ApolloClient({
    uri: process.env.graphQlEndpoint,
    cache: new InMemoryCache()
  });

  let errored = false;

  const result = await client.query({ query: INITIAL_HOME_QUERY })
    .catch(() => errored = true);

  return errored ? null : result;
}