import React from "react";
import Form from "@rjsf/bootstrap-4";
import { CButton } from "@coreui/react";
import { useHistory } from "react-router-dom";
import { useData } from "src/data";
import { BootstrapObjectFieldTemplate } from "src/reusable";
import ALocationSelectField from "src/reusable/ALocationSelectField";

export const CreateData = ({
	dataKey,
	dataSelector,
	dataName,
	schema,
	uiSchema,
	dataState,
	beforeSubmit,
	...props
}) => {
	const [data, setData] = dataState;
	const { addItem } = useData(dataSelector ?? dataKey);
	const history = useHistory();

	console.log(data);
	
	const submitData = async () => {
		let submitData = typeof beforeSubmit === 'function' ? beforeSubmit(data) : data;
		if (submitData !== false){
			let result = await addItem(submitData);
			if (result) history.goBack();
		}
	};

	return (
		<div className="container">
			<Form
				schema={schema}
				uiSchema={uiSchema}
				formData={data}
				fields={{ 'geo': ALocationSelectField }}
				ObjectFieldTemplate={BootstrapObjectFieldTemplate}
				onChange={(e) => setData(e.formData)}
				onSubmit={submitData}
			>
				<div className="mb-3">
					<CButton type="submit" color="success">
						ذخیره
					</CButton>
					<CButton
						type="button"
						color="danger"
						className="mx-2"
						onClick={() => history.goBack()}
					>
						بازگشت
					</CButton>
				</div>
			</Form>
		</div>
	);
};
