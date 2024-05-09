import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {store} from './redux/store';
import "./index.css";
import App from "./App";
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);