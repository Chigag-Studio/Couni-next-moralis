import React, { useEffect, useState } from 'react'
import IconImage from '../public/emoji_nature_white_24dp.svg';
import PersonImage from '../public/person_white_24dp.svg';
import SettingsImage from '../public/settings_white_24dp.svg';
import LogOutImage from '../public/logout_white_24dp.svg';
import Image from 'next/image';
import { MoralisProvider, useMoralis } from 'react-moralis';
import Link from 'next/link';

const Navbar = () => {
	/// VARIABLE DECLARATIONS ///
	const { logout, user } = useMoralis();
	const [userAddress, setUserAddress] = useState('');

	/// USE EFFECT ///
	useEffect(() => {
		if (user) setUserAddress(user.get("ethAddress"));
	});

	return (
		<nav className='w-3/12 flex flex-col border-r p-10 min-h-screen'>
			<Link href='/'>
				<div className='p-2'>
					<Image src={IconImage} height={50} width={50} className='hover:bg-blue-600 transition-all rounded-full hover:cursor-pointer' />
				</div>
			</Link>
			<Link href='settings'>
				<h1 className='text-white flex items-center text-2xl font-medium hover:bg-gray-600 transition-all rounded-full hover:cursor-pointer p-2'>
					<Image src={SettingsImage} height={50} width={50} />
					Settings
				</h1>
			</Link>
			<Link href={userAddress}>
				<h1 className='text-white flex items-center text-2xl font-medium hover:bg-gray-600 transition-all rounded-full hover:cursor-pointer p-2'>
					<Image src={PersonImage} height={50} width={50} />
					Profile
				</h1>
			</Link>
			<h1 className='text-white flex items-center text-2xl font-medium hover:bg-red-600 transition-all rounded-full hover:cursor-pointer p-2' onClick={logout}>
				<Image src={LogOutImage} height={50} width={50} />
				Log Out
			</h1>
		</nav>
	)
}

export default Navbar
