import { cilTouchApp } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";
import { useRouteMatch } from "react-router-dom";
import { useData } from "src/data";
import ALink from "src/reusable/ALink";
import { PATH_MODULES_CONFIG, PATH_PACKETS_LIST } from "src/routes";
import { ADataTable } from "../../../../../reusable/ADataTable";

export const useModuleSelector = () => {
	const match = useRouteMatch();
	const pId = match.params.pid;
	return {
		type: "modules",
		baseType: "projects",
		state: (state) => state.projects,
		project: (state) =>
			state.projects.data?.find((i) => i.id.toString() === pId),
		modules: (state) =>
			state.projects.data?.find((i) => i.id.toString() === pId)?.modules,
	};
};

const Modules = () => {
	const { project, modules, status } = useData(useModuleSelector());
	// const project = data?.find((i) => i.id.toString() === pId);
	const fields = [
		// {key: 'id', label: 'شناسه'},
		{ key: "_index", label: "ردیف" },
		{ key: "title", label: "عنوان" },
		{ key: "_packets", label: "بسته های دریافتی" },
		{ key: "_configs", label: "تنظیمات" },
	];

	return (
		<ADataTable
			// data={project?.modules}
			data={modules}
			loading={status === "idle"}
			fields={fields}
			title={`${project?.name} - ماژول ها`}
			canEdit
			scopedSlots={{
				_packets: (item) => (
					<td>
						<ALink
							to={PATH_PACKETS_LIST}
							params={{ pid: item.project_id, mid: item.id }}
						>
							<CIcon content={cilTouchApp} />
						</ALink>
					</td>
				),
				_configs: (item) => (
					<td>
						<ALink
							to={PATH_MODULES_CONFIG}
							params={{ pid: item.project_id, mid: item.id }}
						>
							<CIcon content={cilTouchApp} />
						</ALink>
					</td>
				),
			}}
		/>
	);
};

export default Modules;
