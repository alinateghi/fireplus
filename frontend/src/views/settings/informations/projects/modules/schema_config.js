export const getSchema = () => {
	return {
		title: "تنظیمات ماژول",
		type: "object",
		properties: {
			labels: {
				title: "برچسب و عناوین",
				type: "object",
				properties: {
					ZL1: {
						title: "زون 1",
						type: "string",
					},
					ZL2: {
						title: "زون 2",
						type: "string",
					},
					ZL3: {
						title: "زون 3",
						type: "string",
					},
					ZL4: {
						title: "زون 4",
						type: "string",
					},
					ZL5: {
						title: "زون 5",
						type: "string",
					},
					ZL6: {
						title: "زون 6",
						type: "string",
					},
					ZL7: {
						title: "زون 7",
						type: "string",
					},
					ZL8: {
						title: "زون 8",
						type: "string",
					},
				},
			},
			algorithms: {
				title: "الگوریتم و سناریو",
				type: "object",
				properties: {
					Algh1: {
						title: "سناریو 1",
						type: "boolean",
					},
					Algh2: {
						title: "سناریو 2",
						type: "boolean",
					},
					Algh3: {
						title: "سناریو 3",
						type: "boolean",
					},
					Algh4: {
						title: "سناریو 4",
						type: "boolean",
					},
				},
			},
			emergency: {
				title: "شرایط اضطراری",
				type: "object",
				properties: {
					password: {
						title: "گذرواژه",
						type: "string",
					},
				},
			},
		},
	};
};

export const getUiSchema = () => {
	return {
		labels: {
			ZL1: {
				"ui:col": "col-md-3",
			},
			ZL2: {
				"ui:col": "col-md-3",
			},
			ZL3: {
				"ui:col": "col-md-3",
			},
			ZL4: {
				"ui:col": "col-md-3",
			},
			ZL5: {
				"ui:col": "col-md-3",
			},
			ZL6: {
				"ui:col": "col-md-3",
			},
			ZL7: {
				"ui:col": "col-md-3",
			},
			ZL8: {
				"ui:col": "col-md-3",
			},
		},
		building_year: {
			"ui:col": "col-md-6",
		},
	};
};
