import React, { useState } from "react";
import { useData } from "src/data";
import { EditData } from "../../base/EditData";
import { getSchema, getUiSchema } from "./schema";

const EditProject = () => {
	const [data, setData] = useState({});
	const { data: companies } = useData("companies");
	const { data: organizations } = useData("organizations");
	const schema = getSchema(data, companies, organizations);
	const uiSchema = getUiSchema(data);

	return (
		<EditData
			dataKey="projects"
			dataName="پروژه"
			schema={schema}
			uiSchema={uiSchema}
			dataState={[data, setData]}
		/>
	);
};

export default EditProject;
