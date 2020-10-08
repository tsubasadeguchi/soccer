import "bulma/css/bulma.css";
import "./index.css";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import * as d3 from "d3";
import * as d3hexbin from "d3-hexbin";

const HexbinPlot = ({ data, setSelectedGames, axis, setSelectedColor }) => {
  let axisX;
  let axisY;
  if (axis === "PCA") {
    axisX = "PCA1";
    axisY = "PCA2";
  } else {
    axisX = "tSNE_X";
    axisY = "tSNE_Y";
  }
  const contentWidth = 800;
  const contentHeight = 500;
  const xTop = 0;
  const yTop = 0;
  const margin = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };
  const width = contentWidth + margin.left + margin.right;
  const height = contentHeight + margin.top + margin.bottom;

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (item) => item[axisX]))
    .range([0, contentWidth])
    .nice();
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (item) => item[axisY]))
    .range([contentHeight, 0])
    .nice();
  const hexbin = d3hexbin
    .hexbin()
    .x((item) => xScale(Math.max(item[axisX])))
    .y((item) => yScale(Math.max(item[axisY])))
    .radius(20)
    .extent([
      [0, 0],
      [contentWidth, contentHeight],
    ]);

  const bins = hexbin(data);
  const colorAccessor = (item) => {
    let total = 0;
    item.forEach((value) => {
      total += value[setSelectedColor];
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
      </g>
    </svg>
  );
};

const SearchGame = ({ data, setSelectedGames }) => {
  const selectData = setSelectedGames;

  const selectArray = [];
  const teamArray = [];

  for (let i = 0; i < selectData.length; i++) {
    //それぞれを配列
    selectArray[i] = selectData[i];
  }
  for (let i = 0; i < selectData.length; i++) {
    teamArray[i] = selectArray[i].Team_H;
  }

  const listTeam = selectArray.map((team) => (
    <div className="box" style={{ height: "100%" }}>
      <nav class="level is-mobile">
        <div className="level-item has-text-centered" key={team}>
          <div>
            <p class="heading">Home</p>
            <p class="title">{team.Team_H} </p>
          </div>
          <div>
            <p class="heading">score</p>
            <p class="title">
              <font color="red">
                &nbsp;{team.Goal_H} ー {team.Goal_A}&nbsp;
              </font>
            </p>
          </div>
          <div>
            <p class="heading">Away</p>
            <p class="title">{team.Team_A}</p>
          </div>
          <div>
            <p class="heading">URL</p>
            <p class="title">{team.URL}</p>
          </div>
        </div>
      </nav>
    </div>
  ));

  return <div>{listTeam}</div>;
};

const TotalPage = () => {
  const [originalData, setGameData] = useState([]);
  const [data2, setTeamData] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedAxis, setSelectedAxis] = useState("");
  const [selectedColor, setSelectedColor] = useState("View");

  const data = originalData.filter((item) => {
    return (
      item.Team_H === selectedTeam ||
      item.Team_A === selectedTeam ||
      selectedTeam === ""
    );
  });

  //bulma
  //チーム名のプルダウン

  function Arraycount(value) {
    return value.Team;
  }
  var Team = [];
  Team = data2.filter(Arraycount);

  const teamOptions = Team.map((value) => {
    return <option value={value.Team}>{value.Team}</option>;
  });
  teamOptions.unshift(<option value="">ALL</option>);

  //軸のプルダウン

  var Axis = ["t-SNE", "PCA"];
  const axisOptions = Axis.map((value2) => {
    return <option value={value2}>{value2}</option>;
  });

  //色のプルダウン

  var Color = ["View", "Mileage", "Sprint", "Shoot", "Goal"];
  const colorOptions = Color.map((value3) => {
    return <option value={value3}>{value3}</option>;
  });

  const handleChangeTeam = (event) => {
    setSelectedTeam(event.target.value);
  };

  const handlechangecolor = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleChangeAxis = (event) => {
    setSelectedAxis(event.target.value);
  };

  useEffect(() => {
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
      {/*見出し*/}
      <section className="hero is-info">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Soccer</h1>
            <h2 className="subtitle">Let's play soccer</h2>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="columns">
          <div className="column is-one-quarter">
            {/*プルダウンメニュー 画面3分の1*/}
            <div className="box" style={{ height: "100%" }}>
              <b>
                <font size="5">Filter memu</font>
              </b>
              <div className="field">
                <label className="label">Team</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select onChange={handleChangeTeam}>{teamOptions}</select>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">Axis</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select onChange={handleChangeAxis}>{axisOptions}</select>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">Color</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select onChange={handlechangecolor}>{colorOptions}</select>
                  </div>
                </div>
              </div>
            </div>
            {/**/}
          </div>

          <div className="column">
            <div className="box">
              <b>
                <center>Click Hexbin and show game!</center>
              </b>
            </div>
            <HexbinPlot
              data={data}
              setSelectedGames={setSelectedGames}
              axis={selectedAxis}
              setSelectedColor={selectedColor}
            />
          </div>
        </div>
        {/*此処までで上側(検索とhexbin)*/}
        <div className="columns">
          <div className="column">
            <SearchGame data={data} setSelectedGames={selectedGames} />
          </div>
        </div>
      </section>
      {/*検索から表示までを1つのsection*/}
      <footer className="footer">
        <div className="content has-text-centered">
          <p>&copy; 2020 Manaya Sakamoto, Tsubasa Deguchi</p>
        </div>
      </footer>
    </div>
  );
};
render(<TotalPage />, document.querySelector("#content"));
