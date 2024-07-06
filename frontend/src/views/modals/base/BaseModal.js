import {
	CModal,
} from "@coreui/react";
import React from "react";

const BaseModal = ({children, open, toggle, ...props}) => {

	return (
		<CModal show={open} onClose={toggle} {...props}>
			{children}
		</CModal>
	);
};

export default BaseModal;
