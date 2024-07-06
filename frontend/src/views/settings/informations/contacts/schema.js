import {
	LocationSchema,
	LocationUiSchema,
	PersonSchema,
	PersonUiSchema,
} from "src/reusable";
import { LinkSchema, LinkUiSchema } from "src/reusable/LinkSchema";

export const getSchema = (data, projects) => {
	return {
		title: "مخاطب جدید",
		type: "object",
		required: [],
		properties: {
			project_id: {
				title: "پروژه",
				type: "integer",
				enum: projects.map((i) => i.id),
				enumNames: projects.map((i) => i.name),
			},
			position: {
				title: "سمت در پروژه",
				type: "string",
			},
			person: PersonSchema("مشخصات شخصی", false),
			links: LinkSchema(),
			location: LocationSchema(data),
			notices: {
				title: "ارتباط گیری",
				type: "object",
				properties: {
					fire: {
						title: "نحوه اطلاع رسانی در زمان وقوع حریق:",
						type: "object",
						properties: {
							call: {
								title: "تماس",
								type: "boolean",
							},
							sms: {
								title: "پیامک",
								type: "boolean",
							},
						},
					},
					emergency: {
						title:
							"نحوه اطلاع رسانی در زمان فعال سازی پیام اضطراری :",
						type: "object",
						properties: {
							call: {
								title: "تماس",
								type: "boolean",
							},
							sms: {
								title: "پیامک",
								type: "boolean",
							},
						},
					},
					call125: {
						title:
							"نحوه اطلاع رسانی در زمان فعال سازی تماس با آتش نشانی :",
						type: "object",
						properties: {
							call: {
								title: "تماس",
								type: "boolean",
							},
							sms: {
								title: "پیامک",
								type: "boolean",
							},
						},
					},
					fault: {
						title: "نحوه اطلاع رسانی در زمان خطای سیستمی :",
						type: "object",
						properties: {
							call: {
								title: "تماس",
								type: "boolean",
							},
							sms: {
								title: "پیامک",
								type: "boolean",
							},
							reminder: {
								title: "",
								type: "integer",
								enum: [5, 15, 30, 60, 180, 360, 1800, 3600],
								enumNames: [
									"هر 5 دقیقه",
									"هر یک ربع",
									"هر نیم ساعت",
									"هر یک ساعت",
									"هر 3 ساعت",
									"هر 6 ساعت",
									"هر 12 ساعت",
									"هر یک روز",
								],
							},
						},
					},
				},
			},
		},
	};
};

export const getUiSchema = (data) => {
	return {
		person: PersonUiSchema(false),
		location: LocationUiSchema(data),
		links: LinkUiSchema(),
		notices: {
			fire: {
				"ui:display": "inline",
				"ui:contentClass": "col-lg-6 col-md-4",
			},
			fault: {
				"ui:display": "inline",
				"ui:contentClass": "col-lg-6 col-md-4",
				reminder: {
					"ui:placeholder": "یادآور",
				},
			},
			emergency: {
				"ui:display": "inline",
				"ui:contentClass": "col-lg-6 col-md-4",
			},
			call125: {
				"ui:display": "inline",
				"ui:contentClass": "col-lg-6 col-md-4",
			},
		},
	};
};
