export const LinkSchema = (title = "اطلاعات تماس") => {
	return {
		title: title,
		type: "array",
		items: {
			type: "object",
			properties: {
				type: {
					title: "نوع",
					type: "string",
					enum: ["phone", "website", "social"],
					enumNames: ["تلفن", "وبسایت", "شبکه اجتماعی"],
				},
				value: {
					title: "مقدار",
					type: "string",
				},
			},
		},
	};
};

export const LinkUiSchema = () => {
	return {
		"ui:options": {
			orderable: false,
		},
		items: {
			type: {
				"ui:col": "col-md-4",
			},
			value: {
				"ui:col": "col-md-8",
			},
		},
	};
};
