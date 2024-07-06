import axios from "axios";

class ApiRequest {
	constructor(type) {
		this.type = type;
	}

	/**
	 *
	 * @param {*} status
	 */
	checkAuth(status) {
		if (status === 401 || status === 419) {
			//logout();
		}
	}

	/**
	 *
	 * @param {*} params
	 * @returns
	 */
	async fetch(params = null) {
		try {
			let result = await axios.get(
				process.env.REACT_APP_API_SERVER_URL + this.type,
				{ params: params }
			);
			return result.data;
		} catch (err) {
			this.checkAuth(err.response.status);
			console.log(err);
			return false;
		}
	}

	/**
	 *
	 * @param {*} id
	 * @param {*} params
	 * @returns
	 */
	async fetchById(id, params = null) {
		try {
			let result = await axios.get(
				process.env.REACT_APP_API_SERVER_URL + this.type + "/" + id,
				{ params: params }
			);
			return result.data;
		} catch (err) {
			this.checkAuth(err.response.status);
			return false;
		}
	}

	/**
	 *
	 * @param {*} newData
	 * @returns
	 */
	async addItem(newData) {
		try {
			let result = await axios.post(
				process.env.REACT_APP_API_SERVER_URL + this.type,
				newData
			);
			console.log(result);
			if (result.status === 201) {
				return true;
			}
		} catch (err) {
			this.checkAuth(err.response.status);
			if (err.response?.status === 422) {
				console.log(err.response.data);
			} else console.log(err);
			return false;
		}
	}

	/**
	 *
	 * @param {*} item
	 * @param {int} id
	 * @returns
	 */
	async updateItem(item, id = item.id) {
		try {
			let result = await axios.patch(
				`${process.env.REACT_APP_API_SERVER_URL}${this.type}/${id}`,
				item
			);
			console.log(result);
			if (result.status === 200) {
				return result.data;
			}
		} catch (err) {
			this.checkAuth(err.response.status);
			if (err.response?.status === 422) {
				console.log(err.response.data);
			} else console.log(err);
			return false;
		}
	}
}

export default ApiRequest;
