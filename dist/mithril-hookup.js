!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((n=n||self).mithrilHookup=n.mithrilHookup||{})}(this,function(n){"use strict";function t(n,t,r){return t in n?Object.defineProperty(n,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[t]=r,n}function r(n){for(var r=1;r<arguments.length;r++){var e=null!=arguments[r]?arguments[r]:{},o=Object.keys(e);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(e).filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),o.forEach(function(r){t(n,r,e[r])})}return n}function e(n,t){return function(n){if(Array.isArray(n))return n}(n)||function(n,t){var r=[],e=!0,o=!1,u=void 0;try{for(var i,c=n[Symbol.iterator]();!(e=(i=c.next()).done)&&(r.push(i.value),!t||r.length!==t);e=!0);}catch(n){o=!0,u=n}finally{try{e||null==c.return||c.return()}finally{if(o)throw u}}return r}(n,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function o(n){return function(n){if(Array.isArray(n)){for(var t=0,r=new Array(n.length);t<n.length;t++)r[t]=n[t];return r}}(n)||function(n){if(Symbol.iterator in Object(n)||"[object Arguments]"===Object.prototype.toString.call(n))return Array.from(n)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var u=function(n,t){return function(){var u=!1,c=[],f=0,a=[],l=0,s=[],y=new Map,p=m.redraw,v=function(n){var t=l++,r=a[t]||[],e=void 0===n||!!Array.isArray(n)&&(n.length>0?!n.every(function(n,t){return n===r[t]}):!u);return a[t]=n,e},h=function(){var n=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return function(t,r){if(v(r)){var e=function(){var n=t();"function"==typeof n&&(y.set(t,n),y.set("_",p))};s.push(n?function(){return new Promise(function(n){return requestAnimationFrame(n)}).then(e)}:e)}}},d=function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(n){return n},r=f++;return u||(c[r]=n),[c[r],function(n){var e=c[r],o=t(n,r);c[r]=o,o!==e&&p()}]},b=function(n,t){var r=v(t),o=e(u?d():d(n()),2),i=o[0],c=o[1];return u&&r&&c(n()),i},w={useState:function(n){return d(n,function(n,t){return"function"==typeof n?n(c[t]):n})},useEffect:h(!0),useLayoutEffect:h(),useReducer:function(n,t,r){var o=!u&&r?r(t):t,i=e(d(o),2),c=i[0],f=i[1];return[c,function(t){return f(n(c,t))}]},useRef:function(n){return e(d({current:n}),1)[0]},useMemo:b,useCallback:function(n,t){return b(function(){return n},t)}},g=r({},w,t&&t(w)),O=function(){s.forEach(i),s.length=0,l=0,f=0};return{view:function(t){return n(t,g)},oncreate:function(){return O(),u=!0},onupdate:O,onremove:function(){o(y.values()).forEach(i)}}}},i=Function.prototype.call.bind(Function.prototype.call);n.hookup=u,n.createComponent=function(n){return u(function(t,r){return n({hooks:r})(t.attrs)})},n.withCustomHooks=function(n){return function(t){return function(e){var o=e.hooks;return t({hooks:r({},o,n(o))})}}},Object.defineProperty(n,"__esModule",{value:!0})});
//# sourceMappingURL=mithril-hookup.js.map
