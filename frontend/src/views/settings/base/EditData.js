import React, { useState } from "react";
import Form from "@rjsf/bootstrap-4";
import { BootstrapObjectFieldTemplate } from "src/reusable";
import { CButton } from "@coreui/react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useData } from "src/data";
import { cleanObject, dataDiff, isEmpty } from "src/reusable/Utilities";
// import { diff } from "deep-object-diff";

export const EditData = ({
	dataKey,
	dataSelector,
	dataName,
	dataState,
	schema,
	uiSchema,
	beforeSubmit,
	...props
}) => {
	const match = useRouteMatch();
	const [status, setStatus] = useState("idle");
	const [data, setData] = dataState;
	const [original, setOriginal] = useState(data); //
	const history = useHistory();
	const { fetchItem, updateItem } = useData(dataSelector ?? dataKey);

	// const changes = (original, current) => {
	// 	return dataDiff(original, current);
	// 	// return { ...cleanObject(diff(original, current)), id: original.id };
	// };

	const loadData = async () => {
		const old = await fetchItem(match.params.id);
		const newData = cleanObject(props.dataMap ? props.dataMap(old) : old);
		setData(newData);
		setOriginal(newData); //
		console.log(newData);
		setStatus("done");
	};

	if (status === "idle") {
		setStatus("process");
		loadData();
	}

	const submitData = async () => {
		let data2 = dataDiff(original, data);
		let submitData =
			typeof beforeSubmit === "function" ? beforeSubmit(data2) : data2;		
		let result = isEmpty(submitData) ? original : await updateItem(submitData);
		if (result) {
			setData(result);
			history.goBack();
		}
	};

	return (
		<div className="container">
			<Form
				schema={schema}
				uiSchema={uiSchema}
				formData={data}
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
