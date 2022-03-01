import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import PersonImage from '../public/person_white_24dp.svg';
import Like from '../public/thumb_up_white_24dp.svg';
import Dislike from '../public/thumb_down_white_24dp.svg';
import { useMoralisCloudFunction, useMoralisQuery } from 'react-moralis';

const Post = ({tweet}: any) => {
	/// VARIABLE DECLARATIONS ///
	const { data }: any = useMoralisCloudFunction('getUsers');
	const { data: tweets }: any = useMoralisQuery('Tweet');
	const [message, setMessage] = useState('');
	const [like, setLike] = useState(0);
	const [dislike, setDislike] = useState(0);
	const [authorName, setAuthorName] = useState('');

	/// USE EFFECT ///
	useEffect(() => {
		setMessage(tweet.get("message"));
		setLike(tweet.get("like"));
		setDislike(tweet.get("dislike"));
		data?.forEach((user: any) => {
			if (user.get("ethAddress") === tweet.get("author")) {
				setAuthorName(user.get("username"));
			}
		})
	})

	/// FUNCTION DECLARATION ///
	const likeTweet = () => {
		tweet.set("like", like + 1);
		setLike(like + 1);
		tweet.save();
	}

	const dislikeTweet = () => {
		tweet.set("dislike", dislike + 1);
		setDislike(dislike + 1);
		tweet.save();
	}

	return (
		<div className='border-t p-3 max-h-80 overflow-y-scroll'>
			<div className='flex items-center'>
				<Image src={PersonImage} width={55} height={55} className='bg-gray-800 rounded-full' />
				<h1 className='p-3 text-2xl font-medium'>{authorName}</h1>
			</div>
			<div>
				<pre>{message}</pre>
				<div className='flex'>
					<Image src={Like} width={30} height={25} className='hover:bg-gray-600 transition-all rounded-full hover:cursor-pointer' onClick={likeTweet} />
					<p>{like}</p>
					<Image src={Dislike} width={30} height={25} className='hover:bg-gray-600 transition-all rounded-full hover:cursor-pointer' onClick={dislikeTweet}/>
					<p>{dislike}</p>
				</div>
			</div>
		</div>
	)
}

export default Post

