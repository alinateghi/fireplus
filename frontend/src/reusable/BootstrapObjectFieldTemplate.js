import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const BootstrapObjectFieldTemplate = ({
	DescriptionField,
	description,
	TitleField,
	title,
	properties,
	required,
	uiSchema,
	idSchema,
}) => {
	if (uiSchema["ui:display"] === "inline")
		return (
			<Container>
				<Row className="align-items-center">
					<div className="flex-fill">
						{title}
						<sub>{description}</sub>
					</div>
					<div
						className={`d-flex align-items-center ${uiSchema["ui:contentClass"]}`}
					>
						{properties.map((element, index) => (
							<div key={index} className="mx-2">
								{element.content}
							</div>
						))}
					</div>
				</Row>
			</Container>
		);
	else
		return (
			<>
				{(uiSchema["ui:title"] || title) && (
					<TitleField
						id={`${idSchema.$id}-title`}
						title={title}
						required={required}
					/>
				)}
				{description && (
					<DescriptionField
						id={`${idSchema.$id}-description`}
						description={description}
					/>
				)}
				<Container fluid className="p-0 px-3">
					<Row style={{ marginBottom: "10px" }}>
						{properties.map((element, index) =>
							element.content.props.uiSchema["ui:col"] ? (
								<Col
									key={index}
									className={
										element.content.props.uiSchema["ui:col"]
									}
									xs={12}
								>
									{element.content}
								</Col>
							) : (
								<Col key={index} xs={12}>
									{element.content}
								</Col>
							)
						)}
					</Row>
				</Container>
			</>
		);
};

export default BootstrapObjectFieldTemplate;
