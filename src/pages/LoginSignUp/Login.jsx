import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserData } from "../../redux/slices/userSlice";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});

	const onChangeUserData = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	//! Login function
	const handleLogin = async () => {
		try {
			const response = await axios.post("/auth/login", {
				userData,
			});

			if (response.status === 200) {
				alert("Login successful");
				const { accessToken, refreshToken } = response.data;
				window.localStorage.setItem("accessToken", accessToken);
				window.localStorage.setItem("refreshToken", refreshToken);
				window.localStorage.setItem("loggedIn", true);
				navigate("/secret");
			} else {
				throw new Error("Login failed");
			}
			return response;
		} catch (error) {
			console.error("Login error:", error.message);
			window.alert("Wrong email or password");
			return null; // or handle the error as required
		}
	};

	return (
		<>
			<section className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Login in to your account
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
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="name@email.com"
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
									onClick={handleLogin}
									className="w-full text-white bg-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								>
									Login
								</button>
								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Don’t have an account yet?{" "}
									<NavLink
										to="/signup"
										className="font-medium text-primary-600 hover:underline dark:text-primary-500"
									>
										Sign up
									</NavLink>
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Login;
