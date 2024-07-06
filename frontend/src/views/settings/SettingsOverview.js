import { CCol, CRow, CWidgetSimple } from "@coreui/react";
import React from "react";
import { useInfo } from "src/helper/DataHooks";
import { Companies } from "./informations";
import Organizations from "./informations/organizations/Organizations";
import Projects from "./informations/projects/Projects";

const SettingsOverview = () => {
	const info = useInfo();

	return (
		<>
			<CRow>
				<CCol sm="6" lg="3">
					<CWidgetSimple
						header="تعداد شرکت ها"
						text={(info?.companies_count ?? 0).toString()}
						className="bg-gradient-dark text-white"
					/>
				</CCol>
				<CCol sm="6" lg="3">
					<CWidgetSimple
						header="تعداد ارگان ها"
						text={(info?.organizations_count ?? 0).toString()}
						className="bg-gradient-dark text-white"
					/>
				</CCol>
				<CCol sm="6" lg="3">
					<CWidgetSimple
						header="تعداد پروژه ها"
						text={(info?.projects_count ?? 0).toString()}
						className="bg-gradient-dark text-white"
					/>
				</CCol>
				<CCol sm="6" lg="3">
					<CWidgetSimple
						header="تعداد ماژول ها"
						text={(info?.modules_count ?? 0).toString()}
						className="bg-gradient-dark text-white"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="6">
					<Companies />
				</CCol>
				<CCol md="6">
					<Organizations />
				</CCol>
				<CCol md="12">
					<Projects />
				</CCol>
			</CRow>
		</>
	);
};

export default SettingsOverview;
