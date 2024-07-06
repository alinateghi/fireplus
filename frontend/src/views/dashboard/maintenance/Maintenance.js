import {
	CButton,
	CCard,
	CCardBody,
	CCardHeader,
	CCol,
	CContainer,
	CRow,
} from "@coreui/react";
import moment from "jalali-moment";
import React from "react";

const Maintenance = (props) => {
	return (
		<CContainer fluid>
			<CRow>
				<CCol>
					<CCard className="shadow">
						<CCardBody>
							<CRow className="m-2">
								<CCol md="6" className="text-left">
									<b>شرکت مجری سیستم</b>
								</CCol>
								<CCol md="6">پژواک</CCol>
							</CRow>
							<CRow className="m-2">
								<CCol md="6" className="text-left">
									<b>شرکت سرویس نگهداری</b>
								</CCol>
								<CCol md="6">پژواک</CCol>
							</CRow>
							<CRow className="m-2">
								<CCol md="6" className="text-left">
									<b>تاریخ عقد قرارداد سرویس نگهداری</b>
								</CCol>
								<CCol md="6">
									{moment()
										.add(-74, "days")
										.format("jYYYY/jMM/jDD")}
								</CCol>
							</CRow>
							<CRow className="m-2">
								<CCol md="6" className="text-left">
									<b>شرایط سرویس و نگهداری</b>
								</CCol>
								<CCol md="6">ماهیانه</CCol>
							</CRow>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>
			<CRow>
				<CCol>
					<CCard className="shadow">
						<CCardBody>
							<CRow className="m-2">
								<CCol md="6" className="text-left">
									<b>تاریخ آخرین بازدید</b>
								</CCol>
								<CCol md="6">
									{moment()
										.add(-12, "days")
										.format("jYYYY/jMM/jDD")}
								</CCol>
							</CRow>
							<CRow className="m-2">
								<CCol md="6" className="text-left">
									<b>وضعیت دستگاه در آخرین بازدید</b>
								</CCol>
								<CCol md="6">سالم - عادی</CCol>
							</CRow>
							<CRow className="m-2">
								<CCol md="6" className="text-left">
									<b>کارشناس مربوطه</b>
								</CCol>
								<CCol md="6">علی غلامی</CCol>
							</CRow>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>
			<CRow>
				<CCol>
					<CCard className="shadow">
						<CCardHeader className="text-center">فایل گزارشات سرویس و نگهداری</CCardHeader>
						<CCardBody>
							<CRow className="m-2">
								<CCol md="6" className="text-left">
									<b>{moment()
										.add(-43, "days")
										.format("jYYYY/jMM/jDD")}</b>
								</CCol>
								<CCol md="6"><CButton color="info">دانلود فایل</CButton></CCol>
							</CRow>
							<CRow className="m-2">
								<CCol md="6" className="text-left">
									<b>{moment()
										.add(-12, "days")
										.format("jYYYY/jMM/jDD")}</b>
								</CCol>
								<CCol md="6"><CButton color="info">دانلود فایل</CButton></CCol>
							</CRow>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>
		</CContainer>
	);
};

export default Maintenance;
