import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = (props) => {
	const { isAuth } = useAuth();
	if (isAuth === "idle")
		return <div></div>;
	return isAuth ? <Route {...props} /> : <Redirect to="/login" />;
};

export default PrivateRoute;
