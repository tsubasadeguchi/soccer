import "bulma/css/bulma.css";
import "./index.css";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import * as d3 from "d3";
import * as d3hexbin from "d3-hexbin";
import ReactTooltip from 'react-tooltip';

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
            //console.log(bin);

            function mouseUp(){
              let n = bin.length;
              let member = [];

              for(let i = 0; i < n; i++){
                member[i] = bin[i].Team_H + ' ' + bin[i].ゴール_H +' - ' + bin[i].ゴール_A + ' ' + bin[i].Team_A + '\n';
              }
              ReactTooltip.show(member);
              return member;
            }

            return (
              <g key={i} transform={`translate(${bin.x},${bin.y})`}>
                <g>
                <title>{`${mouseUp()}`}</title>
                <path
                  d={hexbin.hexagon()}
                  fill={colorScale(colorAccessor(bin))}
                  onClick={buttonClick}
                />
                </g>
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

  const listTeam = selectArray.map((team) => {
    var paramsString = team.URL;
    var searchParams = new URLSearchParams(paramsString);
    var getVUrl = searchParams.getAll("https://www.youtube.com/watch?v");
    var urlString = "https://www.youtube.com/embed/";
    //console.log(team);
    var makeUrl = new URL(urlString + getVUrl);
    return (
        <nav className="columns">
          {/*
          <div className="column">        
            <RadarChart 
              data={setSelectedGames}
            />
          </div>
          */}
          
            <div className="column">
              <div className="level-item has-text-centered" key={team}>
                <div>
                <p className="heading">節数</p>
                <p className="title">
                    <font size="5">
                      {team.Section}節&nbsp;
                    </font>
                  </p>
                </div>
                <div>
                  <p className="heading">Home</p>
                  <p className="title">
                    <font size="5">
                      {team.Team_H}
                    </font>
                  </p>
                </div>
                <div>
                  <p className="heading">score</p>
                  <p className="title">
                    <font color="red" size="4">
                      &nbsp;{team.ゴール_H} ー {team.ゴール_A}&nbsp;
                    </font>
                  </p>
                </div>
                <div>
                  <p className="heading">Away</p>
                  <p className="title">
                    <font size="5">
                      {team.Team_A}&nbsp;
                    </font>
                  </p>
                </div>
              </div>
              <div>
                <p className="title" align="center">
                  <font size="2">
                    再生回数：{team.再生回数}回&nbsp;
                    総ゴール数：{team.ゴール}点<br></br>
                    総シュート数：{team.シュート}本&nbsp;
                    総スプリント数：{team.スプリント}回<br></br>
                    総走行距離：{Math.round(team.走行距離)}km
                  </font>
                </p>
              </div>
            </div>
            <div className="column">
              <br></br>
              <iframe
                src={makeUrl}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
        </nav>          
    );
  });
  return <div>{listTeam}</div>;
};


//平行座標のとこ

const ParallelCoordinates = ({
  data,
  variables,
  margin,
  contentWidth,
  contentHeight,
}) => {
  const width = contentWidth + margin.left + margin.right;
  const height = contentHeight + margin.top + margin.bottom;
  const strokeColor = "#888";

  const xScale = d3
    .scaleLinear()
    .domain([0, variables.length - 1])
    .range([0, contentWidth]);
  const yScales = variables.map(({ property }) => {
    return d3
      .scaleLinear()
      .domain(d3.extent(data, (item) => item[property]))
      .range([contentHeight, 0])
      .nice();
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <g>
          {data.map((item, i) => {
            const line = d3
              .line()
              .x((_, i) => xScale(i))
              .y(({ property }, i) => yScales[i](item[property]));
            return (
              <g key={i}>
                <path
                  d={line(variables)}
                  stroke={item.Color}
                  fill="none"
                />
              </g>
            );
          })}
        </g>
        <g>
          {variables.map(({ label, property }, i) => {
            const yScale = yScales[i];
            return (
              <g key={i} transform={`translate(${xScale(i)},0)`}>
                <line y1="0" y2={contentHeight} stroke={strokeColor} />
                <g>
                  {yScale.ticks().filter((y) => Math.floor(y) === y).map((y, j) => {
                    return (
                      <g key={j} transform={`translate(0,${yScale(y)})`}>
                        <line x1="-3" x2="3" stroke={strokeColor} />
                        <text x="5" fontSize="8" dominantBaseline="central">
                          {y}
                        </text>
                      </g>
                    );
                  })}
                </g>
                <text
                  y="-5"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="text-after-edge"
                >
                  {label}
                </text>
                <text
                  y={contentHeight + 5}
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="text-before-edge"
                >
                  {label}
                </text>
              </g>
            );
          })}
        </g>
        <g transform={`translate(0,${contentHeight + 30})`}>
          {data.map((item, i) => {
            return (
              <g
                key={i}
                transform={`translate(${i * 35},0)`}
                style={{ cursor: "pointer" }}
              >
                <rect width="10" height="10" fill={item.Color} />
                <text x="-10" y="25" fontSize="10">
                  {item.Team}
                </text>
              </g>
            );
          })}
        </g>
      </g>
    </svg>
  );
};

//平行座標ここまで

//レーダーチャートここから
const RadarChart = ({ data }) => {
  const keys = ["point再生回数","pointゴール","pointシュート","pointスプリント","point走行距離"];
  const elements = ["再生回数","総ゴール数","総シュート数","総スプリント数","総走行距離"];
  const margin = {
    top: 30,
    right: 30,
    bottom: 150,
    left: 50,
  };
  console.log(data);
  const r = 50;
  const scale = d3
    .scaleLinear()
    .domain([
      0,
      //d3.max(data[keys]),
      //d3.max(keys,data,(key,item) => item(key)),
      d3.max(keys, (key) => d3.max(data, (item) => item[key])),
    ])
    .range([0, r])
    .nice();
  const t0 = -Math.PI / 2;
  const dt = (Math.PI * 2) / 5;//keys.length;
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  const axisColor = "#ccc";
  const path = (points) => {
    const path = d3.path();
    points.forEach(({ x, y }, j) => {
      if (j === 0) {
        path.moveTo(x, y);
      } else {
        path.lineTo(x, y);
      }
    });
    path.closePath();
    return path.toString();
  };
  return (
    <svg
      viewBox={`0 0 ${2 * r + margin.left + margin.right} ${
        2 * r + margin.top + margin.bottom
      }`}
    >
      <g transform={`translate(${r + margin.left},${r + margin.right})`}>
        <g>
          {keys.map((key, j) => {
            return (
              <g key={j}>
                <line
                  x1="0"
                  y1="0"
                  x2={r * Math.cos(t0 + dt * j)}
                  y2={r * Math.sin(t0 + dt * j)}
                  stroke={axisColor}
                />
                <text
                  x={(r + 20) * Math.cos(t0 + dt * j)}
                  y={(r + 20) * Math.sin(t0 + dt * j)}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="5"
                  fontWeight="bold"
                >
                  {elements[j]}
                </text>
              </g>
            );
          })}
        </g>
        <g>
          {scale.ticks(5).map((v, k) => {
            const points = keys.map((_, j) => {
              const d = scale(v);
              const x = d * Math.cos(t0 + dt * j);
              const y = d * Math.sin(t0 + dt * j);
              return { x, y };
            });
            return (
              //レーダーチャート内の点数についての部分
              <g key={k}>
                <path d={path(points)} fill="none" stroke={axisColor} />
                <text
                  x="3"
                  y={-scale(v)}
                  textAnchor="start"
                  dominantBaseline="central"
                  fontSize="5"
                >
                  {v.toFixed(0)}
                </text>
              </g>
            );
          })}
        </g>
        <g>
          {data.map((item, i) => {
            const points = keys.map((key, j) => {
              const d = scale(item[key]);
              const x = d * Math.cos(t0 + dt * j);
              const y = d * Math.sin(t0 + dt * j);
              return { x, y };
            });
            return (
              <g key={i}>
                <path d={path(points)} fill="none" stroke={color(i)} />
              </g>
            );
          })}
        </g>
        
        <g transform={`translate(${-r},${r + 50})`}>
          {data.map((item, i) => {
            //キャプション
            return (
              <g key={i} transform={`translate(0,${10*i})`}>
                <rect x="-50" y="-10" width="7" height="7" fill={color(i)} />
                <text
                  textAnchor="start"
                  dominantBaseline="central"
                  x="-40"
                  y="-7"
                  fontSize="5"
                >
                  {item["Team_H"]}-{item["Team_A"]}
                </text>
              </g>
            );
          })}
        </g>
      </g>
    </svg>
  );
};


const TotalPage = () => {
  const [originalData, setGameData] = useState([]);
  const [data2, setTeamData] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedAxis, setSelectedAxis] = useState("");
  const [selectedColor, setSelectedColor] = useState("再生回数");

  const data = originalData.filter((item) => {
    return (
      item.Team_H === selectedTeam ||
      item.Team_A === selectedTeam ||
      selectedTeam === ""
    );
  });

  //console.log(data2);​
  const variables = [
    { label: "代表歴選手数", property: "National_Player" },
    { label: "総年俸", property: "Salary" },
    { label: "個人賞選手数", property: "Award" },
    { label: "昨年度勝ち点", property: "Last_Year_Point" }
  ];

  

  function Arraycount(value) {
    return value.Team;
  }
  var Team = [];
  Team = data2.filter(Arraycount);

  const teamOptions = Team.map((value) => {
    return <option value={value.Team}>{value.Team}</option>;
  });
  teamOptions.unshift(<option value="">全て</option>);

  //軸のプルダウン

  /*var Axis = ["t-SNE", "PCA"];
  const axisOptions = Axis.map((value2) => {
    return <option value={value2}>{value2}</option>;
  });*/

  //色のプルダウン

  var Color = ["再生回数", "走行距離", "スプリント", "シュート", "ゴール"];
  const colorOptions = Color.map((value3) => {
    return <option value={value3}>{value3}</option>;
  });

  const handleChangeTeam = (event) => {
    setSelectedTeam(event.target.value);
  };

  const handlechangecolor = (event) => {
    setSelectedColor(event.target.value);
  };

  /*const handleChangeAxis = (event) => {
    setSelectedAxis(event.target.value);
  };*/

  useEffect(() => {
    fetch("J_Data.json")
      .then((response) => response.json())
      .then((data) => {
        data.game.forEach((item, i) => {
          item.id = i;
        });
        setGameData(data.game.filter((item) => item.再生回数 >= 0));
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
            <h1 className="title">J.LEAGUE NAVI</h1>
            <h2 className="subtitle">サッカー観戦のための試合特徴の多次元データ可視化</h2>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="columns">
          <div className="column">
            <div className = "box"　style={{ height: "100%" }}>
              <b>
                <font size="5"><center>Webページの見方</center></font>
              </b>
              
              <b><font size="3">本ページは2019年明治安田生命J1リーグ全306試合のトラッキングデータを用いた可視化Webページである。</font></b>
              <p>
              本ページは4つのブロックから構成されている。
              </p>
                <ol type = "1">
                <li>&nbsp;フィルターメニューと平行座標プロット・・・18チームの特徴を表示した平行座標プロットを活用し、Hexbinの表示するチームの選択、色付けに使用する要素の選択が可能。</li>
                <li>&nbsp;Hexbin・・・全306試合の試合分布。六角形をクリックをすることでHexbinの下に六角形に含まれる試合を表示する。</li>
                <li>&nbsp;レーダーチャート・・・選択された試合の特徴についてのレーダーチャートを表示する。</li>
                <li>&nbsp;試合一覧・・・選択された試合の詳細とYouTubeのハイライトを表示する。</li>
                </ol>
              
            </div>  
          </div>
        </div>

        <div className="columns">
          <div className="column is-two-fifths">
            {/*プルダウンメニュー 画面3分の1*/}
            <div className="box" style={{ height: "100%" }}>
              <b>
                <font size="5"><center>フィルターメニュー</center></font>
              </b>
              <div className="field">
                <label className="label">チーム</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select onChange={handleChangeTeam}>{teamOptions}</select>
                  </div>
                </div>
              </div>

           {/*<div className="field">
                <label className="label">分析方法</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select onChange={handleChangeAxis}>{axisOptions}</select>
                  </div>
                </div>
              </div>*/}

              <div className="field">
                <label className="label">色付け</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select onChange={handlechangecolor}>{colorOptions}</select>
                  </div>
                </div>
              </div>
 
              <ParallelCoordinates
                data={data2}
                variables={variables}
                margin={{
                top: 40,
                left: 40,
                bottom: 60,
                right: 40,
                }}
                contentWidth={600}
                contentHeight={400}
              />
              
            </div>
            {/**/}
          </div>

          <div className="column">
            <div className="box" style={{ height: "100%" }}>
              <div className="field">
                <b>
                  <font size="5"><center>Hexbin</center></font>
                </b>
              </div>
            <div className="hex">
            <HexbinPlot
              data={data}
              setSelectedGames={setSelectedGames}
              axis={selectedAxis}
              setSelectedColor={selectedColor}
            />
            </div>
            </div>
            
            
          </div>
        </div>
        {/*此処までで上側(検索とhexbin)*/}
        <div className="columns">
          <div className="column is-two-fifths">
            <div className="box" style={{ height: "100%" }}>
              <b>
                <font size="5"><center>選択領域内の試合のレーダーチャート</center></font>
              </b>
              <RadarChart 
                data={selectedGames}
              />
            </div>
          </div>
          <div className="column">
            <div className="box" style={{ height: "100%" }}>
              <b>
                <font size="5"><center>選択領域内の試合一覧</center></font>
              </b>
              <SearchGame 
                data={data} 
                setSelectedGames={selectedGames}
              />
            </div>
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