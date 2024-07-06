import React, { useState } from "react";
import Form from "@rjsf/bootstrap-4";
import { getSchema, getUiSchema } from "./schema_config";
import { BootstrapObjectFieldTemplate } from "src/reusable";
import { CButton } from "@coreui/react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { ApiRequest } from "src/api";

const ModuleConfig = (props) => {
	const match = useRouteMatch();
	const mId = match.params.mid;
	const history = useHistory();
	const request = new ApiRequest("configs\\" + mId);
	const [data, setData] = useState({});
	const [status, setStatus] = useState("idle");

	const mapWay = {
		labels: /ZL\d/,
		algorithms: /Algh\d/,
		emergency: /password/,
	};

	const loadData = async (page) => {
		setStatus("process");
		const r = await request.fetch();
		const flat = r.reduce((r, c) => ({ ...r, [c.name]: c.value }), {});
		const map = Object.entries(flat).reduce((r, [k, v]) => {
			Object.entries(mapWay).forEach(([g, p]) => {
				if (k.match(p)) {
					r = { ...r, [g]: r[g] ? { ...r[g], [k]: v } : { [k]: v } };
				}
			});
			return r;
		}, {});
		setStatus("done");
		setData(map);
	};
	status === "idle" && loadData();

	const submitData = async () => {
		const flat = Object.keys(data).reduce(
			(r, k) => ({ ...r, ...data[k] }),
			{}
		);
		const r = await request.addItem(flat);
		if (r) history.goBack();
	};

	return (
		<div className="container">
			<Form
				schema={getSchema()}
				uiSchema={getUiSchema()}
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

export default ModuleConfig;
