import React, { useState } from "react";
import { useCustomEventListener } from "react-custom-events";

function ReceivedData({ module }) {
	const [data, setData] = useState([]);

	console.log(data);

	useCustomEventListener("new-packet", function (eventData) {
		let packet = eventData.packet;
		let module_id = packet.module_id;
		if (module_id === module.id) {
			if (packet.data["string"] && packet.data["string"].length > 0)
				setData((d) => [...d, packet.data["string"]]);
		}
	});

	return (
		<>
			{data.map((v, i) => (
				<pre key={i}>{v}</pre>
			))}
		</>
	);
}

export default ReceivedData;
