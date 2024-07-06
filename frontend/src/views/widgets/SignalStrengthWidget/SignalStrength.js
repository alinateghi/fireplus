import React, { useEffect, useState } from "react";
import lever from "./SignalStrengthLever-300.png";
import "./SignalStrength.css";

const SignalStrength = ({ percentage, children }) => {
	const [angle, setAngle] = useState(-69);

	const setPercentage = (p) => {
		setAngle((p - 50) * 1.38);
	};

	useEffect(() => {
		setPercentage(percentage);
	}, [percentage]);

	return (
		<div className="ss-container">
			<img
				className="ss-lever"
				src={lever}
				alt="signal-strength"
				style={{ transform: `rotate(${angle}deg)` }}
			/>
			<span className="ss-content">{children}</span>
		</div>
	);
};

export default SignalStrength;
