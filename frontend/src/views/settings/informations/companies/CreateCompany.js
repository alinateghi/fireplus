import React, { useState } from "react";
import { CreateData } from "../../base/CreateData";
import { getSchema, getUiSchema } from "./schema";

const CreateCompany = () => {
	const [data, setData] = useState({});
	const schema = getSchema(data);
	const uiSchema = getUiSchema(data);
	
	return (
		<CreateData
			dataKey="companies"
			dataName="شرکت"
			schema={schema}
			uiSchema={uiSchema}
			dataState={[data, setData]}
		/>
	);
};

export default CreateCompany;
