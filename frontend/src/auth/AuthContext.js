import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
// import { useCookies } from "react-cookie";

export const AuthContext = React.createContext({
	isAuth: false,
	// login: () => false,
	// logout: () => false,
});

export const useAuth = () => {
	return useContext(AuthContext);
};

const Auth = (props) => {
	// const [cookies, setCookie, removeCookie] = useCookies(["token"]);
	const [isAuth, setIsAuth] = useState("idle");

	useEffect(() => {
		check().then((r) => {
			setIsAuth(r);
		});
	}, []);

	const check = async () => {
		try {
			const result = await axios.post(
				process.env.REACT_APP_API_SERVER_URL + "getMe"
			);
			if (result.status === 200) {
				return true;
			}
		} catch (error) {
			// console.log(error);
		}
		return false;
	};

	const login = async (username, password) => {
		try {
			await axios.get(
				process.env.REACT_APP_WEB_SERVER_URL + "sanctum/csrf-cookie"
			);
			// console.log(csrf);
			const result = await axios.post(
				process.env.REACT_APP_API_SERVER_URL + "login",
				{
					username,
					password,
				}
			);
			if (result.status === 200) {
				// setCookie("token", result.data.token);
				setIsAuth(true);
				return true;
			}
		} catch (error) {
			console.log(error);
		}
		return false;
	};

	const logout = async () => {
		try {
			const result = await axios.post(
				process.env.REACT_APP_API_SERVER_URL + "logout"
			);
			console.log(result);
		} catch (error) {
			const status = error.response.status;
			if (status === 401 || status === 419) {
				setIsAuth(false);
			} else console.log(error);
		}
	};

	return (
		<AuthContext.Provider value={{ isAuth, login, logout }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default Auth;
