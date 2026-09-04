(function () {
  "use strict";

  var stack = document.querySelector("[data-loader-steps]");
  if (!stack) return;

  var steps = stack.querySelectorAll("[data-loader-step]");
  if (!steps.length) return;

  var DEFAULT_MS = Number(stack.getAttribute("data-default-step-ms")) || 950;
  var PAUSE_MS = Number(stack.getAttribute("data-pause-after-complete-ms")) || 1500;
  var timer = null;
  var activeIndex = 0;
  var icons = window.LoaderStepIcons;

  function stepDuration(row) {
    var raw = row.getAttribute("data-duration-ms");
    if (!raw) return DEFAULT_MS;
    var parsed = Number(raw);
    return Number.isFinite(parsed) && parsed >= 200 ? parsed : DEFAULT_MS;
  }

  function setRowState(row, state) {
    row.classList.remove("is-wait", "is-load", "is-done");
    row.classList.add("is-" + state);
    var icon = row.querySelector(".loader-step-icon");
    if (!icon) return;
    if (state === "wait") {
      icon.innerHTML = "";
      return;
    }
    if (!icons) return;
    if (state === "load") icon.innerHTML = icons.spinner();
    else icon.innerHTML = icons.check();
  }

  function paint(index) {
    steps.forEach(function (row, i) {
      if (i < index) setRowState(row, "done");
      else if (i === index && index < steps.length) setRowState(row, "load");
      else setRowState(row, "wait");
    });
  }

  function loop() {
    if (activeIndex > steps.length) {
      activeIndex = 0;
      paint(0);
      timer = window.setTimeout(advance, stepDuration(steps[0]));
      return;
    }

    if (activeIndex === steps.length) {
      steps.forEach(function (row) {
        setRowState(row, "done");
      });
      activeIndex += 1;
      timer = window.setTimeout(loop, PAUSE_MS);
      return;
    }

    paint(activeIndex);
    var duration = stepDuration(steps[activeIndex]);
    activeIndex += 1;
    timer = window.setTimeout(loop, duration);
  }

  function advance() {
    loop();
  }

  activeIndex = 0;
  paint(0);
  timer = window.setTimeout(advance, stepDuration(steps[0]));
})();
