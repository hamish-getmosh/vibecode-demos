/* GENERATED — Lucide icons from native pull; do not hand-edit */
(function (global) {
  "use strict";
  var CHECK = "M20 6 9 17l-5-5";
  var LOADER = "M21 12a9 9 0 1 1-6.219-8.56";
  function svg(path, size, color, stroke, className) {
    return (
      '<svg class="' +
      (className || "") +
      '" width="' +
      size +
      '" height="' +
      size +
      '" viewBox="0 0 24 24" fill="none" stroke="' +
      color +
      '" stroke-width="' +
      stroke +
      '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="' +
      path +
      '"></path></svg>'
    );
  }
  global.LoaderStepIcons = {
    check: function () {
      return svg(CHECK, 12, "rgb(77, 65, 240)", 4, "");
    },
    spinner: function () {
      return svg(LOADER, 18, "#4d41f0", 2, "loader-spin");
    },
    spinnerDurationMs: 750,
  };
})(typeof window !== "undefined" ? window : globalThis);
