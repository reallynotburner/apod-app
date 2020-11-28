import { gql, useQuery } from '@apollo/client';
// import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import { useEffect } from 'react';
import Card from '../src/components/Card';
import { getApolloServer } from '../src/utils/apollo';
import styles from '../styles/Home.module.css';

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

const INITIAL_HOME_QUERY = gql`
  query GetSwimlanes ($year: Int, $month: Int, $limit: Int = 12) {
    swimlanes: getRecordsPaginatedByMonth (year: $year, month: $month, limit: $limit){
      month
      year
      days {
        date
        title
        thumbnailUrl
        url
      }
    }
  }
`;

// keyboard handler, right now just allows the "enter" key to emit a click
// on the current active element.  Another way is to use a highly styled
// button, but this gives me full control over the styling of the element.
function keydownHandler(event) {
  switch (event.keyCode) {
    case 13:
      document.activeElement.click();
      break;
  }
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function Home(props) {
  const { initialData } = props; // data from SSG

  // fallback on client if SSG failed for some reason.
  const { loading, error, data } = useQuery(INITIAL_HOME_QUERY, {
    skip: !!initialData, // if SSG got the data, we can skip the call to get Home data
    variables: {
      year: year,
      month: month,
      limit: 12
    }
  });

  useEffect(() => {
    window.addEventListener('keydown', keydownHandler);
    return () => window.removeEventListener('keydown', keydownHandler);
  }, [null]);

  const pickData = data ? data : initialData?.data;
  console.log('Home Render!');

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
          {pickData.swimlanes.map(({ month, year, days }, index) => (
            <div key={index} >
              <h1 className={styles.swimlaneTitle}>{monthNames[month]} {year}</h1>
              <ul className={styles.swimlane}>
                {days.map(({ title, thumbnailUrl, date, url }, index) => {
                  return <Card
                    key={`${index}-${title}`}
                    thumbnailUrl={thumbnailUrl}
                    date={date}
                    title={title}
                    url={url}
                  />
                })}
              </ul>
            </div>
          ))}
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
    },
    revalidate: 3600,
  }
}

async function getData() {
  const client = getApolloServer();

  let errored = false;

  const result = await client.query({
    query: INITIAL_HOME_QUERY,
    variables: {
      year: year,
      month: month,
      limit: 12
    }
  })
    .catch(() => errored = true);

  return errored ? null : result;
}