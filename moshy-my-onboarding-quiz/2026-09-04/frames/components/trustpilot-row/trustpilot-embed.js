(function (global) {
  "use strict";

  var MARKUP =
    '<div class="trust-row trust-row--embed" data-layer="trust block">' +
    '<div class="trust-row__embed">' +
    '<div class="trustpilot-widget"' +
    ' data-locale="en-AU"' +
    ' data-template-id="5419b637fa0340045cd0c936"' +
    ' data-businessunit-id="665c9030d93d3d8666e023d9"' +
    ' data-style-height="20px"' +
    ' data-style-width="100%"' +
    ' data-token="66d3ceff-718a-448e-9e37-a90847f5fcfc">' +
    '<a href="https://www.trustpilot.com/review/www.getmoshy.com.au" target="_blank" rel="noopener noreferrer">Trustpilot</a>' +
    "</div>" +
    '<div class="trust-row__link-block" aria-hidden="true"></div>' +
    "</div>" +
    "</div>";

  function loadWidgets() {
    var widgets = document.querySelectorAll(".trustpilot-widget:not([data-tp-loaded])");
    if (!widgets.length) return;

    if (global.Trustpilot && global.Trustpilot.loadFromElement) {
      widgets.forEach(function (el) {
        global.Trustpilot.loadFromElement(el);
        el.setAttribute("data-tp-loaded", "1");
      });
      return;
    }

    if (document.querySelector('script[src*="tp.widget.bootstrap"]')) return;

    var script = document.createElement("script");
    script.src = "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
    script.async = true;
    script.onload = loadWidgets;
    document.head.appendChild(script);
  }

  function init() {
    loadWidgets();
  }

  global.QuizTrustpilotEmbed = {
    markup: MARKUP,
    init: init,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window);
