import { cilTouchApp } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";
import ALink from "src/reusable/ALink";
import { PATH_MODULES_LIST } from "src/routes";
import { ShowTable } from "../../base/ShowTable";

const Projects = () => {
	const fields = [
		// {key: 'id', label: 'شناسه'},
		{ key: "_index", label: "ردیف" },
		{ key: "name", label: "نام" },
		{ key: "_modules", label: "ماژول ها" },
	];

	return (
		<ShowTable
			fields={fields}
			dataKey="projects"
			dataName="پروژه"
			rootPath="/settings/projects"
			scopedSlots={{
				_modules: (item) => (
					<td>
						<span className="px-2">
							{item?.modules?.length ?? 0}
						</span>
						<ALink to={PATH_MODULES_LIST} params={{ pid: item.id }}>
							<CIcon content={cilTouchApp} />
						</ALink>
					</td>
				),
			}}
		/>
	);
};

export default Projects;
