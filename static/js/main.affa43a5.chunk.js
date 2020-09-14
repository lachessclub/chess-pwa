(this["webpackJsonpchess-pwa"]=this["webpackJsonpchess-pwa"]||[]).push([[0],{125:function(e,t,a){e.exports={grid:"GamePreviewsList_grid__2dFgV"}},168:function(e,t,a){e.exports=a(226)},176:function(e,t,a){},205:function(e,t){},224:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(65),o=a(10),u=a(19),c=a(9),s=a(229),l=a(231),d=(a(208),a(61)),m=a(125),f=a.n(m),g=a(155),b=function(e){var t=e.initialFen;"startpos"===t&&(t="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");var a=new g.Chess(t);return e.moves&&e.moves.split(" ").forEach((function(e){a.move(e,{sloppy:!0})})),a},p=function(e){var t=e.games,a=void 0===t?[]:t;return r.a.createElement("div",{className:f.a.grid},a.map((function(e){var t=b(e).fen();return r.a.createElement(i.b,{to:"/game/".concat(e.id),key:e.id},r.a.createElement("div",{className:f.a.cell},r.a.createElement(d.Board,{position:t,viewOnly:!1,width:240})))})))},v=a(63),E=a(29),w=function(){var e=Object(u.b)(),t=Object(u.c)((function(e){return Object(c.a)(e.ongoingGames.items,[E.a],e.entities)}));return Object(n.useEffect)((function(){e(Object(v.b)())}),[e]),r.a.createElement(p,{games:t})},h=function(){return r.a.createElement(w,null)},S=function(e){var t=e.game,a=e.onMove;if(!t)return null;var n=b(t),i=n.in_check(),o=n.fen(),u="white"===function(e){return"w"===e.turn()?"white":"black"}(n)?d.PieceColor.WHITE:d.PieceColor.BLACK,c=Object(d.getValidMoves)(n);return r.a.createElement(d.Board,{allowMarkers:!0,check:i,clickable:!0,draggable:!0,position:o,turnColor:u,validMoves:c,viewOnly:"started"!==t.status,onMove:a})},O=a(91),j=a(64),C=function(e){var t=e.id,a=Object(u.b)(),i=Object(u.c)((function(e){return Object(c.a)(t,E.a,e.entities)}));Object(n.useEffect)((function(){a(Object(O.a)(t))}),[a,t]);return i?r.a.createElement(S,{game:i,onMove:function(e){a(Object(j.b)(t,"".concat(e.from).concat(e.to)))}}):null},y=function(){var e=Object(o.f)().id;return r.a.createElement(C,{id:Number(e)})},k=a(233),P=a(230),G=a(107),M=a(232),L=a(228),q=a(36),R=q.a().shape({email:q.c().email("Invalid email").required("Required"),password:q.c().min(6,"Password length must be >= 6").required("Required")}),I=function(e){var t=e.onSubmit;return r.a.createElement(G.a,{initialValues:{email:"",password:""},validationSchema:R,onSubmit:function(e){function t(t,a){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e,a){if(t)return t(e,a)}))},(function(e){var t=e.errors,a=e.values,n=e.touched,i=e.handleChange,o=e.handleBlur,u=e.handleSubmit,c=e.isSubmitting,l=e.status,d=e.setStatus;return r.a.createElement(M.a,{noValidate:!0,onSubmit:function(e){return u(e)},onChange:function(){return d("")}},!!l&&r.a.createElement(L.a,{variant:"danger"},l),r.a.createElement(M.a.Group,null,r.a.createElement(M.a.Label,null,"Email address"),r.a.createElement(M.a.Control,{type:"email",name:"email",placeholder:"Enter email",onBlur:o,value:a.email,onChange:i,isValid:n.email&&!t.email,isInvalid:n.email&&!!t.email}),r.a.createElement(M.a.Control.Feedback,{type:"invalid"},t.email)),r.a.createElement(M.a.Group,null,r.a.createElement(M.a.Label,null,"Password"),r.a.createElement(M.a.Control,{type:"password",name:"password",placeholder:"Password",onChange:i,onBlur:o,value:a.password,isValid:n.password&&!t.password,isInvalid:n.password&&!!t.password}),r.a.createElement(M.a.Control.Feedback,{type:"invalid"},t.password)),r.a.createElement(s.a,{variant:"primary",type:"submit",disabled:c},"Login"))}))},N=q.a().shape({fullName:q.c().required("Required"),email:q.c().email("Invalid email").required("Required"),password:q.c().min(6,"Password length must be >= 6").required("Required"),confirmPassword:q.c().equals([q.b("password")],"Please repeat the password").required("Required")}),V=function(e){var t=e.onSubmit;return r.a.createElement(G.a,{initialValues:{fullName:"",email:"",password:"",confirmPassword:""},validationSchema:N,onSubmit:function(e){function t(t,a){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e,a){if(t)return t(e,a)}))},(function(e){var t=e.errors,a=e.values,n=e.touched,i=e.handleChange,o=e.handleBlur,u=e.handleSubmit,c=e.isSubmitting,l=e.status,d=e.setStatus;return r.a.createElement(M.a,{noValidate:!0,onSubmit:function(e){return u(e)},onChange:function(){return d("")}},!!l&&r.a.createElement(L.a,{variant:"danger"},l),r.a.createElement(M.a.Group,null,r.a.createElement(M.a.Label,null,"Full name"),r.a.createElement(M.a.Control,{type:"text",name:"fullName",placeholder:"Enter full name",onBlur:o,value:a.fullName,onChange:i,isValid:n.fullName&&!t.fullName,isInvalid:n.fullName&&!!t.fullName}),r.a.createElement(M.a.Control.Feedback,{type:"invalid"},t.fullName)),r.a.createElement(M.a.Group,null,r.a.createElement(M.a.Label,null,"Email address"),r.a.createElement(M.a.Control,{type:"email",name:"email",placeholder:"Enter email",onBlur:o,value:a.email,onChange:i,isValid:n.email&&!t.email,isInvalid:n.email&&!!t.email}),r.a.createElement(M.a.Control.Feedback,{type:"invalid"},t.email)),r.a.createElement(M.a.Group,null,r.a.createElement(M.a.Label,null,"Password"),r.a.createElement(M.a.Control,{type:"password",name:"password",placeholder:"Password",onChange:i,onBlur:o,value:a.password,isValid:n.password&&!t.password,isInvalid:n.password&&!!t.password}),r.a.createElement(M.a.Control.Feedback,{type:"invalid"},t.password)),r.a.createElement(M.a.Group,null,r.a.createElement(M.a.Label,null,"Confirm Password"),r.a.createElement(M.a.Control,{type:"password",name:"confirmPassword",placeholder:"Password",onChange:i,onBlur:o,value:a.confirmPassword,isValid:n.confirmPassword&&!t.confirmPassword,isInvalid:n.confirmPassword&&!!t.confirmPassword}),r.a.createElement(M.a.Control.Feedback,{type:"invalid"},t.confirmPassword)),r.a.createElement(s.a,{variant:"primary",type:"submit",disabled:c},"Register"))}))},B=a(35),A=function(){var e=Object(u.b)(),t=r.a.useCallback((function(t,a){return e(Object(B.c)(t)).catch((function(e){401===e.statusCode?a.setStatus("Incorrect email or password"):a.setStatus("Internal server error")}))}),[e]),a=r.a.useCallback((function(t,a){return e(Object(B.f)({fullName:t.fullName,email:t.email,password:t.password})).catch((function(e){409===e.statusCode?a.setStatus("The provided email address is already in use"):a.setStatus("Internal server error")}))}),[e]);return r.a.createElement(k.a,{transition:!1},r.a.createElement(P.a,{eventKey:"home",title:"Login"},r.a.createElement(I,{onSubmit:t})),r.a.createElement(P.a,{eventKey:"profile",title:"Register"},r.a.createElement(V,{onSubmit:a})))},F=a(81),U=a(38);t.default=function(){var e=Object(u.b)(),t=Object(u.c)((function(e){return e.currentUser.userId?Object(c.a)(e.currentUser.userId,U.a,e.entities):null})),a=Object(u.c)((function(e){return e.authModal})).isAuthModalVisible;return Object(n.useEffect)((function(){e(Object(B.b)()),e(Object(j.c)())}),[e]),r.a.createElement(i.a,null,t?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,"Hi, ",t.fullName),r.a.createElement(s.a,{variant:"primary",onClick:function(){return e(Object(B.e)())}},"Logout")):r.a.createElement(s.a,{variant:"primary",onClick:function(){return e(Object(F.c)())}},"Login / Register"),r.a.createElement(l.a,{show:a,onHide:function(){return e(Object(F.b)())},animation:!1},r.a.createElement(l.a.Header,{closeButton:!0},r.a.createElement(l.a.Title,null,"Login")),r.a.createElement(l.a.Body,null,r.a.createElement(A,null))),r.a.createElement("div",null,r.a.createElement("nav",null,r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(i.b,{to:"/"},"Home")))),r.a.createElement(o.c,null,r.a.createElement(o.a,{path:"/game/:id"},r.a.createElement(y,null)),r.a.createElement(o.a,{path:"/"},r.a.createElement(h,null)))))}},226:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(17),o=a.n(i),u=a(19);a(176),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var c=a(20),s=a(21),l=a(63),d=a(35),m=a(81),f=a(64),g=Object(s.c)({ongoingGames:l.a,currentUser:d.a,authModal:m.a,entities:f.a});var b=Object(c.a)({reducer:g});!function(){var e=a(224).default;o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(u.a,{store:b},r.a.createElement(e,null))),document.getElementById("root"))}(),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},29:function(e,t,a){"use strict";var n=a(9),r=a(38),i=new n.c.Entity("games",{white:r.a,black:r.a});t.a=i},30:function(e,t,a){"use strict";var n=a(152),r=a.n(n),i=a(153),o=a.n(i)()(r.a);o.sails.url="http://localhost:1337",t.a=o},35:function(e,t,a){"use strict";a.d(t,"d",(function(){return m})),a.d(t,"g",(function(){return f})),a.d(t,"b",(function(){return b})),a.d(t,"c",(function(){return p})),a.d(t,"f",(function(){return v})),a.d(t,"e",(function(){return E}));var n=a(20),r=a(9),i=a(30),o=a(38),u=Object(n.b)({name:"currentUser",initialState:{userId:null,isLoading:!0,error:null},reducers:{getCurrentUserRequest:function(e){e.isLoading=!0,e.error=null},getCurrentUserSuccess:function(e,t){e.userId=t.payload?t.payload.result:null,e.isLoading=!1,e.error=null},getCurrentUserError:function(e,t){e.isLoading=!1,e.error=t.payload},loginSuccess:function(e,t){e.userId=t.payload.result},registerSuccess:function(e,t){e.userId=t.payload.result},logoutSuccess:function(e){e.userId=null}}}),c=u.actions,s=c.getCurrentUserRequest,l=c.getCurrentUserSuccess,d=c.getCurrentUserError,m=c.loginSuccess,f=c.registerSuccess,g=c.logoutSuccess;t.a=u.reducer;var b=function(){return function(e){return e(s()),new Promise((function(t,a){i.a.socket.get("/api/v1/account/me",(function(n,i){if(200===i.statusCode){var u=Object(r.b)(n,o.a);e(l(u)),t(n)}else 401===i.statusCode?(e(l(null)),t(null)):(e(d(n)),a(i))}))}))}},p=function(e){return function(t){return new Promise((function(a,n){i.a.socket.put("/api/v1/entrance/login",{rememberMe:!0,emailAddress:e.email,password:e.password},(function(e,i){if(200===i.statusCode){var u=Object(r.b)(e,o.a);t(m(u)),a(e)}else n(i)}))}))}},v=function(e){return function(t){return new Promise((function(a,n){i.a.socket.post("/api/v1/entrance/signup",{fullName:e.fullName,emailAddress:e.email,password:e.password,confirmPassword:e.password,agreed:!0},(function(e,i){if(200===i.statusCode){var u=Object(r.b)(e,o.a);t(f(u)),a(e)}else n(i)}))}))}},E=function(){return function(e){return new Promise((function(t,a){i.a.socket.post("/api/v1/account/logout",{},(function(n,r){200===r.statusCode?(e(g()),t()):a(r)}))}))}}},38:function(e,t,a){"use strict";var n=new(a(9).c.Entity)("users");t.a=n},63:function(e,t,a){"use strict";a.d(t,"c",(function(){return l})),a.d(t,"b",(function(){return m}));var n=a(20),r=a(9),i=a(30),o=a(29),u=Object(n.b)({name:"ongoingGames",initialState:{items:[],isLoading:!0,error:null},reducers:{getOngoingGamesRequest:function(e){e.isLoading=!0,e.error=null},getOngoingGamesSuccess:function(e,t){e.items=t.payload.result,e.isLoading=!1,e.error=null},getOngoingGamesError:function(e,t){e.isLoading=!1,e.error=t.payload}},extraReducers:{}}),c=u.actions,s=c.getOngoingGamesRequest,l=c.getOngoingGamesSuccess,d=c.getOngoingGamesError;t.a=u.reducer;var m=function(){return function(e){return e(s()),new Promise((function(t,a){i.a.socket.get("/api/v1/game/playing",(function(n,i){if(200===i.statusCode){var u=Object(r.b)(n,[o.a]);e(l(u)),t(n)}else e(d(n)),a(i)}))}))}}},64:function(e,t,a){"use strict";a.d(t,"c",(function(){return h})),a.d(t,"b",(function(){return S}));var n,r=a(154),i=a(51),o=a(20),u=a(9),c=a(29),s=a(30),l=a(63),d=a(91),m=function(e,t){Object.assign(e.users,t.payload.entities.users),Object.assign(e.games,t.payload.entities.games)},f=Object(o.b)({name:"entities",initialState:{users:{},games:{}},reducers:{updateGameSuccess:m,createGameSuccess:m,makeMoveRequest:function(){},makeMoveSuccess:m,makeMoveError:function(e,t){}},extraReducers:(n={},Object(i.a)(n,l.c.toString(),m),Object(i.a)(n,d.b.toString(),m),n)}),g=f.actions,b=g.updateGameSuccess,p=g.createGameSuccess,v=g.makeMoveRequest,E=g.makeMoveSuccess,w=g.makeMoveError;t.a=f.reducer;var h=function(){return function(e){s.a.socket.on("game",(function(t){if("updated"===t.verb){var a=Object(r.a)({},t.previous,{},t.data),n=Object(u.b)(a,c.a);e(b(n))}else if("created"===t.verb){var i=Object(u.b)(t.data,c.a);e(p(i))}}))}},S=function(e,t){return function(a){return a(v()),new Promise((function(n,r){s.a.socket.post("/api/v1/board/game/".concat(e,"/move/").concat(t),{},(function(e,t){if(200===t.statusCode){var i=Object(u.b)(e,c.a);a(E(i)),n(e)}else a(w(e)),r(t)}))}))}}},81:function(e,t,a){"use strict";a.d(t,"c",(function(){return s})),a.d(t,"b",(function(){return l}));var n,r=a(51),i=a(20),o=a(35),u=Object(i.b)({name:"authModal",initialState:{isAuthModalVisible:!1},reducers:{showAuthModal:function(e){e.isAuthModalVisible=!0},hideAuthModal:function(e){e.isAuthModalVisible=!1}},extraReducers:(n={},Object(r.a)(n,o.d.toString(),(function(e){e.isAuthModalVisible=!1})),Object(r.a)(n,o.g.toString(),(function(e){e.isAuthModalVisible=!1})),n)}),c=u.actions,s=c.showAuthModal,l=c.hideAuthModal;t.a=u.reducer},91:function(e,t,a){"use strict";a.d(t,"b",(function(){return l})),a.d(t,"a",(function(){return m}));var n=a(20),r=a(9),i=a(30),o=a(29),u=Object(n.b)({name:"singleGame",initialState:{},reducers:{getSingleGameRequest:function(e,t){e[t.payload]={isLoading:!0,error:null}},getSingleGameSuccess:function(e,t){e[t.payload.result]={isLoading:!1,error:null}},getSingleGameError:function(e,t){e[t.payload.itemId]={isLoading:!1,error:t.payload.error}}},extraReducers:{}}),c=u.actions,s=c.getSingleGameRequest,l=c.getSingleGameSuccess,d=c.getSingleGameError,m=(u.reducer,function(e){return function(t){return t(s(e)),new Promise((function(a,n){i.a.socket.get("/game/".concat(e),(function(i,u){if(200===u.statusCode){var c=Object(r.b)(i,o.a);t(l(c)),a(i)}else t(d({itemId:e,error:i})),n(u)}))}))}})}},[[168,1,2]]]);
//# sourceMappingURL=main.affa43a5.chunk.js.map