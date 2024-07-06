import React from "react";
import { useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	CCreateElement,
	CSidebar,
	CSidebarBrand,
	CSidebarNav,
	CSidebarNavDivider,
	CSidebarNavTitle,
	CSidebarMinimizer,
	CSidebarNavDropdown,
	CSidebarNavItem,
} from "@coreui/react";

// import CIcon from "@coreui/icons-react";
import logo from "./../assets/icons/logo_main.png"
import logo_tiny from "./../assets/icons/logo_tiny.png"

// sidebar nav config
import navigation from "./_nav";
import settingsNav from "./_nav_settings";
import ProjectsNavItems from "./_nav_projects";

const TheSidebar = () => {
	const dispatch = useDispatch();
	const show = useSelector((state) => state.sidebarShow);

	let items = navigation;
	if (useRouteMatch("/settings")) {
		items = [...items, ...settingsNav];
	}

	return (
		<CSidebar
			show={show}
			onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
		>
			<CSidebarBrand className="d-md-down-none" to="/">
				<img src={logo} height={35} className="c-sidebar-brand-full" alt="logo"/>
				<img src={logo_tiny} height={35} className="c-sidebar-brand-minimized" alt="logo"/>
				{/* <CIcon
					className="c-sidebar-brand-full"
					// name="logo-negative"
					content={logo}
					height={35}
				/> */}
				{/* <CIcon
					className="c-sidebar-brand-minimized"
					name="sygnet"
					height={35}
				/> */}
			</CSidebarBrand>
			<CSidebarNav>
				<CCreateElement
					items={items}
					components={{
						CSidebarNavDivider,
						CSidebarNavDropdown,
						CSidebarNavItem,
						CSidebarNavTitle,
					}}
				/>
				{useRouteMatch("/dashboard") && <ProjectsNavItems />}
				{/* <ProjectsNavItems /> */}
			</CSidebarNav>
			<CSidebarMinimizer className="c-d-md-down-none" />
		</CSidebar>
	);
};

export default React.memo(TheSidebar);
