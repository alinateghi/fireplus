import { createStore } from "redux";

const initialArrayState = {
	status: "idle",
	data: [],
};

const initialObjectState = {
	status: "idle",
	data: [],
};

const initialState = {
	sidebarShow: "responsive",

	info: initialObjectState,

	companies: initialArrayState,
	organizations: initialArrayState,
	projects: initialArrayState,
	contacts: initialArrayState,
	lastPackets: {},
};

const changeState = (state = initialState, { type, ...rest }) => {
	switch (type) {
		case "set":
			return { ...state, ...rest };
		case "update":
			return {
				...state,
				[rest["key"]]: {...state[rest["key"]], ...rest["data"]}
			}
		default:
			return state;
	}
};

const store = createStore(changeState);
export default store;
