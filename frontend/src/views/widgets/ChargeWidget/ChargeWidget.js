import React, { useMemo } from "react";
import { useLastPacket } from "src/helper/DataHooks";
import ChargeWidgetChart from "./ChargeWidgetChart";

const ChargeWidget = ({ module }) => {
	const lastPacket = useLastPacket(module.id);

	const chart = useMemo(
		() => <ChargeWidgetChart module={module} />,
		[module]
	);

	return (
		<div>
			<b>{module?.title}</b>
			<br />
			<span>سیم کارت: </span>
			{lastPacket.getSim()}
			<br />
			<span>شارژ خودکار: </span>
			{lastPacket.getAutoCharge() ? "روشن" : "خاموش"}
			<br />
			<span>شارژ: </span>
			{lastPacket.getCharge()}
			{/* <ChargeWidgetChart module={module} /> */}
			{chart}
			<br />
			<br />
		</div>
	);
};

export default ChargeWidget;
