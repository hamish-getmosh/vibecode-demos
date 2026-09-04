(function () {
  "use strict";

  var VARIANTS = {
    gender: [
      { label: "Female", icon: "♀" },
      { label: "Male", icon: "♂" }
    ],
    age: [
      { label: "18–29" },
      { label: "30–39" },
      { label: "40–49" },
      { label: "50–59" },
      { label: "60–69" },
      { label: "70+" }
    ]
  };

  var variant = "gender";
  var selectedIndex = 0;
  var optsEl = document.getElementById("opts");

  function render() {
    var options = VARIANTS[variant] || VARIANTS.gender;
    optsEl.innerHTML = options
      .map(function (opt, i) {
        var sel = i === selectedIndex ? " sel" : "";
        var ico = opt.icon
          ? '<span class="ico">' + opt.icon + "</span>"
          : "";
        return (
          '<div class="opt' +
          sel +
          '" data-index="' +
          i +
          '">' +
          ico +
          opt.label +
          "</div>"
        );
      })
      .join("");
  }

  optsEl.addEventListener("click", function (event) {
    var opt = event.target.closest(".opt");
    if (!opt) return;
    selectedIndex = parseInt(opt.getAttribute("data-index"), 10);
    render();
  });

  window.addEventListener("message", function (event) {
    if (!event.data || event.data.type !== "component-state") return;
    if (event.data.variant && VARIANTS[event.data.variant]) {
      variant = event.data.variant;
    }
    if (typeof event.data.selectedIndex === "number") {
      selectedIndex = event.data.selectedIndex;
    }
    render();
  });

  render();
})();
