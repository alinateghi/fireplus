import React, { useState } from "react";
import { CreateData } from "../../base/CreateData";
import { getSchema, getUiSchema } from "./schema";

const CreateOrganization = () => {
	const [data, setData] = useState({});
	const schema = getSchema(data);
	const uiSchema = getUiSchema(data);
	
	return (
		<CreateData
			dataKey="organizations"
			dataName="ارگان"
			schema={schema}
			uiSchema={uiSchema}
			dataState={[data, setData]}
		/>
	);
};

export default CreateOrganization;
