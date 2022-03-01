import React, { useState } from 'react'
import Image from 'next/image';
import PersonImage from '../public/person_white_24dp.svg';
import { useMoralis } from 'react-moralis';
import Login from '../components/Login';

const Settings = () => {
	/// VARIABLE DECLARATIONS ///
	const { isAuthenticated, user } = useMoralis();
	const [username, setUsername] = useState('');
	const [changedUsername, setChangedUsername] = useState(false);

	/// FUNCTION DECLARATIONS ///
	const save = () => { 
		if (user) {
			user.set("username", username);
			user.save();
			alert('Saved!');
		}
	};

	const changeUsername = (e: any) => {
		setUsername(e.target.value);
		setChangedUsername(true);
	}

	return (
		<div>
			{/* render the settings page if the user is authenticated. Else, render the login page */}
			{isAuthenticated ? 
			<div>
				<h1 className='text-2xl font-bold p-3 mb-1'>Settings</h1>
				<div className='mb-5 p-3'>
					<Image src={PersonImage} width={60} height={60} className='bg-gray-800 rounded-full' />
					<div className='flex items-center'>
						<h1>username: </h1>
						<input type='text' value={changedUsername ? username : user?.get('username')} className='w-full m-1 p-1 bg-transparent border-b-2 outline-none' onChange={changeUsername} />
					</div>
					<button className='bg-blue-600 text-white pl-4 pr-4 pt-2 pb-2 rounded-full font-semibold hover:bg-blue-700' onClick={save}>Save</button>
				</div>
			</div> : <Login />}
		</div>
	)
}

export default Settings
