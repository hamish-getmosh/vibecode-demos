/**
 * Shared spring-eval motion for s-39 reveal staged morph.
 * Used by reveal-motion-concepts.html (7 variants) and reveal-staged-morph-play.html
 */
(function (global) {
  "use strict";

  var SPRING = {
    soft: { stiffness: 220, damping: 42, mass: 1 },
    rise: { stiffness: 280, damping: 38, mass: 1 },
    snap: { stiffness: 320, damping: 40, mass: 1 }
  };

  function SpringChannel(from, config) {
    this.value = from;
    this.target = from;
    this.velocity = 0;
    this.config = config;
    this.done = true;
  }
  SpringChannel.prototype.set = function (target, velocity) {
    this.target = target;
    if (velocity !== undefined) this.velocity = velocity;
    this.done = false;
  };
  SpringChannel.prototype.step = function (dt) {
    var c = this.config;
    var force = -c.stiffness * (this.value - this.target);
    var damp = -c.damping * this.velocity;
    var accel = (force + damp) / c.mass;
    this.velocity += accel * dt;
    this.value += this.velocity * dt;
    if (Math.abs(this.velocity) < 0.03 && Math.abs(this.value - this.target) < 0.003) {
      this.value = this.target;
      this.velocity = 0;
      this.done = true;
    }
    return this.value;
  };

  function MotionNode(el, cfg) {
    this.el = el;
    this.cfg = cfg || SPRING.rise;
    this.opacity = new SpringChannel(0, this.cfg);
    this.y = new SpringChannel(16, this.cfg);
    this.scale = new SpringChannel(1, this.cfg);
    this.fs = null;
    this.color = null;
    this.live = false;
  }
  MotionNode.prototype.apply = function () {
    if (!this.el) return;
    var o = Math.max(0, Math.min(1, this.opacity.value));
    if (!this.live && o < 0.01) {
      this.el.style.visibility = "hidden";
      return;
    }
    this.el.style.visibility = "visible";
    this.el.style.opacity = String(o);
    this.el.style.transform = "translateY(" + this.y.value + "px) scale(" + this.scale.value + ")";
    if (this.fs != null) this.el.style.fontSize = this.fs + "px";
    if (this.color) this.el.style.color = this.color;
  };
  MotionNode.prototype.show = function (opts) {
    opts = opts || {};
    var cfg = opts.spring || this.cfg;
    this.live = true;
    this.opacity.config = cfg;
    this.y.config = cfg;
    this.scale.config = cfg;
    if (opts.fromY != null) this.y.value = opts.fromY;
    if (opts.fromScale != null) this.scale.value = opts.fromScale;
    if (opts.fromOpacity != null) this.opacity.value = opts.fromOpacity;
    this.opacity.set(opts.opacity != null ? opts.opacity : 1);
    this.y.set(opts.y != null ? opts.y : 0);
    this.scale.set(opts.scale != null ? opts.scale : 1);
    if (opts.fontSize != null) this.fs = opts.fontSize;
    if (opts.color != null) this.color = opts.color;
  };
  MotionNode.prototype.hide = function (opts) {
    opts = opts || {};
    var cfg = opts.spring || SPRING.soft;
    this.opacity.config = cfg;
    this.y.config = cfg;
    this.opacity.set(0);
    this.y.set(opts.y != null ? opts.y : -8);
  };

  function ChartMotion(line, fill) {
    this.line = line;
    this.fill = fill;
    this.spring = new SpringChannel(0, SPRING.soft);
    this.active = false;
  }
  ChartMotion.prototype.reset = function () {
    this.active = false;
    this.spring = new SpringChannel(0, SPRING.soft);
    if (this.line) this.line.style.strokeDashoffset = "1";
    if (this.fill) this.fill.style.opacity = "0";
  };
  ChartMotion.prototype.draw = function (cfg) {
    this.active = true;
    this.spring.config = cfg || SPRING.soft;
    this.spring.set(1);
  };
  ChartMotion.prototype.step = function (dt) {
    if (!this.active) return;
    this.spring.step(dt);
    var p = Math.max(0, Math.min(1, this.spring.value));
    if (this.line) this.line.style.strokeDashoffset = String(1 - p);
    if (this.fill) this.fill.style.opacity = String(Math.max(0, (p - 0.5) * 2));
    return p;
  };

  function later(fn, ms, timers) {
    var t = setTimeout(fn, ms);
    timers.push(t);
    return t;
  }

  function runTicker(statNumEl, ms, token, runToken, timers, onStep) {
    var steps = 30;
    var stepMs = Math.max(28, Math.floor(ms / steps));
    var n = 0;
    var iv = setInterval(function () {
      if (token !== runToken) { clearInterval(iv); return; }
      n += 1;
      var val = Math.min(14, Math.round((n / steps) * 14));
      statNumEl.textContent = String(val);
      if (onStep) onStep(val, n / steps);
      if (n >= steps) {
        clearInterval(iv);
        statNumEl.textContent = "14";
      }
    }, stepMs);
    timers.push(iv);
  }

  var VARIANTS = {
    blended: function (ctx, token) {
      var n = ctx.nodes;
      var T = 1200;
      n.eyebrow.show({ fromY: 14, spring: SPRING.rise });
      later(function () { n.lead.show({ fromY: 12, spring: SPRING.rise }); }, 260, ctx.timers);
      later(function () {
        n.stat.show({ fromY: 10, fontSize: 72, color: "#4d41f0", spring: SPRING.snap });
        runTicker(ctx.statNum, T, token, ctx.runToken, ctx.timers);
        n.chart.show({ fromY: 12, spring: SPRING.rise });
        later(function () { ctx.chart.draw(SPRING.soft); n.startDot.show({ spring: SPRING.snap }); }, 200, ctx.timers);
        later(function () { n.sub.show({ fromY: 10, spring: SPRING.rise }); }, 380, ctx.timers);
        later(function () { n.endDot.show({ spring: SPRING.snap }); }, T - 220, ctx.timers);
      }, 620, ctx.timers);
      later(function () {
        n.lead.hide();
        n.eyebrow.show({ opacity: 0.7, y: -6, scale: 0.96, spring: SPRING.soft });
        n.statBlock.show({ y: -10, spring: SPRING.soft });
        n.stat.show({ fontSize: 48, color: "#7a7498", y: 0, scale: 1, spring: SPRING.soft });
        n.sub.show({ fontSize: 14, color: "#7a7498", spring: SPRING.soft });
        ctx.stage.style.transform = "translateY(-16px)";
      }, 620 + T + 320, ctx.timers);
      later(function () {
        n.bridge.show({ fromY: 12, spring: SPRING.rise });
        later(function () { n.pill.show({ fromY: 10, spring: SPRING.snap }); }, 180, ctx.timers);
      }, 620 + T + 320 + 720, ctx.timers);
      later(function () {
        n.reframe.show({ fromY: 10, spring: SPRING.rise });
        n.cta.show({ fromY: 10, spring: SPRING.rise });
      }, 620 + T + 320 + 720 + 680, ctx.timers);
      return 620 + T + 320 + 720 + 680 + 2400;
    },

    fade: function (ctx, token) {
      var n = ctx.nodes;
      var T = 1100;
      var d = 0;
      function stagger(key, delay, y) {
        later(function () { n[key].show({ fromY: y || 8, fromScale: 1, spring: SPRING.soft }); }, d += delay, ctx.timers);
      }
      stagger("eyebrow", 0, 6);
      stagger("lead", 220, 6);
      later(function () {
        n.stat.show({ fromY: 8, fromScale: 1, fontSize: 72, spring: SPRING.soft });
        runTicker(ctx.statNum, T, token, ctx.runToken, ctx.timers);
      }, d += 220, ctx.timers);
      later(function () { n.sub.show({ fromY: 6, fromScale: 1, spring: SPRING.soft }); }, d + 400, ctx.timers);
      later(function () {
        n.chart.show({ fromY: 6, fromScale: 1, spring: SPRING.soft });
        ctx.chart.draw(SPRING.soft);
      }, d + 500, ctx.timers);
      later(function () {
        n.lead.hide({ y: -6 });
        n.stat.show({ fontSize: 48, color: "#7a7498", spring: SPRING.soft });
        n.sub.show({ fontSize: 14, color: "#7a7498", spring: SPRING.soft });
        ctx.stage.style.transform = "translateY(-14px)";
      }, d + T + 400, ctx.timers);
      later(function () {
        n.bridge.show({ fromY: 8, fromScale: 1, spring: SPRING.soft });
        later(function () { n.pill.show({ fromY: 8, fromScale: 1, spring: SPRING.soft }); }, 200, ctx.timers);
        later(function () {
          n.reframe.show({ fromY: 6, fromScale: 1, spring: SPRING.soft });
          n.cta.show({ fromY: 6, fromScale: 1, spring: SPRING.soft });
        }, 400, ctx.timers);
      }, d + T + 900, ctx.timers);
      return d + T + 900 + 2400;
    },

    /** B-style fade cascade; nothing shrinks, hides, or shifts after landing. */
    fadeHold: function (ctx, token) {
      var n = ctx.nodes;
      var T = 1100;
      var d = 0;
      function stagger(key, delay, y) {
        later(function () {
          n[key].show({ fromY: y || 8, fromScale: 1, spring: SPRING.soft });
        }, d += delay, ctx.timers);
      }
      stagger("eyebrow", 0, 6);
      stagger("lead", 220, 6);
      later(function () {
        n.stat.show({ fromY: 8, fromScale: 1, fontSize: 72, color: "#4d41f0", spring: SPRING.soft });
        runTicker(ctx.statNum, T, token, ctx.runToken, ctx.timers);
      }, d += 220, ctx.timers);
      later(function () { n.sub.show({ fromY: 6, fromScale: 1, spring: SPRING.soft }); }, d + 400, ctx.timers);
      later(function () {
        n.chart.show({ fromY: 6, fromScale: 1, spring: SPRING.soft });
        ctx.chart.draw(SPRING.soft);
        n.startDot.show({ fromScale: 1, spring: SPRING.soft });
      }, d + 500, ctx.timers);
      later(function () { n.endDot.show({ fromScale: 1, spring: SPRING.soft }); }, d + T - 120, ctx.timers);
      later(function () { n.axis.show({ fromY: 4, fromScale: 1, spring: SPRING.soft }); }, d + T, ctx.timers);
      later(function () {
        n.bridge.show({ fromY: 8, fromScale: 1, spring: SPRING.soft });
        later(function () { n.pill.show({ fromY: 8, fromScale: 1, spring: SPRING.soft }); }, 220, ctx.timers);
        later(function () {
          n.reframe.show({ fromY: 6, fromScale: 1, spring: SPRING.soft });
          n.cta.show({ fromY: 6, fromScale: 1, spring: SPRING.soft });
        }, 440, ctx.timers);
      }, d + T + 700, ctx.timers);
      return d + T + 700 + 440 + 2400;
    },

    /** Screen 3.9 · stat reveal only (fade cascade, hold). */
    statFadeHold: function (ctx, token) {
      var n = ctx.nodes;
      var T = 1100;
      var d = 0;
      function stagger(key, delay, y) {
        later(function () {
          n[key].show({ fromY: y || 8, fromScale: 1, spring: SPRING.soft });
        }, d += delay, ctx.timers);
      }
      stagger("eyebrow", 0, 6);
      stagger("lead", 220, 6);
      later(function () {
        n.stat.show({ fromY: 8, fromScale: 1, fontSize: 72, color: "#4d41f0", spring: SPRING.soft });
        runTicker(ctx.statNum, T, token, ctx.runToken, ctx.timers);
      }, d += 220, ctx.timers);
      later(function () { n.sub.show({ fromY: 6, fromScale: 1, spring: SPRING.soft }); }, d + 400, ctx.timers);
      later(function () {
        n.chart.show({ fromY: 6, fromScale: 1, spring: SPRING.soft });
        ctx.chart.draw(SPRING.soft);
        n.startDot.show({ fromScale: 1, spring: SPRING.soft });
      }, d + 500, ctx.timers);
      later(function () { n.endDot.show({ fromScale: 1, spring: SPRING.soft }); }, d + T - 120, ctx.timers);
      later(function () { n.axis.show({ fromY: 4, fromScale: 1, spring: SPRING.soft }); }, d + T, ctx.timers);
      later(function () {
        if (n.cta) n.cta.show({ fromY: 6, fromScale: 1, spring: SPRING.soft });
      }, d + T + 420, ctx.timers);
      return d + T + 420 + 600;
    },

    /** Screen 3.10 · 300g reframe only (fade cascade, hold). */
    reframeFadeHold: function (ctx, token) {
      var n = ctx.nodes;
      var d = 0;
      function stagger(key, delay, y) {
        later(function () {
          n[key].show({ fromY: y || 8, fromScale: 1, spring: SPRING.soft });
        }, d += delay, ctx.timers);
      }
      stagger("bridge", 0, 8);
      later(function () { n.pill.show({ fromY: 8, fromScale: 1, spring: SPRING.soft }); }, d += 220, ctx.timers);
      later(function () { n.reframe.show({ fromY: 6, fromScale: 1, spring: SPRING.soft }); }, d += 400, ctx.timers);
      later(function () { n.cta.show({ fromY: 6, fromScale: 1, spring: SPRING.soft }); }, d += 220, ctx.timers);
      return d + 600;
    },

    tickerHero: function (ctx, token) {
      var n = ctx.nodes;
      var T = 1400;
      n.eyebrow.show({ fromY: 12, spring: SPRING.rise });
      later(function () { n.lead.show({ fromY: 10, spring: SPRING.rise }); }, 300, ctx.timers);
      later(function () {
        n.stat.show({ fromY: 8, fontSize: 80, spring: SPRING.snap });
        runTicker(ctx.statNum, T, token, ctx.runToken, ctx.timers);
        later(function () { n.sub.show({ fromY: 8, spring: SPRING.rise }); }, 350, ctx.timers);
      }, 700, ctx.timers);
      later(function () {
        n.chart.show({ fromY: 10, spring: SPRING.rise });
        ctx.chart.draw(SPRING.soft);
        n.startDot.show({ spring: SPRING.snap });
        later(function () { n.endDot.show({ spring: SPRING.snap }); }, 900, ctx.timers);
      }, 700 + T + 200, ctx.timers);
      later(function () {
        n.lead.hide();
        n.stat.show({ fontSize: 48, color: "#7a7498", spring: SPRING.soft });
        n.sub.show({ fontSize: 14, color: "#7a7498", spring: SPRING.soft });
        ctx.stage.style.transform = "translateY(-14px)";
      }, 700 + T + 200 + 1000, ctx.timers);
      later(function () {
        n.bridge.show({ fromY: 10, spring: SPRING.rise });
        later(function () { n.pill.show({ fromY: 10, spring: SPRING.rise }); }, 200, ctx.timers);
        later(function () { n.reframe.show({ fromY: 8, spring: SPRING.rise }); n.cta.show({ fromY: 8, spring: SPRING.rise }); }, 450, ctx.timers);
      }, 700 + T + 200 + 1000 + 650, ctx.timers);
      return 700 + T + 200 + 1000 + 650 + 2400;
    },

    chartLed: function (ctx, token) {
      var n = ctx.nodes;
      var T = 1300;
      n.eyebrow.show({ fromY: 12, spring: SPRING.rise });
      later(function () { n.lead.show({ fromY: 10, spring: SPRING.rise }); }, 280, ctx.timers);
      later(function () {
        n.chart.show({ fromY: 10, spring: SPRING.rise });
        ctx.chart.draw(SPRING.soft);
        n.startDot.show({ spring: SPRING.snap });
        n.stat.show({ fromY: 8, fontSize: 72, spring: SPRING.snap });
        runTicker(ctx.statNum, T, token, ctx.runToken, ctx.timers, function (val, progress) {
          /* ticker synced to chart progress feel */
        });
        later(function () { n.sub.show({ fromY: 8, spring: SPRING.rise }); }, 400, ctx.timers);
        later(function () { n.endDot.show({ spring: SPRING.snap }); }, T - 200, ctx.timers);
      }, 600, ctx.timers);
      later(function () {
        n.lead.hide();
        n.stat.show({ fontSize: 48, color: "#7a7498", spring: SPRING.soft });
        n.sub.show({ fontSize: 14, color: "#7a7498", spring: SPRING.soft });
        ctx.stage.style.transform = "translateY(-14px)";
      }, 600 + T + 350, ctx.timers);
      later(function () {
        n.bridge.show({ fromY: 10, spring: SPRING.rise });
        later(function () { n.pill.show({ fromY: 10, spring: SPRING.rise }); }, 200, ctx.timers);
        later(function () { n.reframe.show({ fromY: 8, spring: SPRING.rise }); n.cta.show({ fromY: 8, spring: SPRING.rise }); }, 420, ctx.timers);
      }, 600 + T + 350 + 700, ctx.timers);
      return 600 + T + 350 + 700 + 2400;
    },

    morphHandoff: function (ctx, token) {
      var n = ctx.nodes;
      var T = 1150;
      n.eyebrow.show({ fromY: 12, spring: SPRING.rise });
      later(function () { n.lead.show({ fromY: 10, spring: SPRING.rise }); }, 260, ctx.timers);
      later(function () {
        n.stat.show({ fromY: 8, fontSize: 72, spring: SPRING.snap });
        runTicker(ctx.statNum, T, token, ctx.runToken, ctx.timers);
        n.sub.show({ fromY: 8, spring: SPRING.rise });
        n.chart.show({ fromY: 10, spring: SPRING.rise });
        later(function () { ctx.chart.draw(SPRING.soft); }, 200, ctx.timers);
      }, 580, ctx.timers);
      later(function () {
        n.lead.hide();
        n.chart.show({ y: -8, spring: SPRING.soft });
        n.stat.show({ fontSize: 44, color: "#7a7498", y: -20, spring: SPRING.soft });
        n.sub.show({ fontSize: 13, color: "#9a96ad", y: -18, spring: SPRING.soft });
        ctx.stage.style.transform = "translateY(-20px)";
        n.bridge.show({ fromY: 8, spring: SPRING.rise });
      }, 580 + T + 300, ctx.timers);
      later(function () {
        n.pill.show({ fromY: 24, scale: 0.88, spring: SPRING.snap });
        later(function () { n.reframe.show({ fromY: 8, spring: SPRING.rise }); n.cta.show({ fromY: 8, spring: SPRING.rise }); }, 350, ctx.timers);
      }, 580 + T + 300 + 450, ctx.timers);
      return 580 + T + 300 + 450 + 350 + 2400;
    },

    sequential: function (ctx, token) {
      var n = ctx.nodes;
      var T = 1100;
      var t = 0;
      function at(ms, fn) { later(fn, t += ms, ctx.timers); }
      n.eyebrow.show({ fromY: 12, spring: SPRING.rise });
      at(500, function () { n.lead.show({ fromY: 10, spring: SPRING.rise }); });
      at(450, function () {
        n.stat.show({ fromY: 8, fontSize: 72, spring: SPRING.snap });
        runTicker(ctx.statNum, T, token, ctx.runToken, ctx.timers);
      });
      at(T + 100, function () { n.sub.show({ fromY: 8, spring: SPRING.rise }); });
      at(400, function () {
        n.chart.show({ fromY: 10, spring: SPRING.rise });
        ctx.chart.draw(SPRING.soft);
        n.startDot.show({ spring: SPRING.snap });
      });
      at(900, function () { n.endDot.show({ spring: SPRING.snap }); });
      at(350, function () {
        n.lead.hide();
        n.stat.show({ fontSize: 48, color: "#7a7498", spring: SPRING.soft });
        n.sub.show({ fontSize: 14, color: "#7a7498", spring: SPRING.soft });
        ctx.stage.style.transform = "translateY(-14px)";
      });
      at(550, function () { n.bridge.show({ fromY: 10, spring: SPRING.rise }); });
      at(400, function () { n.pill.show({ fromY: 10, spring: SPRING.rise }); });
      at(400, function () { n.reframe.show({ fromY: 8, spring: SPRING.rise }); });
      at(300, function () { n.cta.show({ fromY: 8, spring: SPRING.rise }); });
      return t + 2400;
    }
  };

  var instances = [];
  var raf = null;
  var last = 0;

  function Instance(root) {
    this.root = root;
    this.variant = root.getAttribute("data-variant") || "blended";
    this.loop = true;
    this.stage = root.querySelector("[data-stage]");
    this.statNum = root.querySelector("[data-stat-num]");
    this.timers = [];
    this.runToken = 0;
    this.nodes = {};
    this.chart = new ChartMotion(
      root.querySelector("[data-chart-line]"),
      root.querySelector("[data-chart-fill]")
    );
    var keys = ["eyebrow", "lead", "stat", "sub", "statBlock", "chart", "startDot", "endDot", "axis", "bridge", "pill", "reframe", "cta"];
    var self = this;
    keys.forEach(function (k) {
      var el = root.querySelector('[data-k="' + k + '"]');
      if (el) self.nodes[k] = new MotionNode(el, SPRING.rise);
    });
    instances.push(this);
  }

  Instance.prototype.reset = function () {
    var self = this;
    self.timers.forEach(function (t) { clearTimeout(t); clearInterval(t); });
    self.timers = [];
    self.chart.reset();
    if (self.stage) {
      self.stage.style.transition = "";
      self.stage.style.transform = "";
    }
    if (self.statNum) self.statNum.textContent = "0";
    Object.keys(self.nodes).forEach(function (k) {
      var node = self.nodes[k];
      node.live = false;
      node.opacity = new SpringChannel(0, SPRING.rise);
      node.y = new SpringChannel(16, SPRING.rise);
      node.scale = new SpringChannel(1, SPRING.rise);
      node.fs = null;
      node.color = null;
      if (node.el) {
        node.el.style.fontSize = "";
        node.el.style.color = "";
        node.apply();
      }
    });
    if (self.nodes.stat) {
      self.nodes.stat.fs = 72;
    }
  };

  Instance.prototype.stop = function () {
    this.runToken += 1;
    this.timers.forEach(function (t) { clearTimeout(t); clearInterval(t); });
    this.timers = [];
  };

  Instance.prototype.play = function () {
    var self = this;
    self.runToken += 1;
    var token = self.runToken;
    self.reset();
    var fn = VARIANTS[self.variant] || VARIANTS.blended;
    var total = fn({
      nodes: self.nodes,
      chart: self.chart,
      statNum: self.statNum,
      stage: self.stage,
      timers: self.timers,
      runToken: self.runToken,
      token: token
    }, token);
    later(function () {
      if (token !== self.runToken) return;
      if (self.loop) self.play();
    }, total, self.timers);
  };

  function tick(now) {
    var dt = Math.min((now - last) / 1000, 0.032);
    last = now;
    instances.forEach(function (inst) {
      Object.keys(inst.nodes).forEach(function (k) {
        var n = inst.nodes[k];
        n.opacity.step(dt);
        n.y.step(dt);
        n.scale.step(dt);
        n.apply();
      });
      inst.chart.step(dt);
    });
    raf = requestAnimationFrame(tick);
  }

  function mount(root, opts) {
    opts = opts || {};
    var inst = new Instance(root);
    inst.loop = opts.loop !== false;
    if (opts.autoplay !== false) inst.play();
    if (!raf) {
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }
    return inst;
  }

  global.RevealMotion = {
    SPRING: SPRING,
    SpringChannel: SpringChannel,
    MotionNode: MotionNode,
    ChartMotion: ChartMotion,
    VARIANTS: VARIANTS,
    mount: mount,
    runTicker: runTicker,
    later: later
  };
})(typeof window !== "undefined" ? window : globalThis);
