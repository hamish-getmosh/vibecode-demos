(function () {
  "use strict";

  var state = {
    focused: false,
    empty: true,
    value: "",
    unit: "cm"
  };

  if (window.QuizNumericInput) {
    window.QuizNumericInput.bind("preview", state);
  }
})();
