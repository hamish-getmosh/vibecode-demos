(function () {
  "use strict";

  var stack = document.querySelector("[data-multi-select]");
  var cta = document.querySelector("[data-multi-select-cta]");
  if (!stack || !cta) return;

  function exclusiveOpt() {
    return stack.querySelector(".opt[data-exclusive]");
  }

  function selectedOpts() {
    return stack.querySelectorAll(".opt.sel");
  }

  function syncCta() {
    cta.classList.toggle("is-hidden", selectedOpts().length === 0);
  }

  stack.addEventListener("click", function (event) {
    var opt = event.target.closest(".opt");
    if (!opt) return;

    var isExclusive = opt.hasAttribute("data-exclusive");

    if (isExclusive) {
      var wasSelected = opt.classList.contains("sel");
      stack.querySelectorAll(".opt").forEach(function (item) {
        item.classList.remove("sel");
      });
      if (!wasSelected) {
        opt.classList.add("sel");
      }
    } else {
      var none = exclusiveOpt();
      if (none && none.classList.contains("sel")) {
        none.classList.remove("sel");
      }
      opt.classList.toggle("sel");
    }

    syncCta();
  });

  syncCta();
})();
