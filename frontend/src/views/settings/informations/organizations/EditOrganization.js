import React, { useState } from "react";
import { EditData } from "../../base/EditData";
import { getSchema, getUiSchema } from "./schema";

const EditOrganization = () => {
	const [data, setData] = useState({});
	const schema = getSchema(data);
	const uiSchema = getUiSchema(data);

	return (
		<EditData
			dataKey="organizations"
			dataName="ارگان"
			schema={schema}
			uiSchema={uiSchema}
			dataState={[data, setData]}
		/>
	);
};

export default EditOrganization;
