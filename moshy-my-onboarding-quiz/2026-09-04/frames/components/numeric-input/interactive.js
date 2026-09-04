(function (global) {
  "use strict";

  function isEmptyValue(value) {
    return value == null || String(value).trim() === "";
  }

  function sanitizeValue(raw) {
    var val = String(raw || "").replace(/[^\d.]/g, "");
    var parts = val.split(".");
    if (parts.length > 2) val = parts[0] + "." + parts.slice(1).join("");
    return val;
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderMirror(compId, state) {
    var mirror = document.getElementById("mirror-" + compId);
    if (!mirror) return;

    var empty = isEmptyValue(state.value);
    var focused = !!state.focused;
    var caret = '<span class="num-field__caret' + (empty ? " is-leading" : " is-trailing") + '"></span>';
    var digits = empty
      ? '<span class="num-field__digits">0</span>'
      : '<span class="num-field__digits">' + escapeHtml(state.value) + "</span>";

    mirror.innerHTML = empty ? caret + digits : digits + caret;
    if (!focused) {
      var caretEl = mirror.querySelector(".num-field__caret");
      if (caretEl) caretEl.remove();
    }
  }

  function syncNumericField(compId, state) {
    var field = document.getElementById("field-" + compId);
    var input = document.getElementById("num-" + compId);
    var unit = document.getElementById("unit-" + compId);
    var empty = isEmptyValue(state.value);

    if (field) {
      field.classList.add("num-field--interactive");
      field.classList.toggle("focused", !!state.focused);
      field.classList.toggle("is-empty", empty);
    }
    if (unit && state.unit) {
      unit.textContent = state.unit;
    }
    if (input && document.activeElement !== input) {
      input.value = empty ? "" : String(state.value);
    }
    renderMirror(compId, state);
  }

  function bindNumericInput(compId, state) {
    var field = document.getElementById("field-" + compId);
    var input = document.getElementById("num-" + compId);
    if (!field || !input) return;

    input.removeAttribute("readonly");
    input.setAttribute("autocomplete", "off");
    input.setAttribute("autocorrect", "off");
    input.setAttribute("spellcheck", "false");
    input.setAttribute("inputmode", "decimal");
    input.setAttribute("aria-hidden", "true");
    input.tabIndex = -1;

    field.setAttribute("tabindex", "0");
    field.setAttribute("role", "textbox");
    field.setAttribute("inputmode", "decimal");

    function focusField() {
      state.focused = true;
      syncNumericField(compId, state);
      try {
        input.focus({ preventScroll: true });
      } catch (_err) {
        input.focus();
      }
    }

    field.addEventListener("click", function () {
      focusField();
    });

    field.addEventListener("focus", function () {
      state.focused = true;
      syncNumericField(compId, state);
    });

    field.addEventListener("blur", function () {
      state.focused = false;
      syncNumericField(compId, state);
    });

    input.addEventListener("input", function () {
      state.value = sanitizeValue(input.value);
      if (input.value !== state.value) input.value = state.value;
      state.empty = isEmptyValue(state.value);
      syncNumericField(compId, state);
    });

    field.addEventListener("keydown", function (event) {
      if (event.key === "Backspace" || event.key === "Delete") {
        event.preventDefault();
        var val = String(state.value || "");
        state.value = val.slice(0, -1);
        state.empty = isEmptyValue(state.value);
        if (input) input.value = state.empty ? "" : state.value;
        syncNumericField(compId, state);
        return;
      }
      if (event.key.length === 1 && /[\d.]/.test(event.key)) {
        event.preventDefault();
        var next = sanitizeValue(String(state.value || "") + event.key);
        state.value = next;
        state.empty = isEmptyValue(state.value);
        if (input) input.value = state.value;
        syncNumericField(compId, state);
      }
    });

    syncNumericField(compId, state);
  }

  global.QuizNumericInput = {
    sync: syncNumericField,
    bind: bindNumericInput,
    renderMirror: renderMirror,
    isEmptyValue: isEmptyValue
  };
})(window);
