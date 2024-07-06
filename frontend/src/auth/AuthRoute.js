import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AuthRoute = (props) => {
	const { isAuth } = useAuth();
	const location = useLocation();
	return isAuth && location.pathname === "/login" ? (
		<Redirect to="/" />
	) : (
		<Route {...props} />
	);
};

export default AuthRoute;
