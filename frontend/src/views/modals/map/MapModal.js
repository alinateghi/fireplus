import React, { useEffect, useRef, useState } from "react";
import { FullModal } from "..";
// import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

const MapModal = ({ children, ...props }) => {
	const [opened, setOpend] = useState(false);
	const [height, setHeight] = useState(0);
	const ref = useRef();
	var url =
		"https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}";
	//   let token =
	//     "pk.eyJ1IjoiYWxpaW5hdGVnaGlpaSIsImEiOiJja2R4NTQzcmsyeWNzMnB0dmkzaWxzaHhxIn0.VzBT00cHlNVQJgasxDKYrA";
	//   url = url.replace("accessToken", token);
	let position = [36.27, 59.61];
	//   let position = [59.61, 36.27];

	useEffect(() => {
		if (opened && ref.current) {
			setHeight(ref.current.clientHeight);
		}
	}, [opened, ref]);

	return (
		<FullModal
			centered={true}
			size="xl"
			onOpened={() => setOpend(true)}
			// scrollable={false}
			innerRef={ref}
			{...props}
		>
			<div className="h-100">
				{opened && height && (
					<MapContainer
						id="mapid"
						center={position}
						zoom={12}
						style={{ height: `${height}px` }}
					>
						<TileLayer
							//   url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
							url={url}
							attribution='<a href="https://www.openstreetmap.org/">OpenStreetMap</a>|<a href="https://www.mapbox.com/">Mapbox</a>'
							id="mapbox/streets-v11"
							//   tileSize='512'
							maxZoom="18"
							//   zoomOffset='-1'
							accessToken="pk.eyJ1IjoiYWxpaW5hdGVnaGlpaSIsImEiOiJja2R4NTQzcmsyeWNzMnB0dmkzaWxzaHhxIn0.VzBT00cHlNVQJgasxDKYrA"
						/>
					</MapContainer>
				)}
			</div>
		</FullModal>
	);
};

export default MapModal;
