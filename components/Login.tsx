import React from 'react'
import { useMoralis } from 'react-moralis'
import IconImage from '../public/emoji_nature_white_24dp.svg';
import Image from 'next/image';

const Login = () => {
	const { authenticate } = useMoralis();

	return (
		<div className='flex justify-center flex-col items-center h-screen p-28'>
			<Image src={IconImage} width={90} height={90} />
			<h1 className='text-4xl text-center'>Please login with metamask to use this app</h1>
			<button className='bg-blue-600 m-5 text-white pl-4 pr-4 pt-2 pb-2 rounded-full font-semibold hover:bg-blue-700' onClick={() => authenticate()}>Login</button>
		</div>
	)
}

export default Login
