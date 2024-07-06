// import React from "react";
import axios from "axios";

class Api {
	static fetchChargeChartData = async (module_id) => {
		if (!module_id) return false;
		return this.fetchData("chart/charge/" + module_id);
	};

	static fetchSignalChartData = async (module_id) => {
		if (!module_id) return false;
		return this.fetchData("chart/signal/" + module_id);
	};

	static fetchData = async (path) => {
		try {
			let result = await axios.post(
				process.env.REACT_APP_API_SERVER_URL + path
			);
			if (result.status === 200) {
				return result.data;
			}
		} catch (err) {
			console.log(err);
			return false;
		}
	};
}

export default Api;
