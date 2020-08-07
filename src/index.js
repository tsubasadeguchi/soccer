import "bulma/css/bulma.css";
import "./index.css";
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
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
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
      {team.Team_H} {team.Goal_H} {team.Goal_A} {team.Team_A}
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

  //X軸のプルダウン
  let pcaXEl = useRef(null);
  function Arraycount2(value2) {
    //console.log(value.Team);
    return value2;
  }
  var Pca = [
    "t-SNE",
    "PCA1",
    "PCA2",
    "PCA3",
    "PCA4",
    "PCA5",
    "PCA6",
    "PCA7",
    "PCA8",
  ];
  //Pca = data.filter(Arraycount2);
  //PCA1の要素だけ含む配列作ってるけどこの処理全PCAでやるん？ｗｗｗｗ
  const pcaXOptions = Pca.map((value2) => {
    return <option value={value2}>{value2}</option>;
  });

  //Y軸のプルダウン
  let pcaYEl = useRef(null);
  function Arraycount2(value2) {
    //console.log(value.Team);
    return value2;
  }
  var Pca = [
    "t-SNE",
    "PCA1",
    "PCA2",
    "PCA3",
    "PCA4",
    "PCA5",
    "PCA6",
    "PCA7",
    "PCA8",
  ];
  //Pca = data.filter(Arraycount2);
  //PCA1の要素だけ含む配列作ってるけどこの処理全PCAでやるん？ｗｗｗｗ
  const pcaYOptions = Pca.map((value2) => {
    return <option value={value2}>{value2}</option>;
  });

  /*const [step, setStep] = useState(50);
  const handleSubmit = (event) => {
    event.preventDefault();
    setStep(+event.target.elements.step.value);
  };

  const clickButton = () => {
    handleClickEvent(data.nodes);
  };

  const handleClickEvent = () => {
    var percent;
    for (const option of teamEl.current.options) {
      if (option.selected === true) {
        percent = option.value;
      }
    }

    var teamIds = [];

    for (const option of teamEl.current.options) {
      if (option.selected === true) {
        teamIds.push(option.value);
      }
    }

    console.log(teamIds);
    setGameData(data.filter(teamIds));
  };*/

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
      <section className="hero is-info">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">Soccer</h1>
            <h2 class="subtitle">Let's play soccer</h2>
          </div>
        </div>
      </section>
      <section className="section">
        <div class="columns">
          <div class="column is-one-quarter">
            {/*プルダウンメニュー*/}
            <div className="box" style={{ height: "100%" }}>
              <div class="field">
                <label class="label">Team</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select>{teamOptions}</select>
                  </div>
                </div>
              </div>

              <div class="field">
                <label class="label">X</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select>{pcaXOptions}</select>
                  </div>
                </div>
              </div>

              <div class="field">
                <label class="label">Y</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select>{pcaYOptions}</select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="column">
            <HexbinPlot data={data} setSelectedGames={setSelectedGames} />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <SearchGame data={data} setSelectedGames={selectedGames} />
          </div>
        </div>
      </section>
      <footer class="footer">
        <div class="content has-text-centered">
          <p>&copy; 2020 Manaya Sakamoto, Tsubasa Deguchi</p>
        </div>
      </footer>
    </div>
  );
};
render(<TotalPage />, document.querySelector("#content"));
