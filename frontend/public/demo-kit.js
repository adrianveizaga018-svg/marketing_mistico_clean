/*
 * Kit de las invitaciones DEMO (demo-*.html) de Marketing Místico.
 *  1. Banner flotante de conversión → WhatsApp con mensaje prellenado.
 *  2. Botones de "música" funcionales: música ambiental suave generada en el navegador
 *     (sin archivos, sin derechos de autor), solo suena después de un toque del usuario.
 *  3. Los botones de confirmar por WhatsApp de la demo no escriben a números de ejemplo:
 *     explican cómo funciona en la invitación real y ofrecen cotizar.
 * Uso: <script src="/demo-kit.js" data-demo="Boda Imperial" defer></script>
 */
(function () {
  'use strict';

  var WHATSAPP = '59162792626'; // mismo número que src/data/contacto.js
  var script = document.currentScript || document.querySelector('script[src*="demo-kit.js"]');
  var demoName = (script && script.getAttribute('data-demo')) || 'invitación de gala';
  var GOLD = '#c9a961';

  function waLink(text) {
    return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text);
  }
  var quoteText = 'Hola Marketing Místico 👋 Vi la demo "' + demoName +
    '" y quiero una invitación personalizada así para mi evento [Boda / 15 Años / Presterío / Fiesta] el día [Fecha]. ¿Me pasan precios?';

  function el(tag, styles, text) {
    var node = document.createElement(tag);
    if (styles) node.setAttribute('style', styles);
    if (text) node.textContent = text;
    return node;
  }

  function storageGet(key) {
    try { return window.sessionStorage.getItem(key); } catch (e) { return null; }
  }
  function storageSet(key, value) {
    try { window.sessionStorage.setItem(key, value); } catch (e) { /* modo privado */ }
  }

  // ─── 1. Banner flotante de conversión ───────────────────────────────────
  function bottomOffset() {
    var navs = document.querySelectorAll('nav');
    for (var i = 0; i < navs.length; i++) {
      var cs = window.getComputedStyle(navs[i]);
      if (cs.position === 'fixed' && parseInt(cs.bottom, 10) === 0) {
        return navs[i].getBoundingClientRect().height + 10;
      }
    }
    return 12;
  }

  function buildBanner() {
    if (storageGet('mm_demo_banner_closed') === '1') return;
    var bar = el('div',
      'position:fixed;left:50%;transform:translateX(-50%);z-index:2147483000;' +
      'width:calc(100% - 24px);max-width:560px;box-sizing:border-box;' +
      'display:flex;align-items:center;gap:10px;padding:10px 10px 10px 14px;' +
      'background:rgba(10,10,14,0.94);border:1px solid rgba(201,169,97,0.55);border-radius:16px;' +
      'box-shadow:0 10px 30px rgba(0,0,0,0.45);font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;' +
      'color:#fff;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);');
    bar.setAttribute('role', 'complementary');
    bar.setAttribute('aria-label', 'Cotiza tu invitación');
    bar.style.bottom = 'calc(' + bottomOffset() + 'px + env(safe-area-inset-bottom, 0px))';

    var text = el('p', 'margin:0;flex:1;font-size:12.5px;line-height:1.35;color:rgba(255,255,255,0.88);');
    var strong = el('strong', 'color:' + GOLD + ';font-weight:700;', '¿Te gusta este diseño para tu evento? ');
    text.appendChild(strong);
    text.appendChild(document.createTextNode('Cotiza tu invitación personalizada por WhatsApp'));

    var cta = el('a',
      'flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 16px;' +
      'border-radius:999px;background:' + GOLD + ';color:#111;font-weight:800;font-size:13px;text-decoration:none;white-space:nowrap;',
      'Cotizar');
    cta.href = waLink(quoteText);
    cta.target = '_blank';
    cta.rel = 'noopener noreferrer';
    cta.setAttribute('data-mm-kit', '1');
    cta.setAttribute('aria-label', 'Cotizar mi invitación por WhatsApp');

    var close = el('button',
      'flex-shrink:0;width:32px;height:32px;border:0;border-radius:999px;background:rgba(255,255,255,0.08);' +
      'color:rgba(255,255,255,0.7);font-size:18px;line-height:1;cursor:pointer;', '×');
    close.type = 'button';
    close.setAttribute('aria-label', 'Cerrar aviso');
    close.addEventListener('click', function () {
      bar.remove();
      storageSet('mm_demo_banner_closed', '1');
    });

    bar.appendChild(text);
    bar.appendChild(cta);
    bar.appendChild(close);
    document.body.appendChild(bar);
    window.addEventListener('resize', function () {
      bar.style.bottom = 'calc(' + bottomOffset() + 'px + env(safe-area-inset-bottom, 0px))';
    });
  }

  // ─── 2. Música ambiental suave (Web Audio) ───────────────────────────────
  var audio = { ctx: null, master: null, timer: null, playing: false, step: 0 };
  // Progresión I – vi – IV – V en Re mayor, voces suaves.
  var CHORDS = [
    [146.83, 220.0, 293.66, 369.99],
    [123.47, 246.94, 293.66, 369.99],
    [98.0, 196.0, 293.66, 392.0],
    [110.0, 220.0, 277.18, 329.63],
  ];
  var CHORD_SECONDS = 3.2;

  function initAudio() {
    if (audio.ctx) return;
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    audio.ctx = new Ctx();
    var filter = audio.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1400;
    audio.master = audio.ctx.createGain();
    audio.master.gain.value = 0;
    audio.master.connect(filter);
    filter.connect(audio.ctx.destination);
  }

  function playChord(chord, start) {
    var ctx = audio.ctx;
    chord.forEach(function (freq, i) {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.value = freq;
      osc.detune.value = (i % 2 ? 4 : -4);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(i === 0 ? 0.16 : 0.07, start + 0.9);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + CHORD_SECONDS + 0.8);
      osc.connect(gain);
      gain.connect(audio.master);
      osc.start(start);
      osc.stop(start + CHORD_SECONDS + 0.9);
    });
    // Arpegio delicado tipo campanita encima del acorde.
    [0, 1, 2, 3].forEach(function (n) {
      var t = start + 0.4 + n * (CHORD_SECONDS / 4);
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = chord[(n % 3) + 1] * 2;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.035, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
      osc.connect(gain);
      gain.connect(audio.master);
      osc.start(t);
      osc.stop(t + 1.5);
    });
  }

  function schedule() {
    playChord(CHORDS[audio.step % CHORDS.length], audio.ctx.currentTime + 0.05);
    audio.step++;
  }

  function setMusic(on) {
    initAudio();
    if (!audio.ctx) return;
    var now = audio.ctx.currentTime;
    audio.master.gain.cancelScheduledValues(now);
    if (on) {
      if (audio.ctx.state === 'suspended') audio.ctx.resume();
      audio.master.gain.setValueAtTime(audio.master.gain.value, now);
      audio.master.gain.linearRampToValueAtTime(0.9, now + 1.2);
      if (!audio.timer) {
        schedule();
        audio.timer = setInterval(schedule, CHORD_SECONDS * 1000);
      }
    } else {
      audio.master.gain.setValueAtTime(audio.master.gain.value, now);
      audio.master.gain.linearRampToValueAtTime(0, now + 0.6);
      clearInterval(audio.timer);
      audio.timer = null;
    }
    audio.playing = on;
    syncMusicButtons();
    document.dispatchEvent(new CustomEvent('mm-music', { detail: { playing: on } }));
  }

  var musicButtons = [];
  function syncMusicButtons() {
    musicButtons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', audio.playing ? 'true' : 'false');
      btn.setAttribute('title', audio.playing ? 'Silenciar música' : 'Reproducir música');
      var icon = btn.querySelector('.material-symbols-outlined');
      if (icon && /music_note|music_off|pause|play_arrow/.test(icon.textContent)) {
        var original = btn.getAttribute('data-mm-icon');
        icon.textContent = audio.playing ? (original === 'play_arrow' ? 'pause' : 'music_off') : original;
      }
    });
  }

  function wireMusicButtons() {
    var candidates = document.querySelectorAll('button[aria-label]');
    for (var i = 0; i < candidates.length; i++) {
      var btn = candidates[i];
      if (!/m[uú]sica/i.test(btn.getAttribute('aria-label')) || btn.hasAttribute('onclick')) continue;
      var icon = btn.querySelector('.material-symbols-outlined');
      btn.setAttribute('data-mm-icon', icon ? icon.textContent.trim() : '');
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        setMusic(!audio.playing);
      });
      musicButtons.push(btn);
    }
    syncMusicButtons();
  }

  // ─── 3. Botones de confirmación por WhatsApp de la demo ─────────────────
  function showDemoNotice() {
    var overlay = el('div',
      'position:fixed;inset:0;z-index:2147483001;background:rgba(0,0,0,0.7);display:flex;align-items:center;' +
      'justify-content:center;padding:16px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Así funciona la confirmación');
    var card = el('div',
      'background:#0e0e12;border:1px solid rgba(201,169,97,0.5);border-radius:20px;padding:22px;max-width:360px;width:100%;color:#fff;text-align:center;');
    card.appendChild(el('p', 'font-size:28px;margin:0 0 6px;', '💌'));
    card.appendChild(el('h3', 'margin:0 0 8px;font-size:18px;font-weight:800;', 'Así confirma tu invitado'));
    card.appendChild(el('p', 'margin:0 0 18px;font-size:14px;line-height:1.5;color:rgba(255,255,255,0.75);',
      'En tu invitación real, este botón envía la confirmación directo a TU WhatsApp con el nombre del invitado y sus pases. Esta es solo una demostración.'));
    var cta = el('a',
      'display:flex;align-items:center;justify-content:center;min-height:48px;border-radius:999px;background:' + GOLD +
      ';color:#111;font-weight:800;font-size:14px;text-decoration:none;margin-bottom:10px;', 'Quiero una invitación así');
    cta.href = waLink(quoteText);
    cta.target = '_blank';
    cta.rel = 'noopener noreferrer';
    cta.setAttribute('data-mm-kit', '1');
    var close = el('button',
      'width:100%;min-height:44px;border:1px solid rgba(255,255,255,0.15);border-radius:999px;background:transparent;color:#fff;font-size:14px;cursor:pointer;',
      'Seguir viendo la demo');
    close.type = 'button';
    function dismiss() { overlay.remove(); document.removeEventListener('keydown', onKey); }
    function onKey(e) { if (e.key === 'Escape') dismiss(); }
    close.addEventListener('click', dismiss);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) dismiss(); });
    document.addEventListener('keydown', onKey);
    card.appendChild(cta);
    card.appendChild(close);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    close.focus();
  }

  function interceptDemoWhatsApp() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest && e.target.closest('a[href*="wa.me"]');
      if (!link || link.getAttribute('data-mm-kit') === '1') return;
      e.preventDefault();
      showDemoNotice();
    }, true);
  }

  // Para que los botones propios de cada demo usen la misma música.
  window.MMDemoMusic = {
    set: function (on) { setMusic(!!on); },
    toggle: function () { setMusic(!audio.playing); return audio.playing; },
    isPlaying: function () { return audio.playing; },
  };

  function start() {
    buildBanner();
    wireMusicButtons();
    interceptDemoWhatsApp();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
