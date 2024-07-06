import React, { useState } from "react";
import { useData } from "src/data";
import { cleanObject } from "src/reusable/Utilities";
import { EditData } from "../../base/EditData";
import { getSchema, getUiSchema } from "./schema";
import { beforeSubmit } from "./CreateContact";

const EditContact = () => {
	const [data, setData] = useState({});
	const { data: projects } = useData("projects");
	const schema = getSchema(data, projects);
	const uiSchema = getUiSchema(data);

	const map = (data) => {
		return cleanObject({
			...data,
			notices: data?.notices?.reduce((p, c) => {
				return {
					...p,
					[c.event]: {
						...p[c.event],
						[c.type]: true,
						reminder: p[c.event]?.reminder || c.reminder,
					},
				};
			}, {}),
		});
	};

	return (
		<EditData
			dataKey="contacts"
			dataName="مخاطب"
			dataMap={map}
			schema={schema}
			uiSchema={uiSchema}
			dataState={[data, setData]}
			beforeSubmit={beforeSubmit}
		/>
	);
};

export default EditContact;
