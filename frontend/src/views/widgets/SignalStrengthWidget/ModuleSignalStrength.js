import React from "react";
import { useLastPacket } from "src/helper/DataHooks";
import { SignalStrength } from "..";

const ModuleSignalStrength = ({ module }) => {
	// const [dbm, setDBM] = useState(0);
	// const [module, setModule] = useState({});

	let packet = useLastPacket(module?.id);
	let dbm = packet?.getAnt();
	// let dbm = packet?.data?.ANT ?? 0;

	// useEffect(() => {
	// 	//setDBM(module?.last_packet?.data?.ANT ?? 0);

	// }, [module]);

	// useCustomEventListener("new-packet", function (data) {
	// 	let id = data.packet.module_id ?? null;
	// 	if (id === module.id) {
	// 		let ant = data.packet.data.ANT ?? 0;
	// 		setDBM(ant);
	// 	}
	// });

	const percentage = () => {
		return dbm * 3;
	};

	return <SignalStrength percentage={percentage()}>{dbm} dbm</SignalStrength>;
};

export default ModuleSignalStrength;
