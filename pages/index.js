import Head from 'next/head';
import TapGame from '../components/TapGame';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Tap Game</title>
        <meta name="description" content="Tap game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        <TapGame />
      </main>
    </div>
  );
}
