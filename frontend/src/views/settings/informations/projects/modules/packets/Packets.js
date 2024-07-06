import React, { useState } from "react";
import { CButton, CCollapse } from "@coreui/react";
import { useRouteMatch } from "react-router-dom";
import { APaginatedTable } from "src/reusable/APaginatedTable";
import PacketDetails from "./PacketDetails";
import { usePackets } from "src/helper/DataHooks";

const Packets = () => {
	const match = useRouteMatch();
	const mId = parseInt(match.params.mid);
	const [expanded, setExpanded] = useState();
	const [page, setPage] = useState();
	const { data, status } = usePackets(mId, page);

	const fields = [
		// {key: 'id', label: 'شناسه'},
		{ key: "_index", label: "ردیف" },
		{ key: "received_at", label: "زمان دریافت" },
		{ key: "_details", label: "جزئیات" },
	];

	return (
		<>
			{/* <CRow className="mb-2">
				<CCol>
					<CButton color="primary" onClick={() => loadData()}>
						<CIcon content={cilLoopCircular} /> بروزرسانی
					</CButton>
				</CCol>
			</CRow> */}
			<APaginatedTable
				title="بسته ها"
				paginateData={data}
				onPageChanged={setPage}
				// data={modules}
				loading={status === "process"}
				fields={fields}
				// title={`${project?.name} - ماژول ها`}
				canInsert={false}
				canEdit={false}
				// itemsPerPage="2"
				// pagination={{
				// 	activePage: 1,
				// 	pages: 10,
				// 	onActivePageChange: (i) => {console.log(i)}
				// }}
				scopedSlots={{
					_details: (item, index) => {
						return (
							<td className="py-2">
								<CButton
									color="primary"
									variant="outline"
									shape="square"
									size="sm"
									onClick={() => {
										setExpanded(
											expanded === index ? null : index
										);
									}}
								>
									{expanded === index ? "مخفی" : "نمایش"}
								</CButton>
							</td>
						);
					},
					details: (item, index) => {
						const data = item?.data;
						return (
							<CCollapse show={expanded === index}>
								<PacketDetails data={data} />
							</CCollapse>
						);
					},
				}}
			/>
		</>
	);
};

export default Packets;
