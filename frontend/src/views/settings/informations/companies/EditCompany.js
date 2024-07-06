import React, { useState } from "react";
import { EditData } from "../../base/EditData";
import { getSchema, getUiSchema } from "./schema";

const EditCompany = () => {
	const [data, setData] = useState({});
	const schema = getSchema(data);
	const uiSchema = getUiSchema(data);

	// const map = (data) => {
	// 	return cleanObject({
	// 		...data,
	// 		managing_director: {
	// 			...data?.managing_director,
	// 			phone: data?.managing_director?.links.map((link) => link.value).join(" - ")
	// 		}
	// 	})
	// };

	return (
		<EditData
			dataKey="companies"
			dataName="شرکت"
			// dataMap={map}
			schema={schema}
			uiSchema={uiSchema}
			dataState={[data, setData]}
		/>
	);
};

export default EditCompany;
