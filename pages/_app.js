import { ApolloProvider } from '@apollo/client';
import getApolloClient from '../src/utils/apollo';
import '../styles/globals.css';

const client = getApolloClient();

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp
