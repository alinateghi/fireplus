import React from "react";
import { Row } from "react-bootstrap";
import { ModalButton } from "src/views/modals";
import MapModal from "src/views/modals/map/MapModal";

const ALocationSelectField = function (props) {
	return (
		<Row>
			<div className="col-md-4 col-12">
				<div className="form-group">
					<div className="mb-0 form-group">
						<label className="form-label">عرض جغرافیایی</label>
						<input
							type="number"
							id="root_location_geolat"
							className="form-control"
							// value=""
						/>
					</div>
				</div>
			</div>
			<div className="col-md-4 col-12">
				<div className="form-group">
					<div className="mb-0 form-group">
						<label className="form-label">طول جغرافیایی</label>
						<input
							type="number"
							id="root_location_geolong"
							className="form-control"
							// value=""
						/>
					</div>
				</div>
			</div>
			<div className="col-md-4 col-12" style={{ alignSelf: "flex-end" }}>
				<div className="form-group">
					{/* <button className="btn btn-primary btn-block" type="button">مسیریابی روی نقشه</button> */}
					<ModalButton className="btn-primary btn-block">
						مسیریابی روی نقشه
						<MapModal></MapModal>
					</ModalButton>
				</div>
			</div>
		</Row>
	);
};

export default ALocationSelectField;
