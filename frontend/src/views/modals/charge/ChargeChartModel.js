import React from "react";
import {
	CModalHeader,
	CModalBody,
	CModalFooter,
	CButton,
} from "@coreui/react";
import { BaseModal } from "..";

const ChargeChartModel = (props) => {
	return (
		<BaseModal centered={true} size="xl" {...props} >
			<CModalHeader closeButton>Modal title</CModalHeader>
			<CModalBody>Lorem ipsum dolor...</CModalBody>
			<CModalFooter>
				<CButton color="primary">Do Something</CButton>{" "}
				<CButton color="secondary">
					Cancel
				</CButton>
			</CModalFooter>
		</BaseModal>
	);
};

export default ChargeChartModel;
