import React, { useState } from "react";
import AZonesBox from "../widgets/WidgetZone/AZonesBox";
import MapView from "./Monitoring/MapView";
import { ChargeWidget, ModuleSignalStrength } from "../widgets";
import { SignalChartModel, ModalButton } from "../modals";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { ApiRequest } from "src/api";
import ProjectEvents from "./ProjectEvents";
import moment from "jalali-moment";
import SignalStrengthWidget from "../widgets/SignalStrengthWidget/SignalStrengthWidget";
import txt from "./../../z.txt";
import ReceivedData from "./ReceivedData";

const Dashboard = (props) => {
	const request = new ApiRequest("projects");
	const [project, setProject] = useState(null);
	const [text, setText] = useState("");

	const load = async (id = 1) => {
		const p = await request.fetchById(id);
		setProject(p);
	};
	project === null && load();

	const getText = async () => {
		const r = await fetch(txt);
		const t = await r.text();
		setText(t);
	};
	getText();

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-8">
					<div className="py-2">
						<div className="card shadow">
							<MapView onProjectSelect={(id) => load(id)} />
						</div>
					</div>
					{project?.modules
						?.filter((m) => m.is_addressable === 0)
						?.map((module, i) => (
							<div key={i}>
								<AZonesBox module={module} />
								<hr />
							</div>
						))}
					<ProjectEvents project={project} />
					{project?.modules
						?.filter((m) => m.is_addressable === 1)
						.map((v, i) => (
							<div key={i} className="py-2">
								<div className="card shadow">
									<div className="card-header">
										<h4>اطلاعات دریافتی</h4>
									</div>
									<div
										className="card-body"
										style={{
											maxHeight: "300px",
											overflow: "auto",
											textAlign: "left",
											direction: "ltr",
										}}
									>
										<ReceivedData module={v} />
									</div>
								</div>
							</div>
						))}
					{/* <div className="py-2">
						<div className="card shadow">
							<div className="card-body">سیستم ثبت اطلاعات</div>
						</div>
					</div> */}
				</div>
				<div className="col-md-4">
					<div className="py-2">
						<div className="card shadow">
							<div className="card-body">
								<h4>اطلاعات سیستم</h4>
								<hr />
								<CRow className="m-2">
									<CCol md="6" className="text-left">
										<b>نام پروژه: </b>
									</CCol>
									<CCol md="6">{project?.name}</CCol>
								</CRow>
								<CRow className="m-2">
									<CCol md="6" className="text-left">
										<b>نوع کاربری: </b>
									</CCol>
									<CCol md="6">
										{project?.application_type}
									</CCol>
								</CRow>
								<CRow className="m-2">
									<CCol md="6" className="text-left">
										<b>زیر بنا: </b>
									</CCol>
									<CCol md="6">{project?.building_area}</CCol>
								</CRow>
								<CRow className="m-2">
									<CCol md="6" className="text-left">
										<b>سال ساخت: </b>
									</CCol>
									<CCol md="6">{project?.building_year}</CCol>
								</CRow>
								<CRow className="m-2">
									<CCol md="6" className="text-left">
										<b>شرکت مجری: </b>
									</CCol>
									<CCol md="6">{project?.company?.name}</CCol>
								</CRow>
								<CRow className="m-2">
									<CCol md="6" className="text-left">
										<b>ارگان وابسطه: </b>
									</CCol>
									<CCol md="6">
										{project?.organization?.name}
									</CCol>
								</CRow>
								<CRow className="m-2">
									<CCol md="6" className="text-left">
										<b>آدرس: </b>
									</CCol>
									<CCol md="6">
										{project?.location?.address}
									</CCol>
								</CRow>
							</div>
						</div>
					</div>
					<div className="py-2">
						<div className="card shadow">
							<div className="card-body">
								<h4>وضعیت شبکه</h4>
								<hr />
								{project?.modules?.map((v, i) => {
									return (
										<SignalStrengthWidget
											module={v}
											key={i}
										/>
									);
								})}
							</div>
						</div>
					</div>
					<div className="py-2">
						<div className="card shadow">
							<div className="card-body">
								<h4>کنترل شارژ</h4>
								<hr />
								{project?.modules?.map((v, i) => {
									return <ChargeWidget module={v} key={i} />;
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<div className="py-2">
						<CCard className="shadow">
							<CCardHeader>
								<h4>اطلاعات کامل پنل</h4>
							</CCardHeader>
							<CCardBody>
								{project?.modules?.map((module, i) => {
									return (
										<CCard key={i}>
											<CCardHeader>
												{module?.title}
											</CCardHeader>
											<CCardBody>
												<CRow>
													<CCol md={6}>
														<div>
															<b>
																ارتباط دستگاه با
																سرور:{" "}
															</b>
															متصل
														</div>
														<div>
															<b>
																وضعیت دستگاه:{" "}
															</b>
															نرمال
														</div>
													</CCol>
													<CCol md={6}>
														<div>
															<b>
																زمان آخرین
																بروزرسانی:{" "}
															</b>
															{/* {module?.last_packet?.received_at} */}
															{moment(
																module
																	?.last_packet
																	?.received_at
															).format(
																"jYYYY/jMM/jDD - HH:mm:ss"
															)}
														</div>
														<div>
															<b>وضعیت باتری: </b>
															نرمال
														</div>
													</CCol>
												</CRow>
												<CRow>
													<CCol>
														<b>
															ارتباط با آتش نشانی:{" "}
														</b>
														فعال
													</CCol>
													<CCol>
														<b>
															سیستم پیام اضطراری:{" "}
														</b>
														فعال
													</CCol>
												</CRow>
												<CRow>
													<CCol>
														<b>
															وضعیت رله های خروجی:{" "}
														</b>
													</CCol>
													<CCol>آسانسور: قطع</CCol>
													<CCol>لابی: قطع</CCol>
													<CCol>آشپزخانه: قطع</CCol>
													<CCol>تاسیسات: قطع</CCol>
												</CRow>
											</CCardBody>
										</CCard>
									);
								})}
							</CCardBody>
						</CCard>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Dashboard;
