import {
	LocationSchema,
	LocationUiSchema,
	PersonSchema,
	PersonUiSchema,
} from "src/reusable";
import { LinkSchema, LinkUiSchema } from "src/reusable/LinkSchema";
import { UserProfileWidget } from "src/views/widgets";

export const getSchema = (data) => {
	return {
		title: "شرکت جدید",
		type: "object",
		required: ["name"],

		properties: {
			profileImage: {
				type: "string",
			},
			name: {
				title: "نام شرکت",
				type: "string",
			},
			established_at: {
				title: "سال تاسیس",
				type: "number",
			},
			activity_type: {
				title: "نوع فعالیت",
				type: "string",
			},
			activity_field: {
				title: "زمینه فعالیت",
				type: "string",
			},
			// managing_director: {
			// 	title: "مدیر عامل",
			// 	type: "object",
			// 	properties: {
			// 		name: {
			// 			title: "نام و نام خانوادگی",
			// 			type: "string",
			// 		},
			// 		phone: {
			// 			title: "شماره تماس",
			// 			type: "string",
			// 		},
			// 	},
			// },
			director: PersonSchema("مدیر عامل", true),
			location: LocationSchema(data),
			links: LinkSchema(),
		},
	};
};

export const getUiSchema = (data) => {
	return {
		profileImage: {
			"ui:widget": UserProfileWidget,
		},
		director: PersonUiSchema(true),
		location: LocationUiSchema(data),
		links: LinkUiSchema(),
	};
};
