(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21b314"],{bf71:function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.loading?n("div",{staticClass:"center"},[n("loading")],1):e._e(),"taskAdmin"==e.action&&e.solutionModel?n("div",{staticClass:"container p-md-3 p-0"},[n("exam",{attrs:{exam:e.exam,solution_model:e.solutionModel,isSolutionModel:!0,solutionModelId:e.solutionModelId}})],1):e._e(),"taskUser"==e.action&&e.solutionModel?n("div",{staticClass:"container p-md-3 p-0"},[n("exam",{attrs:{exam:e.exam,solution_model:e.solutionModel,isTask:!0}})],1):e._e(),"taskResult"==e.action&&e.result?n("div",{staticClass:"container p-md-3 p-0"},[n("exam",{attrs:{exam:e.result,solution_model:e.solutionModel,isResult:!0}})],1):e._e()])},a=[],o=(n("caad"),n("b0c0"),n("2532"),n("5530")),r=(n("96cf"),n("1da1")),i=n("44c7"),u=n("bc3a"),l=n.n(u),d=n("9f21"),c=(n("56d7"),{components:{Exam:i["default"]},created:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.setComponent();case 1:case"end":return t.stop()}}),t)})))()},data:function(){return{action:"",loading:!1,exam:null,solutionModel:null,solutionModelId:null,stage:"6",userId:null,lessonId:null,result:null}},watch:{$route:function(e,t){this.setComponent()}},methods:{getTaskByIdForAdmin:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var n,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,l.a.get("/fetchTaskByLessonId/"+e.lessonId);case 2:n=t.sent,e.exam=n.data.exam,s=Object(o["a"])({},e.exam),l.a.get("/fetchUnitExamSolutionModelForAdmin/"+e.lessonId).then((function(t){e.loading=!1,e.solutionModel={examId:e.lessonId},t.data.solution?(e.solutionModelId=t.data.solution._id,e.solutionModel["sections"]=t.data.solution.sections):e.solutionModel["sections"]=Object(d["a"])(s)}));case 6:case"end":return t.stop()}}),t)})))()},getTaskByIdForUser:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,l.a.post("/fetchTaskByLessonIdForStudent",{lessonId:e.lessonId,userId:e.userId,stage:e.stage});case 2:if(n=t.sent,e.loading=!1,!n.data.err){t.next=7;break}return e.$router.back(),t.abrupt("return",e.$store.dispatch("writemessage",n.data.err));case 7:e.exam=n.data.exam,e.solutionModel={lessonId:e.lessonId,taskId:e.exam._id,userId:e.userId,section:e.exam.section,lesson:e.exam.number,stage:e.exam.stage,name:e.exam.name},e.solutionModel["sections"]=Object(d["a"])(e.exam);case 10:case"end":return t.stop()}}),t)})))()},getUserTaskSolution:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var n,s,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.$route.params.userId,s=e.$route.params.lessonId,t.next=4,l.a.post("/getUserTaskSolution",{userId:n,lessonId:s});case 4:a=t.sent,e.loading=!1,e.result=a.data.solution;case 7:case"end":return t.stop()}}),t)})))()},setComponent:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.stage=e.$store.getters.stage,e.userId=e.$store.getters.userId,e.loading=!0,n=e.$route,n.path.includes("answerTaskUser")?e.action="taskUser":n.path.includes("answerTaskAdmin")&&(e.action="taskAdmin"),e.$route.path.includes("userTaskSolution")&&(e.action="taskResult"),"taskAdmin"!=e.action){t.next=12;break}return e.lessonId=n.params.lessonId,t.next=10,e.getTaskByIdForAdmin();case 10:t.next=21;break;case 12:if("taskUser"!=e.action){t.next=18;break}return e.lessonId=n.params.lessonId,t.next=16,e.getTaskByIdForUser();case 16:t.next=21;break;case 18:if("taskResult"!=e.action){t.next=21;break}return t.next=21,e.getUserTaskSolution();case 21:case"end":return t.stop()}}),t)})))()}}}),m=c,p=n("2877"),x=Object(p["a"])(m,s,a,!1,null,null,null);t["default"]=x.exports}}]);
//# sourceMappingURL=chunk-2d21b314.9395bc6d.js.map