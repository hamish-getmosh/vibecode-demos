(function () {
  "use strict";

  var manifest = { components: [] };
  var cardState = {};
  var rowEl = document.getElementById("component-row");

  var RADIO_VARIANTS = {
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

  function renderControls(comp) {
    if (!comp.controls || !comp.controls.length) {
      return "";
    }
    var html = '<div class="comp-card__controls">';
    comp.controls.forEach(function (ctrl) {
      var state = cardState[comp.id];
      if (ctrl.type === "toggle") {
        var checked = state[ctrl.id] ? " checked" : "";
        html +=
          '<label><input type="checkbox" data-comp="' +
          comp.id +
          '" data-key="' +
          ctrl.id +
          '"' +
          checked +
          " /> " +
          ctrl.label +
          "</label>";
      } else if (ctrl.type === "select") {
        html +=
          "<label>" +
          ctrl.label +
          ' <select data-comp="' +
          comp.id +
          '" data-key="' +
          ctrl.id +
          '">';
        ctrl.options.forEach(function (opt) {
          var sel = state[ctrl.id] === opt.value ? " selected" : "";
          html +=
            '<option value="' +
            opt.value +
            '"' +
            sel +
            ">" +
            opt.label +
            "</option>";
        });
        html += "</select></label>";
      }
    });
    html += "</div>";
    return html;
  }

  function previewShell(inner, mode) {
    var cls =
      mode === "phone"
        ? "comp-lab comp-lab--phone phone phone--hifi"
        : "comp-lab comp-lab--atom phone--hifi";
    return '<div class="' + cls + '">' + inner + "</div>";
  }

  function numericFieldMarkup(compId, state, opts) {
    opts = opts || {};
    var empty = window.QuizNumericInput && window.QuizNumericInput.isEmptyValue(state.value);
    var display = empty ? "" : String(state.value || "");
    var unit = state.unit || "cm";
    var fieldClass = "num-field";
    if (state.focused) fieldClass += " focused";
    if (empty) fieldClass += " is-empty";
    var ariaLabel =
      state.ariaLabel ||
      (unit === "kg" ? "Weight in kilograms" : "Height in centimetres") ||
      (opts.readonly ? "Numeric value" : "Numeric value");

    return (
      '<label class="' +
      fieldClass +
      " num-field--interactive" +
      '" id="field-' +
      compId +
      '">' +
      '<span class="num-field__body">' +
      '<span class="num-field__cluster">' +
      '<span class="num-field__value-wrap">' +
      '<span class="num-field__mirror" id="mirror-' +
      compId +
      '" aria-hidden="true"></span>' +
      '<input type="text" class="num-field__input" id="num-' +
      compId +
      '" inputmode="decimal" value="' +
      display +
      '" aria-label="' +
      ariaLabel +
      '"' +
      (opts.readonly ? ' readonly tabindex="-1"' : "") +
      " /></span>" +
      '<span class="num-field__unit-wrap">' +
      '<span class="unit" id="unit-' +
      compId +
      '">' +
      unit +
      "</span></span></span></span></label>"
    );
  }

  function renderPreviewMarkup(comp) {
    var state = cardState[comp.id];
    switch (comp.id) {
      case "question":
        return previewShell(
          '<div class="quiz-scroll"><div class="quiz-main">' +
            '<div class="question-block">' +
            '<h2 class="q-head">What is your lorem?</h2>' +
            '<p class="q-sub" id="subhead-' +
            comp.id +
            '">For medical purposes.</p>' +
            "</div></div></div>"
        );
      case "radio-stack":
        return previewShell(
          '<div class="quiz-scroll"><div class="quiz-main"><div class="content-block">' +
            '<div class="opts" id="opts-' +
            comp.id +
            '"></div></div></div></div>'
        );
      case "cta-primary":
        return previewShell(
          '<div class="quiz-scroll"><div class="quiz-main"><div class="content-block">' +
            '<button class="input-cta" type="button">Continue →</button>' +
            "</div></div></div>"
        );
      case "trustpilot-row":
        return previewShell(
          '<div class="quiz-scroll"><div class="page-footer">' +
            (window.QuizTrustpilotEmbed ? window.QuizTrustpilotEmbed.markup : "") +
            "</div></div>"
        );
      case "legal-fine":
        return previewShell(
          '<div class="quiz-scroll"><div class="page-footer">' +
            '<div class="legal-block"><p class="fine">By continuing you agree to our <a href="#">Terms</a> &amp; <a href="#">Privacy Policy</a></p></div>' +
            "</div></div>"
        );
      case "numeric-input":
        return previewShell(
          '<div class="quiz-scroll"><div class="quiz-main"><div class="content-block">' +
            numericFieldMarkup(comp.id, state) +
            '<p class="num-hint">Click field to focus · type digits · backspace to clear</p>' +
            "</div></div></div>"
        );
      case "numeric-input-dock":
        return previewShell(
          '<div class="quiz-scroll"><div class="quiz-main"><div class="content-block">' +
            '<div class="numeric-input-dock">' +
            numericFieldMarkup(comp.id, { value: state.value || "165", unit: state.unit || "cm", focused: true }, { readonly: true }) +
            '<button class="input-cta" type="button">Continue →</button>' +
            (window.QuizTrustpilotEmbed ? window.QuizTrustpilotEmbed.markup : "") +
            '<div class="spacing-block is-hidden" id="legal-gap-' +
            comp.id +
            '" data-gap="trust-legal"></div>' +
            '<div class="legal-block is-hidden" id="legal-' +
            comp.id +
            '"><p class="fine">By continuing you agree to our <a href="#">Terms</a> &amp; <a href="#">Privacy Policy</a></p></div>' +
            '<div class="spacing-block" data-gap="trust-bottom"></div>' +
            "</div></div></div></div>" +
            '<div class="numpad-dock" id="numpad-' +
            comp.id +
            '" aria-hidden="true"><div class="numpad-grid">' +
            "<key data-key=\"1\">1</key><key data-key=\"2\">2</key><key data-key=\"3\">3</key>" +
            "<key data-key=\"4\">4</key><key data-key=\"5\">5</key><key data-key=\"6\">6</key>" +
            "<key data-key=\"7\">7</key><key data-key=\"8\">8</key><key data-key=\"9\">9</key>" +
            '<key class="action" data-key=".">.</key><key data-key="0">0</key><key class="action" data-key="back">⌫</key>' +
            "</div></div>",
          "phone"
        );
      default:
        return previewShell("<p>Unknown component</p>");
    }
  }

  function renderCard(comp) {
    cardState[comp.id] = Object.assign({}, comp.states || {});
    var isPhone = comp.id === "numeric-input-dock";
    var previewHtml = isPhone
      ? '<div class="comp-phone-shell">' + renderPreviewMarkup(comp) + "</div>"
      : renderPreviewMarkup(comp);
    return (
      '<article class="comp-card" data-id="' +
      comp.id +
      '">' +
      '<div class="comp-card__head">' +
      '<h2 class="comp-card__title">' +
      comp.name +
      ' <span class="comp-card__tier">Tier ' +
      comp.tier +
      "</span></h2>" +
      "</div>" +
      renderControls(comp) +
      '<div class="comp-preview' +
      (isPhone ? " comp-preview--phone" : "") +
      '">' +
      previewHtml +
      "</div>" +
      "</article>"
    );
  }

  function renderRadioStack(compId) {
    var state = cardState[compId];
    var optsEl = document.getElementById("opts-" + compId);
    if (!optsEl) return;
    var options = RADIO_VARIANTS[state.variant] || RADIO_VARIANTS.gender;
    var selected = state.selectedIndex || 0;
    optsEl.innerHTML = options
      .map(function (opt, i) {
        var sel = i === selected ? " sel" : "";
        var ico = opt.icon ? '<span class="ico">' + opt.icon + "</span>" : "";
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

  function applyState(compId) {
    var state = cardState[compId];
    if (compId === "question") {
      var sub = document.getElementById("subhead-" + compId);
      if (sub) sub.classList.toggle("is-hidden", !state.showSubhead);
    }
    if (compId === "radio-stack") {
      renderRadioStack(compId);
    }
    if (compId === "numeric-input") {
      if (window.QuizNumericInput) {
        window.QuizNumericInput.sync(compId, state);
      }
    }
    if (compId === "numeric-input-dock") {
      state.focused = true;
      if (window.QuizNumericInput) {
        window.QuizNumericInput.sync(compId, state);
      }
      var legal = document.getElementById("legal-" + compId);
      var legalGap = document.getElementById("legal-gap-" + compId);
      if (legal) legal.classList.toggle("is-hidden", !state.legal);
      if (legalGap) legalGap.classList.toggle("is-hidden", !state.legal);
    }
  }

  function bindPreviewInteractions() {
    rowEl.querySelectorAll('[data-id="radio-stack"] .opts').forEach(function (optsEl) {
      optsEl.addEventListener("click", function (event) {
        var opt = event.target.closest(".opt");
        if (!opt) return;
        cardState["radio-stack"].selectedIndex = parseInt(
          opt.getAttribute("data-index"),
          10
        );
        renderRadioStack("radio-stack");
      });
    });

    rowEl.querySelectorAll('[data-id="numeric-input-dock"] .numpad-dock').forEach(function (pad) {
      pad.addEventListener("click", function (event) {
        var key = event.target.closest("key");
        if (!key) return;
        var input = document.getElementById("num-numeric-input-dock");
        var field = document.getElementById("field-numeric-input-dock");
        if (!input || !field) return;
        var val = cardState["numeric-input-dock"].value || "";
        var k = key.getAttribute("data-key");
        if (k === "back") {
          val = val.slice(0, -1);
          cardState["numeric-input-dock"].value = val;
          applyState("numeric-input-dock");
          return;
        }
        if (k === ".") {
          if (val.indexOf(".") === -1) {
            val = val ? val + "." : "0.";
            cardState["numeric-input-dock"].value = val;
            applyState("numeric-input-dock");
          }
          return;
        }
        val = !val || val === "0" ? k : val + k;
        cardState["numeric-input-dock"].value = val;
        applyState("numeric-input-dock");
      });
    });

    if (window.QuizNumericInput) {
      window.QuizNumericInput.bind("numeric-input", cardState["numeric-input"]);
    }
  }

  function bindControls() {
    rowEl.querySelectorAll("input[type=checkbox][data-comp]").forEach(function (el) {
      el.addEventListener("change", function () {
        var compId = el.getAttribute("data-comp");
        var key = el.getAttribute("data-key");
        if (key === "empty" && compId === "numeric-input") {
          cardState[compId].empty = el.checked;
          cardState[compId].value = el.checked ? "" : "165";
        } else {
          cardState[compId][key] = el.checked;
        }
        applyState(compId);
      });
    });
    rowEl.querySelectorAll("select[data-comp]").forEach(function (el) {
      el.addEventListener("change", function () {
        var compId = el.getAttribute("data-comp");
        var key = el.getAttribute("data-key");
        cardState[compId][key] = el.value;
        if (key === "variant") {
          cardState[compId].selectedIndex = 0;
        }
        applyState(compId);
      });
    });
  }

  function init() {
    fetch("components.manifest.json")
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        manifest = data;
        rowEl.innerHTML = manifest.components.map(renderCard).join("");
        bindControls();
        bindPreviewInteractions();
        manifest.components.forEach(function (comp) {
          applyState(comp.id);
        });
        if (window.QuizTrustpilotEmbed) {
          window.QuizTrustpilotEmbed.init();
        }
      })
      .catch(function (err) {
        rowEl.innerHTML =
          '<p>Failed to load manifest: ' + String(err) + "</p>";
      });
  }

  init();
})();
