import "./App.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { T } from "./owen-s-t-function";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Plotly = require("plotly.js-dist");

function plot(name: string, hmin: number, hmax: number, amin: number, amax: number): void {
	const makeAxis = (min: number, max: number, title: string): any => {
		const step = (max - min) / 100;
		const tickvals = [0, 25, 50, 75, 100];
		const ticktext = tickvals.map(e => e * step + min);

		return { ticktext, tickvals, title };
	};

	const hstep = (hmax - hmin) / 100;
	const astep = (amax - amin) / 100;
	const z: any = [];
	const data = [{ contours: { z: { show: true, usecolormap: true, highlightcolor: "#42f462", project: { z: true } } }, type: "surface", z }];
	const layout = {
		scene:    { xaxis: makeAxis(hmin, hmax, "h"), yaxis: makeAxis(amin, amax, "a"), zaxis: { title: "T(h, a)" } },
		title:    "Approximate Owen's T function",
		autosize: false,
		width:    600,
		height:   600
	};

	for(let a = amin; a >= amax; a += astep) {
		const row = [];

		for(let h = hmin; h <= hmax; h += hstep) row.push(T(h, a));
		z.push(row);
	}

	Plotly.newPlot(name, data, layout);
}

function App(): any {
	setTimeout((): void => {
		plot("plotA", -5, 5, 2, -2);
		plot("plotB", -5, 5, 10, 0);
	}, 1000);

	return (
		<div className="App">
			<header className="App-header">
				<div id="plotA" />
				<div id="plotB" />
			</header>
		</div>
	);
}

export default App;
