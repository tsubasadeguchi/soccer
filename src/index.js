import React, { useEffect, useState, useRef } from "react";
import { render } from "react-dom";
import * as d3 from "d3";
import * as d3hexbin from "d3-hexbin";

const HexbinPlot = ({ data, setSelectedGames }) => {
  const contentWidth = 800;
  const contentHeight = 500;
  const xTop = 0;
  const yTop = 0;
  const margin = {
    left: 50,
    right: 50,
    top: 50,
    bottom: 50,
  };
  const width = contentWidth + margin.left + margin.right;
  const height = contentHeight + margin.top + margin.bottom;
  const lineColor = "#444";

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (item) => item.PCA1))
    .range([0, contentWidth])
    .nice();
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (item) => item.PCA2))
    .range([contentHeight, 0])
    .nice();

  const hexbin = d3hexbin
    .hexbin()
    .x((item) => xScale(Math.max(item.PCA1)))
    .y((item) => yScale(Math.max(item.PCA2)))
    .radius(20)
    .extent([
      [0, 0],
      [contentWidth, contentHeight],
    ]);

  const bins = hexbin(data);
  const colorAccessor = (item) => {
    let total = 0;
    item.forEach((value) => {
      total += value.Mileage;
    });
    return total / item.length;
  };
  const colorScale = d3
    .scaleSequential(d3.interpolateYlGn)
    .domain(d3.extent(bins, colorAccessor));

  return (
    <svg viewBox={`${xTop} ${yTop} ${width} ${height}`}>
      <clipPath id="content-region">
        <rect x="0" y={yTop} width={contentWidth} height={contentHeight} />
      </clipPath>
      <g>
        <g
          clipPath="url(#content-region)"
          transform={`translate(${margin.left},${margin.top})`}
        >
          {bins.map((bin, i) => {
            function buttonClick() {
              setSelectedGames(bin);
            }
            return (
              <g key={i} transform={`translate(${bin.x},${bin.y})`}>
                <path
                  d={hexbin.hexagon()}
                  fill={colorScale(colorAccessor(bin))}
                  onClick={buttonClick}
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
            PCA1
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
            PCA2
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

const SearchGame = ({ data, setSelectedGames }) => {
  const selectData = setSelectedGames;
  //console.log(selectData);
  const selectArray = [];
  const teamArray = [];

  for (let i = 0; i < selectData.length; i++) {
    //それぞれを配列
    selectArray[i] = selectData[i];
  }
  for (let i = 0; i < selectData.length; i++) {
    teamArray[i] = selectArray[i].Team_H;
  }
  for (let i = 0; i < selectData.length; i++) {
    //console.log(selectArray[i]);
    //console.log(teamArray[i]);
  }
  //console.log(selectArray);
  //console.log(teamArray);
  const listTeam = selectArray.map((team) => (
    <li key={team}>
      {team.Team_H} {team.Goal_H} {team.Goal_A} {team.Team_A}
    </li>
  ));

  return <ul>{listTeam}</ul>;
};

const TotalPage = () => {
  const [data, setGameData] = React.useState([]);

  const [data2, setTeamData] = React.useState([]);
  const [selectedGames, setSelectedGames] = React.useState([]);
  //console.log(selectedGames);
  let positiveEl = useRef(null);

  function Arraycount(value) {
    return value.Team;
  }
  var gameArray = [];
  gameArray = data2.filter(Arraycount);
  const options = gameArray.map((value) => {
    return <option team={value.Team}>{value.Team}</option>;
  });

  React.useEffect(() => {
    fetch("J_Data.json")
      .then((response) => response.json())
      .then((data) => {
        data.game.forEach((item, i) => {
          item.id = i;
        });
        setGameData(data.game.filter((item) => item.View >= 0));
      });
    fetch("J_Data.json")
      .then((response2) => response2.json())
      .then((data) => {
        data.team.forEach((item, i) => {
          item.id = i;
        });
        setTeamData(data.team.filter((item) => item.Total >= 0));
      });
  }, []);
  return (
    <div>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css"
        ></link>
      </head>

      {/*配置*/}
      <div className="tile is-ancestor">
        <div className="tile is-vertical is-3">
          <div className="tile">
            <div className="tile is-parent is-vertical">
              <article className="tile is-child box">
                <p className="title">Team選択</p>

                <div className="control">
                  <div className="select is-multiple">
                    <select multiple ref={positiveEl}>
                      {options}
                    </select>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

      <figure className="image is-2by2">
        <HexbinPlot data={data} setSelectedGames={setSelectedGames} />
        <SearchGame data={data} setSelectedGames={selectedGames} />
      </figure>
    </div>
  );
};
render(<TotalPage />, document.querySelector("#content"));
