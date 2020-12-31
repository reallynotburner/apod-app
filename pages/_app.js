import { ApolloProvider } from '@apollo/client';
import { initNavigation } from '@noriginmedia/react-spatial-navigation';
import { useEffect } from 'react';
import { getApolloClient } from '../src/utils/apollo';
import '../styles/globals.css';

const client = getApolloClient();

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // initNavigation({
    //   debug: true,
    //   visualDebug: true
    // });
    initNavigation();
  });
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp
