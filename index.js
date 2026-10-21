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


// Carga la API iFrame de YouTube dinámicamente
if (!window.YT) {
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Se ejecuta automáticamente cuando la API de YouTube está lista
function onYouTubeIframeAPIReady() {
  const iframes = document.querySelectorAll('.reel-yt-player');
  
  iframes.forEach((iframe) => {
    const maxTime = parseFloat(iframe.dataset.end) || 15;
    
    const player = new YT.Player(iframe, {
      events: {
        'onReady': (event) => {
          event.target.mute();
          event.target.playVideo();
        },
        'onStateChange': (event) => {
          // Si el video finaliza por completo, reiniciar
          if (event.data === YT.PlayerState.ENDED) {
            event.target.seekTo(0);
            event.target.playVideo();
          }
        }
      }
    });

    // Monitorea la reproducción para hacer bucle exactamente a los 15 segundos
    setInterval(() => {
      if (player && player.getCurrentTime) {
        const currentTime = player.getCurrentTime();
        if (currentTime >= maxTime) {
          player.seekTo(0);
          player.playVideo();
        }
      }
    }, 250);
  });
}

// Inicializar la cinta infinita (Carrusel)
function initReel(wrapId, trackId, speed, dir) {
  const wrap = document.getElementById(wrapId);
  const track = document.getElementById(trackId);
  if (!wrap || !track) return;

  const originals = Array.from(track.children);
  originals.forEach(s => {
    const clone = s.cloneNode(true);
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
}

// Abrir Modal Lightbox con el ID del video
function openVideoLightbox(youtubeId) {
  const lb = document.getElementById('videoLightbox');
  const iframe = document.getElementById('lightboxIframe');

  iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=1`;
  lb.classList.add('open');
}

// Cerrar Modal Lightbox
function closeVideoLightbox() {
  const lb = document.getElementById('videoLightbox');
  const iframe = document.getElementById('lightboxIframe');

  lb.classList.remove('open');
  iframe.src = '';
}

document.addEventListener('DOMContentLoaded', () => {
  initReel('reelWrap', 'reelTrack', 26, -1);
});