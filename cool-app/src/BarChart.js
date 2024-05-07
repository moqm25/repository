import React, { Component } from "react";
import * as d3 from "d3";

class BarChart extends Component {
	componentDidMount() {
		this.drawChart();
	}

	componentDidUpdate() {
		this.drawChart();
	}

	drawChart() {
		const { data } = this.props;

		const countA = data.filter((d) => d.category === "A").length;
		const countB = data.filter((d) => d.category === "B").length;
		const countC = data.filter((d) => d.category === "C").length;

		const DATA = [
			{ label: "B", value: countB },
			{ label: "A", value: countA },
			{ label: "C", value: countC },
		];

		const svgHeight = 500;
		const svgWidth = 500;

		const yScale = d3
			.scaleLinear()
			.domain([0, d3.max(DATA, (d) => d.value)])
			.range([svgHeight, 0]);

		d3.select(this.refs.chart).selectAll("*").remove();

		const svg = d3
			.select(this.refs.chart)
			.append("svg")
			.attr("width", svgWidth)
			.attr("height", svgHeight);

		svg
			.selectAll("rect")
			.data(DATA)
			.enter()
			.append("rect")
			.attr("x", (d, i) => i * 70)
			.attr("y", (d) => yScale(d.value))
			.attr("width", 65)
			.attr("height", (d) => svgHeight - yScale(d.value))
			.attr("fill", "green");

		svg
			.selectAll(".label")
			.data(DATA)
			.enter()
			.append("text")
			.text((d) => d.label)
			.attr("x", (d, i) => i * 70 + 32.5)
			.attr("y", svgHeight)
			.attr("text-anchor", "middle");

		svg
			.selectAll(".count")
			.data(DATA)
			.enter()
			.append("text")
			.text((d) => d.value)
			.attr("x", (d, i) => i * 70 + 32.5)
			.attr("y", (d) => yScale(d.value) + 20)
			.attr("text-anchor", "middle")
			.attr("fill", "white");
	}

	render() {
		return <div ref="chart" className="chart"></div>;
	}
}

export default BarChart;
