(function () {
  "use strict";

  window.addEventListener("message", function (event) {
    if (!event.data || event.data.type !== "component-state") return;
    var wrap = document.getElementById("subhead-wrap");
    if (!wrap) return;
    wrap.classList.toggle("is-hidden", !event.data.showSubhead);
  });
})();
