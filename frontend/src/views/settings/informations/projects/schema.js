import moment from "jalali-moment";
import { LocationSchema, LocationUiSchema, PersonSchema, PersonUiSchema } from "src/reusable";

const realHasLink = true;

const yearRange = (len = 50) => {
	let m = moment();
	let y = parseInt(m.locale("fa").format("YYYY")) - len + 1;
	return Array.from(new Array(len), (val, index) => index + y);
};

export const getSchema = (data, companies, organizations) => {
	return {
		title: "پروژه جدید",
		type: "object",
		required: [
			'name',
		],
		properties: {
			name: {
				title: "عنوان پروژه",
				type: "string",
			},
			application_type: {
				title: "نوع کاربری",
				type: "string",
				enum: [
					"تجاری",
					"خدماتی",
					"کشاورزی",
					"ورزشی",
					"مسکونی",
					"اداری",
					"آموزشی",
					"صنعتی",
					"فاقد کاربری",
				],
			},
			building_area: {
				title: "زیر بنا",
				type: "string",
			},
			building_year: {
				title: "سال ساخت بنا",
				type: "integer",
				enum: yearRange(),
			},
			// building_owner: {
			// 	title: "مدیریت / مالک",
			// 	type: "string",
			// },
			building_owner: PersonSchema("مدیریت / مالک", true),
			executor: {
				title: "مجری پنل هوشمند",
				type: "object",
				properties: {
					is_real: {
						title: "مجری شخص حقیقی است.",
						type: "boolean",
						enum: [false, true],
						default: false,
					},
				},
				dependencies: {
					is_real: {
						oneOf: [
							{
								properties: {
									is_real: {
										title: "مجری شخص حقیقی است.",
										type: "boolean",
										enum: [false],
									},
									company_id: {
										title: "شرکت",
										type: "integer",
										enum: companies.map((i) => i.id),
										enumNames: companies.map((i) => i.name),
									},
									organization_id: {
										title: "وابسته به ارگان",
										type: ["integer", "null"],
										enum: organizations.length
											? organizations.map((i) => i.id)
											: [null],
										enumNames: organizations.length
											? organizations.map((i) => i.name)
											: ["ارگانی وجود ندارد"],
									},
								},
							},
							{
								properties: {
									is_real: {
										title: "مجری شخص حقیقی است.",
										type: "boolean",
										enum: [true],
									},
									person: PersonSchema("شخص حقیقی", realHasLink),
								},
							},
						],
					},
				},
			},
			location: LocationSchema(data),
			// details: {
			// 	title: "مشخصات پروژه",
			// 	type: "object",
			// 	properties: {

			// 	},
			// },
		},
	};
};

export const getUiSchema = (data) => {
	return {
		location: LocationUiSchema(data),
		building_owner: PersonUiSchema(true),
		executor: {
			person: PersonUiSchema(realHasLink),
		},
		building_area: {
			"ui:col": "col-md-6",
		},
		building_year: {
			"ui:col": "col-md-6",
		},
	};
};
