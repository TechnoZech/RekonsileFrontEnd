import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState('');
	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});

	const onChangeUserData = (e) => {
		setUserData((prevUserData) => ({
			...prevUserData,
			[e.target.name]: e.target.value,
		}));
	};

	//! Signup function
	const handleSignUp = async () => {
		try {
		  const response = await axios.post("/auth/signup", userData);
		  console.log(response.data.message);
		  // If successful, navigate or perform any other action
		} catch (error) {
		  if (error.response && error.response.status === 400) {
			// If user already exists, set error message
			setErrorMessage(error.response.data.message);
		  } else {
			// Handle other errors
			console.error('Error signing up:', error.message);
		  }
		}
	  };
	return (
		<>
			<section className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								SignUp in to your account
							</h1>
							<div className="space-y-4 md:space-y-6">
								<div>
									<label
										htmlFor="email"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Your email
									</label>
									<input
										onChange={onChangeUserData}
										type="email"
										name="email"
										id="email"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue"
										placeholder="name@company.com"
										required=""
									></input>
								</div>
								<div>
									<label
										htmlFor="password"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Password
									</label>
									<input
										onChange={onChangeUserData}
										type="password"
										name="password"
										id="password"
										placeholder="••••••••"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required=""
									></input>
								</div>

								<button
									onClick={handleSignUp}
									className="w-full text-white bg-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								>
									Sign Up
								</button>
								{errorMessage && <p className="text-red-600">{errorMessage}</p>}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default SignUp;
