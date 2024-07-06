import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useAuth } from "./auth/AuthContext";

export const useData = (selectorObj) => {
	if (typeof selectorObj === "string")
		selectorObj = {
			type: [selectorObj],
			baseType: [selectorObj],
			state: (state) => state[selectorObj.type],
		};
	const { type, baseType, ...selector } = selectorObj;
	const s = createStructuredSelector(selector);
	const args = useSelector(s);
	const state = args.state;
	const dispatch = useDispatch();

	useEffect(() => {
		if (state.status === "idle") {
			fetchData();
		}
	}, [state.status, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

	const { logout } = useAuth();
	const checkAuth = status => {
		if (status === 401 || status === 419) {
			logout();
		}
	}

	const fetchData = async () => {
		try {
			dispatch({
				type: "set",
				[baseType]: { ...state, status: "process" },
			});
			let result = await axios.get(
				process.env.REACT_APP_API_SERVER_URL + baseType
			);
			dispatch({
				type: "set",
				[baseType]: { status: "success", data: result.data },
			});
		} catch (err) {
			checkAuth(err.response.status);
			dispatch({
				type: "set",
				[baseType]: { ...state, status: "failed" },
			});
		}
	};

	const fetchItem = async (id) => {
		try {
			let result = await axios.get(
				process.env.REACT_APP_API_SERVER_URL + type + "/" + id
			);
			return result.data;
		} catch (err) {
			checkAuth(err.response.status);
			return false;
		}
	};

	const addItem = async (newData) => {
		try {
			let result = await axios.post(
				process.env.REACT_APP_API_SERVER_URL + type,
				newData
			);
			console.log(result);
			if (result.status === 201) {
				dispatch({
					type: "set",
					[baseType]: {
						...state,
						data: [...state.data, result.data],
					},
				});
				return true;
			}
		} catch (err) {
			checkAuth(err.response.status);
			if (err.response?.status === 422) {
				console.log(err.response.data);
			} else console.log(err);
			return false;
		}
	};

	const updateItem = async (item, id = item.id) => {
		try {
			let result = await axios.patch(
				`${process.env.REACT_APP_API_SERVER_URL}${type}/${id}`,
				item
			);
			console.log(result);
			if (result.status === 200) {
				state.data[state.data.findIndex((i) => i.id === id)] =
					result.data;
				dispatch({
					type: "set",
					[baseType]: state,
				});
				return result.data;
			}
		} catch (err) {
			checkAuth(err.response.status);
			if (err.response?.status === 422) {
				console.log(err.response.data);
			} else console.log(err);
			return false;
		}
	};

	return {
		...args,
		data: state.data,
		status: state.status,
		fetchData,
		fetchItem,
		addItem,
		updateItem,
	};
};