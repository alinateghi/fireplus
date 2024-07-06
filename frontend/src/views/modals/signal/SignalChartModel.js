import React, { useState } from "react";
import { CModalHeader, CModalBody } from "@coreui/react";
import { FullModal } from "..";
import { SignalChart } from "src/views/charts";

const SignalChartModel = ({ children, module, ...props }) => {
	const [show, setShow] = useState(false);

	const loadChart = () => {
		console.log("show");
		setShow(true);
	};

	return (
		<FullModal
			centered={true}
			size="xl"
			onOpened={loadChart}
			scrollable={false}
			{...props}
		>
			<CModalHeader closeButton>
				نمودار 24 ساعته شارژ - {module?.title}
			</CModalHeader>
			<CModalBody className="d-flex flex-column justify-content-center py-3">
				{show && (
					<SignalChart module={module} className="flex-fill py-3" />
				)}
			</CModalBody>
		</FullModal>
	);
};

export default SignalChartModel;
