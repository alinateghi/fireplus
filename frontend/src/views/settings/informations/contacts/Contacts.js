import React from "react";
import { ShowTable } from "../../base/ShowTable";

const Contacts = () => {
	const fields = [
		// {key: 'id', label: 'شناسه'},
		{ key: "_index", label: "ردیف" },
		{ key: "person.name", label: "نام" },
		{ key: "project.name", label: "پروژه" },
		{ key: "position", label: "سمت در پروژه" },
	];

	return (
		<ShowTable
			fields={fields}
			dataKey="contacts"
			dataName="مخاطبان"
			// createPath={PATH_CONTACTS_CREATE}
		/>
	);
};

export default Contacts;
