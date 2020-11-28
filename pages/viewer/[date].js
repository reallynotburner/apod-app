import { useRouter } from 'next/router';

const Viewer = () => {
  const router = useRouter()
  const { date } = router.query

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
  
  console.log('What is my date?', date);

  return (
    <h1>Hello!</h1>
  );
}

export default Viewer;