import React, { useState } from "react";
import { useData } from "src/data";
import { CreateData } from "../../base/CreateData";
import { getSchema, getUiSchema } from "./schema";

const CreateProject = () => {
	const [data, setData] = useState({});
	const { data: companies } = useData("companies");
	const { data: organizations } = useData("organizations");
	const schema = getSchema(data, companies, organizations);
	const uiSchema = getUiSchema(data);

	const mapData = (data) => {
		if (data?.executor?.is_real === false) {
			data["company_id"] = data.executor?.company_id;
			data["organization_id"] = data.executor?.organization_id;
			delete data.executor;
		} else {
			data["executor"] = data?.executor?.person;
		}
		return data;
	};

	return (
		<CreateData
			dataKey="projects"
			dataName="پروژه"
			schema={schema}
			uiSchema={uiSchema}
			dataState={[data, setData]}
			beforeSubmit={mapData}
		/>
	);
};

export default CreateProject;
