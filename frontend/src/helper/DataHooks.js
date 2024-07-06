import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { useCustomEventListener } from "react-custom-events";
import { useSelector } from "react-redux";
import { useData } from "src/data";
import { ApiRequest } from "./../api";
import PacketDecoder from "./PacketDecoder";
import PaginationManager from "./PaginationManager";

export const useInfo = () => {
	// const { status, data } = useSelector((state) => state.info);
	const { data } = useData("info");
	return data;
};

export const usePackets = (moduleId, page = null) => {
	const [data, setData] = useState([]);
	const [status, setStatus] = useState("idle");
	const request = new ApiRequest("packets");

	useEffect(() => {
		loadData(page);
	}, [page]); //eslint-disable-line

	const loadData = async (page) => {
		setStatus("process");
		const result = await request.fetchById(moduleId, { page });
		setStatus("done");
		setData(result);
	};

	useCustomEventListener("new-packet", function (eventData) {
		let packet = eventData.packet;
		let module_id = packet.module_id;
		if (module_id === moduleId) {
			let pm = new PaginationManager(data);
			setData(pm.addItemToTop(packet));
		}
	});

	return { data, status };
};

export const useLastPacket = (moduleId) => {
	return (
		useSelector((state) => state.lastPackets?.[moduleId]) ??
		new PacketDecoder()
	);
};

export const useLastPackets = (modules) => {
	const [packets, setPackets] = useState({});
	const lastPackets = useSelector((state) => state.lastPackets);
	useEffect(() => {
		if (modules) {
			let newPackets = packets;
			modules.forEach((module) => {
				newPackets = {
					...newPackets,
					[module.id]:
						lastPackets?.[module.id] ?? new PacketDecoder(),
				};
			});
			if (!isEqual(packets, newPackets)) setPackets(newPackets);
		}
	// }, [lastPackets]); //eslint-disable-line
	}, [lastPackets, modules]); //eslint-disable-line
	return packets;
};

export const useEvents = (page = null) => {
	const [data, setData] = useState([]);
	const [status, setStatus] = useState("idle");
	const request = new ApiRequest("events");

	useEffect(() => {
		loadData(page);
	}, [page]); //eslint-disable-line

	const loadData = async (page) => {
		setStatus("process");
		const result = await request.fetch({ page });
		setStatus("done");
		setData(result);
	};

	useCustomEventListener("new-event", function (eventData) {
		let event = eventData.event;
		let pm = new PaginationManager(data);
		setData(pm.addItemToTop(event));
	});

	return { data, status };
};

export const useProjectEvents = (project_id, page = null) => {
	const [data, setData] = useState([]);
	const [status, setStatus] = useState("idle");
	const request = new ApiRequest("events");

	console.log(data);

	useEffect(() => {
		if (project_id !== undefined && project_id !== null)
		loadData(page);
	}, [project_id, page]); //eslint-disable-line

	const loadData = async (page) => {
		setStatus("process");
		const result = await request.fetchById(project_id, { page });
		setStatus("done");
		setData(result);
	};

	useCustomEventListener("new-event-" + project_id, function (eventData) {
		console.log("new-event");
		console.log(eventData);
		//TODO
		let event = eventData.event;
		let pm = new PaginationManager(data);
		setData(pm.addItemToTop(event));
	});

	return { data, status };
};
