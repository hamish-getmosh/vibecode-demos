(function () {
  "use strict";

  var input = document.getElementById("num-input");
  var unitEl = document.getElementById("num-unit");
  var field = document.getElementById("num-field");
  var legalBlock = document.getElementById("legal-block");
  var legalGap = document.getElementById("legal-gap");
  var numpad = document.getElementById("numpad");
  var value = "165";

  function setLegal(show) {
    legalBlock.classList.toggle("is-hidden", !show);
    legalGap.classList.toggle("is-hidden", !show);
  }

  function syncDisplay() {
    var empty = !value;
    input.value = empty ? "" : value;
    field.classList.toggle("is-empty", empty);
  }

  numpad.addEventListener("click", function (event) {
    var key = event.target.closest("key");
    if (!key) return;
    var k = key.getAttribute("data-key");
    if (k === "back") {
      value = value.slice(0, -1);
      syncDisplay();
      return;
    }
    if (k === ".") {
      if (value.indexOf(".") === -1) value = value ? value + "." : "0.";
      syncDisplay();
      return;
    }
    value = !value || value === "0" ? k : value + k;
    syncDisplay();
  });

  window.addEventListener("message", function (event) {
    if (!event.data || event.data.type !== "component-state") return;
    if (event.data.value != null) {
      value = String(event.data.value);
      syncDisplay();
    }
    if (event.data.unit) unitEl.textContent = event.data.unit;
    if (typeof event.data.legal === "boolean") setLegal(event.data.legal);
  });
})();
