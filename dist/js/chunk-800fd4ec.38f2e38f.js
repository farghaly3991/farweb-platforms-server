(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-800fd4ec"],{"73ad":function(t,e,s){},"73c9":function(t,e,s){},a434:function(t,e,s){"use strict";var i=s("23e7"),o=s("23cb"),n=s("a691"),a=s("50c4"),r=s("7b0b"),c=s("65f0"),l=s("8418"),u=s("1dde"),d=u("splice"),h=Math.max,m=Math.min,v=9007199254740991,f="Maximum allowed length exceeded";i({target:"Array",proto:!0,forced:!d},{splice:function(t,e){var s,i,u,d,g,w,p=r(this),_=a(p.length),b=o(t,_),x=arguments.length;if(0===x?s=i=0:1===x?(s=0,i=_-b):(s=x-2,i=m(h(n(e),0),_-b)),_+s-i>v)throw TypeError(f);for(u=c(p,i),d=0;d<i;d++)g=b+d,g in p&&l(u,d,p[g]);if(u.length=i,s<i){for(d=b;d<_-i;d++)g=d+i,w=d+s,g in p?p[w]=p[g]:delete p[w];for(d=_;d>_-i+s;d--)delete p[d-1]}else if(s>i)for(d=_-i;d>b;d--)g=d+i-1,w=d+s-1,g in p?p[w]=p[g]:delete p[w];for(d=0;d<s;d++)p[d+b]=arguments[d+2];return p.length=_-i+s,u}})},ab8b:function(t,e,s){"use strict";s("73c9")},bafb:function(t,e,s){"use strict";s("73ad")},c740:function(t,e,s){"use strict";var i=s("23e7"),o=s("b727").findIndex,n=s("44d2"),a="findIndex",r=!0;a in[]&&Array(1)[a]((function(){r=!1})),i({target:"Array",proto:!0,forced:r},{findIndex:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),n(a)},dd1f:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"cont"},[t.admin?s("h3",{staticClass:"text-center"},[t._v("بدأ بث مباشر جديد")]):t._e(),t.admin?t._e():s("h3",{staticClass:"text-center"},[t._v("بث مباشر")]),s("hr"),t.admin?s("div",{staticClass:"admin-control"},[s("div",{staticClass:"row align-items-end",attrs:{dir:"rtl"}},[s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.stage,expression:"stage"}],staticClass:"form-control",attrs:{disabled:t.live},on:{change:[function(e){var s=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.stage=e.target.multiple?s:s[0]},t.changeStage]}},[s("option",{attrs:{selected:"",value:"1"}},[t._v("الصف الأول الاعدادي")]),s("option",{attrs:{selected:"",value:"2"}},[t._v("الصف الثاني الاعدادي")]),s("option",{attrs:{selected:"",value:"3"}},[t._v("الصف الثالث الاعدادي")]),s("option",{attrs:{selected:"",value:"4"}},[t._v("الصف الأول الثانوي")]),s("option",{attrs:{selected:"",value:"5"}},[t._v("الصف الثاني الثانوي")]),s("option",{attrs:{selected:"",value:"6"}},[t._v("الصف الثالث الثانوي")])])])]),s("div",{staticClass:"col-md-6 butt"},[t.live?t._e():s("button",{staticClass:"btn w-100 start",on:{click:t.startLive}},[t._v("ابدأ")]),t.live?s("button",{staticClass:"btn btn-danger end w-100",on:{click:t.stopLive}},[t._v(" اوقف البث ")]):t._e()])])]):t._e(),s("div",{staticClass:"w-100 online-users"},[s("hr"),s("div",{staticClass:"row users"},t._l(t.stage_users,(function(e,i){return s("div",{key:i,staticClass:"col-md-2 user",on:{click:function(s){t.userToDraw=e._id}}},[s("i",{staticClass:"fa fa-user"}),s("span",{staticClass:"state",class:t.isOnline(e._id)},[t._v(t._s(t.isOnline(e._id)))]),s("div",{staticClass:"name"},[t._v(t._s(e.fullname))]),e._id==t.userToDraw?s("p",{staticStyle:{background:"green",color:"#fff"}},[t._v(" draw allowed ")]):t._e()])})),0)]),s("div",{staticClass:"timer m-auto"},[t._v(t._s(t.time))]),s("hr"),s("div",{staticClass:"con row"},[s("div",{staticClass:"col-md-8 video"},[s("div",{staticClass:"overlay1"}),s("iframe",{attrs:{width:"100%",height:"415",src:"https://www.youtube.com/embed/live_stream?channel="+t.youtubeSecret,title:"YouTube video player",allowfullscreen:"",frameborder:"3",allow:"autoplay;"}}),s("div",{staticClass:"overlay2"})]),s("div",{staticClass:"comments",class:t.board?"col-md-12":"col-md-4"},[t._m(0),s("div",{staticClass:"messages"},t._l(t.messages,(function(e,i){return s("div",{key:i,staticClass:"message"},[s("div",{staticClass:"name"},[t._v(" "+t._s(e.name)),s("i",{staticClass:"fa fa-user",staticStyle:{"margin-left":"4px"}})]),s("div",{staticClass:"text"},[t._v(t._s(e.text))])])})),0),s("div",{staticClass:"send row"},[s("div",{staticClass:"col-md-8"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.message,expression:"message"}],staticClass:"form-control",attrs:{placeholder:"ارسل رسالة"},domProps:{value:t.message},on:{input:function(e){e.target.composing||(t.message=e.target.value)}}})]),s("div",{staticClass:"col-md-4"},[s("button",{staticClass:"btn btn-primary",on:{click:t.sendMessage}},[t._v("ارسل")])])])]),s("div",{staticClass:"col-md-12"},[s("drawing-board",{attrs:{userToDraw:t.userToDraw,io:t.io}})],1)]),s("hr"),s("br"),s("br")])},o=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"header"},[s("h5",{staticClass:"text-center"},[t._v("الشات الجماعي")]),s("hr")])}],n=(s("c740"),s("caad"),s("a434"),s("d3b7"),s("ac1f"),s("25f0"),s("2532"),s("5319"),s("1276"),s("2909")),a=(s("56d7"),s("8055")),r=s.n(a),c=s("bc3a"),l=s.n(c),u=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"d-flex flex-column align-items-center justify-content-center"},[s("div",{staticClass:"options row w-100 p-2 bg-dark m-4",attrs:{dir:"rtl"}},[s("div",{staticClass:"col-md-1"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.color,expression:"color"}],staticClass:"form-control",staticStyle:{height:"50px",width:"70px"},attrs:{type:"color"},domProps:{value:t.color},on:{input:function(e){e.target.composing||(t.color=e.target.value)}}})]),s("div",{staticClass:"col-md-1"},[s("div",{staticStyle:{width:"50px",height:"50px",cursor:"pointer",background:"#fff"},on:{click:t.erease}},[s("i",{staticClass:"fa fa-rubber"})])]),s("div",{staticClass:"col-md-1"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.lineWidth,expression:"lineWidth"}],staticClass:"form-control",staticStyle:{height:"50xp"},attrs:{type:"range",min:"1",max:"25",value:"5"},domProps:{value:t.lineWidth},on:{__r:function(e){t.lineWidth=e.target.value}}})]),t.drawAllowed?s("div",{staticClass:"col-md-2"},[s("h5",{staticStyle:{color:"#fff"}},[t._v("مسموح لك بالكتابة")])]):t._e()]),s("canvas",{attrs:{id:"canvas",width:"1500",height:"800"},on:{mousedown:t.handleMouseDown,mouseup:t.handleMouseUp,mousemove:t.handleMouseMove}})])},d=[],h={props:["io","userToDraw"],mounted:function(){var t=this;1==this.role&&(this.drawAllowed=!0);var e=document.getElementById("canvas");this.ctx=e.getContext("2d"),this.ctx.imageSmoothingEnabled=!1,this.io.on("mouse-down",(function(e){e.userId!==t.userId&&t.mouseDownAction(e)})),this.io.on("mouse-up",(function(e){e.userId!=t.userId&&(t.mouse.down=!1)})),this.io.on("erease",(function(e){e.userId!=t.userId&&t.ctx.clearRect(0,0,1e3,1e3)})),this.io.on("mouse-move",(function(e){e.userId!=t.userId&&t.mouseMoveAction(e)})),this.io.on("user-to-draw",(function(e){1!=t.role&&(e==t.userId?t.drawAllowed=!0:t.drawAllowed=!1)}))},data:function(){return{ctx:null,color:"#000",lineWidth:2,drawAllowed:!1,mouse:{current:{x:0,y:0},previous:{x:0,y:0},down:!1}}},computed:{currentMouse:function(){var t=document.getElementById("canvas"),e=t.getBoundingClientRect();return console.log(this.mouse.current.y-e.top),{x:this.mouse.current.x-e.left,y:this.mouse.current.y-e.top}},stage:function(){return this.$store.getters.stage},role:function(){return this.$store.getters.role},userId:function(){return this.$store.getters.userId}},watch:{userToDraw:function(t){console.log(t),1==this.role&&this.io.emit("user-to-draw",{stage:this.stage,userId:t})}},methods:{draw:function(t){this.mouse.down&&(this.ctx.strokeStyle=this.color,t.color&&(this.ctx.strokeStyle=t.color),this.ctx.lineWidth=this.lineWidth,t.color&&(this.ctx.lineWidth=t.lineWidth),this.ctx.lineTo(this.currentMouse.x,this.currentMouse.y),this.ctx.stroke())},handleMouseDown:function(t){this.drawAllowed&&(this.mouseDownAction(t),this.io.emit("mouse-down",{stage:this.stage,userId:this.userId,clientX:t.clientX,clientY:t.clientY}))},mouseDownAction:function(t){var e=document.getElementById("canvas").getBoundingClientRect();console.log(e),window.scrollTo(0,1250),this.mouse.down=!0,this.ctx.closePath(),this.ctx.beginPath(),this.mouse.current={x:t.clientX,y:t.clientY},this.ctx.moveTo(this.currentMouse.x,this.currentMouse.y)},handleMouseUp:function(){this.drawAllowed&&(this.mouse.down=!1,this.io.emit("mouse-up",{stage:this.stage,userId:this.userId}))},handleMouseMove:function(t){this.mouse.down&&this.drawAllowed&&(this.mouseMoveAction(t),this.io.emit("mouse-move",{stage:this.stage,userId:this.userId,clientX:t.clientX,clientY:t.clientY,color:this.color,lineWidth:this.lineWidth}))},mouseMoveAction:function(t){this.mouse.down&&(this.mouse.current={x:t.clientX,y:t.clientY},this.draw(t))},erease:function(){1==this.role&&(this.ctx.clearRect(0,0,1e3,1e3),this.io.emit("erease",{stage:this.stage,userId:this.userId}))}}},m=h,v=(s("ab8b"),s("2877")),f=Object(v["a"])(m,u,d,!1,null,"b1e3c43e",null),g=f.exports,w={components:{DrawingBoard:g},mounted:function(){var t=this;this.admin||(this.stage=localStorage.getItem("stage"),this.joinRoom()),l.a.get("/getYoutubeSecret").then((function(e){t.youtubeSecret=e.data.youtubeSecret})),this.getStageUsers(),this.io.on("live",(function(e){t.online=!0,t.live=!0,t.seconds=e.seconds,t.time=new Date(1e3*t.seconds-72e5).toString().split("1970")[1].split("GMT")[0]})),this.io.on("finish",(function(){console.log("finished "),t.online=!1,t.live=!1,t.time="00:00:00",t.seconds=0,t.admin||t.$router.replace("/")})),this.io.on("comment",(function(e){t.messages.push(e)})),this.io.on("new_user",(function(e){t.viewers.includes(e.userId)||t.viewers.push(e.userId)})),this.io.on("quited",(function(e){var s=t.viewers.findIndex((function(t){return t==e})),i=Object(n["a"])(t.viewers);i.splice(s,1),t.viewers=i})),this.io.on("not_allowed",(function(){t.$router.replace("/")})),this.io.on("user-to-draw",(function(e){t.userToDraw=e}))},data:function(){return{io:r()(l.a.defaults.baseURL),stage:"6",live:!1,online:!1,seconds:0,time:"00:00:00",message:"",messages:[],stage_users:[],viewers:[],youtubeSecret:"",board:!1,userToDraw:null}},computed:{admin:function(){return 1==localStorage.getItem("role")},username:function(){return localStorage.getItem("username")},userId:function(){return this.$store.getters.userId}},watch:{stage:function(t){}},methods:{startLive:function(){console.log(this.stage),this.io.emit("add_boradcaster",this.stage)},stopLive:function(){this.io.emit("stop",this.stage),this.time="00:00:00",this.seconds=0,this.messages=[]},sendMessage:function(){this.io.emit("do_comment",{name:this.username,text:this.message}),this.message=""},changeStage:function(){this.getStageUsers()},getStageUsers:function(){var t=this;l.a.get("/getStageUsers/"+this.stage).then((function(e){t.stage_users=e.data.users,console.log(t.stage_users)}))},joinRoom:function(){this.io.emit("register_as_user",{userId:this.userId,room:localStorage.getItem("stage")})},isOnline:function(t){var e=this.viewers.includes(t)?"online":"offline";return e}},destroyed:function(){this.io.emit("quit",this.userId),this.admin&&this.stopLive()}},p=w,_=(s("bafb"),Object(v["a"])(p,i,o,!1,null,null,null));e["default"]=_.exports}}]);
//# sourceMappingURL=chunk-800fd4ec.38f2e38f.js.map