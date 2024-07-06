import { LocationSchema, LocationUiSchema } from "src/reusable";
import { LinkSchema, LinkUiSchema } from "src/reusable/LinkSchema";

export const getSchema = (data) => {
	return {
		title: "ارگان جدید",
		type: "object",
		required: ["name"],
		properties: {
			name: {
				title: "نام ارگان",
				type: "string",
			},
			type: {
				title: "نوع ارگان",
				type: "string",
				enum: ["دولتی", "خصوصی", "خدماتی", "نظامی", "..."],
			},
			location: LocationSchema(data),
			links: LinkSchema(),
		},
	};
};

export const getUiSchema = (data) => {
	return {
		location: LocationUiSchema(data),
		links: LinkUiSchema(),
	};
};
