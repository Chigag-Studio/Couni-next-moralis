import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis';
import Navbar from '../components/Navbar';
import SearchAndFollowSection from '../components/SearchAndFollowSection';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		// process.env.NEXT_PUBLIC_URL! process.env.NEXT_PUBLIC_ID!
		<MoralisProvider serverUrl={process.env.NEXT_PUBLIC_URL!} appId={process.env.NEXT_PUBLIC_ID!}>
			<Head>
				<title>Co-Uni Social Graph for Lightworkers</title>
			</Head>			
			<div className="flex w-screen justify-between bg-gradient-to-r from-black to-yellow-500">
				<Navbar />
				<div className='w-6/12 border-r text-white'>
					<Component {...pageProps} />
				</div>
				<SearchAndFollowSection />
			</div>
		</MoralisProvider>
	)
}

export default MyApp
