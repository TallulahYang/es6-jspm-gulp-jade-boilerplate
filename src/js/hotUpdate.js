function article(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (head, items, undefined) {
var jade_indent = [];
buf.push("\n<div id=\"skrollr-body\">\n  <article id=\"main-article\">\n    <header id=\"main-header\">\n      <div id=\"header-image\">\n        <div class=\"chapter02\">\n          <div class=\"divide\"></div>\n        </div>\n        <div class=\"fade-in one\">\n          <div class=\"bgfadein\"></div>\n        </div>\n        <div class=\"headeronetitle\">\n          <p class=\"subtitle fade-in two\">" + (((jade_interp = head.subtitle) == null ? '' : jade_interp)) + "</p>\n          <div class=\"fade-in two\">\n            <div class=\"headerline1\"></div>\n          </div>\n          <p class=\"title fade-in two\">" + (((jade_interp = head.title) == null ? '' : jade_interp)) + "</p>\n          <p class=\"descr fade-in three\">" + (jade.escape((jade_interp = head.description) == null ? '' : jade_interp)) + "</p>\n          <div" + (jade.attr("data-src", head.imgpath, true, false)) + " class=\"headerone fade-in four\"><img" + (jade.attr("src", "" + (head.imgpath) + "", true, false)) + " alt=\"\"/></div>\n          <div class=\"fade-in four\">\n            <div class=\"headerline2\"></div>\n          </div>\n          <p class=\"scrolldown fade-in four\">SCROLL DOWN</p>\n          <div class=\"sdarrow fade-in four\"></div>\n        </div>\n      </div>\n    </header>");
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {

    for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
      var item = $$obj[i];

buf.push("\n    <section" + (jade.attr("id", "section-" + (i) + "", true, false)) + ">\n      <div class=\"titleleft\">\n        <div class=\"titleinner\">\n          <h2>" + (jade.escape((jade_interp = item.title) == null ? '' : jade_interp)) + "</h2>\n          <div class=\"stats\">\n            <div class=\"infos\"> <span class=\"cover\">Original Cover: </span><span class=\"numbs\">" + (jade.escape((jade_interp = item.stats_numbs) == null ? '' : jade_interp)) + "</span></div>\n            <div class=\"dates\"><span>" + (jade.escape((jade_interp = item.stats_date) == null ? '' : jade_interp)) + "</span></div>\n          </div>\n          <p class=\"descr\">" + (((jade_interp = item.description) == null ? '' : jade_interp)) + "</p>\n        </div>\n      </div>\n      <div class=\"slideContainer\">\n        <div class=\"reveal\">Slide to reveal</div>\n        <div class=\"slide\">\n          <div" + (jade.attr("data-src", "" + ( item.firstImg ) + "", true, false)) + " class=\"imgfirst preload\"></div>\n          <div" + (jade.attr("data-src", "" + ( item.lastImg ) + "", true, false)) + " class=\"imglast preload\"></div>\n        </div>\n      </div>\n      <div class=\"sectionbar\"></div>\n    </section>");
    }

  } else {
    var $$l = 0;
    for (var i in $$obj) {
      $$l++;      var item = $$obj[i];

buf.push("\n    <section" + (jade.attr("id", "section-" + (i) + "", true, false)) + ">\n      <div class=\"titleleft\">\n        <div class=\"titleinner\">\n          <h2>" + (jade.escape((jade_interp = item.title) == null ? '' : jade_interp)) + "</h2>\n          <div class=\"stats\">\n            <div class=\"infos\"> <span class=\"cover\">Original Cover: </span><span class=\"numbs\">" + (jade.escape((jade_interp = item.stats_numbs) == null ? '' : jade_interp)) + "</span></div>\n            <div class=\"dates\"><span>" + (jade.escape((jade_interp = item.stats_date) == null ? '' : jade_interp)) + "</span></div>\n          </div>\n          <p class=\"descr\">" + (((jade_interp = item.description) == null ? '' : jade_interp)) + "</p>\n        </div>\n      </div>\n      <div class=\"slideContainer\">\n        <div class=\"reveal\">Slide to reveal</div>\n        <div class=\"slide\">\n          <div" + (jade.attr("data-src", "" + ( item.firstImg ) + "", true, false)) + " class=\"imgfirst preload\"></div>\n          <div" + (jade.attr("data-src", "" + ( item.lastImg ) + "", true, false)) + " class=\"imglast preload\"></div>\n        </div>\n      </div>\n      <div class=\"sectionbar\"></div>\n    </section>");
    }

  }
}).call(this);

buf.push("\n  </article>\n</div>\n<div id=\"back-top-footer\"><a href=\"#\" class=\"back-top\"><img src=\"images/backtotop2.png\"/>\n    <div class=\"back-top-txt\"></div></a></div>");}.call(this,"head" in locals_for_with?locals_for_with.head:typeof head!=="undefined"?head:undefined,"items" in locals_for_with?locals_for_with.items:typeof items!=="undefined"?items:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
}