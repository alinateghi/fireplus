import React, { useEffect, useState } from "react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import Api from "src/api/Api";

// const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";
const brandDanger = getStyle("danger") || "#f86c6b";

const ChargeChart = ({ module, ...attributes }) => {
	const [chartData, setChartData] = useState({});

	useEffect(() => {
		Api.fetchChargeChartData(module?.id).then((data) => {
			if (data !== false) {
				console.log(data);
				setChartData(data);
			}
		});
	}, []); // eslint-disable-line

	const defaultDatasets = (() => {
		return [
			{
				label: "شارژ",
				backgroundColor: hexToRgba(brandInfo, 10),
				borderColor: brandInfo,
				pointHoverBackgroundColor: brandInfo,
				borderWidth: 2,
				data: chartData?.data?.amounts,
			},
			{
				label: "آستانه",
				backgroundColor: "transparent",
				borderColor: brandDanger,
				pointHoverBackgroundColor: brandDanger,
				borderWidth: 1,
				borderDash: [8, 5],
				data: chartData?.data?.threshold,
			},
		];
	})();

	const defaultOptions = (() => {
		return {
			responsive: true,
			maintainAspectRatio: false,
			legend: {
				display: false,
			},
			scales: {
				xAxes: [
					{
						gridLines: {
							drawOnChartArea: false,
						},
					},
				],
				yAxes: [
					{
						ticks: {
							beginAtZero: true,
							maxTicksLimit: 5,
							stepSize: Math.ceil(50000 / 5),
							max: 50000,
						},
						gridLines: {
							display: true,
						},
					},
				],
			},
			elements: {
				point: {
					radius: 0,
					hitRadius: 10,
					hoverRadius: 4,
					hoverBorderWidth: 3,
				},
			},
		};
	})();

	// render
	return (
		<CChartLine
			{...attributes}
			datasets={defaultDatasets}
			options={defaultOptions}
			labels={chartData?.labels}
		/>
	);
};

export default ChargeChart;
