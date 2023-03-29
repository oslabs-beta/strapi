import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <style jsx global>{`
      #__next {
        background-color: blue;
      }
    `}</style>
    <Component {...pageProps} />
    </>
  );
}
