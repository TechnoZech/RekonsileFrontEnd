import React, { useState, useEffect } from "react";
import NoUser from "../../components/NoUser";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Profile = (props) => {
	const isLoggedIn = window.localStorage.getItem("loggedIn");
	const navigate = useNavigate();

	// <----------------- Logout -------------------->

	const logout = () => {
		window.localStorage.clear();
		window.location.href = "/login";
	};
	const userData = useSelector((state) => state); //Fetching userData

	//! Auth
	const [verificationStatus, setVerificationStatus] = useState("Verifying"); // Initial status set to 'Verifying'

	useEffect(() => {
		const verifyToken = async () => {
			const token = window.localStorage.getItem("accessToken");

			if (!token) {
				setVerificationStatus("Token is missing");
				navigate("/login");
				return;
			}

			try {
				const response = await axios.get("/protected", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (response.status === 200) {
					setVerificationStatus("Token is valid");
				} else {
					setVerificationStatus("Unexpected error occurred");
					navigate("/login");
				}
			} catch (error) {
				if (error.response && error.response.status === 403) {
					setVerificationStatus("Token is invalid");
					navigate("/login");
				} else {
					setVerificationStatus("Error verifying token");
					navigate("/login");
				}
			}
		};

		verifyToken();
	}, []);

	return (
		<>
			{isLoggedIn ? (
				<section className="bg-blue2 dark:bg-dark px-[5%] h-screen">
					<div className="flex flex-col h-screen items-center justify-center text-center">
						{/* {verificationStatus === "Token is valid" ( */}
							<h1 className="text-dark dark:text-white font-bold text-xl lg:text-4xl mb-11 ">
								Secret page
							</h1>
						{/* )} */}


						<button
							className=" py-2 px-7 text-md text-blue bg-blue2 border-blue border-2  hover:bg-blue hover:text-white dark:bg-dark dark:text-white dark:hover:bg-darkBlue dark:border-darkBlue ease-in-out duration-100 font-semibold rounded mt-5"
							onClick={logout}
						>
							Logout
						</button>
					</div>
				</section>
			) : (
				<NoUser></NoUser>
			)}
		</>
	);
};

export default Profile;
