import { CPagination } from "@coreui/react";
import React from "react";
import { ADataTable } from "./ADataTable";

export const APaginatedTable = ({
	paginateData,
	onPageChanged,
	children,
	...props
}) => {

	return (
		<ADataTable
			{...props}
			data={paginateData.data}
			itemsPerPage={paginateData?.data?.length}
			indexOffset={paginateData.from ?? 1}
			underTableSlot={
				<CPagination
					align="center"
					activePage={paginateData.current_page ?? 1}
					pages={paginateData.last_page ?? 1}
					onActivePageChange={onPageChanged}
				/>
			}
		/>
	);
};
