(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6636edba"],{"0442":function(t,a,e){},"0473":function(t,a,e){},"15c0":function(t,a,e){},"17dc":function(t,a,e){t.exports=e.p+"img/video.d9f5e2b3.svg"},"2b49":function(t,a,e){"use strict";e("0442")},"2bce":function(t,a,e){},"30a4":function(t,a,e){"use strict";e("ecb1")},"4c52":function(t,a,e){"use strict";e("15c0")},"5f29":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("nav",{staticClass:"navbar navbar-light bg-light navbar-expand-lg fixed-top"},[e("div",{staticClass:"container-fluid"},[e("a",{staticClass:"navbar-brand",attrs:{routerLink:"/"}},[t._v(t._s(t.adminData.siteName||""))]),t._m(0),e("div",{staticClass:"collapse navbar-collapse justify-content-end",attrs:{id:"navbarResponsiveRight"}},[e("ul",{staticClass:"navbar-nav"},[e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link",on:{click:function(a){return t.scrollTo("start")}}},[t._v("ابدأ")])]),e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link",on:{click:function(a){return t.scrollTo("social")}}},[t._v("التواصل")])]),e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link",on:{click:function(a){return t.scrollTo("payment")}}},[t._v("الدفع")])]),e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link",on:{click:function(a){return t.scrollTo("features")}}},[t._v("التعليمات")])]),e("li",[e("a",{staticClass:"nav-link",on:{click:function(){return t.$router.push("/update")}}},[t._v("تعديل بياناتك")])]),e("li",[t.token?e("a",{staticClass:"nav-link",on:{click:function(){return t.$store.dispatch("logout")}}},[t._v("تسجيل الخروج")]):t._e()])])])])]),e("div",{staticClass:"overlay-image",style:{background:"url('"+t.adminData.image1||!1,backgroundSize:"100% 100%",backgroundRepeat:"no-repeat"}}),e("div",{staticClass:"content-fixed"},[e("app-header",{attrs:{id:"start"}}),e("systems",{attrs:{id:"systems"}}),e("social",{attrs:{id:"social"}}),t.adminData.payMethod&&t.adminData.cashNumber?e("payment",{attrs:{id:"payment"}}):t._e(),e("features",{attrs:{id:"features"}})],1),e("app-footer")],1)},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarResponsiveRight","aria-controls":"navbarResponsiveRight","aria-expanded":"false","aria-label":"Toggle navigation"}},[e("span",{staticClass:"navbar-toggler-icon"})])}],n=(e("bc3a"),function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("section",{staticClass:"features gradient",style:{background:t.adminData.color||""}},[e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1440 320"}},[e("path",{attrs:{fill:"#fff","fill-opacity":".95",d:"M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,202.7C672,203,768,149,864,117.3C960,85,1056,75,1152,96C1248,117,1344,171,1392,197.3L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"}})]),e("div",{staticClass:"container"},[e("div",{staticClass:"row py-5 directed"},[t._m(0),e("div",{staticClass:"col-md-6"},[e("h1",{staticClass:"aligned underline"},[t._v("تعليمات")]),e("p",{staticClass:"aligned",staticStyle:{color:"#fff"}},[t._v("يرجى الالتزام بهذه التعليمات.")]),e("div",{staticClass:"list aligned"},[t.adminData.instructions.length>0?e("div",t._l(t.adminData.instructions.split(","),(function(a,s){return e("div",{key:s,staticClass:"aligned"},[t._v(" "+t._s(a)+" ")])})),0):t._e()])])])]),e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1440 320"}},[e("path",{attrs:{fill:"#fff","fill-opacity":".95",d:"M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,202.7C672,203,768,149,864,117.3C960,85,1056,75,1152,96C1248,117,1344,171,1392,197.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"}})])])}),c=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"col-md-6"},[s("img",{staticStyle:{width:"100%",height:"100%"},attrs:{src:e("7db6"),alt:""}})])}],r={computed:{adminData:function(){return this.$store.getters.adminData}}},o=r,l=(e("30a4"),e("2877")),d=Object(l["a"])(o,n,c,!1,null,"f99e93f0",null),u=d.exports,m=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("header",{staticClass:"page-header gradient aligned",style:{background:t.adminData.color||""}},[e("div",{staticClass:"head container"},[e("div",{staticClass:"row justify-content-center align-items-center directed"},[t._m(0),e("div",{staticClass:"col-md-7 p-4 directed"},[e("h1",{staticClass:"underline"},[t._v(t._s(t.adminData.siteName||""))]),e("h3",{staticStyle:{color:"rgba(255, 255, 255, 0.761)"}},[t._v(t._s(t.adminData.name||""))]),e("h4",{staticStyle:{color:"rgba(255, 255, 255, 0.761)"}},[t._v(t._s(t.adminData.career||""))]),e("br"),e("h4",{staticStyle:{color:"rgba(255, 255, 255, 0.761)"}},[t._v(t._s(t.adminData.phone||""))]),e("h4",{staticStyle:{color:"rgba(255, 255, 255, 0.761)"}},[t._v(t._s(t.adminData.address||""))])])])]),t.adminData.showStudentsCount?e("counter"):t._e(),t.adminData.ad&&""!=t.adminData.ad?e("app-ads",{attrs:{ad:t.adminData.ad}}):t._e(),e("auth")],1)},f=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"col-md-5 mt-5 header-photo",staticStyle:{"padding-top":"80px"}},[s("img",{staticStyle:{width:"100%",height:"100%"},attrs:{src:e("eb82"),alt:""}})])}],v=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("section",{staticClass:"auth"},[t.token?t._e():e("div",{staticClass:"not-signed"},[e("div",{staticClass:"register d-flex justify-content-around flex-wrap"},[e("button",{staticClass:"signin",on:{click:function(a){return t.navigate("/register/home/signin")}}},[t._v(" تسجيل الدخول ")]),e("button",{staticClass:"signup",on:{click:function(a){return t.navigate("/register/home/signup")}}},[t._v(" انشاء حساب ")])])]),t.token?e("div",{staticClass:"signed"},[1==t.role?e("div",{staticClass:"admin"},[e("button",{on:{click:function(a){return t.navigate("/dashboard")}}},[t._v("الذهاب للوحة التحكم")])]):t._e(),0==t.role?e("div",{staticClass:"student"},[e("h3",[t._v("مرحبا بك "+t._s(t.username))])]):t._e()]):t._e(),e("svg",{staticClass:"first-wave",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1440 320"}},[e("path",{attrs:{fill:"#fff","fill-opacity":".90",d:"M0,96L34.3,85.3C68.6,75,137,53,206,48C274.3,43,343,53,411,80C480,107,549,149,617,170.7C685.7,192,754,192,823,202.7C891.4,213,960,235,1029,213.3C1097.1,192,1166,128,1234,106.7C1302.9,85,1371,107,1406,117.3L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"}})])])},p=[],h={created:function(){},computed:{token:function(){return this.$store.getters.token},role:function(){return this.$store.getters.role},username:function(){return this.$store.getters.username}},methods:{navigate:function(t){this.$router.push(t)},editUserData:function(){this.$router.push("/update")}}},g=h,C=(e("ed0e"),Object(l["a"])(g,v,p,!1,null,"1503ac3f",null)),_=C.exports,b=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"line"}),e("div",{staticClass:"counter"},[e("div",[e("h1",{staticClass:"count text-center"},[t._v(t._s(t.count))])]),t._m(0)])])},w=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("h1",{staticClass:"underline text-center"},[t._v("طالب ملتحقين")])])}],k=(e("d3b7"),e("96cf"),e("1da1")),y={created:function(){return Object(k["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},data:function(){return{number:0}},methods:{delay:function(){return new Promise((function(t,a){setTimeout((function(){t("50 ms passed")}),50)}))}},computed:{count:function(){return this.$store.getters.students.length}},watch:{}},x=y,D=(e("4c52"),Object(l["a"])(x,b,w,!1,null,null,null)),$=D.exports,L=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container",staticStyle:{padding:"50px 2px"}},[e("div",{staticClass:"ad"},[e("h3",{staticClass:"text-center"},[t._v("أعلان")]),e("h4",{staticClass:"text-center"},[t._v(" "+t._s(t.ad)+" ")])])])},E=[],j={props:["ad"]},S=j,O=(e("d766"),Object(l["a"])(S,L,E,!1,null,"65cc90cc",null)),M=O.exports,R={components:{Auth:_,Counter:$,AppAds:M},computed:{adminData:function(){return this.$store.getters.adminData}}},T=R,B=(e("2b49"),Object(l["a"])(T,m,f,!1,null,"efd4e2a2",null)),Z=B.exports,A=function(){var t=this,a=t.$createElement,e=t._self._c||a;return""!==t.adminData.payMethod?e("section",{staticClass:"vodafone-cash"},[e("div",{staticClass:"row"},[t._m(0),e("div",{staticClass:"vodafone-number col-md-6"},[e("h5",[t._v(" لتجديد الاشتراك او الاشتراك في خدمات اضافية يرجى الشحن على الخدمة التالية على الرقم الاتي ")]),e("h3",[t._v(t._s(t.adminData.payMethod||""))]),e("h2",[t._v(t._s(t.adminData.cashNumber||""))])])])]):t._e()},N=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"vodafone-img col-md-6"},[s("img",{staticClass:"img-fluid",attrs:{src:e("ab39"),alt:""}})])}],z={computed:{adminData:function(){return this.$store.getters.adminData}}},F=z,P=(e("fa11"),Object(l["a"])(F,A,N,!1,null,"3eb90aae",null)),I=P.exports,J=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("section",{staticClass:"gallery mt-5"},[e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1440 320"}},[e("path",{attrs:{fill:"#fff","fill-opacity":".95",d:"M0,0L1440,64L1440,0L0,0Z"}})]),e("div",{staticClass:"container bg-red"},[t._m(0),e("div",{staticClass:"row my-3 g-3"},[e("div",{staticClass:"col-md-4 photo"},[e("img",{attrs:{sizes:"(min-width: 30em) 30em, 100vw",src:"https"+t.adminData.image1.split("http")[1]||!1}})]),e("div",{staticClass:"col-md-4 photo"},[e("img",{attrs:{sizes:"(min-width: 30em) 30em, 100vw",src:"https"+t.adminData.image2.split("http")[1]||!1}})]),e("div",{staticClass:"col-md-4 photo"},[e("img",{attrs:{sizes:"(min-width: 30em) 30em, 100vw",src:"https"+t.adminData.image3.split("http")[1]||!1}})])]),t._m(1)]),e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1440 220"}},[e("path",{attrs:{fill:"#fff","fill-opacity":".95",d:"M0,224L1440,288L1440,320L0,320Z"}})])])},W=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row justify-content-end"},[e("div",{staticClass:"col-md-10 directed aligned"},[e("h1",{},[t._v("الصور")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row justify-content-end"},[e("div",{staticClass:"col-md-2"})])}],H={computed:{adminData:function(){return this.$store.getters.adminData}}},U=H,V=(e("73c1"),Object(l["a"])(U,J,W,!1,null,"af213fca",null)),q=V.exports,G=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("section",{staticClass:"icons"},[e("div",{staticClass:"container"},[e("div",{staticClass:"row text-center contact"},[e("div",{staticClass:"col-md-3",on:{click:function(){t.gotoLink("facebook")}}},[t._m(0),e("h3",{staticStyle:{"text-align":"center"}},[t._v("Facebook")])]),e("div",{staticClass:"col-md-3 contact",on:{click:function(){t.gotoLink("email")}}},[t._m(1),e("h3",{staticStyle:{"text-align":"center"}},[t._v("Email")])]),e("div",{staticClass:"col-md-3 contact",on:{click:function(){t.gotoLink("telegram")}}},[t._m(2),e("h3",{staticStyle:{"text-align":"center"}},[t._v("Telegram")])]),e("div",{staticClass:"col-md-3 contact",on:{click:function(){t.gotoLink("whatsapp")}}},[t._m(3),e("h3",{staticStyle:{"text-align":"center"}},[t._v("Whatsapp")])])])])])},K=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"icon mb-4 bg-gradient"},[e("img",{attrs:{src:"https://img.icons8.com/fluent-systems-filled/144/000000/facebook-new.png"}})])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"icon mb-4"},[e("img",{attrs:{src:"https://img.icons8.com/ios-filled/100/000000/email-open.png"}})])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"icon mb-4"},[e("img",{attrs:{src:"https://img.icons8.com/glyph-neue/64/000000/sent.png"}})])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"icon mb-4"},[e("img",{attrs:{src:"https://img.icons8.com/pastel-glyph/128/000000/whatsapp--v2.png"}})])}],Q=(e("caad"),e("2532"),e("81c3")),X={computed:{adminData:function(){return this.$store.getters.adminData}},methods:{gotoLink:function(t){if("whatsapp"===t&&window.open("https://api.whatsapp.com/send?phone=+2"+this.adminData.whatsapp,"_blank"),"email"===t&&window.open("mailto:"+this.adminData.email+"?subject=Subject&body=message%20goes%20here","_blank"),"telegram"===t&&window.open(this.adminData.telegram),"facebook"===t){if(this.adminData.facebook.includes("messenger"))return window.open(this.adminData.facebook,"_blank");!navigator.platform.includes("Win32")||Q["a"].isNative?window.open("fb://facewebmodal/f?href="+this.adminData.facebook):window.open(this.adminData.facebook,"_blank")}}}},Y=X,tt=(e("d679"),Object(l["a"])(Y,G,K,!1,null,"53215444",null)),at=tt.exports,et=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("section",{staticClass:"systems"},[e("div",{staticClass:"system-card",on:{click:function(a){return t.navigate("/fullCourse")}}},[t._m(0),e("div",{staticClass:"card-title"},[t._v("الدروس")])]),e("path",{attrs:{fill:"red","fill-opacity":".90",d:"M0,96L34.3,85.3C68.6,75,137,53,206,48C274.3,43,343,53,411,80C480,107,549,149,617,170.7C685.7,192,754,192,823,202.7C891.4,213,960,235,1029,213.3C1097.1,192,1166,128,1234,106.7C1302.9,85,1371,107,1406,117.3L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"}})])},st=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"card-icon"},[s("img",{attrs:{src:e("17dc"),alt:""}})])}],it={methods:{navigate:function(t){this.$router.push(t)}}},nt=it,ct=(e("a221"),Object(l["a"])(nt,et,st,!1,null,"e52962f0",null)),rt=ct.exports,ot=e("076e"),lt={methods:{scrollTo:function(t){document.getElementById(t).scrollIntoView({block:"start",behavior:"smooth"})}},computed:{adminData:function(){return this.$store.getters.adminData},token:function(){return this.$store.getters.token},role:function(){return this.$store.getters.role}},components:{Features:u,Social:at,Systems:rt,Payment:I,AppHeader:Z,AppFooter:ot["a"],Pics:q}},dt=lt,ut=Object(l["a"])(dt,s,i,!1,null,"07c69fae",null);a["default"]=ut.exports},"73c1":function(t,a,e){"use strict";e("9b43")},"7db6":function(t,a,e){t.exports=e.p+"img/students.f9aca256.svg"},"9b43":function(t,a,e){},a1e3:function(t,a,e){},a221:function(t,a,e){"use strict";e("ebe3")},ab39:function(t,a,e){t.exports=e.p+"img/vodafone-cash.63ab2bce.png"},d679:function(t,a,e){"use strict";e("a1e3")},d766:function(t,a,e){"use strict";e("e02f")},e02f:function(t,a,e){},eb82:function(t,a,e){t.exports=e.p+"img/learning.9f02cb5b.svg"},ebe3:function(t,a,e){},ecb1:function(t,a,e){},ed0e:function(t,a,e){"use strict";e("2bce")},fa11:function(t,a,e){"use strict";e("0473")}}]);
//# sourceMappingURL=chunk-6636edba.520b2142.js.map