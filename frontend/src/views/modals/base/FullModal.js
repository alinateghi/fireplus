import React from "react";
import { BaseModal } from "..";
import "./CustomStyle.css";

const FullModal = (props) => {
	return (
		<BaseModal className="full" {...props}>
			{props.children}
		</BaseModal>
	);
};

export default FullModal;
