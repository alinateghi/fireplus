import { cilPen, cilPlus, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React, { useEffect, useRef, useState } from "react";
import "./UserProfileWidget.css";
import defaultImage from "./user-profile-default.jpg";
import classNames from "classnames";
import { toast } from "react-toastify";

const UserProfileWidget = (props) => {
	const [src, setSrc] = useState(defaultImage);
	const [isEmpty, setIsEmpty] = useState(true);
	const inputRef = useRef();

	useEffect(() => {
		setIsEmpty(src === defaultImage);
	}, [src]);

	useEffect(() => {
		props.value && setSrc(props.value);
	}, [props.value]);

	const selectImage = () => {
		inputRef.current.click();
	};

	const removeImage = () => {
		inputRef.current.value = null;
		setSrc(defaultImage);
		props.onChange('');
	};

	const fileChanged = (event) => {
		// e.preventDefault();
		let input = event.target;
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				if (e.target.result.startsWith("data:image/"))
				{
					setSrc(e.target.result);
					props.onChange(e.target.result);
				} else {
					toast.error("فرمت فایل صحیح نمی باشد!");
				}
			};
			reader.readAsDataURL(input.files[0]);
		}
	};

	const classes = classNames({
		"user-profile-widget": true,
		"up-empty": isEmpty,
	});

	return (
		<div className="user-profile-widget-container">
			<div className={classes}>
				<img src={src} alt="profile" />
				<input
					type="file"
					style={{ display: "none" }}
					ref={inputRef}
					onChange={fileChanged}
					accept="image/*"
				/>
				<button
					type="button"
					className="up-btn btn-add"
					onClick={selectImage}
				>
					<CIcon content={cilPlus} size="xl" />
				</button>
				<button
					type="button"
					className="up-btn btn-edit"
					onClick={selectImage}
				>
					<CIcon content={cilPen} size="lg" />
				</button>
				<button
					type="button"
					className="up-btn btn-remove"
					onClick={removeImage}
				>
					<CIcon content={cilTrash} size="lg" />
				</button>
			</div>
		</div>
	);
};

export default UserProfileWidget;
