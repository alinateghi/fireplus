import React from "react";
import { useData } from "src/data";
import {
	CSidebarNavTitle,
	CSidebarNavItem,
} from "@coreui/react";

const ProjectsNavItems = () => {
	const { data } = useData("projects");
	console.log(data);
	const items = data.map((v, i) => {
		return <CSidebarNavItem key={i} name={v.name} icon="cil-drop" />;
	});
	return (
		// <CCreateElement
		// 	// items={[
		// 	// 	{
		// 	// 		_tag: "CSidebarNavTitle",
		// 	// 		_children: ["پروژه ها"],
		// 	// 	},
		// 	// 	...items,
		// 	// ]}
		// 	items={items}
		// 	components={{
		// 		CSidebarNavDivider,
		// 		CSidebarNavDropdown,
		// 		CSidebarNavItem,
		// 		CSidebarNavTitle,
		// 	}}
		// />
		<>
			<CSidebarNavTitle>پروژه ها</CSidebarNavTitle>
			{items}
		</>
	);
};

export default ProjectsNavItems;
