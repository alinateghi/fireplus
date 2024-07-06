import React from "react";
import { ShowTable } from "../../base/ShowTable";

const Companies = () => {
	const fields = [
		// {key: 'id', label: 'شناسه'},
		{ key: "_index", label: "ردیف" },
		{ key: "name", label: "نام" },
		{ key: "director.name", label: "مدیرعامل" },
		{ key: "activity_type", label: "نوع فعالیت" },
		{ key: "activity_field", label: "زمینه فعالیت" },
	];

	return (
		<ShowTable
			fields={fields}
			dataKey="companies"
			rootPath="/settings/companies"
			dataName="شرکت"
		/>
	);
};

export default Companies;
