import React, { useState } from "react";
import { useData } from "src/data";
import { CreateData } from "../../base/CreateData";
import { getSchema, getUiSchema } from "./schema";

export const beforeSubmit = (data) => {
	let notices = [];
	Object.entries(data.notices).map(([event, v]) =>
		Object.entries(v).forEach(([type, enable]) => {
			if (type !== "reminder" && enable) {
				notices = [
					...notices,
					{
						event: event,
						type: type,
						reminder:
							type === "sms" && enable && v.reminder
								? v.reminder
								: null,
					},
				];
			}
		})
	);

	// let notices = Object.entries(data.notices).map(([event, v]) =>
	// 	Object.entries(v).reduce(
	// 		(n, [type, enable]) =>
	// 			type !== "reminder" && enable
	// 				? [
	// 						...n,
	// 						{
	// 							event: event,
	// 							type: type,
	// 							reminder:
	// 								type === "sms" && enable && v.reminder
	// 									? v.reminder
	// 									: null,
	// 						},
	// 				  ]
	// 				: n,
	// 		[]
	// 	)
	// );

	// let notices = Object.entries(data.notices).map(([event, v]) =>
	// 	Object.entries(v).map(
	// 		([type, enable]) =>
	// 			type !== "reminder" &&
	// 			enable && {
	// 				event: event,
	// 				type: type,
	// 				reminder:
	// 					type === "sms" && enable && v.reminder
	// 						? v.reminder
	// 						: null,
	// 			}
	// 	)
	// );

	// console.log(notices);
	// return false;
	
	data = { ...data, notices };
	return data;
};

const CreateContact = () => {
	const [data, setData] = useState({});
	const { data: projects } = useData("projects");
	const schema = getSchema(data, projects);
	const uiSchema = getUiSchema(data);

	return (
		<CreateData
			dataKey="contacts"
			dataName="مخاطب"
			schema={schema}
			uiSchema={uiSchema}
			dataState={[data, setData]}
			beforeSubmit={beforeSubmit}
		/>
	);
};

export default CreateContact;
