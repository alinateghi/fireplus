import iran from "./../statics/iran";

export const LocationSchema = (data) => {
	return {
		title: "آدرس",
		type: "object",
		properties: {
			province: {
				title: "استان",
				type: "string",
				enum: [...Object.keys(iran)],
			},
			city: {
				title: "شهر",
				type: ["string", "null"],
				enum:
					data.location && data.location.province
						? iran[data.location.province]
						: ["استان را انتخاب کنید"],
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
			geolat: {
				title: "عرض جغرافیایی",
				type: "number",
			},
			geolong: {
				title: "طول جغرافیایی",
				type: "number",
			},
			// geo: {
			// 	type: "string",
			// },
		},
		dependencies: {
			province: ["city"],
		},
	};
};

export const LocationUiSchema = (data) => {
	return {
		region: {
			"ui:col": "col-md-6",
		},
		area: {
			"ui:col": "col-md-6",
		},
		geolat: {
			"ui:col": "col-md-6",
		},
		geolong: {
			"ui:col": "col-md-6",
		},
		// geo: {
		// 	"ui:field": "geo",
		// },
		address: {
			"ui:widget": "textarea",
			"ui:rows": 2,
		},
	};
};
