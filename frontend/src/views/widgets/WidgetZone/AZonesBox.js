import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React, { useEffect, useRef, useState } from "react";
import { useLastPacket } from "src/helper/DataHooks";
import AWidgetZone from "./AWidgetZone";
import "./AZoneBox.css";

const AZonesBox = ({ module }) => {
	const decoder = useLastPacket(module.id);
	const [fullWidth, setFullWidth] = useState(true);
	const ref = useRef();

	useEffect(() => {
		window.addEventListener("resize", updateSize);
		updateSize();
		return () => {
			window.removeEventListener("resize", updateSize);
		};
	}, []);

	const updateSize = () => {
		setFullWidth(ref.current?.clientWidth > 600);
	};

	return (
		<div ref={ref}>
			{fullWidth ? (
				<div className="zb-container">
					<div className="zb-left">
						<AWidgetZone decoder={decoder} num={5} />
						<AWidgetZone decoder={decoder} num={6} />
						<AWidgetZone decoder={decoder} num={7} />
						<AWidgetZone decoder={decoder} num={8} />
					</div>
					<div className="zb-center">
						<svg preserveAspectRatio="xMidYMid" viewBox="0 0 150 150">
							<path
								d="M75.000,150.000 C33.579,150.000 -0.000,116.421 -0.000,75.000 C-0.000,33.579 33.579,-0.000 75.000,-0.000 C116.421,-0.000 150.000,33.579 150.000,75.000 C150.000,116.421 116.421,150.000 75.000,150.000 ZM75.000,15.000 C41.863,15.000 15.000,41.863 15.000,75.000 C15.000,108.137 41.863,135.000 75.000,135.000 C108.137,135.000 135.000,108.137 135.000,75.000 C135.000,41.863 108.137,15.000 75.000,15.000 Z"
								fill="#2eb85c"
								
							/>
						</svg>
						<div>{module?.title}</div>
					</div>
					<div className="zb-right">
						<AWidgetZone decoder={decoder} num={1} />
						<AWidgetZone decoder={decoder} num={2} />
						<AWidgetZone decoder={decoder} num={3} />
						<AWidgetZone decoder={decoder} num={4} />
					</div>
				</div>
			) : (
				<CCard>
					<CCardHeader>
						<h4>{module?.title}</h4>
					</CCardHeader>
					<CCardBody>
						<div className="zb-container zb-fluid">
							<AWidgetZone decoder={decoder} num={1} />
							<AWidgetZone decoder={decoder} num={2} />
							<AWidgetZone decoder={decoder} num={3} />
							<AWidgetZone decoder={decoder} num={4} />
							<AWidgetZone decoder={decoder} num={5} />
							<AWidgetZone decoder={decoder} num={6} />
							<AWidgetZone decoder={decoder} num={7} />
							<AWidgetZone decoder={decoder} num={8} />
						</div>
					</CCardBody>
				</CCard>
			)}
		</div>
		// <Row>
		// 	<h4>{module?.title}</h4>

		// 	{new Array(8).fill(1).map((_, num) => {
		// 		return (
		// 			<CCol md="3" key={num}>
		// 				<AWidgetZone decoder={decoder} num={num + 1} />
		// 			</CCol>
		// 		);
		// 	})}
		// </Row>
	);
};

export default AZonesBox;
