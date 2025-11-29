/* ---------------------------------------
   main.js — Burundi Digital Marketboard
   - ES2020+, Kinyarwanda comments
   - Render products, testimonials, jokes
   - Dark/theme toggle (localStorage)
   - Smooth scroll, micro-animations (pop, fadeUp)
   - Tawk.to detection + offline contact fallback (localStorage)
   - WhatsApp CTA single-number config
   - PWA service worker registration
   - Install prompt banner
   - Video load / poster fallback handling
--------------------------------------- */

/* ----------------------
   Konfigurasiyo (ahindura hano imwe)
   ---------------------- */
const CONFIG = {
  WHATSAPP_NUMBER: '25771633859',
  THEME_KEY: 'bdm_theme_v1',
  JOKES_SEEN_KEY: 'bdm_seen_jokes_v1',
  LOCAL_MSGS_KEY: 'bdm_local_messages_v1',
  TAWK_TIMEOUT_MS: 6000,
  VIDEO_TIMEOUT_MS: 6000
};

/* ----------------------
   DOM Ready boot
   ---------------------- */
document.addEventListener('DOMContentLoaded', () => {
  try {
    initTheme();
    renderProducts();
    renderTestimonials();
    setupJokeSpinner();
    setupDarkToggle();
    setupSmoothScroll();
    setupContactFallback();
    initYear();
    registerServiceWorker();
    setupInstallBanner();
    setupBgVideoHandlers();
  } catch (err) {
    console.warn('Init error:', err);
  }
});

/* ======================
   Helpers (micro UX)
   ====================== */
function pop(el) {
  if (!el) return;
  el.animate(
    [{ transform: 'scale(1)', opacity: 1 },
     { transform: 'scale(1.06)', opacity: 1 },
     { transform: 'scale(1)', opacity: 1 }],
    { duration: 260, easing: 'cubic-bezier(.2,.9,.3,1)' }
  );
}

function esc(s) { return String(s ?? '').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

/* ======================
   Products rendering
   ====================== */
function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  const products = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : [];
  grid.innerHTML = '';

  products.forEach((p, i) => {
    const priceNum = Number(p.price);
    const pretty = Number.isFinite(priceNum) ? `FBu ${priceNum.toLocaleString()}` : 'Kumenyesha';
    const img = esc(p.image || 'placeholder-product-1.jpg');

    const card = document.createElement('article');
    card.className = 'card';
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', p.name || 'Igicuruzwa');
    card.style.animationDelay = `${i * 80}ms`;

    card.innerHTML = `
      <div class="thumb">
        <img src="${img}" alt="${esc(p.name)}" loading="lazy" decoding="async" />
      </div>
      <div class="p-meta">
        <div class="p-name">${esc(p.name)}</div>
        <div class="p-cat">${esc(p.category || 'Ibikoresho')} • Imbika: ${p.stock ?? '—'}</div>
        <div class="p-price">${pretty}</div>
        <div class="p-desc">${esc(p.description || '')}</div>
        <button class="btn buy" type="button" aria-label="Baza kuri WhatsApp">Baza kuri WhatsApp</button>
      </div>
    `;

    const buyBtn = card.querySelector('.btn.buy');
    const waMsg = `Muraho! Ndashaka ${p.name || 'ibicuruzwa'}. Mumbwire uko nayibona.`;

    function openWhatsApp() {
      const text = encodeURIComponent(waMsg);
      const url = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${text}`;
      window.open(url, '_blank', 'noopener');
      pop(buyBtn);
    }

    buyBtn.addEventListener('click', openWhatsApp);
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.btn')) openWhatsApp();
    });

    grid.appendChild(card);
  });
}

/* ======================
   Testimonials
   ====================== */
function renderTestimonials() {
  const container = document.getElementById('testi-grid');
  if (!container) return;

  const samples = [
    { name: 'Aline', text: 'Serivisi yihuse, ibiciro vyiza kandi vyumvikana!', rating: 5, emoji: '🎉' },
    { name: 'Jean', text: 'WhatsApp support yansubije ako kanya — nakiriye ivyo nasavye.', rating: 4, emoji: '👍' },
    { name: 'Marie', text: 'Urubuga rworohereza aba jeune mu kubona ibicuruzwa.', rating: 5, emoji: '🚀' }
  ];

  container.innerHTML = '';
  samples.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'testimonial';
    div.style.animationDelay = `${i * 120}ms`;
    div.setAttribute('role', 'listitem');
    div.innerHTML = `<strong>${esc(s.name)} ${s.emoji}</strong>
                     <div class="muted" aria-hidden="true">${'★'.repeat(s.rating)}${'☆'.repeat(5 - s.rating)}</div>
                     <p>${esc(s.text)}</p>`;
    container.appendChild(div);
  });
}

/* ======================
   Jokes spinner
   ====================== */
function setupJokeSpinner() {
  const btn = document.getElementById('joke-spin');
  const box = document.getElementById('joke-box');
  if (!btn || !box || !Array.isArray(window.JOKES)) return;

  const all = window.JOKES;
  const key = CONFIG.JOKES_SEEN_KEY;
  let seen = new Set(JSON.parse(localStorage.getItem(key) || '[]'));

  function pickAndShow() {
    const indexes = all.map((_, i) => i);
    const unseen = indexes.filter(i => !seen.has(i));
    const choice = unseen.length
      ? unseen[Math.floor(Math.random() * unseen.length)]
      : indexes[Math.floor(Math.random() * indexes.length)];

    const joke = all[choice];

    box.innerHTML = `
      <p style="font-size:1.2em; margin-bottom:10px;">${esc(joke.text)}</p>
      ${joke.image ? `<img src="${esc(joke.image)}" alt="joke image" style="max-width:100%; border-radius:12px; margin-top:10px;">` : ""}
    `;

    seen.add(choice);
    localStorage.setItem(key, JSON.stringify(Array.from(seen)));

    box.animate(
      [
        { opacity: 0, transform: 'translateY(6px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      { duration: 280, easing: 'ease-out' }
    );
  }

  pickAndShow();
  btn.addEventListener('click', () => {
    pop(btn);
    pickAndShow();
  });
}

/* ======================
   Theme toggle
   ====================== */
function initTheme() {
  const root = document.documentElement;
  const saved = localStorage.getItem(CONFIG.THEME_KEY);
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(saved || (prefersLight ? 'light' : 'dark'));
}

function setupDarkToggle() {
  const btn = document.getElementById('dark-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const isLight = document.documentElement.classList.toggle('light');
    const mode = isLight ? 'light' : 'dark';
    localStorage.setItem(CONFIG.THEME_KEY, mode);
    btn.textContent = `${isLight ? '🌞' : '🌜'} ${mode.charAt(0).toUpperCase() + mode.slice(1)}`;
    pop(btn);
  });
}

function applyTheme(mode) {
  document.documentElement.classList.toggle('light', mode === 'light');
  const btn = document.getElementById('dark-toggle');
  if (btn) btn.textContent = `${mode === 'light' ? '🌞' : '🌜'} ${mode.charAt(0).toUpperCase() + mode.slice(1)}`;
  localStorage.setItem(CONFIG.THEME_KEY, mode);
}

/* ======================
   Smooth scroll
   ====================== */
function setupSmoothScroll() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
    pop(el);
  });
}

/* ======================
   Contact fallback (Tawk.to detection + mailto autoresponder)
   ====================== */
function setupContactFallback() {
  const fallback = document.getElementById('offline-contact');
  const form = document.getElementById('contact-form');
  const savedNote = document.getElementById('contact-saved');
  if (!fallback || !form) return;

  let decided = false;

  function showFallback() {
    if (decided) return;
    decided = true;
    fallback.classList.remove('hidden');
    fallback.setAttribute('aria-hidden', 'false');
  }

  function checkTawkStatus(retries = 0) {
    if (window.Tawk_API && typeof window.Tawk_API.getStatus === 'function') {
      try {
        window.Tawk_API.getStatus(status => {
          if (status === 'offline') showFallback();
        });
      } catch (err) {
        showFallback();
      }
      return;
    }
    if (retries * 500 < CONFIG.TAWK_TIMEOUT_MS) {
      setTimeout(() => checkTawkStatus(retries + 1), 500);
    } else {
      showFallback();
    }
  }

  window.addEventListener('load', () => {
    setTimeout(() => checkTawkStatus(), 400);
  });

  setTimeout(() => { if (!decided) showFallback(); }, CONFIG.TAWK_TIMEOUT_MS + 500);

  // Form submit → mailto
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const fd = new FormData(form);

    const izina = encodeURIComponent(fd.get('name'));
    const imeli = encodeURIComponent(fd.get('email'));
    const ubutumwa = encodeURIComponent(fd.get('message'));

    const subject = encodeURIComponent("Ubutumwa bushya kuri Boutique Broskie");
    const body = `Izina: ${izina}%0AImeli: ${imeli}%0AUbutumwa: ${ubutumwa}`;

    window.location.href = `mailto:ornoirbruce5@gmail.com?subject=${subject}&body=${body}`;

    form.reset();
    if (savedNote) {
      savedNote.classList.remove('hidden');
      setTimeout(() => savedNote.classList.add('hidden'), 4000);
    }
  });
}

/* ======================
   Service Worker registration
   ====================== */
function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
      .then(reg => console.log("✅ Service Worker yanditswe:", reg.scope))
      .catch(err => console.error("❌ Service Worker ntikunze:", err));
  }
}

/* ======================
   Install Prompt Banner
   ====================== */
function setupInstallBanner() {
  let deferredPrompt;
  const installBanner = document.getElementById("installBanner");
  const installBtn = document.getElementById("installBtn");

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBanner) installBanner.classList.remove("hidden");
  });

  if (installBtn) {
    installBtn.addEventListener("click", async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      console.log("User choice:", choiceResult.outcome);
      deferredPrompt = null;
      if (installBanner) installBanner.classList.add("hidden");
    });
  }
}

/* ======================
   Footer year auto-init
   ====================== */
function initYear() {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}

/* ======================
   Background video handlers
   ====================== */
function setupBgVideoHandlers() {
  const bgWrap = document.querySelector('.bg-wrap');
  const bgVideo = document.querySelector('.bg-video');
  if (!bgWrap || !bgVideo) return;

  const markLoaded = () => {
    bgVideo.classList.add('loaded');
    bgWrap.removeAttribute('data-video-failed');
    const overlay = document.querySelector('.bg-overlay');
    if (overlay) {
      overlay.style.transition = 'opacity .6s ease';
      overlay.style.opacity = '0.65';
    }
  };

  const markFailed = () => {
    bgWrap.setAttribute('data-video-failed', 'true');
    bgVideo.classList.remove('loaded');
    const overlay = document.querySelector('.bg-overlay');
    if (overlay) overlay.style.opacity = '0.5';
  };

  bgVideo.addEventListener('canplaythrough', markLoaded, { once: true });
  bgVideo.addEventListener('loadeddata', markLoaded, { once: true });
  bgVideo.addEventListener('error', markFailed, { once: true });

  setTimeout(() => {
    if (!bgVideo.classList.contains('loaded')) markFailed();
  }, CONFIG.VIDEO_TIMEOUT_MS);
}

/* ======================
   Expose small API
   ====================== */
window.BDM = {
  reloadProducts: renderProducts,
  showFallbackContact: () => document.getElementById('offline-contact')?.classList.remove('hidden'),
  getStoredMessages: () => JSON.parse(localStorage.getItem(CONFIG.LOCAL_MSGS_KEY) || '[]')
};
