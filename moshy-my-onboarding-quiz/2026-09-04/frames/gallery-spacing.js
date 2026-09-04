(function () {
  "use strict";

  var STORAGE_TEMPLATE = "gallery-active-template";
  var STORAGE_INSTANCE = "gallery-active-instance";
  var STORAGE_LEGAL = "gallery-show-legal";

  var GAP_TO_VAR = {
    "chrome-headline": "--quiz-gap-chrome-headline",
    "headline-subhead": "--quiz-gap-headline-subhead",
    "subhead-content": "--quiz-gap-subhead-content",
    "headline-content": "--quiz-gap-headline-content",
    "content-footer": "--quiz-gap-content-footer",
    "input-cta": "--quiz-gap-input-cta",
    "trust-legal": "--quiz-gap-trust-legal",
    "cta-trust": "--quiz-gap-cta-trust",
    "trust-bottom": "--quiz-gap-trust-bottom",
    "eyebrow-lead": "--quiz-gap-eyebrow-lead",
    "lead-stat": "--quiz-gap-lead-stat",
    "stat-chart": "--quiz-gap-stat-chart",
    "bridge-pill": "--quiz-gap-bridge-pill",
    "pill-body": "--quiz-gap-pill-body",
    "body-note": "--quiz-gap-body-note"
  };

  var LADDER = {
    "0": 0,
    "2xs": 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    "2xl": 44,
    "3xl": 60,
    "4xl": 80
  };

  var GAP_LABELS = {
    "chrome-headline": "Chrome → headline",
    "headline-subhead": "Headline → subhead",
    "subhead-content": "Subhead → content",
    "headline-content": "Headline → content",
    "content-footer": "Content → footer",
    "input-cta": "Input → CTA",
    "trust-legal": "Trustpilot → legal",
    "cta-trust": "CTA → Trustpilot",
    "trust-bottom": "Footer → bottom",
    "eyebrow-lead": "Eyebrow → lead",
    "lead-stat": "Lead → stat",
    "stat-chart": "Stat → chart",
    "bridge-pill": "Bridge → pills",
    "pill-body": "Pills → body",
    "body-note": "Body → disclaimer"
  };

  var manifest = { templates: [] };
  var activeTemplateId = null;
  var activeInstance = null;
  var spacingByTemplate = {};
  var savedSpacingByTemplate = {};
  var spacingLoaded = {};
  var showSpacing = true;
  var showLegal = false;
  var activeGapId = null;
  var iframeClickHandler = null;

  var tabsEl = document.getElementById("template-tabs");
  var liveFrame = document.getElementById("live-frame");
  var liveTitle = document.getElementById("live-title");
  var liveId = document.getElementById("live-id");
  var thumbGrid = document.getElementById("thumb-grid");
  var toggleSpacing = document.getElementById("toggle-spacing");
  var toggleLegal = document.getElementById("toggle-legal");
  var liveLegalToggle = document.getElementById("live-legal-toggle");
  var btnSave = document.getElementById("btn-save");
  var toastEl = document.getElementById("toast");
  var gapModal = document.getElementById("gap-modal");
  var gapModalTitle = document.getElementById("gap-modal-title");
  var gapReadout = document.getElementById("gap-readout");
  var gapSelect = document.getElementById("gap-select");
  var gapCancel = document.getElementById("gap-cancel");
  var gapApply = document.getElementById("gap-apply");

  function spacingApi(templateId) {
    return "/api/templates/" + encodeURIComponent(templateId) + "/spacing";
  }

  function px(token) {
    return LADDER[token] + "px";
  }

  function templateIds() {
    return manifest.templates.map(function (t) {
      return t.templateId || t.name;
    });
  }

  function readStoredTemplateId() {
    var hash = (location.hash || "").replace(/^#/, "");
    if (hash && templateIds().indexOf(hash) !== -1) {
      return hash;
    }
    try {
      var stored = sessionStorage.getItem(STORAGE_TEMPLATE);
      if (stored && templateIds().indexOf(stored) !== -1) {
        return stored;
      }
    } catch (e) {}
    return manifest.templates[0] ? (manifest.templates[0].templateId || manifest.templates[0].name) : null;
  }

  function readStoredInstanceId(templateId) {
    try {
      var key = STORAGE_INSTANCE + ":" + templateId;
      return sessionStorage.getItem(key);
    } catch (e) {}
    return null;
  }

  function persistSelection() {
    if (!activeTemplateId) return;
    try {
      sessionStorage.setItem(STORAGE_TEMPLATE, activeTemplateId);
      if (activeInstance) {
        sessionStorage.setItem(STORAGE_INSTANCE + ":" + activeTemplateId, activeInstance.screenId);
      }
    } catch (e) {}
    if (location.hash.replace(/^#/, "") !== activeTemplateId) {
      history.replaceState(null, "", "#" + encodeURIComponent(activeTemplateId));
    }
  }

  function readStoredShowLegal() {
    try {
      return sessionStorage.getItem(STORAGE_LEGAL) === "1";
    } catch (e) {}
    return false;
  }

  function persistShowLegal() {
    try {
      sessionStorage.setItem(STORAGE_LEGAL, showLegal ? "1" : "0");
    } catch (e) {}
  }

  function getLiveDoc() {
    try {
      return liveFrame.contentDocument || (liveFrame.contentWindow && liveFrame.contentWindow.document);
    } catch (e) {
      return null;
    }
  }

  function frameHasLegalSlots(doc) {
    return !!(doc && doc.querySelector("[data-legal-slot]"));
  }

  function applyLegalVisibility(doc) {
    doc = doc || getLiveDoc();
    if (!doc) return;
    var hasLegal = frameHasLegalSlots(doc);
    if (liveLegalToggle) {
      liveLegalToggle.hidden = !hasLegal;
    }
    doc.documentElement.classList.toggle("legal-on", showLegal && hasLegal);
    if (toggleLegal) {
      toggleLegal.checked = showLegal;
    }
  }

  function setShowLegal(on) {
    showLegal = !!on;
    persistShowLegal();
    if (toggleLegal) {
      toggleLegal.checked = showLegal;
    }
    applyLegalVisibility(getLiveDoc());
  }

  function applyGapsToRoot(root, gaps) {
    if (!root) return;
    Object.keys(gaps).forEach(function (gapId) {
      var cssVar = GAP_TO_VAR[gapId];
      if (cssVar) {
        root.style.setProperty(cssVar, px(gaps[gapId]));
      }
    });
  }

  function tokenFromRootVar(gapId, doc) {
    var cssVar = GAP_TO_VAR[gapId];
    if (!cssVar || !doc) return null;
    var raw = getComputedStyle(doc.documentElement).getPropertyValue(cssVar).trim();
    var pxVal = parseInt(raw, 10);
    if (isNaN(pxVal)) return null;
    var match = null;
    Object.keys(LADDER).forEach(function (token) {
      if (LADDER[token] === pxVal) match = token;
    });
    return match;
  }

  function ensureGapInMemory(gapId, doc) {
    if (!activeTemplateId) return null;
    if (!spacingByTemplate[activeTemplateId]) {
      spacingByTemplate[activeTemplateId] = {};
    }
    var gaps = spacingByTemplate[activeTemplateId];
    if (Object.prototype.hasOwnProperty.call(gaps, gapId)) {
      return gaps[gapId];
    }
    if (doc) {
      var el = doc.querySelector('.spacing-block[data-gap="' + gapId + '"]');
      if (el) {
        var fromDom = el.getAttribute("data-token");
        if (fromDom && Object.prototype.hasOwnProperty.call(LADDER, fromDom)) {
          gaps[gapId] = fromDom;
          return fromDom;
        }
      }
      var fromRoot = tokenFromRootVar(gapId, doc);
      if (fromRoot) {
        gaps[gapId] = fromRoot;
        return fromRoot;
      }
    }
    return null;
  }

  function syncGapsFromDom(doc) {
    if (!doc || !activeTemplateId) return;
    if (!spacingByTemplate[activeTemplateId]) {
      spacingByTemplate[activeTemplateId] = {};
    }
    doc.querySelectorAll(".spacing-block[data-gap]").forEach(function (el) {
      ensureGapInMemory(el.getAttribute("data-gap"), doc);
    });
  }

  function updateSpacingLabels(doc) {
    if (!doc) return;
    var gaps = spacingByTemplate[activeTemplateId] || {};
    doc.querySelectorAll(".spacing-block[data-gap]").forEach(function (el) {
      var gapId = el.getAttribute("data-gap");
      var token = gaps[gapId];
      if (token === undefined) return;
      el.setAttribute("data-token", token);
      el.setAttribute("data-px", px(token));
    });
  }

  function onIframeClick(ev) {
    if (!showSpacing) return;
    var block = ev.target.closest(".spacing-block[data-gap]");
    if (!block) return;
    ev.preventDefault();
    ev.stopPropagation();
    openGapModal(block.getAttribute("data-gap"));
  }

  function wireIframe(doc) {
    if (!doc) return;

    if (iframeClickHandler) {
      doc.removeEventListener("click", iframeClickHandler, true);
    }
    iframeClickHandler = onIframeClick;
    doc.addEventListener("click", iframeClickHandler, true);

    doc.documentElement.classList.toggle("spaces-on", showSpacing);
    doc.querySelectorAll(
      ".quiz-scroll, .loader-zone, .footer-dock, .page-footer, .quiz-main--stat-reveal, .quiz-main--reframe"
    ).forEach(function (el) {
      el.classList.remove("spaces-on");
    });

    syncGapsFromDom(doc);
    applyGapsToRoot(doc.documentElement, spacingByTemplate[activeTemplateId] || {});
    updateSpacingLabels(doc);
    applyLegalVisibility(doc);
  }

  function onLiveLoad() {
    try {
      wireIframe(liveFrame.contentDocument);
    } catch (e) {}
  }

  function setDirty(isDirty) {
    btnSave.disabled = !isDirty;
  }

  function gapsEqual(a, b) {
    var keys = Object.keys(a || {});
    if (keys.length !== Object.keys(b || {}).length) return false;
    return keys.every(function (k) { return a[k] === b[k]; });
  }

  function checkDirty() {
    setDirty(!gapsEqual(
      spacingByTemplate[activeTemplateId],
      savedSpacingByTemplate[activeTemplateId]
    ));
  }

  function bustSrc(src) {
    var url = new URL(src, window.location.href);
    url.searchParams.set("t", String(Date.now()));
    return url.pathname + url.search;
  }

  function mountThumbFrame(shell, src) {
    shell.innerHTML = "";
    var frame = document.createElement("iframe");
    frame.className = "phone-frame";
    frame.setAttribute("tabindex", "-1");
    frame.setAttribute("scrolling", "no");
    frame.src = src;
    shell.appendChild(frame);
  }

  function renderThumbs(template) {
    thumbGrid.innerHTML = "";
    template.instances.forEach(function (inst) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "thumb";
      btn.setAttribute("aria-label", inst.title + " " + inst.screenId);
      btn.dataset.src = inst.src;
      btn.dataset.title = inst.title;
      btn.dataset.id = inst.screenId;

      var shell = document.createElement("div");
      shell.className = "phone-shell phone-shell--thumb";
      btn.appendChild(shell);

      btn.addEventListener("click", function () {
        selectInstance(template, inst);
      });

      thumbGrid.appendChild(btn);
      mountThumbFrame(shell, inst.src);
    });
  }

  function selectInstance(template, inst, options) {
    options = options || {};
    activeInstance = inst;
    liveFrame.src = inst.src;
    liveTitle.textContent = inst.title;
    liveId.textContent = inst.screenId;
    thumbGrid.querySelectorAll(".thumb").forEach(function (t) {
      t.classList.toggle("active", t.dataset.id === inst.screenId);
    });
    if (!options.skipPersist) {
      persistSelection();
    }
  }

  function loadTemplateSpacing(templateId) {
    return fetch(spacingApi(templateId))
      .then(function (r) {
        if (!r.ok) throw new Error("spacing fetch failed");
        return r.json();
      })
      .then(function (data) {
        spacingByTemplate[templateId] = data.gaps || {};
        savedSpacingByTemplate[templateId] = JSON.parse(JSON.stringify(data.gaps || {}));
        spacingLoaded[templateId] = true;
      })
      .catch(function () {
        delete spacingLoaded[templateId];
        toastEl.textContent = "Could not load spacing API — restart preview server";
        throw new Error("spacing fetch failed");
      });
  }

  function selectTemplate(templateId, options) {
    options = options || {};
    var template = manifest.templates.find(function (t) {
      return t.templateId === templateId || t.name === templateId;
    });
    if (!template) return;

    activeTemplateId = template.templateId || template.name;
    activeInstance = null;
    iframeClickHandler = null;

    tabsEl.querySelectorAll("button").forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.template === activeTemplateId);
    });

    var spacingPromise = spacingLoaded[activeTemplateId]
      ? Promise.resolve()
      : loadTemplateSpacing(activeTemplateId);

    spacingPromise.then(function () {
      renderThumbs(template);
      var storedInstanceId = options.restoreInstance === false
        ? null
        : readStoredInstanceId(activeTemplateId);
      var inst = template.instances.find(function (item) {
        return item.screenId === storedInstanceId;
      }) || template.instances[0];
      if (inst) {
        selectInstance(template, inst, { skipPersist: true });
        thumbGrid.querySelectorAll(".thumb").forEach(function (t) {
          t.classList.toggle("active", t.dataset.id === inst.screenId);
        });
      }
      persistSelection();
      checkDirty();
      if (!options.silent) {
        toastEl.textContent = "";
      }
    }).catch(function () {
      renderThumbs(template);
    });
  }

  function renderTabs() {
    tabsEl.innerHTML = "";
    manifest.templates.forEach(function (t) {
      var id = t.templateId || t.name;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = id;
      btn.dataset.template = id;
      btn.addEventListener("click", function () { selectTemplate(id); });
      tabsEl.appendChild(btn);
    });
    var initial = readStoredTemplateId();
    if (initial) {
      selectTemplate(initial, { silent: true });
    }
  }

  function populateGapSelect(current) {
    gapSelect.innerHTML = "";
    Object.keys(LADDER).forEach(function (token) {
      var opt = document.createElement("option");
      opt.value = token;
      opt.textContent = token + " (" + LADDER[token] + "px)";
      if (token === current) opt.selected = true;
      gapSelect.appendChild(opt);
    });
  }

  function openGapModal(gapId) {
    if (!activeTemplateId || !gapId) return;
    var doc = liveFrame.contentDocument;
    if (!doc) {
      toastEl.textContent = "Preview still loading — try again in a moment";
      return;
    }
    var token = ensureGapInMemory(gapId, doc);
    if (token === null || token === undefined) {
      toastEl.textContent =
        "Could not read spacing for this gap — use port 8777 preview (preview_quizzes.py ensure)";
      return;
    }
    toastEl.textContent = "";
    activeGapId = gapId;
    gapModalTitle.textContent = GAP_LABELS[gapId] || gapId;
    gapReadout.textContent = token + " · " + px(token);
    populateGapSelect(token);
    gapModal.removeAttribute("hidden");
    gapModal.classList.add("open");
  }

  function closeGapModal() {
    gapModal.setAttribute("hidden", "");
    gapModal.classList.remove("open");
    activeGapId = null;
  }

  function applyGapToken() {
    if (!activeGapId || !activeTemplateId) return;
    var token = gapSelect.value;
    spacingByTemplate[activeTemplateId][activeGapId] = token;
    applyGapsToRoot(
      liveFrame.contentDocument && liveFrame.contentDocument.documentElement,
      spacingByTemplate[activeTemplateId]
    );
    updateSpacingLabels(liveFrame.contentDocument);
    checkDirty();
    closeGapModal();
  }

  function reloadThumbFrames() {
    thumbGrid.querySelectorAll(".thumb").forEach(function (btn) {
      var shell = btn.querySelector(".phone-shell");
      if (shell && btn.dataset.src) {
        mountThumbFrame(shell, bustSrc(btn.dataset.src));
      }
    });
  }

  function saveSpacing() {
    var gaps = spacingByTemplate[activeTemplateId];
    btnSave.disabled = true;
    fetch(spacingApi(activeTemplateId), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gaps: gaps })
    })
      .then(function (r) {
        if (!r.ok) throw new Error("save failed");
        return r.json();
      })
      .then(function (data) {
        savedSpacingByTemplate[activeTemplateId] = JSON.parse(JSON.stringify(gaps));
        toastEl.textContent = "Saved · rebuilt " + (data.built || []).join(", ");
        if (activeInstance) {
          liveFrame.src = bustSrc(activeInstance.src);
        }
        reloadThumbFrames();
        checkDirty();
      })
      .catch(function () {
        toastEl.textContent = "Save failed";
        checkDirty();
      });
  }

  toggleSpacing.addEventListener("change", function () {
    showSpacing = toggleSpacing.checked;
    onLiveLoad();
  });

  if (toggleLegal) {
    toggleLegal.addEventListener("change", function () {
      setShowLegal(toggleLegal.checked);
    });
  }

  showLegal = readStoredShowLegal();
  if (toggleLegal) {
    toggleLegal.checked = showLegal;
  }

  liveFrame.addEventListener("load", onLiveLoad);
  btnSave.addEventListener("click", saveSpacing);
  gapCancel.addEventListener("click", closeGapModal);
  gapApply.addEventListener("click", applyGapToken);
  gapModal.addEventListener("click", function (e) {
    if (e.target === gapModal) closeGapModal();
  });

  window.addEventListener("hashchange", function () {
    var id = (location.hash || "").replace(/^#/, "");
    if (id && id !== activeTemplateId && templateIds().indexOf(id) !== -1) {
      selectTemplate(id);
    }
  });

  fetch("gallery.manifest.json")
    .then(function (r) { return r.json(); })
    .then(function (data) {
      manifest = data;
      renderTabs();
    })
    .catch(function () {
      toastEl.textContent = "Could not load gallery.manifest.json — run hydrate";
    });
})();
