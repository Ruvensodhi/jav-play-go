// ==UserScript==
// @name         removeMissavPopAd for Android via browser 
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes ad hijack divs that trigger pop() when clicking on video using MutationObserver.
// @author       https://github.com/aizhimou
// @match        *://missav.ws/*
// @match        *://missav.ai/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    // 定义处理函数，用于移除广告属性
    const cleanAdLayer = (node) => {
        // 确保节点是元素节点，可以进行查询
        if (node.nodeType !== 1) {
            return;
        }

        // 查找当前节点或其子节点中匹配的目标元素
        const targets = node.matches('div[class*="aspect-w-"]') ? [node] : node.querySelectorAll('div[class*="aspect-w-"]');

        targets.forEach(el => {
            // 使用 getAttribute 来检查属性是否存在，比检查 outerHTML 更可靠
            if (el.hasAttribute('@click')) {
                el.removeAttribute('@click');
                el.removeAttribute('@keyup.space.window');
                console.log('✅ Hijack attributes removed from:', el);
            }
        });
    };

    // 创建一个 MutationObserver 实例来监视 DOM 变化
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            // 当有新节点被添加到 DOM 时
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    cleanAdLayer(node);
                });
            }
        }
    });

    // 配置 observer：监视子节点和后代节点的变化
    const config = {
        childList: true,
        subtree: true
    };

    // 在整个文档上启动 observer
    observer.observe(document.documentElement, config);

    // 脚本加载时，也对已存在的元素执行一次清理，以防万一
    document.addEventListener('DOMContentLoaded', () => {
        cleanAdLayer(document.body);
    });

})();