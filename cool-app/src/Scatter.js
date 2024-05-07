import React, { Component } from "react";
import * as d3 from "d3";

class ScatterPlot extends Component {
	state = {
		selectedCategory: "A",
	};

	componentDidMount() {
		this.drawChart();
	}

	componentDidUpdate() {
		this.drawChart();
	}

	drawChart() {
		const { data } = this.props;
		const { selectedCategory } = this.state;

		const filteredData = data.filter((d) => d.category === selectedCategory);
		console.log(filteredData);
		d3.select(this.refs.chart).selectAll("*").remove();

		const svg = d3
			.select(this.refs.chart)
			.append("svg")
			.attr("width", 500)
			.attr("height", 500);

		svg
			.selectAll("circle")
			.data(filteredData)
			.enter()
			.append("circle")
			.attr("cx", (d) => d.x * 10)
			.attr("cy", (d) => 500 - d.y * 10)
			.attr("r", 5)
			.attr("fill", "blue");
	}

	handleCategoryChange = (event) => {
		this.setState({ selectedCategory: event.target.value });
	};

	render() {
		return (
			<div>
				<select onChange={this.handleCategoryChange}>
					<option value="A">A</option>
					<option value="B">B</option>
					<option value="C">C</option>
				</select>
				<div ref="chart" className="chart"></div>
			</div>
		);
	}
}

export default ScatterPlot;
