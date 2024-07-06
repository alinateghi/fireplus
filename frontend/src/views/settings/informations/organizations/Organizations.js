import React from "react";
import { ShowTable } from "../../base/ShowTable";

const Organizations = () => {
	const fields = [
		// {key: 'id', label: 'شناسه'},
		{ key: "_index", label: "ردیف" },
		{ key: "name", label: "نام" },
		{ key: "type", label: "نوع" },
	];

	return (
		<ShowTable
			fields={fields}
			dataKey="organizations"
			dataName="ارگان"
			rootPath="/settings/organizations"
		/>
	);
};

export default Organizations;
