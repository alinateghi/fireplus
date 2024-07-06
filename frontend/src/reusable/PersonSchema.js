import { LinkSchema, LinkUiSchema } from "./LinkSchema";

export const PersonSchema = (title = "شخص", hasLink = false) => {
	let schema = {
		title: title,
		type: "object",
		dependencies: {
			last_name: ["first_name"],
			links: ["first_name"],
		},
		properties: {
			first_name: {
				title: "نام",
				type: "string",
			},
			last_name: {
				title: "نام خانوادگی",
				type: "string",
			},
			gender: {
				title: "جنسیت",
				type: "number",
				enum: [1, 0],
				enumNames: ["مرد", "زن"],
				// default: 1,
			},
			national_code: {
				title: "کد ملی",
				type: "string",
			},
			// links: hasLink ? LinkSchema(`اطلاعات تماس - ${title}`) : undefined,
		},
	};
	if (hasLink)
		schema.properties["links"] = LinkSchema(`اطلاعات تماس - ${title}`);
	return schema;
};

export const PersonUiSchema = (hasLink = false) => {
	let uiSchema = {
		first_name: {
			"ui:col": "col-md-6",
		},
		last_name: {
			"ui:col": "col-md-6",
		},
		gender: {
			"ui:widget": "radio",
		},
		// links: LinkUiSchema(),
	};
	if (hasLink)
		uiSchema["links"] = LinkUiSchema();
	return uiSchema;
};
