import jade from "jade-runtime"; export default function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (giphy, undefined) {
var jade_indent = [];
buf.push("\n<ul class=\"giphy\">");
// iterate giphy
;(function(){
  var $$obj = giphy;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var gif = $$obj[$index];

buf.push("\n  <li class=\"giphy__item\">\n    <p class=\"giphy__description\">" + (jade.escape((jade_interp = gif.description) == null ? '' : jade_interp)) + "</p><img" + (jade.attr("src", gif.url, true, false)) + (jade.attr("alt", gif.description, true, false)) + " class=\"giphy__img\"/>\n  </li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var gif = $$obj[$index];

buf.push("\n  <li class=\"giphy__item\">\n    <p class=\"giphy__description\">" + (jade.escape((jade_interp = gif.description) == null ? '' : jade_interp)) + "</p><img" + (jade.attr("src", gif.url, true, false)) + (jade.attr("alt", gif.description, true, false)) + " class=\"giphy__img\"/>\n  </li>");
    }

  }
}).call(this);

buf.push("\n</ul>");}.call(this,"giphy" in locals_for_with?locals_for_with.giphy:typeof giphy!=="undefined"?giphy:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
}