import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUserData } from "./redux/slices/userSlice";
import "./App.css";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/Scroll";
import Home from "./pages/Home/Home";
import Login from "./pages/LoginSignUp/Login";
import SignUp from "./pages/LoginSignUp/SignUp";
import Profile from "./pages/Profile/Profile";

function App() {
	//DarkMode
	const [theme, setTheme] = useState("light");
	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [theme]);

	const handleThemeSwitch = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<Router>
			<ScrollToTop />
			<Navbar handleThemeSwitch={handleThemeSwitch} theme={theme} />
			<Routes>
				<Route path="*" element={<Home theme={theme} />} theme={theme} />
				<Route path="/" element={<Home theme={theme} />} />
				<Route path="/secret" element={<Profile theme={theme} />} />
				<Route path="/SignUp" element={<SignUp theme={theme} />} />
				<Route path="/Login" element={<Login theme={theme} />} />
			</Routes>
		</Router>
	);
}

export default App;