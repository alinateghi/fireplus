import iran from "./../../../../statics/iran";

export const getSchema = (data) => {
	return {
		title: "پروژه جدید",
		type: "object",
		properties: {
			title: {
				title: "عنوان پروژه",
				type: "string",
			},
			address: {
				title: "آدرس پروژه",
				type: "object",
				properties: {
					province: {
						title: "استان",
						type: "string",
						enum: [...Object.keys(iran)],
					},
					city: {
						title: "شهر",
						type: "string",
						enum:
							data.address && data.address.province
								? iran[data.address.province]
								: [],
					},
					region: {
						title: "منطقه",
						type: "string",
					},
					area: {
						title: "ناحیه",
						type: "string",
					},
					address: {
						title: "آدرس دقیق",
						type: "string",
					},
				},
			},
			company: {
				title: "شرکت مجری سیستم اعلان حریق",
				type: "object",
			},
			panel_owner: {
				title: "مشخصات مجری پنل هوشمند",
				type: "object",
				properties: {
					is_legal: {
						title: "حقیقی یا حقوقی؟",
						type: "boolean",
						enumNames: ["حقوقی", "حقیقی"],
					},
				},
			},
			details: {
				title: "مشخصات پروژه",
				type: "object",
				properties: {
					type: {
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
					surface: {
						title: "زیر بنا",
						type: "string",
					},
					age: {
						title: "سابقه بنا",
						type: "string",
					},
					owner: {
						title: "مدیریت / مالک",
						type: "string",
					},
					relation: {
						title: "وابسته به ارگان",
						type: "string",
					},
					structure: {
						title: "ساختار",
						type: "object",
						properties: {
							blocks: {
								title: "بلوک ها",
								type: "array",
								items: {
									type: "object",
									properties: {
										name: {
											title: "نام بلوک",
											type: "string",
										},
										parts: {
											title: "بخش ها",
											type: "array",
											items: {
												type: "object",
												properties: {
													name: {
														title: "نام بخش",
														type: "string",
													},
													floors: {
														title: "تعداد طبقه ها",
														type: "string",
													},
												},
											},
										},
									},
								},
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
		address: {
			region: {
				"ui:col": "col-md-6",
			},
			area: {
				"ui:col": "col-md-6",
			},
			address: {
				"ui:widget": "textarea",
				"ui:rows": 2,
			},
		},
		panel_owner: {
			is_legal: {
				"ui:widget": "radio",
			},
		},
	};
};
