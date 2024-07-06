import React from "react";
import { CCard, CCol, CRow } from "@coreui/react";
import { useLastPacket } from "src/helper/DataHooks";
import classNames from "classnames";

const AZonesBoxSimple = ({ module }) => {
	const decoder = useLastPacket(module.id);

	return (
		<CCard>
			<CRow className="m-0 align-items-center">
				<CCol sm="4" className="text-center">
					{module?.title}
				</CCol>
				<CCol sm="1" className="p-0">
					<AZonesBoxSimpleItem
						module={module}
						decoder={decoder}
						index={1}
					/>
				</CCol>
				<CCol sm="1" className="p-0">
					<AZonesBoxSimpleItem
						module={module}
						decoder={decoder}
						index={2}
					/>
				</CCol>
				<CCol sm="1" className="p-0">
					<AZonesBoxSimpleItem
						module={module}
						decoder={decoder}
						index={3}
					/>
				</CCol>
				<CCol sm="1" className="p-0">
					<AZonesBoxSimpleItem
						module={module}
						decoder={decoder}
						index={4}
					/>
				</CCol>
				<CCol sm="1" className="p-0">
					<AZonesBoxSimpleItem
						module={module}
						decoder={decoder}
						index={5}
					/>
				</CCol>
				<CCol sm="1" className="p-0">
					<AZonesBoxSimpleItem
						module={module}
						decoder={decoder}
						index={6}
					/>
				</CCol>
				<CCol sm="1" className="p-0">
					<AZonesBoxSimpleItem
						module={module}
						decoder={decoder}
						index={7}
					/>
				</CCol>
				<CCol sm="1" className="p-0">
					<AZonesBoxSimpleItem
						module={module}
						decoder={decoder}
						index={8}
					/>
				</CCol>
			</CRow>
		</CCard>
	);
};

const AZonesBoxSimpleItem = ({ module, decoder, index }) => {
	const getColor = () => {
		switch (decoder?.getZoneStatus(index)) {
			case 0:
				return "success";
			case 1:
				return "danger";
			case 2:
				return "warning";
			default:
				return "primary";
		}
	};

	const rootClass = classNames([
		`bg-${getColor()}`,
		"px-1",
		"py-3",
		"text-center",
	]);
	return (
		<div className={rootClass}>
			{decoder?.getZoneName(index) ?? `زون ${index}`}
		</div>
	);
};

export default AZonesBoxSimple;
