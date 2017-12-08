var getParam = function (key) {
  "use strict";
  var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  var sParameterName = window.location.search.substr(1).match(reg);
  if(sParameterName != null) return unescape(sParameterName[2]);
  return undefined;
}

var getCookie =function (key) {
  var arr, reg = new RegExp("(^| )"+key+"=([^;]*)(;|$)");
  if(arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return undefined;
}