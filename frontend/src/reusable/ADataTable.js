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
import { useHistory, useRouteMatch } from "react-router-dom";

export const ADataTable = ({
	data,
	title,
	fields,
	canInsert = true,
	canEdit,
	canDelete,
	children,
	indexOffset = 1,
	...props
}) => {
	const history = useHistory();
	const match = useRouteMatch();

	const items = Array.isArray(data)
		? data.map((item, index) => {
				fields.forEach((element) => {
					let key = element instanceof Object ? element.key : element;
					let value = key.split(".").reduce((p, c) => p?.[c], item);
					if (key.indexOf(".") > -1) item[key] = value;
					if (value === undefined || value === null)
						item[key] = key === "_index" ? index + indexOffset : "-";
				});
				return item;
		  })
		: [];

	const editRow = (item, index, col, e) => {
		e.target.nodeName === "TD" &&
			history.push(`${match.url}/edit/${item.id}`);
	};

	return (
		<>
			{canInsert && (
				<CRow className="mb-2">
					<CCol>
						<CButton color="primary" to={`${match.url}/create`}>
							<CIcon content={cilPlus} /> جدید
						</CButton>
					</CCol>
				</CRow>
			)}
			<CRow>
				<CCol>
					<CCard className="shadow">
						<CCardHeader>{title}</CCardHeader>
						<CCardBody>
							<CDataTable
								items={items}
								fields={fields}
								hover
								striped
								bordered
								// outlined
								itemsPerPage={10}
								pagination
								onRowClick={canEdit ? editRow : null}
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
