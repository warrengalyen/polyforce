(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e4aa8708"],{"09d2":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e._self._c;return t("base-controller",e._b({staticClass:"flex-1"},"base-controller",{...e.$props,...e.$attrs},!1),[t("div",{staticClass:"fader",on:{wheel:e.$_handleMouseWheel}},[t("div",{ref:"track",staticClass:"fader-track"},[t("div",{staticClass:"fader-thumb",style:{"--moveY":e.position$}},[t("div",e._g({staticClass:"fader-thumb-handle handle"},e.controlHandlers))])]),t("svg",{attrs:{viewBox:"0 0 40 100",width:"40",height:"100",preserveAspectRatio:"none","shape-rendering":"geometricPrecision"}},[t("path",{attrs:{d:e.svgticks}})])])])},r=[],n=(s("ed08"),s("3dae")),o=s("28ee"),i={mixins:[n["a"]],components:{BaseController:o["a"]},computed:{faderTicks(){const e=100;return this.ticks.map(t=>({pos:this.valueToPosition(t)*e,value:-t}))},svgticks(){const e=12,t=13,s=` h${t} `;let a="";for(let r=0;r<e;r++)a+="M0 "+r/(e-1)*100+s,a+="M27 "+r/(e-1)*100+s;return a}}},c=i,l=(s("e263"),s("2877")),d=Object(l["a"])(c,a,r,!1,null,null,null);t["default"]=d.exports},1084:function(e,t,s){e.exports={primary:"#ff0080",control:"#f08f20"}},e263:function(e,t,s){"use strict";s("1084")}}]);
//# sourceMappingURL=chunk-e4aa8708.c8e485e8.js.map