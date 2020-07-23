import React from "react";
import { render } from 'react-dom'
import * as d3 from "d3";
import * as d3hexbin from "d3-hexbin";

const HexbinPlot = ({ data }) => {
  const contentWidth = 800;
  const contentHeight = 500;
  const margin = {
    left: 80,
    right: 20,
    top: 20,
    bottom: 80,
  };
  const width = contentWidth + margin.left + margin.right;
  const height = contentHeight + margin.top + margin.bottom;
  const lineColor = "#444";

  const xScale = d3
    .scaleLog()
    .domain([1, d3.max(data, (item) => item.goal)])
    .range([0, contentWidth]);
  const yScale = d3
    .scaleLog()
    .domain([1, d3.max(data, (item) => item.shoots)])
    .range([contentHeight, 0])

  const hexbin = d3hexbin
    .hexbin()
    .x((item) => xScale(Math.max(1, item.goal)))
    .y((item) => yScale(Math.max(1, item.shoots)))
    .radius(20)
    .extent([
      [0, 0],
      [contentWidth, contentHeight],
    ]);
  const bins = hexbin(data);
  const colorAccessor = (item) => item.length;
  const colorScale = d3
    .scaleSequential(d3.interpolatePuBu)
    .domain([0, d3.max(bins, colorAccessor)]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <clipPath id="content-region">
        <rect x="0" y="0" width={contentWidth} height={contentHeight} />
      </clipPath>
      <g>
        <g
          clipPath="url(#content-region)"
          transform={`translate(${margin.left},${margin.top})`}
        >
          {bins.map((bin, i) => {
            return (
              <g key={i} transform={`translate(${bin.x},${bin.y})`}>
                <path
                  d={hexbin.hexagon()}
                  fill={colorScale(colorAccessor(bin))}
                />
              </g>
            );
          })}
        </g>
        <g
          transform={`translate(${margin.left},${margin.top + contentHeight})`}
        >
          <line x1="0" y1="0" x2={contentWidth} y2="0" stroke={lineColor} />
          <text
            transform={`translate(${contentWidth / 2},40)`}
            fontSize="12"
            fontWeight="800"
          >
            廃業数
          </text>
          {xScale.ticks().map((x) => {
            return (
              <g key={x} transform={`translate(${xScale(x)},0)`}>
                <line x1="0" y1="0" x2="0" y2="5" stroke={lineColor} />
                <text
                  fontSize="8"
                  transform={`translate(0,8)rotate(45)`}
                  dominantBaseline="central"
                >
                  {x}
                </text>
              </g>
            );
          })}
        </g>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <line x1="0" y1="0" x2="0" y2={contentHeight} stroke={lineColor} />
          <text
            transform={`translate(-30,${contentHeight / 2})rotate(-90)`}
            fontSize="12"
            fontWeight="800"
          >
            創業数
          </text>
          {yScale.ticks().map((y) => {
            return (
              <g key={y} transform={`translate(0,${yScale(y)})`}>
                <line x1="0" y1="0" x2="-5" y2="0" stroke={lineColor} />
                <text
                  x="-8"
                  fontSize="8"
                  textAnchor="end"
                  dominantBaseline="central"
                >
                  {y}
                </text>
              </g>
            );
          })}
        </g>
      </g>
    </svg>
  );
};

const HexbinPlotPage = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch("J_Total.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item, i) => {
          item.id = i;
        });
        setData(data.filter((item) => item.goal >= 0 && item.shoots >= 0));
      });
  }, []);

  return (
    <div>
      <h1 className="title is-3">サッカー</h1>
      <figure className="image is-3by2">
        <HexbinPlot data={data} />
      </figure>
    </div>
  );
};
render(<HexbinPlotPage />, document.querySelector('#content'))