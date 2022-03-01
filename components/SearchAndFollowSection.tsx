import React, { useEffect, useState } from 'react'
import { useMoralisCloudFunction } from 'react-moralis'
import Link from 'next/link';

const SearchAndFollowSection = () => {
	/// VARIABLE DECLARATIONS ///
	const { data }: any = useMoralisCloudFunction('getUsers');
	const [peopleToFollow, setPeopleToFollow]: any = useState([]);

	/// USE EFFECT ///
	useEffect(() => {
		let newData: Array<any> = JSON.parse(JSON.stringify(data));
		newData?.sort((a: any, b: any) => b.tweets?.length - a.tweets?.length);
		setPeopleToFollow(newData?.slice(0, 10));
	}, [data])

	return (
		<div className='w-4/12 text-white p-5'>
			<input type="text" placeholder='Search Twitter' className='bg-gray-800 w-full p-3 rounded-full outline-none focus:outline-blue-600' />
			<div className='bg-gray-800 mt-5 rounded-xl'>
				<h1 className='text-xl font-bold p-3'>People to follow</h1>
				{peopleToFollow?.map((person: any) => 
				<Link href={person.ethAddress} key={person.ethAddress}>
					<div className='mt-3 hover:bg-gray-600 hover:cursor-pointer p-3'>
						<h3 className='text-lg font-medium'>{person.username}</h3>
						<p className='font-light text-gray-400'>{person.tweets?.length} tweets</p>
					</div>
				</Link>
				)}
			</div>
		</div>
	)
}

export default SearchAndFollowSection
