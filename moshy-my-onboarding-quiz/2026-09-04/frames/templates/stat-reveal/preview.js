(function () {
  "use strict";
  var root = document.querySelector("[data-reveal-motion]");
  if (!root || !window.RevealMotion) return;
  RevealMotion.mount(root, { loop: false });
})();
