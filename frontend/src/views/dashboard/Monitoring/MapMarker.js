import React, { useState } from "react";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { useData } from "src/data";
import "leaflet/dist/leaflet.css";
import { useLastPackets } from "src/helper/DataHooks";
// import pointer from './../../../assets/icons/pointer-black.svg'
import blackPointer from "src/assets/icons/pointers/pointer-black.svg";
import bluePointer from "src/assets/icons/pointers/pointer-blue.svg";
import redPointer from "src/assets/icons/pointers/pointer-red.svg";
import yellowPointer from "src/assets/icons/pointers/pointer-yellow.svg";
import greenPointer from "src/assets/icons/pointers/pointer-green.svg";
import grayPointer from "src/assets/icons/pointers/pointer-gray.svg";

const MapMarker = (props) => {
	const [status, setStatus] = useState("idle");
	const [project, setProject] = useState({});
	const { fetchItem } = useData("projects");
	const packets = useLastPackets(project?.modules);

	const fetchProject = async () => {
		setStatus("process");
		const project = await fetchItem(props.id);
		setProject(project);
		setStatus("success");
	};
	status === "idle" && fetchProject();

	if (
		status !== "success" ||
		!project?.location?.geolat ||
		!project?.location?.geolong
	)
		return null;

	const states = Object.values(packets).reduce(
		(states, packet) => {
			if (packet.hasData()) {
				// TODO: 2min delay for offline
				return {
					...states,
					fire: states.fault + packet.getFireCount(),
					fault: states.fault + packet.getFaultCount(),
					update: states.fault + packet.getUpdateModeCount(),
					test: states.fault + packet.getTestModeCount(),
				};
			} else {
				return { ...states, offline: states.offline + 1 };
			}
		},
		{
			offline: 0,
			fault: 0,
			fire: 0,
			update: 0,
			test: 0,
		}
	);
	const getPointerImage = () => {
		return (
			Object.entries(packets).map(([id, packet], index) => {
				if (packet.hasData()) {
					// TODO: 2min delay for offline
					if (packet.hasAnyFault()) return yellowPointer;
					if (packet.hasAnyFire()) return redPointer;
					if (packet.hasAnyUpdateMode()) return bluePointer;
					if (packet.hasAnyTestMode()) return grayPointer;
					return greenPointer;
				} else {
					return blackPointer;
				}
			})[0] ?? greenPointer
		);
	};

	const pointerIcon = new L.Icon({
		iconUrl: getPointerImage(),
		iconSize: [26, 34],
		iconAnchor: [13, 29],
		popupAnchor: [0, -30],
	});

	const position = [project.location.geolat, project.location.geolong];

	// const handler = new L.Evented().on("click", function (e) {
	// 	console.log("marker clicked!");
	// });
	return (
		<Marker
			position={position}
			icon={pointerIcon}
			eventHandlers={{
				click: (e) => props.onSelect()
			}}
		>
			<Popup>
				<div className="text-center">
					<b>{project.name}</b>
					<br />
					نصب شده: {Object.keys(packets).length}
					<br />
					خاموش: {states.offline}
					<br />
					خطا: {states.fault}
				</div>
			</Popup>
		</Marker>
	);
};

export default MapMarker;
