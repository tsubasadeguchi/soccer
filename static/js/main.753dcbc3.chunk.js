(this.webpackJsonpsoccer=this.webpackJsonpsoccer||[]).push([[0],{106:function(e,t,a){e.exports=a(107)},107:function(e,t,a){"use strict";a.r(t);var n=a(5),l=(a(108),a(109),a(0)),c=a.n(l),r=a(50),o=a(2),m=a(52),i=a(51),s=function(e){var t,a,n=e.data,l=e.setSelectedGames,r=e.axis,s=e.setSelectedColor;"PCA"===r?(t="PCA1",a="PCA2"):(t="tSNE_X",a="tSNE_Y");var u=0,E=0,f=800+u+0,d=500+E+0,h=o.f().domain(o.a(n,(function(e){return e[t]}))).range([0,800]).nice(),g=o.f().domain(o.a(n,(function(e){return e[a]}))).range([500,0]).nice(),p=m.a().x((function(e){return h(Math.max(e[t]))})).y((function(e){return g(Math.max(e[a]))})).radius(20).extent([[0,0],[800,500]]),v=p(n),b=function(e){var t=0;return e.forEach((function(e){t+=e[s]})),t/e.length},x=o.h(o.b).domain(o.a(v,b));return c.a.createElement("svg",{viewBox:"".concat(0," ").concat(0," ").concat(f," ").concat(d)},c.a.createElement("clipPath",{id:"content-region"},c.a.createElement("rect",{x:"0",y:0,width:800,height:500})),c.a.createElement("g",null,c.a.createElement("g",{clipPath:"url(#content-region)",transform:"translate(".concat(u,",").concat(E,")")},v.map((function(e,t){return c.a.createElement("g",{key:t,transform:"translate(".concat(e.x,",").concat(e.y,")")},c.a.createElement("g",null,c.a.createElement("title",null,"".concat(function(){for(var t=e.length,a=[],n=0;n<t;n++)a[n]=e[n].Team_H+" "+e[n].Goal_H+" - "+e[n].Goal_A+" "+e[n].Team_A+"\n";return i.a.show(a),a}())),c.a.createElement("path",{d:p.hexagon(),fill:x(b(e)),onClick:function(){l(e)}})))})))))},u=function(e){e.data;for(var t=e.setSelectedGames,a=[],n=[],l=0;l<t.length;l++)a[l]=t[l];for(var r=0;r<t.length;r++)n[r]=a[r].Team_H;var o=a.map((function(e){var t=e.URL,a=new URLSearchParams(t).getAll("https://www.youtube.com/watch?v"),n=new URL("https://www.youtube.com/embed/"+a);return c.a.createElement("nav",{className:"columns"},c.a.createElement("div",{className:"column"},c.a.createElement("div",{className:"level-item has-text-centered",key:e},c.a.createElement("div",null,c.a.createElement("p",{className:"heading"},"\u7bc0\u6570"),c.a.createElement("p",{className:"title"},c.a.createElement("font",{size:"5"},e.Section,"\u7bc0\xa0"))),c.a.createElement("div",null,c.a.createElement("p",{className:"heading"},"Home"),c.a.createElement("p",{className:"title"},c.a.createElement("font",{size:"5"},e.Team_H))),c.a.createElement("div",null,c.a.createElement("p",{className:"heading"},"score"),c.a.createElement("p",{className:"title"},c.a.createElement("font",{color:"red",size:"4"},"\xa0",e.Goal_H," \u30fc ",e.Goal_A,"\xa0"))),c.a.createElement("div",null,c.a.createElement("p",{className:"heading"},"Away"),c.a.createElement("p",{className:"title"},c.a.createElement("font",{size:"5"},e.Team_A,"\xa0")))),c.a.createElement("div",null,c.a.createElement("p",{className:"title",align:"center"},c.a.createElement("font",{size:"2"},"\u518d\u751f\u56de\u6570\uff1a",e.View,"\u56de\xa0 \u7dcf\u30b4\u30fc\u30eb\u6570\uff1a",e.Goal,"\u70b9",c.a.createElement("br",null),"\u7dcf\u30b7\u30e5\u30fc\u30c8\u6570\uff1a",e.Shoot,"\u672c\xa0 \u7dcf\u30b9\u30d7\u30ea\u30f3\u30c8\u6570\uff1a",e.Sprint,"\u56de",c.a.createElement("br",null),"\u7dcf\u8d70\u884c\u8ddd\u96e2\uff1a",Math.round(e.Mileage),"km")))),c.a.createElement("div",{className:"column"},c.a.createElement("br",null),c.a.createElement("iframe",{src:n,frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:!0})))}));return c.a.createElement("div",null,o)},E=function(e){var t=e.data,a=e.variables,n=e.margin,l=e.contentWidth,r=e.contentHeight,m=l+n.left+n.right,i=r+n.top+n.bottom,s=o.f().domain([0,a.length-1]).range([0,l]),u=a.map((function(e){var a=e.property;return o.f().domain(o.a(t,(function(e){return e[a]}))).range([r,0]).nice()}));return c.a.createElement("svg",{viewBox:"0 0 ".concat(m," ").concat(i)},c.a.createElement("g",{transform:"translate(".concat(n.left,",").concat(n.top,")")},c.a.createElement("g",null,t.map((function(e,t){var n=o.c().x((function(e,t){return s(t)})).y((function(t,a){var n=t.property;return u[a](e[n])}));return c.a.createElement("g",{key:t},c.a.createElement("path",{d:n(a),stroke:e.Color,fill:"none"}))}))),c.a.createElement("g",null,a.map((function(e,t){var a=e.label,n=(e.property,u[t]);return c.a.createElement("g",{key:t,transform:"translate(".concat(s(t),",0)")},c.a.createElement("line",{y1:"0",y2:r,stroke:"#888"}),c.a.createElement("g",null,n.ticks().filter((function(e){return Math.floor(e)===e})).map((function(e,t){return c.a.createElement("g",{key:t,transform:"translate(0,".concat(n(e),")")},c.a.createElement("line",{x1:"-3",x2:"3",stroke:"#888"}),c.a.createElement("text",{x:"5",fontSize:"8",dominantBaseline:"central"},e))}))),c.a.createElement("text",{y:"-5",fontSize:"10",fontWeight:"bold",textAnchor:"middle",dominantBaseline:"text-after-edge"},a),c.a.createElement("text",{y:r+5,fontSize:"10",fontWeight:"bold",textAnchor:"middle",dominantBaseline:"text-before-edge"},a))}))),c.a.createElement("g",{transform:"translate(0,".concat(r+30,")")},t.map((function(e,t){return c.a.createElement("g",{key:t,transform:"translate(".concat(35*t,",0)"),style:{cursor:"pointer"}},c.a.createElement("rect",{width:"10",height:"10",fill:e.Color}),c.a.createElement("text",{x:"-10",y:"25",fontSize:"10"},e.Team))})))))},f=function(e){var t=e.data,a=["pointView","pointGoal","pointShoot","pointSprint","pointMileage"],n=["\u518d\u751f\u56de\u6570","\u7dcf\u30b4\u30fc\u30eb\u6570","\u7dcf\u30b7\u30e5\u30fc\u30c8\u6570","\u7dcf\u30b9\u30d7\u30ea\u30f3\u30c8\u6570","\u7dcf\u8d70\u884c\u8ddd\u96e2"],l=30,r=30,m=150,i=50;console.log(t);var s=50,u=o.f().domain([0,o.d(a,(function(e){return o.d(t,(function(t){return t[e]}))}))]).range([0,s]).nice(),E=-Math.PI/2,f=2*Math.PI/5,d=o.g(o.i),h=function(e){var t=o.e();return e.forEach((function(e,a){var n=e.x,l=e.y;0===a?t.moveTo(n,l):t.lineTo(n,l)})),t.closePath(),t.toString()};return c.a.createElement("svg",{viewBox:"0 0 ".concat(100+i+r," ").concat(100+l+m)},c.a.createElement("g",{transform:"translate(".concat(s+i,",").concat(s+r,")")},c.a.createElement("g",null,a.map((function(e,t){return c.a.createElement("g",{key:t},c.a.createElement("line",{x1:"0",y1:"0",x2:s*Math.cos(E+f*t),y2:s*Math.sin(E+f*t),stroke:"#ccc"}),c.a.createElement("text",{x:70*Math.cos(E+f*t),y:70*Math.sin(E+f*t),textAnchor:"middle",dominantBaseline:"central",fontSize:"5",fontWeight:"bold"},n[t]))}))),c.a.createElement("g",null,u.ticks(5).map((function(e,t){var n=a.map((function(t,a){var n=u(e);return{x:n*Math.cos(E+f*a),y:n*Math.sin(E+f*a)}}));return c.a.createElement("g",{key:t},c.a.createElement("path",{d:h(n),fill:"none",stroke:"#ccc"}),c.a.createElement("text",{x:"3",y:-u(e),textAnchor:"start",dominantBaseline:"central",fontSize:"5"},e.toFixed(0)))}))),c.a.createElement("g",null,t.map((function(e,t){var n=a.map((function(t,a){var n=u(e[t]);return{x:n*Math.cos(E+f*a),y:n*Math.sin(E+f*a)}}));return c.a.createElement("g",{key:t},c.a.createElement("path",{d:h(n),fill:"none",stroke:d(t)}))}))),c.a.createElement("g",{transform:"translate(".concat(-50,",").concat(100,")")},t.map((function(e,t){return c.a.createElement("g",{key:t,transform:"translate(0,".concat(10*t,")")},c.a.createElement("rect",{x:"-50",y:"-10",width:"7",height:"7",fill:d(t)}),c.a.createElement("text",{textAnchor:"start",dominantBaseline:"central",x:"-40",y:"-7",fontSize:"5"},e.Team_H,"-",e.Team_A))})))))},d=function(){var e=Object(l.useState)([]),t=Object(n.a)(e,2),a=t[0],r=t[1],o=Object(l.useState)([]),m=Object(n.a)(o,2),i=m[0],d=m[1],h=Object(l.useState)([]),g=Object(n.a)(h,2),p=g[0],v=g[1],b=Object(l.useState)(""),x=Object(n.a)(b,2),y=x[0],N=x[1],S=Object(l.useState)(""),w=Object(n.a)(S,2),k=w[0],_=(w[1],Object(l.useState)("View")),j=Object(n.a)(_,2),M=j[0],T=j[1],z=a.filter((function(e){return e.Team_H===y||e.Team_A===y||""===y}));var A=i.filter((function(e){return e.Team})).map((function(e){return c.a.createElement("option",{value:e.Team},e.Team)}));A.unshift(c.a.createElement("option",{value:""},"\u5168\u3066"));var H=["View","Mileage","Sprint","Shoot","Goal"].map((function(e){return c.a.createElement("option",{value:e},e)}));return Object(l.useEffect)((function(){fetch("J_Data.json").then((function(e){return e.json()})).then((function(e){e.game.forEach((function(e,t){e.id=t})),r(e.game.filter((function(e){return e.View>=0})))})),fetch("J_Data.json").then((function(e){return e.json()})).then((function(e){e.team.forEach((function(e,t){e.id=t})),d(e.team.filter((function(e){return e.Total>=0})))}))}),[]),c.a.createElement("div",null,c.a.createElement("section",{className:"hero is-info"},c.a.createElement("div",{className:"hero-body"},c.a.createElement("div",{className:"container"},c.a.createElement("h1",{className:"title"},"\u30b5\u30c3\u30ab\u30fc\u89b3\u6226\u306e\u305f\u3081\u306e\u8a66\u5408\u7279\u5fb4\u306e\u591a\u6b21\u5143\u30c7\u30fc\u30bf\u53ef\u8996\u5316"),c.a.createElement("h2",{className:"subtitle"},"\u65e5\u672c\u5927\u5b66\u3000\u5c3e\u4e0a\u7814\u7a76\u5ba4")))),c.a.createElement("section",{className:"section"},c.a.createElement("div",{className:"columns"},c.a.createElement("div",{className:"column"},c.a.createElement("div",{className:"box",style:{height:"100%"}},c.a.createElement("b",null,c.a.createElement("font",{size:"5"},c.a.createElement("center",null,"Web\u30da\u30fc\u30b8\u306e\u898b\u65b9"))),c.a.createElement("p",null,"\u672c\u30da\u30fc\u30b8\u306f2019\u5e74\u660e\u6cbb\u5b89\u7530\u751f\u547dJ1\u30ea\u30fc\u30b0\u5168306\u8a66\u5408\u306e\u30c8\u30e9\u30c3\u30ad\u30f3\u30b0\u30c7\u30fc\u30bf\u3092\u7528\u3044\u305f\u53ef\u8996\u5316Web\u30da\u30fc\u30b8\u3067\u3042\u308b\u3002 \u672c\u30da\u30fc\u30b8\u306f4\u3064\u306e\u30d6\u30ed\u30c3\u30af\u304b\u3089\u69cb\u6210\u3055\u308c\u3066\u3044\u308b\u3002",c.a.createElement("br",null),"1.\u30d5\u30a3\u30eb\u30bf\u30fc\u30e1\u30cb\u30e5\u30fc\u3068\u5e73\u884c\u5ea7\u6a19\u30d7\u30ed\u30c3\u30c8\u30fb\u30fb\u30fb18\u30c1\u30fc\u30e0\u306e\u7279\u5fb4\u3092\u8868\u793a\u3057\u305f\u5e73\u884c\u5ea7\u6a19\u30d7\u30ed\u30c3\u30c8\u3092\u6d3b\u7528\u3057\u3001Hexbin\u306e\u8868\u793a\u3059\u308b\u30c1\u30fc\u30e0\u306e\u9078\u629e\u3001\u8272\u4ed8\u3051\u306b\u4f7f\u7528\u3059\u308b\u8981\u7d20\u306e\u9078\u629e\u304c\u53ef\u80fd\u3002",c.a.createElement("br",null),"2.Hexbin\u30fb\u30fb\u30fb\u5168306\u8a66\u5408\u306e\u8a66\u5408\u5206\u5e03\u3002\u516d\u89d2\u5f62\u3092\u30af\u30ea\u30c3\u30af\u3092\u3059\u308b\u3053\u3068\u3067Hexbin\u306e\u4e0b\u306b\u516d\u89d2\u5f62\u306b\u542b\u307e\u308c\u308b\u8a66\u5408\u3092\u8868\u793a\u3059\u308b\u3002",c.a.createElement("br",null),"3.\u30ec\u30fc\u30c0\u30fc\u30c1\u30e3\u30fc\u30c8\u30fb\u30fb\u30fb\u9078\u629e\u3055\u308c\u305f\u8a66\u5408\u306e\u7279\u5fb4\u306b\u3064\u3044\u3066\u306e\u30ec\u30fc\u30c0\u30fc\u30c1\u30e3\u30fc\u30c8\u3092\u8868\u793a\u3059\u308b\u3002",c.a.createElement("br",null),"4.\u8a66\u5408\u4e00\u89a7\u30fb\u30fb\u30fb\u9078\u629e\u3055\u308c\u305f\u8a66\u5408\u306e\u8a73\u7d30\u3068YouTube\u306e\u30cf\u30a4\u30e9\u30a4\u30c8\u3092\u8868\u793a\u3059\u308b\u3002",c.a.createElement("br",null))))),c.a.createElement("div",{className:"columns"},c.a.createElement("div",{className:"column is-two-fifths"},c.a.createElement("div",{className:"box",style:{height:"100%"}},c.a.createElement("b",null,c.a.createElement("font",{size:"5"},c.a.createElement("center",null,"\u30d5\u30a3\u30eb\u30bf\u30fc\u30e1\u30cb\u30e5\u30fc"))),c.a.createElement("div",{className:"field"},c.a.createElement("label",{className:"label"},"\u30c1\u30fc\u30e0"),c.a.createElement("div",{className:"control"},c.a.createElement("div",{className:"select is-fullwidth"},c.a.createElement("select",{onChange:function(e){N(e.target.value)}},A)))),c.a.createElement("div",{className:"field"},c.a.createElement("label",{className:"label"},"\u8272\u4ed8\u3051"),c.a.createElement("div",{className:"control"},c.a.createElement("div",{className:"select is-fullwidth"},c.a.createElement("select",{onChange:function(e){T(e.target.value)}},H)))),c.a.createElement(E,{data:i,variables:[{label:"\u4ee3\u8868\u6b74\u9078\u624b\u6570",property:"National_Player"},{label:"\u7dcf\u5e74\u4ff8",property:"Salary"},{label:"\u500b\u4eba\u8cde\u9078\u624b\u6570",property:"Award"},{label:"\u6628\u5e74\u5ea6\u52dd\u3061\u70b9",property:"Last_Year_Point"}],margin:{top:40,left:40,bottom:60,right:40},contentWidth:600,contentHeight:400}))),c.a.createElement("div",{className:"column"},c.a.createElement("div",{className:"box",style:{height:"100%"}},c.a.createElement("div",{className:"field"},c.a.createElement("b",null,c.a.createElement("font",{size:"5"},c.a.createElement("center",null,"Hexbin")))),c.a.createElement(s,{data:z,setSelectedGames:v,axis:k,setSelectedColor:M})))),c.a.createElement("div",{className:"columns"},c.a.createElement("div",{className:"column is-two-fifths"},c.a.createElement("div",{className:"box",style:{height:"100%"}},c.a.createElement("b",null,c.a.createElement("font",{size:"5"},c.a.createElement("center",null,"\u9078\u629e\u9818\u57df\u5185\u306e\u8a66\u5408\u306e\u30ec\u30fc\u30c0\u30fc\u30c1\u30e3\u30fc\u30c8"))),c.a.createElement(f,{data:p}))),c.a.createElement("div",{className:"column"},c.a.createElement("div",{className:"box",style:{height:"100%"}},c.a.createElement("b",null,c.a.createElement("font",{size:"5"},c.a.createElement("center",null,"\u9078\u629e\u9818\u57df\u5185\u306e\u8a66\u5408\u4e00\u89a7"))),c.a.createElement(u,{data:z,setSelectedGames:p}))))),c.a.createElement("footer",{className:"footer"},c.a.createElement("div",{className:"content has-text-centered"},c.a.createElement("p",null,"\xa9 2020 Manaya Sakamoto, Tsubasa Deguchi"))))};Object(r.render)(c.a.createElement(d,null),document.querySelector("#content"))},109:function(e,t,a){}},[[106,1,2]]]);
//# sourceMappingURL=main.753dcbc3.chunk.js.map