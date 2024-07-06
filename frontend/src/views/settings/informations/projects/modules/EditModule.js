import React, { useState } from "react";
import { EditData } from "../../../base/EditData";
import { useModuleSelector } from "./Modules";
import { getSchema, getUiSchema } from "./schema";

const EditModule = () => {
	const [data, setData] = useState({});
	const schema = getSchema();
	const uiSchema = getUiSchema();

	return (
		<EditData
			dataSelector={useModuleSelector()}
			dataName="ماژول"
			schema={schema}
			uiSchema={uiSchema}
			dataState={[data, setData]}
		/>
	);
};

export default EditModule;
