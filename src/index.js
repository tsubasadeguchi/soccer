import "bulma/css/bulma.css";
import "./index.css";
import React, { useEffect, useState, useRef } from "react";
import { render } from "react-dom";
import * as d3 from "d3";
import * as d3hexbin from "d3-hexbin";

const HexbinPlot = ({ data, setSelectedGames, axis, color }) => {
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
  const lineColor = "#444";
  var axisX;
  var axisY;

  if (axis === "PCA") {
    axisX = "PCA1";
    axisY = "PCA2";
  } else {
    axisX = "tSNE_X";
    axisY = "tSNE_Y";
  }
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

  var a = color;
  const bins = hexbin(data);
  const colorAccessor = (item) => {
    let total = 0;
    item.forEach((value) => {
      total += value[a];
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
    console.log(selectArray[i]);
    console.log(teamArray[i]);
  }
  console.log(selectArray);
  console.log(teamArray);
  const listTeam = selectArray.map((team) => (
    <div className="box" key={team}>
      <p align="center">
        <font size="5">
          {team.Team_H}{" "}
          <font size="6" color="red">
            {team.Goal_H} ー {team.Goal_A}
          </font>{" "}
          {team.Team_A}
        </font>
      </p>
    </div>
  ));

  return <div>{listTeam}</div>;
};

const TotalPage = () => {
  const [data, setGameData] = React.useState([]);
  const [data2, setTeamData] = React.useState([]);
  const [selectedGames, setSelectedGames] = React.useState([]);
  //console.log(selectedGames);

  //bulma
  //チーム名のプルダウン
  let teamEl = useRef(null);
  function Arraycount(value) {
    //console.log(value.Team);
    return value.Team;
  }
  var Team = [];
  Team = data2.filter(Arraycount);

  const teamOptions = Team.map((value) => {
    return <option value={value.Team}>{value.Team}</option>;
  });
  console.log(teamOptions);

  //軸のプルダウン
  let axisEl = useRef(null);
  var Axis = ["t-SNE", "PCA"];
  const axisOptions = Axis.map((value2) => {
    return <option value={value2}>{value2}</option>;
  });

  //色のプルダウン
  let colorEl = useRef(null);
  var Color = ["View", "Mileage", "Sprint", "Shoot", "Goal"];
  const colorOptions = Color.map((value3) => {
    return <option value={value3}>{value3}</option>;
  });

  const clickButton = () => {
    handleClickEvent();
  };
  const clickButton2 = () => {
    handleClickEvent2();
  };

  var selectAxis;
  var selectColor = "Mileage";

  const handleClickEvent = () => {
    var selectTeam;
    const newGameData = data.slice();
    console.log(newGameData);
    console.log(data);
    for (const option of teamEl.current.options) {
      if (option.selected === true) {
        selectTeam = option.value;
      }
    }
    console.log(selectTeam);

    for (const option of axisEl.current.options) {
      if (option.selected === true) {
        selectAxis = option.value;
      }
    }
    console.log(selectAxis);

    for (const option of colorEl.current.options) {
      if (option.selected === true) {
        selectColor = option.value;
      }
    }
    console.log(selectColor);

    setGameData(
      newGameData.filter(
        (item) => item.Team_H === selectTeam || item.Team_A === selectTeam
      )
    );
  };

  const handleClickEvent2 = () => {
    fetch("J_Data.json")
      .then((response) => response.json())
      .then((data) => {
        data.game.forEach((item, i) => {
          item.id = i;
        });
        setGameData(data.game.filter((item) => item.View >= 0));
      });
    //console.log(data);
  };

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
              <div className="field">
                <label className="label">Team</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select ref={teamEl}>{teamOptions}</select>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">Axis</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select ref={axisEl}>{axisOptions}</select>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">Color</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select ref={colorEl}>{colorOptions}</select>
                  </div>
                </div>
              </div>

              {/*スタートボタン*/}
              <div className="field">
                <label className="label">Start</label>

                <p className="subtitle">
                  Startボタンを押すとシミュレーションを開始します
                </p>
                <button
                  className="button is-danger is-active"
                  onClick={clickButton}
                >
                  Start
                </button>
              </div>
              {/*リセットボタン*/}
              <div className="field">
                <label className="label">Reset</label>

                <p className="subtitle">
                  Resetボタンを押すとシミュレーションを開始します
                </p>
                <button
                  className="button is-danger is-active"
                  onClick={clickButton2}
                >
                  Reset
                </button>
              </div>
            </div>
            {/**/}
          </div>

          <div className="column">
            <HexbinPlot
              data={data}
              setSelectedGames={setSelectedGames}
              axis={selectAxis}
              color={selectColor}
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
