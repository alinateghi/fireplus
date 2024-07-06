import React, { useMemo } from "react";
import { useLastPacket } from "src/helper/DataHooks";
import { ModalButton, SignalChartModel } from "src/views/modals";
import ModuleSignalStrength from "./ModuleSignalStrength";

const SignalStrengthWidget = ({ module }) => {
	const lastPacket = useLastPacket(module.id);

	const modal = useMemo(
		() => (
			<ModalButton className="btn-outline-primary">
				نمودار 24 ساعته
				<SignalChartModel module={module} />
			</ModalButton>
		),
		[module]
	);

	return (
		<div>
			<b>{module?.title}</b>
			<br />
			<span>سیم کارت: </span>
			{lastPacket.getSim()}
			<br />
			<ModuleSignalStrength module={module} />
			<div className="text-center">
				{/* <ModalButton className="btn-outline-primary">
					نمودار 24 ساعته
					<SignalChartModel
						module={module}
					/>
				</ModalButton> */}
				{modal}
			</div>
			<br />
			<br />
		</div>
	);
};

export default SignalStrengthWidget;
