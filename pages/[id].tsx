import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import PersonImage from '../public/person_white_24dp.svg';
import Post from '../components/Post';
import { useRouter } from 'next/router';
import { useMoralis, useMoralisCloudFunction } from 'react-moralis';

const Profile = () => {
	/// VARIABLE DECLARATIONS ///
	const router = useRouter();
	const { id } = router.query;
	const [tweets, setTweets] = useState([]);
	const [profileIsUser, setProfileIsUser] = useState(false);
	const [userName, setUserName] = useState('user not found');
	const [userTweetsCount, setUserTweetsCount] = useState(0);
	const [isFollowingUser, setIsFollowingUser] = useState(false);
	const { user, isAuthenticated } = useMoralis();
	const { data }: any = useMoralisCloudFunction('getUsers');

	/// USE EFFECT ///
	useEffect(() => {
		// find the user by the id in the url, and update all the display information
		data?.forEach((u: any) => {
			if (u.get('ethAddress') === id) {
				setUserName(u.get('username'));
				setTweets(u.get('tweets')!);
				setUserTweetsCount(u.get('tweets')?.length || 0);
			}
		})

		// check if the user referred in the url is the current user
		setProfileIsUser(user?.get('ethAddress') === id);

		// check if the current user is currently following the user in the url
		user?.get('following')?.forEach((f: any) => {
			if (f.get("ethAddress") === id) {
				setIsFollowingUser(true);
			}
		})
	})

	/// FUNCTIONS DECLARATION ///
	const deleteTweet = (id: number) => {
		// get all user's tweets
		let newTweets = user?.get('tweets') || [];

		// filter out the tweet in the user's tweet list that has the id
		newTweets = newTweets.filter((t: any) => t.id !== id);

		// update and save the new tweet list
		user?.set('tweets', newTweets);
		setTweets(newTweets);
		user?.save();
	}

	const followOrUnfollowUser = () => {
		// get the user's followers list
		var newFollowing: Array<any> = user?.get('following') || [];

		// find the user referred in the url
		data?.forEach((u: any) => {
			// if the user is found
			if (u.get('ethAddress') === id) {
				// if the current user is not following the user
				if (!isFollowingUser) {
					// add the user to the current user's following list
					newFollowing.push(u);
				} else {
					// filter out the user from the current user's followers list
					newFollowing = newFollowing.filter((f: any) => f.get("ethAddress") !== id);
				}
			}
		})

		// update and save the new followers list
		user?.set('following', newFollowing);
		user?.save();
		setIsFollowingUser(!isFollowingUser);
	}

	return (
		<div>
			<h1 className='text-2xl font-bold p-3 mb-1'>Profile</h1>
			<div className='mb-5 p-3 flex'>
				<Image src={PersonImage} width={60} height={60} className='bg-gray-800 rounded-full' />
				<div className='ml-3'>
					<h1 className='text-2xl font-medium'>{userName}</h1>
					<p className='font-light'>{userTweetsCount} Tweets</p>
					{!profileIsUser && isAuthenticated ? <button className='bg-blue-600 text-white mb-1 mr-2 p-2 rounded-full font-semibold hover:bg-blue-700 disabled:bg-opacity-30' onClick={followOrUnfollowUser}>{isFollowingUser ? "Unfollow" : "Follow"}</button> : null}
				</div>
			</div>
			<div className='flex flex-col'>
				{ 
				tweets !== undefined ?
				tweets.map((tweet: any, index: any) => 
					<div>
						<Post key={index} tweet={tweet} />	
						{profileIsUser ? <button className='bg-red-600 text-white mb-1 ml-2 mr-2 p-2 rounded-full font-semibold hover:bg-red-700' onClick={() => deleteTweet(tweet.id)}>Delete</button> : null}
					</div>
				) :
				null
				}
			</div>
		</div>
	)
}

export default Profile
