(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{23:function(C,d,t){"use strict";t.d(d,"e",function(){return M}),t.d(d,"d",function(){return h}),t.d(d,"a",function(){return L}),t.d(d,"b",function(){return I}),t.d(d,"c",function(){return v});var o=t(62),O=Object.defineProperty,_=Object.defineProperties,f=Object.getOwnPropertyDescriptors,T=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable,a=(n,e,i)=>e in n?O(n,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):n[e]=i,c=(n,e)=>{for(var i in e||(e={}))s.call(e,i)&&a(n,i,e[i]);if(T)for(var i of T(e))E.call(e,i)&&a(n,i,e[i]);return n},r=(n,e)=>_(n,f(e));const A={},M=(n=A,e)=>{switch(e.type){case"REMOVE-TASK":return r(c({},n),{[e.todolistId]:n[e.todolistId].filter(D=>D.id!==e.taskId)});case"ADD-TASK":const i={id:Object(o.a)(),title:e.title,isDone:!1};return r(c({},n),{[e.todolistId]:[i,...n[e.todolistId]]});case"CHANGE-TASK-STATUS":return r(c({},n),{[e.todoListID]:n[e.todoListID].map(D=>D.id===e.taskID?r(c({},D),{isDone:e.isDone}):D)});case"CHANGE-TASK-TITLE":return r(c({},n),{[e.todoListID]:n[e.todoListID].map(D=>D.id===e.taskID?r(c({},D),{title:e.title}):D)});case"ADD-TODOLIST":return r(c({},n),{[e.todolistId]:[]});case"REMOVE-TODOLIST":const m=c({},n);return delete m[e.todoListID],m;default:return n}},h=(n,e)=>({type:"REMOVE-TASK",taskId:n,todolistId:e}),L=(n,e)=>({type:"ADD-TASK",title:n,todolistId:e}),I=(n,e,i)=>({type:"CHANGE-TASK-STATUS",taskID:n,isDone:e,todoListID:i}),v=(n,e,i)=>({type:"CHANGE-TASK-TITLE",taskID:n,title:e,todoListID:i})},24:function(C,d,t){"use strict";t.d(d,"e",function(){return M}),t.d(d,"d",function(){return h}),t.d(d,"a",function(){return L}),t.d(d,"b",function(){return I}),t.d(d,"c",function(){return v});var o=t(62),O=Object.defineProperty,_=Object.defineProperties,f=Object.getOwnPropertyDescriptors,T=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable,a=(n,e,i)=>e in n?O(n,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):n[e]=i,c=(n,e)=>{for(var i in e||(e={}))s.call(e,i)&&a(n,i,e[i]);if(T)for(var i of T(e))E.call(e,i)&&a(n,i,e[i]);return n},r=(n,e)=>_(n,f(e));const A=[],M=(n=A,e)=>{switch(e.type){case"REMOVE-TODOLIST":return n.filter(m=>m.id!==e.todoListID);case"ADD-TODOLIST":const i={id:e.todolistId,title:e.title,filter:"all"};return[...n,i];case"CHANGE-TODOLIST-FILTER":return n.map(m=>m.id===e.todoListID?r(c({},m),{filter:e.filter}):m);case"CHANGE-TODOLIST-TITLE":return n.map(m=>m.id===e.todoListID?r(c({},m),{title:e.title}):m);default:return n}},h=n=>({type:"REMOVE-TODOLIST",todoListID:n}),L=n=>({type:"ADD-TODOLIST",title:n,todolistId:Object(o.a)()}),I=(n,e)=>({type:"CHANGE-TODOLIST-FILTER",filter:n,todoListID:e}),v=(n,e)=>({type:"CHANGE-TODOLIST-TITLE",title:n,todoListID:e})},30:function(C,d,t){"use strict";(function(o){var O=t(0),_=t.n(O),f=t(81),T=t(60),s=t(35);function E(a){const[c,r]=Object(O.useState)(""),[A,M]=Object(O.useState)(!1),h=v=>{r(v.currentTarget.value),M(!1)},L=()=>{const v=c.trim();v?a.addItem(v):M(!0),r("")},I=v=>{v.key==="Enter"&&L()};return o.createElement("div",null,o.createElement(T.a,{variant:"outlined",size:"small",value:c,onChange:h,onKeyPress:I,label:"Title",error:A,helperText:A&&"Title is required!"}),o.createElement(s.a,{onClick:L,color:"primary"},o.createElement(f.a,null)))}d.a=E}).call(this,t(0))},41:function(C,d,t){"use strict";(function(o){var O=t(0),_=t.n(O),f=t(60);function T(s){const[E,a]=Object(O.useState)(s.title),[c,r]=Object(O.useState)(!1),A=()=>r(!0),M=()=>{r(!1),s.changeTitle(E)},h=I=>{I.key==="Enter"&&M()},L=I=>a(I.currentTarget.value);return c?o.createElement(f.a,{value:E,autoFocus:!0,onChange:L,onKeyPress:h,onBlur:M}):o.createElement("span",{onDoubleClick:A},s.title)}d.a=T}).call(this,t(0))},49:function(C,d,t){"use strict";t.d(d,"a",function(){return T});var o=t(23),O=t(24),_=t(42);const f=Object(_.a)({tasks:o.e,todolists:O.e}),T=Object(_.b)(f);window.store=T},50:function(C,d,t){"use strict";t.d(d,"a",function(){return T});const o=Boolean(window.location.hostname==="localhost"||window.location.hostname==="[::1]"||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function O(s){if("serviceWorker"in navigator){if(new URL("/todolist",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",()=>{const a="/todolist/service-worker.js";o?(f(a,s),navigator.serviceWorker.ready.then(()=>{console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):_(a,s)})}}function _(s,E){navigator.serviceWorker.register(s).then(a=>{a.onupdatefound=()=>{const c=a.installing;c!=null&&(c.onstatechange=()=>{c.state==="installed"&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),E&&E.onUpdate&&E.onUpdate(a)):(console.log("Content is cached for offline use."),E&&E.onSuccess&&E.onSuccess(a)))})}}).catch(a=>{console.error("Error during service worker registration:",a)})}function f(s,E){fetch(s,{headers:{"Service-Worker":"script"}}).then(a=>{const c=a.headers.get("content-type");a.status===404||c!=null&&c.indexOf("javascript")===-1?navigator.serviceWorker.ready.then(r=>{r.unregister().then(()=>{window.location.reload()})}):_(s,E)}).catch(()=>{console.log("No internet connection found. App is running in offline mode.")})}function T(){"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(s=>{s.unregister()}).catch(s=>{console.error(s.message)})}},51:function(C,d,t){"use strict";(function(o){var O=t(79),_=t.n(O),f=t(52),T=t(30),s=t(43),E=t(58),a=t(82),c=t(83),r=t(35),A=t(85),M=t(36),h=t(86),L=t(84),I=t(24),v=t(23),n=t(15);function e(){const i=Object(n.c)(l=>l.todolists),m=Object(n.c)(l=>l.tasks),D=Object(n.b)();function P(l,u){D(Object(v.d)(l,u))}function g(l,u){D(Object(v.a)(l,u))}function K(l,u,y){D(Object(v.b)(l,u,y))}function S(l,u,y){D(Object(v.c)(l,u,y))}function U(l,u){let y=Object(I.b)(l,u);D(y)}function W(l,u){D(Object(I.c)(l,u))}function B(l){const u=Object(I.d)(l);D(u)}function j(l){const u=Object(I.a)(l);D(u)}function R(l){switch(l.filter){case"active":return m[l.id].filter(u=>!u.isDone);case"completed":return m[l.id].filter(u=>u.isDone);default:return m[l.id]}}const F=i.map(l=>{const u=R(l);return o.createElement(s.a,{item:!0,key:l.id},o.createElement(E.a,{elevation:5,style:{padding:"20px"}},o.createElement(f.a,{todoListID:l.id,title:l.title,filter:l.filter,tasks:u,removeTask:P,removeTodoList:B,changeTodoListFilter:U,changeTodoListTitle:W,changeTaskStatus:K,changeTaskTitle:S,addTask:g})))});return o.createElement("div",{className:"App"},o.createElement(a.a,{position:"static"},o.createElement(c.a,{style:{justifyContent:"space-between"}},o.createElement(r.a,{color:"inherit"},o.createElement(L.a,null)),o.createElement(A.a,{variant:"h6"},"Todolists"),o.createElement(M.a,{color:"inherit",variant:"outlined"},"Login"))),o.createElement(h.a,{fixed:!0},o.createElement(s.a,{container:!0,style:{padding:"20px 0"}},o.createElement(T.a,{addItem:j})),o.createElement(s.a,{container:!0,spacing:5}," ",F)))}d.a=e}).call(this,t(0))},52:function(C,d,t){"use strict";(function(o){var O=t(30),_=t(41),f=t(87),T=t(35),s=t(36),E=t(59),a=t(15);function c(r){const A=Object(a.c)(P=>P.todolists.filter(g=>g.id===r.todoListID)[0]),M=Object(a.c)(P=>P.tasks[r.todoListID]),h=Object(a.b)(),{filter:L}=r,I=P=>r.addTask(P,r.todoListID),v=r.tasks.map(P=>{const g=()=>r.removeTask(P.id,r.todoListID),K=W=>{r.changeTaskStatus(P.id,W.currentTarget.checked,r.todoListID)},S=W=>{r.changeTaskTitle(P.id,W,r.todoListID)};let U=P.isDone?"is-done":"";return o.createElement("li",{key:P.id},o.createElement("span",{className:U},o.createElement(f.a,{size:"small",color:"primary",checked:P.isDone,onChange:K}),o.createElement(_.a,{title:P.title,changeTitle:S})),o.createElement(T.a,{onClick:g,color:"secondary"},o.createElement(E.a,null)))}),n=P=>r.changeTodoListTitle(P,r.todoListID),e=()=>r.removeTodoList(r.todoListID),i=()=>r.changeTodoListFilter("all",r.todoListID),m=()=>r.changeTodoListFilter("active",r.todoListID),D=()=>r.changeTodoListFilter("completed",r.todoListID);return o.createElement("div",null,o.createElement("h3",null,o.createElement(_.a,{title:r.title,changeTitle:n}),o.createElement(T.a,{onClick:e,color:"secondary"},o.createElement(E.a,null))),o.createElement(O.a,{addItem:I}),o.createElement("ul",{style:{listStyle:"none",padding:0}},v),o.createElement("div",null,o.createElement(s.a,{variant:L==="all"?"contained":"outlined",color:"primary",size:"small",onClick:i},"All"),o.createElement(s.a,{style:{marginLeft:"3px"},variant:L==="active"?"contained":"outlined",color:"primary",size:"small",onClick:m},"Active"),o.createElement(s.a,{style:{marginLeft:"3px"},variant:L==="completed"?"contained":"outlined",color:"primary",size:"small",onClick:D},"Completed")))}d.a=c}).call(this,t(0))},68:function(C,d,t){"use strict";t.r(d),function(o){var O=t(8),_=t.n(O),f=t(75),T=t.n(f),s=t(49),E=t(15),a=t(50),c=t(51);_.a.render(o.createElement(E.a,{store:s.a},o.createElement(c.a,null)),document.getElementById("root")),a.a()}.call(this,t(0))},75:function(C,d,t){},79:function(C,d,t){}},[[68,1,2]]]);

//# sourceMappingURL=main.1fdc295c.chunk.js.map