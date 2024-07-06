import Axios from "axios";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Auth from "./auth/AuthContext";
import AuthRoute from "./auth/AuthRoute";
import PrivateRoute from "./auth/PrivateRoute";
import "./scss/style.css";
import WebSocket from "./WebSocket";
import "react-toastify/dist/ReactToastify.css";

const loading = (
	<div className="pt-3 text-center">
		<div className="sk-spinner sk-spinner-pulse"></div>
	</div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
// const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

class App extends Component {
	constructor(props) {
		super(props);
		Axios.defaults.withCredentials = true;
	}

	render() {
		return (
			<BrowserRouter>
				<Auth>
					<React.Suspense fallback={loading}>
						<Switch>
							<AuthRoute
								exact
								path="/login"
								name="Login Page"
								render={(props) => <Login {...props} />}
							/>
							{/* <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} /> */}
							<Route
								exact
								path="/404"
								name="Page 404"
								render={(props) => <Page404 {...props} />}
							/>
							<Route
								exact
								path="/500"
								name="Page 500"
								render={(props) => <Page500 {...props} />}
							/>
							<PrivateRoute
								path="/"
								name="Home"
								render={(props) => (
									<WebSocket>
										<TheLayout {...props} />
									</WebSocket>
								)}
							/>
						</Switch>
					</React.Suspense>
				</Auth>
				<ToastContainer rtl={true} autoClose={2000} />
			</BrowserRouter>
		);
	}
}

export default App;
