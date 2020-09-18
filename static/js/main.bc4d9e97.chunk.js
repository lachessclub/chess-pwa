(this["webpackJsonpchess-pwa"]=this["webpackJsonpchess-pwa"]||[]).push([[0],{129:function(e,t,n){e.exports={grid:"GamePreviewsList_grid__2dFgV"}},172:function(e,t,n){e.exports=n(230)},18:function(e,t,n){"use strict";var a=n(8),r=n(37),i=new a.c.Entity("games",{white:r.a,black:r.a});t.a=i},180:function(e,t,n){},20:function(e,t,n){"use strict";var a=n(156),r=n.n(a),i=n(157),o=n.n(i)()(r.a);o.sails.url="http://localhost:1337",t.a=o},209:function(e,t){},21:function(e,t,n){"use strict";n.d(t,"c",(function(){return s})),n.d(t,"e",(function(){return m})),n.d(t,"h",(function(){return f})),n.d(t,"b",(function(){return p})),n.d(t,"d",(function(){return g})),n.d(t,"g",(function(){return v})),n.d(t,"f",(function(){return h}));var a=n(12),r=n(8),i=n(20),o=n(37),l=Object(a.b)({name:"currentUser",initialState:{userId:null,isLoading:!0,error:null},reducers:{getCurrentUserRequest:function(e){e.isLoading=!0,e.error=null},getCurrentUserSuccess:function(e,t){e.userId=t.payload?t.payload.result:null,e.isLoading=!1,e.error=null},getCurrentUserError:function(e,t){e.isLoading=!1,e.error=t.payload},loginSuccess:function(e,t){e.userId=t.payload.result},registerSuccess:function(e,t){e.userId=t.payload.result},logoutSuccess:function(e){e.userId=null}}}),c=l.actions,u=c.getCurrentUserRequest,s=c.getCurrentUserSuccess,d=c.getCurrentUserError,m=c.loginSuccess,f=c.registerSuccess,b=c.logoutSuccess;t.a=l.reducer;var p=function(){return function(e){return e(u()),new Promise((function(t,n){i.a.socket.get("/api/v1/account/me",(function(a,i){if(200===i.statusCode){var l=Object(r.b)(a,o.a);e(s(l)),t(a)}else 401===i.statusCode?(e(s(null)),t(null)):(e(d(a)),n(i))}))}))}},g=function(e){return function(t){return new Promise((function(n,a){i.a.socket.put("/api/v1/entrance/login",{rememberMe:!0,emailAddress:e.email,password:e.password},(function(e,i){if(200===i.statusCode){var l=Object(r.b)(e,o.a);t(m(l)),n(e)}else a(i)}))}))}},v=function(e){return function(t){return new Promise((function(n,a){i.a.socket.post("/api/v1/entrance/signup",{fullName:e.fullName,emailAddress:e.email,password:e.password,confirmPassword:e.password,agreed:!0},(function(e,i){if(200===i.statusCode){var l=Object(r.b)(e,o.a);t(f(l)),n(e)}else a(i)}))}))}},h=function(){return function(e){return new Promise((function(t,n){i.a.socket.post("/api/v1/account/logout",{},(function(a,r){200===r.statusCode?(e(b()),t()):n(r)}))}))}}},227:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(61),o=n(11),l=n(14),c=n(8),u=n(235),s=n(237),d=(n(212),n(38)),m=n(129),f=n.n(m),b=n(159),p=function(e){var t=e.initialFen;"startpos"===t&&(t="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");var n=new b.Chess(t);return e.moves&&e.moves.split(" ").forEach((function(e){n.move(e,{sloppy:!0})})),n},g=function(e){var t=e.games,n=void 0===t?[]:t;return r.a.createElement("div",{className:f.a.grid},n.map((function(e){var t=p(e).fen();return r.a.createElement(i.b,{to:"/game/".concat(e.id),key:e.id},r.a.createElement("div",{className:f.a.cell},r.a.createElement(d.Board,{position:t,viewOnly:!1,width:240})))})))},v=n(67),h=n(18),E=function(){var e=Object(l.b)(),t=Object(l.c)((function(e){return Object(c.a)(e.ongoingGames.items,[h.a],e.entities)}));return Object(a.useEffect)((function(){e(Object(v.b)())}),[e]),r.a.createElement(g,{games:t})},w=n(79),y=n(4),C=n.n(y),O=n(238),S=n(232),j=n(233),k=n(234),B=n(46),P=n.n(B),M=function(e){var t=e.onSubmit;return r.a.createElement(w.a,{initialValues:{level:3,color:"",clockLimit:5,clockIncrement:3},onSubmit:function(e){function t(t,n){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e,n){if(t)return t(e,n)}))},(function(e){var t=e.values,n=e.handleChange,a=e.handleBlur,i=e.handleSubmit,o=e.isSubmitting,l=e.status,c=e.setStatus,s=e.setFieldValue;return r.a.createElement(O.a,{noValidate:!0,onSubmit:function(e){return i(e)},onChange:function(){return c("")}},!!l&&r.a.createElement(S.a,{variant:"danger"},l),r.a.createElement("fieldset",null,r.a.createElement(O.a.Group,null,r.a.createElement(O.a.Label,null,"Minutes per side: ",t.clockLimit),r.a.createElement(O.a.Control,{type:"range",name:"clockLimit",onBlur:a,value:t.clockLimit,onChange:n,min:"1",max:"30"})),r.a.createElement(O.a.Group,null,r.a.createElement(O.a.Label,null,"Increment in seconds: ",t.clockIncrement),r.a.createElement(O.a.Control,{type:"range",name:"clockIncrement",onBlur:a,value:t.clockIncrement,onChange:n,min:"0",max:"60"}))),r.a.createElement("div",{className:"text-center"},"Level"),r.a.createElement(j.a,null,r.a.createElement(k.a,{className:C()("mx-auto",P.a.levelButtonGroup)},[1,2,3,4,5,6,7,8].map((function(e){return r.a.createElement(u.a,{key:e,type:"button",variant:e===t.level?"dark":"light",onClick:function(){return s("level",e)}},e)})))),r.a.createElement("div",{className:"text-center"},"A.I. Level: ",t.level),r.a.createElement("div",{className:P.a.colorSubmits},r.a.createElement("button",{disabled:o,type:"submit",title:"Black",className:C()(P.a.colorSubmitsButton,P.a.blackButton),onClick:function(){return s("color","black")}},r.a.createElement("i",null)),r.a.createElement("button",{disabled:o,type:"submit",title:"Random side",className:C()(P.a.colorSubmitsButton,P.a.randomButton),onClick:function(){return s("color","random")}},r.a.createElement("i",null)),r.a.createElement("button",{disabled:o,type:"submit",title:"White",className:C()(P.a.colorSubmitsButton,P.a.whiteButton),onClick:function(){return s("color","white")}},r.a.createElement("i",null))))}))},A=n(48),I=function(){var e=Object(l.b)(),t=Object(o.f)(),n=Object(a.useCallback)((function(n,a){return e(Object(A.a)(n)).then((function(e){t.push("/game/".concat(e.id))})).catch((function(e){401===e.statusCode?a.setStatus("You must log in to play with computer"):a.setStatus("Internal server error")}))}),[e,t]);return r.a.createElement(M,{onSubmit:n})},L=n(87),G=function(){var e=Object(l.b)(),t=Object(l.c)((function(e){return e.challengeAiModal})).isChallengeAiModalVisible;return r.a.createElement(r.a.Fragment,null,r.a.createElement(s.a,{show:t,onHide:function(){return e(Object(L.b)())},animation:!1},r.a.createElement(s.a.Header,{closeButton:!0},r.a.createElement(s.a.Title,null,"Play with the computer")),r.a.createElement(s.a.Body,null,r.a.createElement(I,null))),r.a.createElement(u.a,{variant:"primary",onClick:function(){return e(Object(L.c)())}},"Play with the computer"),r.a.createElement(E,null))},R=function(e){var t,n,a,i,o,l=e.game,c=e.currentUser,u=e.onMove;if(!l)return null;var s,m=p(l),f=m.in_check(),b=m.fen(),g="white"===function(e){return"w"===e.turn()?"white":"black"}(m)?d.PieceColor.WHITE:d.PieceColor.BLACK,v=Object(d.getValidMoves)(m),h=!0;!c||c.id!==(null===(t=l.white)||void 0===t?void 0:t.id)&&c.id!==(null===(n=l.black)||void 0===n?void 0:n.id)||"started"!==l.status||(h=!1),c&&c.id===(null===(a=l.white)||void 0===a?void 0:a.id)&&(s=d.PieceColor.WHITE),c&&c.id===(null===(i=l.black)||void 0===i?void 0:i.id)&&(s=d.PieceColor.BLACK);var E=d.PieceColor.WHITE;c&&c.id===(null===(o=l.black)||void 0===o?void 0:o.id)&&(E=d.PieceColor.BLACK);var w,y=m.history({verbose:!0});if(y.length){var C=y[y.length-1];w=[C.from,C.to]}return r.a.createElement(d.Board,{allowMarkers:!0,check:f,clickable:!0,draggable:!0,orientation:E,position:b,turnColor:g,lastMoveSquares:w,movableColor:s,validMoves:v,viewOnly:h,onMove:u})},N=n(68),q=n(88),V=n(37),_=function(e){var t=e.id,n=Object(l.b)(),i=Object(l.c)((function(e){return Object(c.a)(t,h.a,e.entities)})),o=Object(l.c)((function(e){if(e.currentUser.userId)return Object(c.a)(e.currentUser.userId,V.a,e.entities)}));Object(a.useEffect)((function(){n(Object(N.b)(t))}),[n,t]);return i?r.a.createElement(R,{game:i,currentUser:o,onMove:function(e){n(Object(q.a)(t,"".concat(e.from).concat(e.to)))}}):null},F=function(){var e=Object(o.g)().id;return r.a.createElement(_,{id:Number(e)})},x=n(239),U=n(236),H=n(39),K=H.a().shape({email:H.c().email("Invalid email").required("Required"),password:H.c().min(6,"Password length must be >= 6").required("Required")}),W=function(e){var t=e.onSubmit;return r.a.createElement(w.a,{initialValues:{email:"",password:""},validationSchema:K,onSubmit:function(e){function t(t,n){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e,n){if(t)return t(e,n)}))},(function(e){var t=e.errors,n=e.values,a=e.touched,i=e.handleChange,o=e.handleBlur,l=e.handleSubmit,c=e.isSubmitting,s=e.status,d=e.setStatus;return r.a.createElement(O.a,{noValidate:!0,onSubmit:function(e){return l(e)},onChange:function(){return d("")}},!!s&&r.a.createElement(S.a,{variant:"danger"},s),r.a.createElement(O.a.Group,null,r.a.createElement(O.a.Label,null,"Email address"),r.a.createElement(O.a.Control,{type:"email",name:"email",placeholder:"Enter email",onBlur:o,value:n.email,onChange:i,isValid:a.email&&!t.email,isInvalid:a.email&&!!t.email}),r.a.createElement(O.a.Control.Feedback,{type:"invalid"},t.email)),r.a.createElement(O.a.Group,null,r.a.createElement(O.a.Label,null,"Password"),r.a.createElement(O.a.Control,{type:"password",name:"password",placeholder:"Password",onChange:i,onBlur:o,value:n.password,isValid:a.password&&!t.password,isInvalid:a.password&&!!t.password}),r.a.createElement(O.a.Control.Feedback,{type:"invalid"},t.password)),r.a.createElement(u.a,{variant:"primary",type:"submit",disabled:c},"Login"))}))},T=H.a().shape({fullName:H.c().required("Required"),email:H.c().email("Invalid email").required("Required"),password:H.c().min(6,"Password length must be >= 6").required("Required"),confirmPassword:H.c().equals([H.b("password")],"Please repeat the password").required("Required")}),J=function(e){var t=e.onSubmit;return r.a.createElement(w.a,{initialValues:{fullName:"",email:"",password:"",confirmPassword:""},validationSchema:T,onSubmit:function(e){function t(t,n){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e,n){if(t)return t(e,n)}))},(function(e){var t=e.errors,n=e.values,a=e.touched,i=e.handleChange,o=e.handleBlur,l=e.handleSubmit,c=e.isSubmitting,s=e.status,d=e.setStatus;return r.a.createElement(O.a,{noValidate:!0,onSubmit:function(e){return l(e)},onChange:function(){return d("")}},!!s&&r.a.createElement(S.a,{variant:"danger"},s),r.a.createElement(O.a.Group,null,r.a.createElement(O.a.Label,null,"Full name"),r.a.createElement(O.a.Control,{type:"text",name:"fullName",placeholder:"Enter full name",onBlur:o,value:n.fullName,onChange:i,isValid:a.fullName&&!t.fullName,isInvalid:a.fullName&&!!t.fullName}),r.a.createElement(O.a.Control.Feedback,{type:"invalid"},t.fullName)),r.a.createElement(O.a.Group,null,r.a.createElement(O.a.Label,null,"Email address"),r.a.createElement(O.a.Control,{type:"email",name:"email",placeholder:"Enter email",onBlur:o,value:n.email,onChange:i,isValid:a.email&&!t.email,isInvalid:a.email&&!!t.email}),r.a.createElement(O.a.Control.Feedback,{type:"invalid"},t.email)),r.a.createElement(O.a.Group,null,r.a.createElement(O.a.Label,null,"Password"),r.a.createElement(O.a.Control,{type:"password",name:"password",placeholder:"Password",onChange:i,onBlur:o,value:n.password,isValid:a.password&&!t.password,isInvalid:a.password&&!!t.password}),r.a.createElement(O.a.Control.Feedback,{type:"invalid"},t.password)),r.a.createElement(O.a.Group,null,r.a.createElement(O.a.Label,null,"Confirm Password"),r.a.createElement(O.a.Control,{type:"password",name:"confirmPassword",placeholder:"Password",onChange:i,onBlur:o,value:n.confirmPassword,isValid:a.confirmPassword&&!t.confirmPassword,isInvalid:a.confirmPassword&&!!t.confirmPassword}),r.a.createElement(O.a.Control.Feedback,{type:"invalid"},t.confirmPassword)),r.a.createElement(u.a,{variant:"primary",type:"submit",disabled:c},"Register"))}))},Q=n(21),Y=function(){var e=Object(l.b)(),t=r.a.useCallback((function(t,n){return e(Object(Q.d)(t)).catch((function(e){401===e.statusCode?n.setStatus("Incorrect email or password"):n.setStatus("Internal server error")}))}),[e]),n=r.a.useCallback((function(t,n){return e(Object(Q.g)({fullName:t.fullName,email:t.email,password:t.password})).catch((function(e){409===e.statusCode?n.setStatus("The provided email address is already in use"):n.setStatus("Internal server error")}))}),[e]);return r.a.createElement(x.a,{transition:!1},r.a.createElement(U.a,{eventKey:"home",title:"Login"},r.a.createElement(W,{onSubmit:t})),r.a.createElement(U.a,{eventKey:"profile",title:"Register"},r.a.createElement(J,{onSubmit:n})))},Z=n(86),$=n(55);t.default=function(){var e=Object(l.b)(),t=Object(l.c)((function(e){return e.currentUser.userId?Object(c.a)(e.currentUser.userId,V.a,e.entities):null})),n=Object(l.c)((function(e){return e.authModal})).isAuthModalVisible;return Object(a.useEffect)((function(){e(Object(Q.b)()),e(Object($.c)())}),[e]),r.a.createElement(i.a,null,t?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,"Hi, ",t.fullName),r.a.createElement(u.a,{variant:"primary",onClick:function(){return e(Object(Q.f)())}},"Logout")):r.a.createElement(u.a,{variant:"primary",onClick:function(){return e(Object(Z.c)())}},"Login / Register"),r.a.createElement(s.a,{show:n,onHide:function(){return e(Object(Z.b)())},animation:!1},r.a.createElement(s.a.Header,{closeButton:!0},r.a.createElement(s.a.Title,null,"Login")),r.a.createElement(s.a.Body,null,r.a.createElement(Y,null))),r.a.createElement("div",null,r.a.createElement("nav",null,r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(i.b,{to:"/"},"Home")))),r.a.createElement(o.c,null,r.a.createElement(o.a,{path:"/game/:id"},r.a.createElement(F,null)),r.a.createElement(o.a,{path:"/"},r.a.createElement(G,null)))))}},230:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(23),o=n.n(i),l=n(14);n(180),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var c,u=n(12),s=n(25),d=n(67),m=n(21),f=n(86),b=n(87),p=n(10),g=n(68),v=n(48),h=n(55),E=n(88),w=function(e,t){Object.assign(e.users,t.payload.entities.users),Object.assign(e.games,t.payload.entities.games)},y=Object(u.b)({name:"entities",initialState:{users:{},games:{}},reducers:{},extraReducers:(c={},Object(p.a)(c,m.c.type,(function(e,t){t.payload&&w(e,{type:t.type,payload:t.payload})})),Object(p.a)(c,m.e.type,w),Object(p.a)(c,m.h.type,w),Object(p.a)(c,d.c.type,w),Object(p.a)(c,g.c.type,w),Object(p.a)(c,v.b.type,w),Object(p.a)(c,h.b.type,w),Object(p.a)(c,h.a.type,w),Object(p.a)(c,E.b.type,(function(e,t){e.games[t.payload.gameId].moves="".concat(e.games[t.payload.gameId].moves," ").concat(t.payload.move).trim()})),Object(p.a)(c,E.c.type,w),c)}).reducer,C=Object(s.c)({authModal:f.a,challengeAiModal:b.a,currentUser:m.a,ongoingGames:d.a,entities:y,singleGame:g.a});var O=Object(u.a)({reducer:C});!function(){var e=n(227).default;o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(l.a,{store:O},r.a.createElement(e,null))),document.getElementById("root"))}(),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},37:function(e,t,n){"use strict";var a=new(n(8).c.Entity)("users");t.a=a},46:function(e,t,n){e.exports={levelButtonGroup:"ChallengeAiForm_levelButtonGroup__2Bko9",colorSubmits:"ChallengeAiForm_colorSubmits__1E4Ki",colorSubmitsButton:"ChallengeAiForm_colorSubmitsButton__-PrWv",whiteButton:"ChallengeAiForm_whiteButton__359Rn",blackButton:"ChallengeAiForm_blackButton__33lZk",randomButton:"ChallengeAiForm_randomButton__2NsHo"}},48:function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"a",(function(){return m}));var a=n(12),r=n(8),i=n(20),o=n(18),l=Object(a.b)({name:"challenge",initialState:{},reducers:{challengeAiRequest:function(){},challengeAiSuccess:function(e,t){},challengeAiError:function(e,t){}},extraReducers:{}}),c=l.actions,u=c.challengeAiRequest,s=c.challengeAiSuccess,d=c.challengeAiError,m=(l.reducer,function(e){return function(t){return t(u()),new Promise((function(n,a){i.a.socket.post("/api/v1/challenge/ai",e,(function(e,i){if(200===i.statusCode){var l=Object(r.b)(e,o.a);t(s(l)),n(e)}else t(d(e)),a(i)}))}))}})},55:function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"a",(function(){return d})),n.d(t,"c",(function(){return m}));var a=n(158),r=n(12),i=n(8),o=n(20),l=n(18),c=Object(r.b)({name:"dataSubscription",initialState:{},reducers:{updateGameBySubscription:function(e,t){},createGameBySubscription:function(e,t){}},extraReducers:{}}),u=c.actions,s=u.updateGameBySubscription,d=u.createGameBySubscription,m=(c.reducer,function(){return function(e){o.a.socket.on("game",(function(t){if("updated"===t.verb){var n=Object(a.a)({},t.previous,{},t.data),r=Object(i.b)(n,l.a);e(s(r))}else if("created"===t.verb){var o=Object(i.b)(t.data,l.a);e(d(o))}}))}})},67:function(e,t,n){"use strict";n.d(t,"c",(function(){return b})),n.d(t,"b",(function(){return g}));var a,r=n(10),i=n(12),o=n(8),l=n(20),c=n(18),u=n(48),s=n(55),d=Object(i.b)({name:"ongoingGames",initialState:{items:[],isLoading:!0,error:null},reducers:{getOngoingGamesRequest:function(e){e.isLoading=!0,e.error=null},getOngoingGamesSuccess:function(e,t){e.items=t.payload.result,e.isLoading=!1,e.error=null},getOngoingGamesError:function(e,t){e.isLoading=!1,e.error=t.payload}},extraReducers:(a={},Object(r.a)(a,u.b.type,(function(e,t){e.items.includes(t.payload.result)||e.items.unshift(t.payload.result)})),Object(r.a)(a,s.a.type,(function(e,t){e.items.includes(t.payload.result)||e.items.unshift(t.payload.result)})),Object(r.a)(a,s.b.type,(function(e,t){e.items.includes(t.payload.result)||e.items.unshift(t.payload.result)})),a)}),m=d.actions,f=m.getOngoingGamesRequest,b=m.getOngoingGamesSuccess,p=m.getOngoingGamesError;t.a=d.reducer;var g=function(){return function(e){return e(f()),new Promise((function(t,n){l.a.socket.get("/api/v1/game/playing",(function(a,r){if(200===r.statusCode){var i=Object(o.b)(a,[c.a]);e(b(i)),t(a)}else e(p(a)),n(r)}))}))}}},68:function(e,t,n){"use strict";n.d(t,"c",(function(){return s})),n.d(t,"b",(function(){return m}));var a=n(12),r=n(8),i=n(20),o=n(18),l=Object(a.b)({name:"singleGame",initialState:{},reducers:{getSingleGameRequest:function(e,t){e[t.payload]={isLoading:!0,error:null}},getSingleGameSuccess:function(e,t){e[t.payload.result]={isLoading:!1,error:null}},getSingleGameError:function(e,t){e[t.payload.itemId]={isLoading:!1,error:t.payload.error}}},extraReducers:{}}),c=l.actions,u=c.getSingleGameRequest,s=c.getSingleGameSuccess,d=c.getSingleGameError;t.a=l.reducer;var m=function(e){return function(t){return t(u(e)),new Promise((function(n,a){i.a.socket.get("/game/".concat(e),(function(i,l){if(200===l.statusCode){var c=Object(r.b)(i,o.a);t(s(c)),n(i)}else t(d({itemId:e,error:i})),a(l)}))}))}}},86:function(e,t,n){"use strict";n.d(t,"c",(function(){return u})),n.d(t,"b",(function(){return s}));var a,r=n(10),i=n(12),o=n(21),l=Object(i.b)({name:"authModal",initialState:{isAuthModalVisible:!1},reducers:{showAuthModal:function(e){e.isAuthModalVisible=!0},hideAuthModal:function(e){e.isAuthModalVisible=!1}},extraReducers:(a={},Object(r.a)(a,o.e.type,(function(e){e.isAuthModalVisible=!1})),Object(r.a)(a,o.h.type,(function(e){e.isAuthModalVisible=!1})),a)}),c=l.actions,u=c.showAuthModal,s=c.hideAuthModal;t.a=l.reducer},87:function(e,t,n){"use strict";n.d(t,"c",(function(){return c})),n.d(t,"b",(function(){return u}));var a=n(10),r=n(12),i=n(48),o=Object(r.b)({name:"challengeAiModal",initialState:{isChallengeAiModalVisible:!1},reducers:{showChallengeAiModal:function(e){e.isChallengeAiModalVisible=!0},hideChallengeAiModal:function(e){e.isChallengeAiModalVisible=!1}},extraReducers:Object(a.a)({},i.b.type,(function(e){e.isChallengeAiModalVisible=!1}))}),l=o.actions,c=l.showChallengeAiModal,u=l.hideChallengeAiModal;t.a=o.reducer},88:function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return m}));var a=n(12),r=n(8),i=n(20),o=n(18),l=Object(a.b)({name:"move",initialState:{},reducers:{makeMoveRequest:function(e,t){},makeMoveSuccess:function(e,t){},makeMoveError:function(e,t){}},extraReducers:{}}),c=l.actions,u=c.makeMoveRequest,s=c.makeMoveSuccess,d=c.makeMoveError,m=(l.reducer,function(e,t){return function(n){return n(u({gameId:e,move:t})),new Promise((function(a,l){i.a.socket.post("/api/v1/board/game/".concat(e,"/move/").concat(t),{},(function(e,t){if(200===t.statusCode){var i=Object(r.b)(e,o.a);n(s(i)),a(e)}else n(d(e)),l(t)}))}))}})}},[[172,1,2]]]);
//# sourceMappingURL=main.bc4d9e97.chunk.js.map