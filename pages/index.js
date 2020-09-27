import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import styles from '../styles/Home.module.css';


const INITIAL_HOME_QUERY = gql`
  query InitialHomeQuery {
    getRecordsByDateRange(beginDate: "2020-07-01", endDate: "2020-10-01") {
      date
      title
      thumbnailUrl
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(INITIAL_HOME_QUERY);

  data && console.log(data);

  return (
    <div className={styles.container}>
      <Head>
        <title>APOD App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? <span>Loading...</span> : null}
      {error ? <span>Ooops!</span> : null}
      {data ?
        (<ul>
          {data.getRecordsByDateRange.map(event => (<li>{event.title}</li>))}
        </ul>)
        :
        null
      }
    </div>
  )
}
