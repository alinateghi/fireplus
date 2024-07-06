import moment from "jalali-moment";

const yearRange = (len = 50) => {
	let m = moment();
	let y = parseInt(m.locale("fa").format("YYYY")) - len + 1;
	return Array.from(new Array(len), (val, index) => index + y);
};

export const getSchema = () => {
	return {
		title: "ماژول جدید",
		type: "object",
		required: [
			'id',
			'title',
		],
		properties: {
			id: {
				title: "شناسه ماژول",
				type: "number",
			},
			title: {
				title: "عنوان ماژول",
				type: "string",
			},
			firefighting_distance: {
				title: "فاصله تا آتش نشانی",
				type: "integer",
			},
			fire_device: {
				title: "مشخصات دستگاه",
				type: "object",
				properties: {
					brand: {
						title: "برند",
						type: "string",
					},
					type: {
						title: "نوع",
						type: "string",
						enum: ['conventional', 'addressable'],
						enumNames:['متعارف', 'آدرس پذیر'],
					},
					loop_zone_count: {
						title: "تعداد لوپ/زون",
						type: "integer",
					},
					device_count: {
						title: "تعداد تقریبی قطعات",
						type: "integer",
					},
					battery_type: {
						title: "نوع باتری پشتیبان",
						type: "string",
					},
					battery_count: {
						title: "تعداد باتری پشتیبان",
						type: "integer",
					},
					wire_type: {
						title: "نوع کابل مورد استفاده",
						type: "string",
						enum: ['معمولی', 'مقاوم در برابر حرارت', 'مقاوم در برابر ضربه', 'مقاوم در برابر حرارت و ضربه']
					},
					executed_by: {
						title: "شرکت مجری",
						type: "string",
					},
					executed_year: {
						title: "سال اجرا",
						type: "integer",
						enum: yearRange(),
					},
				},
			},
		},
	};
};

export const getUiSchema = (data) => {
	return {
		building_area: {
			"ui:col": "col-md-6",
		},
		building_year: {
			"ui:col": "col-md-6",
		},
	};
};
