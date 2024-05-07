import React, { Component } from "react";
import * as d3 from "d3";
import BarChart from "./BarChart";
import Scatter from "./Scatter";
import TIPS from "./SampleDataset.csv";

class App extends Component {
	state = {
		data: [],
	};

	componentDidMount() {
		d3.csv(TIPS).then((data) => {
			this.setState({
				data: data,
			});
		});
	}

	render() {
		const { data } = this.state;

		return (
			<div>
				<BarChart data={data} />
				<Scatter data={data} />
			</div>
		);
	}
}

export default App;
