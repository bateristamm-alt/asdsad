/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/css/style.css":
/*!**********************************!*\
  !*** ./src/assets/css/style.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://nino/./src/assets/css/style.css?");

/***/ }),

/***/ "./src/assets/js/index.js":
/*!********************************!*\
  !*** ./src/assets/js/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/style.css */ \"./src/assets/css/style.css\");\n\n\n\n//# sourceURL=webpack://nino/./src/assets/js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/assets/js/index.js");
/******/ 	
/******/ })()

function initReel(wrapId, trackId, speed, dir) {
  const wrap = document.getElementById(wrapId);
  const track = document.getElementById(trackId);
  if (!wrap || !track) return;

  // Duplicar tarjetas para cinta infinita
  const originals = Array.from(track.children);
  originals.forEach(s => {
    const clone = s.cloneNode(true);
    const ov = s.querySelector('video'), cv = clone.querySelector('video');
    [ov, cv].forEach(x => {
      if (x) {
        x.muted = true;
        x.defaultMuted = true;
        x.setAttribute('playsinline', '');
      }
    });
    track.appendChild(clone);
  });

  let setWidth = 0, offset = 0, lastTime = null, paused = false;

  function measure() {
    setWidth = originals.reduce((sum, s) => sum + s.offsetWidth + 16, 0);
    if (dir > 0 && offset === 0) offset = setWidth;
  }
  measure();
  window.addEventListener('resize', measure);

  function tick(t) {
    if (lastTime === null) lastTime = t;
    const dt = (t - lastTime) / 1000;
    lastTime = t;

    if (!paused && setWidth) {
      offset += (dir > 0 ? -1 : 1) * speed * dt;
      if (offset >= setWidth) offset -= setWidth;
      if (offset <= 0 && dir > 0) offset += setWidth;
      track.style.transform = `translateX(-${offset}px)`;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  wrap.addEventListener('mouseenter', () => paused = true);
  wrap.addEventListener('mouseleave', () => paused = false);

  // Optimización: Solo reproducir los videos visibles en pantalla (máximo 8 a la vez)
  const MAX_PLAYING = 8;
  function syncPlayback() {
    const vh = window.innerHeight, vw = window.innerWidth, cx = vw / 2;
    const wr = wrap.getBoundingClientRect();
    const rowVisible = wr.bottom > -40 && wr.top < vh + 40;

    const items = Array.from(track.querySelectorAll('video')).map(vid => {
      const r = vid.getBoundingClientRect();
      return {
        vid,
        on: rowVisible && r.right > -40 && r.left < vw + 40,
        d: Math.abs((r.left + r.right) / 2 - cx)
      };
    });

    items.filter(x => x.on).sort((a, b) => a.d - b.d).forEach((x, i) => {
      x.on = i < MAX_PLAYING;
    });

    items.forEach(({ vid, on }) => {
      if (on && vid.paused && vid.getAttribute('src')) {
        vid.muted = true;
        const p = vid.play();
        if (p && p.catch) p.catch(() => {});
      } else if (!on && !vid.paused) {
        vid.pause();
      }
    });
  }

  setInterval(syncPlayback, 400);
  ['scroll', 'touchstart', 'click'].forEach(ev =>
    window.addEventListener(ev, syncPlayback, { passive: true })
  );
}

// Control de Lightbox (YouTube)
function openVideoLightbox(youtubeId) {
  const lb = document.getElementById('videoLightbox');
  const iframe = document.getElementById('lightboxIframe');

  iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=1`;
  lb.classList.add('open');
}

function closeVideoLightbox() {
  const lb = document.getElementById('videoLightbox');
  const iframe = document.getElementById('lightboxIframe');

  lb.classList.remove('open');
  iframe.src = '';
}

document.addEventListener('DOMContentLoaded', () => {
  initReel('reelWrap', 'reelTrack', 26, -1);
});