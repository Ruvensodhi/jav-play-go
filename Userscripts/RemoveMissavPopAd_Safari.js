// ==UserScript==
// @name         removeMissavPopAd for iOS safari browser
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes ad hijack divs that trigger pop() when clicking on video
// @author       https://github.com/aizhimou
// @match        *://missav.ws/*
// @match        *://missav.ai/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  // 延迟执行，确保页面元素加载完毕
  const removeHijackDivs = () => {
    let found = false;
    document.querySelectorAll('div.aspect-w-16.aspect-h-9').forEach((el, index) => {
      if (el.outerHTML.includes('@click="pop()"')) {
        el.removeAttribute('@click');
        el.removeAttribute('@keyup.space.window');
        console.log(`✅ Removed hijack from div #${index}`, el);
        found = true;
      }
    });

    if (!found) {
      console.log('ℹ️ No hijack divs found.');
    }
  };

  // 尝试执行 + 防止页面延迟加载的容错机制
  window.addEventListener('load', () => {
    setTimeout(removeHijackDivs, 500); // 页面完全加载后稍等0.5秒
  });
})();
