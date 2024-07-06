import { CButton } from "@coreui/react";
import React, { useState } from "react";

const ModalButton = (props) => {
	const [open, setOpen] = useState(false);

	let children = React.Children.toArray(props.children);
	let modals = [];
	let values = [];
	children.forEach((i) =>
		i.type?.name || i.type?.render?.name === "BaseModal" ? modals.push(i) : values.push(i)
	);

	console.log(modals);


	const toggle = () => {
		setOpen(!open);
	};

	return (
		<>
			<CButton className={props.className} onClick={() => setOpen(true)}>
				{values}
			</CButton>
			{open && modals.map((v, i) => React.cloneElement(v, {open: open, toggle: toggle}))}
			
		</>
	);
};

export default ModalButton;
