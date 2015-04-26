"use strict";angular.module("publicApp",["ngCookies","ngResource","ngSanitize","ngRoute","ui.slider"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"../views/bot.html",controller:"MainCtrl"}).when("/main",{templateUrl:"../views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/bot"})}]),angular.module("publicApp").controller("MainCtrl",["$scope","roverSocket",function(a,b){a.rover=function(c){console.log(b);var d={command:c};b.comando(d).then(function(b){a.status=b})},a.$on("ws",function(b,c){console.log("ws ",c),a.status=c}),a.roverModel={arm:90},a.sliderChange=function(c){var d={command:c+"Move",params:[JSON.stringify(a.roverModel[c])]};b.comando(d)}}]),angular.module("publicApp").factory("roverSocket",["$q","$rootScope",function(a,b){function c(b){var c=a.defer(),d=e();return g[d]={time:new Date,cb:c},b.callback_id=d,console.log("Sending request",b),j.send(JSON.stringify(b)),c.promise}function d(a){var c=a;console.log("Received data from websocket: ",c),void 0===c.callback_id?b.$broadcast("ws",c):g.hasOwnProperty(c.callback_id)&&(b.$apply(g[c.callback_id].cb.resolve(c.data)),delete g[c.callbackID])}function e(){return h+=1,h>1e4&&(h=0),h}var f={},g={},h=0,i="ws://"+location.host+"/roverSocket";console.log(i);var j=new WebSocket(i);return j.onopen=function(){console.log("Socket has been opened!")},j.onmessage=function(a){console.log(a),console.log(JSON.parse(a.data)),d(JSON.parse(a.data))},f.comando=function(a){return console.log(a,a.toString(),JSON.stringify(a)),c(a)},f}]);