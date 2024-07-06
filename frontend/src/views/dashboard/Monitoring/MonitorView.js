import React, { useState } from "react";
import { CBadge } from "@coreui/react";
import { APaginatedTable } from "src/reusable/APaginatedTable";
import moment from "moment-jalaali";
import AZonesBoxSimple from "src/views/widgets/WidgetZone/AZonesBoxSimple";
import { useEvents } from "src/helper/DataHooks";
import { useData } from "src/data";

const MonitorView = (props) => {
	const [page, setPage] = useState();
	const { data, status } = useEvents(page);
	const { data: projects, status: projectStatus } = useData("projects");

	const fields = [
		// {key: 'id', label: 'شناسه'},
		{ key: "_index", label: "ردیف" },
		{ key: "occurred_at", label: "زمان" },
		{ key: "type", label: "رخداد" },
		{ key: "module.project.name", label: "پروژه" },
		{ key: "module.title", label: "ماژول" },
		{ key: "module.project.organization.name", label: "ارگان" },
		{ key: "module.project.company.name", label: "شرکت" },
		{ key: "info", label: "وضعیت اطلاع رسانی" },
	];

	return (
		<>
			{projectStatus &&
				projects.map((project) =>
					project?.modules?.map((module, i) => (
						<AZonesBoxSimple key={i} module={module} />
					))
				)}

			<APaginatedTable
				title="رخداد ها"
				paginateData={data}
				onPageChanged={setPage}
				// data={modules}
				loading={status === "process"}
				fields={fields}
				// title={`${project?.name} - ماژول ها`}
				canInsert={false}
				canEdit={false}
				tableFilter={false}
				scopedSlots={{
					type: (item) => {
						switch (item?.type) {
							case "normal":
								return (
									<td>
										وضعیت{" "}
										<span style={{ color: "green" }}>
											نرمال
										</span>
										<br />
										در زون {item?.zone}
									</td>
								);
							case "fire":
								return (
									<td>
										اعلام{" "}
										<span style={{ color: "red" }}>
											حریق
										</span>
										<br />
										در زون {item?.zone}
									</td>
								);
							case "fault":
								return (
									<td>
										اعلام{" "}
										<span style={{ color: "yellowgreen" }}>
											خطا
										</span>
										<br />
										در زون {item?.zone}
									</td>
								);
							default:
								return <td>نا مشخص</td>;
						}
					},
					occurred_at: (item) => {
						let m = moment(item?.occurred_at, "YYYY-M-D HH:mm:ss");
						let d = moment().diff(m, "minutes");
						return (
							<td>
								{m.format("jYYYY/jM/jD HH:mm:ss")}
								{d < 5 && (
									<CBadge className="mr-2" color="primary">
										جدید
									</CBadge>
								)}
							</td>
						);
					},
				}}
			/>
		</>
	);
};

export default MonitorView;
