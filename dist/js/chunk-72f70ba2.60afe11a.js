(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-72f70ba2"],{"45f0":function(t,e,s){"use strict";s("474c")},"474c":function(t,e,s){},9933:function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"cont"},[s("div",{staticClass:"header"},["addExam"===t.action?s("h2",{staticClass:"text-center"},[t._v("أضافة واجب")]):t._e(),"editExam"===t.action?s("h2",{staticClass:"text-center"},[t._v("تعديل الواجب")]):t._e(),"editExam"===t.action?s("h5",{staticClass:"text-center"},[t._v(t._s(t.exam.name))]):t._e(),s("hr")]),s("div",{staticClass:"settings"},[s("div",{staticClass:"row justify-content-center"},[s("div",{staticClass:"nos col-md-4"},[s("div",{staticClass:"examinfo"},[s("label",[t._v("عدد الاسئلة الرئيسية")]),s("input",{directives:[{name:"model",rawName:"v-model.number",value:t.numberOfQuestionsSections,expression:"numberOfQuestionsSections",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",min:"1",max:"10"},domProps:{value:t.numberOfQuestionsSections},on:{input:function(e){e.target.composing||(t.numberOfQuestionsSections=t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})])])])]),s("div",{staticClass:"questions"},[s("div",{staticClass:"questionsSection"},t._l(t.exam.sections,(function(e,n){return s("questions-section",{key:n,attrs:{section:e,index:n},on:{concatArraysOfQuestions:t.concatArraysOfQuestionsHandler}})})),1)]),t.loading?s("loading"):t._e(),t.removing?s("loading"):t._e(),s("div",{staticClass:"row justify-content-center align-items-center"},[s("div",{staticClass:"actions col-md-4"},[s("button",{staticClass:"btn",on:{click:t.addExam}},[t._v("اضافة الامتحان")])]),t.taskExist?s("div",{staticClass:"col-md-4"},[s("button",{staticClass:"btn btn-success",on:{click:t.gotoSolutionModel}},[t._v(" اضافة نموذج اجابة ")])]):t._e(),s("div",{staticClass:"col-md-4"},[s("button",{staticClass:"_btn btn-1",attrs:{disabled:!t.questionsExist},on:{click:t.copyQuestions}},[t._v(" Copy ")])]),s("div",{staticClass:"col-md-4"},[s("button",{staticClass:"_btn btn-2",attrs:{disabled:!t.questionsStorageExist},on:{click:t.pasteQuestions}},[t._v(" Paste ")])]),s("div",{staticClass:"col-md-4"},[s("button",{staticClass:"_btn btn-3",attrs:{disabled:!t.questionsExist},on:{click:t.download}},[t._v(" Download ")])]),s("div",{staticClass:"col-md-4"},[s("input",{ref:"upload",staticStyle:{display:"none"},attrs:{type:"file"},on:{change:t.getJson}}),s("button",{staticClass:"_btn btn-4",on:{click:t.upload}},[t._v("Upload")])]),s("div",{staticClass:"col-md-4"},[s("button",{staticClass:"_btn btn-danger",on:{click:t.removeQuestions}},[t._v("Remove")])])])],1)},a=[],i=(s("99af"),s("caad"),s("fb6a"),s("b0c0"),s("d3b7"),s("ac1f"),s("2532"),s("3ca3"),s("1276"),s("159b"),s("ddb0"),s("2b3d"),s("b85c")),o=(s("96cf"),s("1da1")),c=s("5530"),r=s("bc3a"),u=s.n(r),l=s("25d0"),d=s("c428"),m=s("56d7"),f=s("859b"),b={created:function(){var t=this;this.exam.lessonId=this.$route.params.lessonId,u.a.get("/fetchTaskByLessonId/".concat(this.exam.lessonId)).then((function(e){if(!e.data.exam)return t.action="addExam",void setTimeout((function(){t.numberOfQuestionsSections=1}),200);t.action="editExam",t.exam=e.data.exam,t.taskId=t.exam._id,t.numberOfQuestionsSections=e.data.exam.sections.length,t.taskExist=!0}))},mounted:function(){var t=this;this.intervalSave=setInterval((function(){return t.saveProgress()}),3e3)},destroyed:function(){this.intervalSave&&clearInterval(this.intervalSave)},components:{QuestionsSection:l["a"],Loading:d["a"],Datetime:f["Datetime"]},data:function(){return{exam:{year:2022,stage:"6",sections:[],lessonId:null},loading:!1,removing:!1,numberOfQuestionsSections:0,allQuestions:[],taskExist:!1,taskId:null,file:null,internalSave:null,uploadAPI:"/uploadQuestions",action:"addExam"}},computed:{questionsExist:function(){return!0},questionsStorageExist:function(){return!0}},watch:{numberOfQuestionsSections:function(t){for(var e=0,s=Object(c["a"])({},this.exam),n=0;n<t;n++)this.exam.sections[n]=s.sections[n]||{},e++;this.exam.sections=this.exam.sections.slice(0,e)}},methods:{concatArraysOfQuestionsHandler:function(t,e){this.allQuestions[e]=t},saveProgress:function(){m["eventBus"].$emit("save");var t=Object(c["a"])(Object(c["a"])({},this.exam),{},{sections:this.allQuestions});localStorage.setItem("exam",JSON.stringify(t))},addExam:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.allQuestions=[],m["eventBus"].$emit("collectQuestions"),console.log(t.validate()),t.validate()){e.next=5;break}return e.abrupt("return");case 5:return e.next=7,t.createExamFormData();case 7:s=e.sent,t.loading=!0,u.a.post(t.uploadAPI,s).then((function(e){if(t.allQuestions=[],t.loading=!1,e.data.err)return t.taskExist=!1,void t.$store.dispatch("writemessage",e.data.err);t.taskExist=!0,e.data.id&&(t.taskId=e.data.id),t.$store.dispatch("writemessage","تم رفع الواجب بنجاح"),localStorage.removeItem("exam")}));case 10:case"end":return e.stop()}}),e)})))()},createExamFormData:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var s,n,a,o,r,u,l,d,m,f,b,v,p,h,x,g,O,k,Q;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:for(a in s=new FormData,n=Object(c["a"])(Object(c["a"])({},t.exam),{},{isTask:!0}),delete n["sections"],delete n["fullDegree"],n)s.append(a,n[a]);o=0,r=[],u=Object(i["a"])(t.allQuestions),e.prev=8,u.s();case 10:if((l=u.n()).done){e.next=51;break}if(d=l.value,r.push(d),!d.type.includes("blob:")){e.next=23;break}return m="address-".concat(d.number),e.next=17,fetch(d.type);case 17:return f=e.sent,e.next=20,f.blob();case 20:b=e.sent,v=new File([b],"".concat(m,".").concat(d.mimetype.split("/")[1]),{type:d.mimetype}),s.append("image",v,m);case 23:p=Object(i["a"])(d.questions),e.prev=24,p.s();case 26:if((h=p.n()).done){e.next=41;break}if(x=h.value,o+=x.fullDegree,!x.question.includes("blob:")){e.next=39;break}return g="question-".concat(d.number,"-").concat(x.number),e.next=33,fetch(x.question);case 33:return O=e.sent,e.next=36,O.blob();case 36:k=e.sent,Q=new File([k],"".concat(g,".").concat(x.mimetype.split("/")[1]),{type:x.mimetype}),s.append("image",Q,g);case 39:e.next=26;break;case 41:e.next=46;break;case 43:e.prev=43,e.t0=e["catch"](24),p.e(e.t0);case 46:return e.prev=46,p.f(),e.finish(46);case 49:e.next=10;break;case 51:e.next=56;break;case 53:e.prev=53,e.t1=e["catch"](8),u.e(e.t1);case 56:return e.prev=56,u.f(),e.finish(56);case 59:return s.append("fullDegree",o),s.append("sections",JSON.stringify(r)),e.abrupt("return",s);case 62:case"end":return e.stop()}}),e,null,[[8,53,56,59],[24,43,46,49]])})))()},gotoSolutionModel:function(){this.$router.push("/dashboard/answerTaskAdmin/"+this.exam.lessonId)},validate:function(){var t=[];return this.allQuestions.forEach((function(e){""==e.type&&t.push("عنوان القسم رقم ".concat(e.number+1," غير موجود")),e.questions.forEach((function(s,n){""==s.question&&t.push("السؤال رقم ".concat(n+1," في القسم رقم ").concat(e.number+1," غير موجود")),""==s.fullDegree&&t.push("درجة السؤال رقم ".concat(n+1," في القسم رقم ").concat(e.number+1," غير موجودة")),s.choices.length<2&&t.push("عدد الأختيارات في السؤال رقم ".concat(n+1," القسم رقم  ").concat(e.number+1," أقل من أختيارين")),s.choices.forEach((function(s,a){""==s&&t.push("الاختيار رقم ".concat(a+1," في السؤال رقم ").concat(n+1," في القسم رقم ").concat(e.number+1," غير موجود"))}))}))})),t.length>0?(t.forEach((function(t){alert(t)})),!1):(console.log(t),!0)},copyQuestions:function(){m["eventBus"].$emit("collectQuestions"),localStorage.setItem("questions",JSON.stringify(this.allQuestions)),this.$store.dispatch("writemessage","تم نسخ الأمتحان")},pasteQuestions:function(){var t=JSON.parse(localStorage.getItem("questions"));t&&(this.exam=Object(c["a"])(Object(c["a"])({},this.exam),{},{sections:t}),this.numberOfQuestionsSections=t.length)},download:function(){m["eventBus"].$emit("collectQuestions");var t=JSON.stringify(this.allQuestions),e=new Blob([t],{type:"octet/stream"}),s=window.URL.createObjectURL(e),n=document.createElement("a");n.download=this.exam.name+".json",n.href=s,n.click(),window.URL.revokeObjectURL(s)},getJson:function(t){var e=this,s=t.target.files[0];if("json"!=s.type.split("/")[1])return alert("ملفات json فقط مسمحوحة");this.file=s;var n=new Blob([s],{type:"octet/stream"}),a=new FileReader;a.readAsText(n),a.addEventListener("loadend",(function(t){var s=JSON.parse(t.srcElement.result);s&&(e.exam=Object(c["a"])(Object(c["a"])({},e.exam),{},{sections:s}),e.numberOfQuestionsSections=s.length)}))},upload:function(){this.$refs.upload.click()},removeQuestions:function(){var t=this;confirm("تأكيد مسح الأسئلة")&&(this.exam.sections=[],this.numberOfQuestionsSections=0,setTimeout((function(){return t.numberOfQuestionsSections=1}),400),localStorage.removeItem("exam"))}}},v=b,p=(s("45f0"),s("2877")),h=Object(p["a"])(v,n,a,!1,null,"3de94ca3",null);e["default"]=h.exports}}]);
//# sourceMappingURL=chunk-72f70ba2.60afe11a.js.map