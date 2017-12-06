var getParam = function (key) {
  "use strict";
  var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  var sParameterName = window.location.search.substr(1).match(reg);
  if(sParameterName != null) return unescape(sParameterName[2]);
  return undefined;
}