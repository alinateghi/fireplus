import {
	cilCheckCircle,
	cilChevronDoubleUp,
	cilFire,
	cilMedicalCross,
	cilSearch,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";
import "./AWidgetZone.css";

const AWidgetZone = ({ decoder, num, ...props }) => {
	const testMode = decoder.isInTestMode(num);
	const updateMode = decoder.isInUpdateMode(num);

	const getStatus = () => {
		decoder.getZoneStatusString(num);
	};

	const getIcon = () => {
		switch (decoder.getZoneStatus(num)) {
			case 0:
				return cilCheckCircle;
			case 1:
				return cilFire;
			case 2:
				return cilMedicalCross;
			default:
				return null;
		}
	};

	const getColor = () => {
		switch (decoder.getZoneStatus(num)) {
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

	return (
		<div className="zb-widget">
			<div className={`zb-icon bg-${getColor()}`} title={getStatus()}>
				<div className={`bg-gradient-${getColor()}`}>
					<CIcon content={getIcon()} size="xl" />
				</div>
			</div>
			<div className="zb-box">
				<div className="zb-body">
					<div className="zb-title">{`زون ${num}`}</div>
					<div className="zb-sub">
						{decoder.getZoneName(num) || "بدون نام"}
					</div>
				</div>
				{updateMode && (
					<div
						className="bg-gradient-info zb-extra"
						title="Update Mode"
					>
						<CIcon
							content={cilChevronDoubleUp}
							size="xl"
							alt="Update"
						/>
					</div>
				)}
				{testMode && (
					<div
						className="bg-gradient-warning zb-extra"
						title="Test Mode"
					>
						<CIcon content={cilSearch} size="xl" alt="Test" />
					</div>
				)}
			</div>
		</div>
		// <div className="card overflow-hidden my-2">
		// 	<div className="card-body p-0 d-flex align-items-center">
		// 		<div className={`bg-gradient-${getColor()} p-4 mfe-3`}>
		// 			<CIcon content={getIcon()} size="xl"/>
		// 			{/* <CIcon name="cil-check-circle"/> */}
		// 		</div>
		// 		<div>
		// 			<div className={`text-value text-${getColor()}`}>{`زون ${num} - ${decoder.getZoneName(num) || "بدون نام"}`}</div>
		// 			<div className="text-muted text-uppercase font-weight-bold small">
		// 				Widget title
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
	);
};

export default AWidgetZone;
