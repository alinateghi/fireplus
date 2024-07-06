const { ceil } = require("lodash");

class PaginationManager {
	constructor(paginate) {
		this.paginate = paginate;
	}

	addItemToTop(item) {
		if (this.paginate.current_page !== 1) return this.paginate;
		let total = this.paginate.total + 1;
		let lastPage = ceil(total / this.paginate.per_page);
		let data = [item, ...this.paginate.data].slice(
			0,
			this.paginate.per_page
		);
		data.forEach((item, index) => {
			item._index = index + 1;
		});

		return {
			...this.paginate,
			tatal: total,
			last_page: lastPage,
			data: data,
		};
	}
}

export default PaginationManager;
