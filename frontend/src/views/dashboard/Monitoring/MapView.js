import React from "react";
import MapMarker from "./MapMarker";
import { MapContainer, TileLayer } from "react-leaflet";
import { useData } from "src/data";
import "leaflet/dist/leaflet.css";

const MapView = (props) => {
	const { data: projects } = useData("projects");
	const url =
		"https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}";
	// const position = [36.28, 59.57];
	// const position = [36.27, 59.61];
	const position = [36.3038247, 59.5810201];

	return (
		<MapContainer
			id="mapid"
			center={position}
			zoom={11}
			style={{ height: "300px" }}
		>
			<TileLayer
				url={url}
				attribution='<a href="https://www.openstreetmap.org/">OpenStreetMap</a>|<a href="https://www.mapbox.com/">Mapbox</a>'
				id="mapbox/streets-v11"
				//   tileSize='512'
				maxZoom="18"
				//   zoomOffset='-1'
				accessToken="pk.eyJ1IjoiYWxpaW5hdGVnaGlpaSIsImEiOiJja2R4NTQzcmsyeWNzMnB0dmkzaWxzaHhxIn0.VzBT00cHlNVQJgasxDKYrA"
			/>
			{projects.map((project, index) => (
				<MapMarker key={index} id={project.id} onSelect={() => props.onProjectSelect(project.id)} />
			))}
		</MapContainer>
	);
};

export default MapView;
