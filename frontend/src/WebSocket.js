import React, { useEffect } from "react";
import Echo from "laravel-echo";
import axios from "axios";
import { emitCustomEvent } from "react-custom-events";
import { useDispatch, useSelector } from "react-redux";
import PacketDecoder from "./helper/PacketDecoder";

require("pusher-js");

const WebSocket = ({ children }) => {
	const dispatch = useDispatch();
	// const lastPackets = useSelector((state) => state.lastPackets);

	useEffect(() => {
		/**
		 * Laravel Echo / Pusher options
		 */
		const options = {
			broadcaster: "pusher",
			key: process.env.REACT_APP_PUSHER_KEY,
			wsHost: process.env.REACT_APP_PUSHER_HOST,
			wsPort: 6001,
			wssHost: window.location.hostname,
			wssPort: 6001,
			enabledTransports: ["ws", "wss"],
			authEndpoint: process.env.REACT_APP_PUSHER_ENDPOINT,
			forceTLS: false,
			disableStats: true,
			encrypted: false,
			authorizer: (channel, options) => {
				return {
					authorize: (socketId, callback) => {
						axios
							.post(options.authEndpoint, {
								socket_id: socketId,
								channel_name: channel.name,
							})
							.then((response) => {
								callback(false, response.data);
							})
							.catch((error) => {
								callback(true, error);
							});
					},
				};
			},
		};

		const echo = new Echo(options);
		const updateChannel = echo.private("update");

		updateChannel.listen(".new-packet", (data) => {
			emitCustomEvent("new-packet", data);
			let id = data.packet.module_id ?? null;
			dispatch({
				type: "update",
				key: "lastPackets",
				data: { [id]: new PacketDecoder(data.packet) },
			});
		});

		updateChannel.listen(".new-event", (data) => {
			emitCustomEvent("new-event", data);
			const projectId = (data.event.module.project_id ?? null);
			emitCustomEvent("new-event-" + projectId, data);
		});
	}, []); // eslint-disable-line

	return <>{children}</>;
};

export default WebSocket;
