import { CCol, CContainer, CRow } from "@coreui/react";
import React from "react";

const detailsData = [
	{
		T: "زمان",
		ID: "شناسه",
		sim: "سیم کارت",
		sc: "اعتبار",
		ANT: "آنتن دهی",
		d: "فاصله تا آتش نشانی",
		pass: "رمز",
	},
	{
		ZL1: "لیبل 1",
		ZL2: "لیبل 2",
		ZL3: "لیبل 3",
		ZL4: "لیبل 4",
		ZL5: "لیبل 5",
		ZL6: "لیبل 6",
		ZL7: "لیبل 7",
		ZL8: "لیبل 8",
	},
	{
		ZS1: "وضعیت 1",
		ZS2: "وضعیت 2",
		ZS3: "وضعیت 3",
		ZS4: "وضعیت 4",
		ZS5: "وضعیت 5",
		ZS6: "وضعیت 6",
		ZS7: "وضعیت 7",
		ZS8: "وضعیت 8",
	},
	{
		ac: "شارژ خودکار",
		st: "وضعیت های کنترلی",
		EMR: "وضعیت اضطراری",
		alg: "الگوریتم ها",
		din: "ورودی ها",
		rly: "رله ها",
		CHK: "امضا",
	},
];

const PacketDetails = ({ data }) => {
	return (
		<CContainer className="p-3">
			<CRow>
				{detailsData.map((items, index) => {
					return (
						<CCol key={index} md="3">
							{Object.entries(items).map(([k, v], index) => {
								return (
									<div key={index}>
										<b>{v}: </b>
										{data?.[k]}
									</div>
								);
							})}
						</CCol>
					);
				})}
			</CRow>
		</CContainer>
	);
};

export default PacketDetails;
