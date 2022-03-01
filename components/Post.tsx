import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import PersonImage from '../public/person_white_24dp.svg';
import PersonCouni from '../logos/COUNI Astro m-min.png'
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
		<div className='border-t p-4 max-h-80 break-words'>
			<div className='flex items-center'>
				<Image src={PersonCouni} width={44} height={44} className='bg-gray-800 rounded-full' />
				<h1 className='p-3 font-medium'>{authorName}</h1>
			</div>
			<div>
				<tbody>{message}</tbody>
				<div className='flex text-ellipsis'>
					<Image src={Like} width={24} height={20} className='hover:bg-gray-600 transition-all rounded-full hover:cursor-pointer' onClick={likeTweet} />
					<p>{like}</p>
					<Image src={Dislike} width={24} height={20} className='hover:bg-gray-600 transition-all rounded-full hover:cursor-pointer' onClick={dislikeTweet}/>
					<p>{dislike}</p>
				</div>
			</div>
		</div>
	)
}

export default Post

