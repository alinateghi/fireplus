import React, { useState } from "react";
import moment from "moment-jalaali";
import { CBadge } from "@coreui/react";
import { APaginatedTable } from "src/reusable/APaginatedTable";
import { useProjectEvents } from "src/helper/DataHooks";
import CIcon from "@coreui/icons-react";
import {
	cilBullhorn,
	cilCommentBubble,
	cilPhone,
} from "@coreui/icons";

const ProjectEvents = (props) => {
	const [page, setPage] = useState();
	const { data, status } = useProjectEvents(props?.project?.id, page);

	const fields = [
		// {key: 'id', label: 'شناسه'},
		{ key: "_index", label: "ردیف" },
		{ key: "occurred_at", label: "زمان" },
		{ key: "type", label: "رخداد" },
		{ key: "module.title", label: "ماژول" },
		{ key: "notices", label: "وضعیت اطلاع رسانی" },
	];

	const eventExtra = (event) => {
		let extra = "در ";
		event.address && (extra += `\n${event.address}\n`);
		event.number && (extra += `شماره ${event.number} `);
		event.loop_num && (extra += `لوپ ${event.loop_num} `);
		event.zone && (extra += `زون ${event.zone}`);
		return extra == "در " ? "" : extra;
	};

	return (
		<APaginatedTable
			title={<h4>سیستم ثبت اطلاعات</h4>}
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
						case 0:
							return (
								<td style={{ whiteSpace: "pre-line" }}>
									وضعیت{" "}
									<span style={{ color: "green" }}>
										نرمال
									</span>{" "}
									{eventExtra(item)}
								</td>
							);
						case 10:
						case 11:
						case 12:
							return (
								<td style={{ whiteSpace: "pre-line" }}>
									اعلام{" "}
									<span style={{ color: "red" }}>حریق</span>{" "}
									{eventExtra(item)}
								</td>
							);
						case 20:
							return (
								<td style={{ whiteSpace: "pre-line" }}>
									اعلام{" "}
									<span style={{ color: "yellowgreen" }}>
										خطا
									</span>{" "}
									{eventExtra(item)}
								</td>
							);
						default:
							return <td>نا مشخص</td>;
					}
				},
				notices: (item) => {
					let call = 0,
						sms = 0;
					item.notices.forEach(function (notice, index) {
						if (notice.type === "call") call++;
						if (notice.type === "sms") sms++;
					});
					return (
						<td>
							{call} <CIcon content={cilPhone} /> - {sms}{" "}
							<CIcon content={cilCommentBubble} /> -{" "}
							<CIcon content={cilBullhorn} />
						</td>
					);
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
	);
};

export default ProjectEvents;
