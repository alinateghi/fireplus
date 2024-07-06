import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { CreateData } from "../../../base/CreateData";
import { useModuleSelector } from "./Modules";
import { getSchema, getUiSchema } from "./schema";

const CreateModule = () => {
	const [data, setData] = useState({});
	const match = useRouteMatch();
	const pId = match.params.pid;
	const schema = getSchema();
	const uiSchema = getUiSchema();

	const submitProcess = (data) => {
		data['project_id'] = pId;
		return data;
	}

	return (
		<CreateData
			dataSelector={useModuleSelector()}
			dataName="ماژول"
			schema={schema}
			uiSchema={uiSchema}
			dataState={[data, setData]}
			beforeSubmit={submitProcess}
		/>
	);
};

export default CreateModule;
