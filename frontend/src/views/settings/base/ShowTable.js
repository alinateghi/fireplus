import React from "react";
import {
	CButton,
	CCard,
	CCardBody,
	CCardHeader,
	CCol,
	CDataTable,
	CRow,
} from "@coreui/react";
import { cilPlus } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router-dom";
import { useData } from "src/data";

export const ShowTable = ({
	dataKey,
	dataName,
	fields,
	children,
	...props
}) => {
	const history = useHistory();
	const rootPath = props.rootPath ?? history.location.pathname;
	const { data, status } = useData(dataKey);

	const items = Array.isArray(data)
		? data.map((item, index) => {
				fields.forEach((element) => {
					let key = element instanceof Object ? element.key : element;
					let value = key.split(".").reduce((p, c) => p?.[c], item);
					if (key.indexOf(".") > -1) item[key] = value;
					if (value === undefined || value === null)
						item[key] = key === "_index" ? index + 1 : "-";
				});
				return item;
		  })
		: [];

	const editRow = (item, index, col, e) => {
		e.target.nodeName === "TD" &&
			history.push(`${rootPath}/edit/${item.id}`);
	};

	return (
		<>
			<CRow className="mb-2">
				<CCol>
					<CButton color="primary" to={props.createPath ?? `${rootPath}/create`}>
						<CIcon content={cilPlus} /> جدید
					</CButton>
				</CCol>
			</CRow>
			<CRow>
				<CCol>
					<CCard>
						<CCardHeader>{dataName} ها</CCardHeader>
						<CCardBody>
							<CDataTable
								items={items}
								fields={fields}
								loading={status === "process"}
								hover
								striped
								bordered
								// outlined
								itemsPerPage={10}
								pagination
								onRowClick={editRow}
								// columnFilter={true}
								tableFilter={{
									label: "جستجو :",
									placeholder: "کلمه ای را جستجو کنید ...",
								}}
								noItemsView={{
									noResults: "نتیجه ای یافت نشد",
									noItems: "بدون اطلاعات",
								}}
								{...props}
							/>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>
		</>
	);
};
