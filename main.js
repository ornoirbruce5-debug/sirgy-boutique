/* Burundi Digital Marketboard — main.js (youth-friendly, Kinyarwanda)
   - Renders products & testimonials
   - Daily joke spinner (ntidusubiremo vuba)
   - Dark mode toggle (🌞/🌜) ibika theme
   - Smooth scroll & small UX animations
   - Tawk.to detection + fallback form mu Kinyarwanda
   - PWA service worker registration
*/

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderTestimonials();
  setupJokeSpinner();
  setupDarkToggle();
  setupSmoothScroll();
  setupContactFallback();
  initYear();
  registerServiceWorker();
});

/* -------------------------
   Helpers (youth micro-UX)
------------------------- */
function pop(el) {
  if (!el?.animate) return;
  el.animate(
    [{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(1.03)', opacity: 1 }, { transform: 'scale(1)', opacity: 1 }],
    { duration: 240, easing: 'ease-out' }
  );
}

/* -------------------------
   Products rendering
------------------------- */
function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid || !window.PRODUCTS) return;
  grid.innerHTML = '';

  PRODUCTS.forEach((p, i) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', p.name);

    const price = Number(p.price);
    const prettyPrice = isFinite(price) ? `FBu ${price.toLocaleString()}` : 'Kubaza';

    card.innerHTML = `
      <div class="thumb">
        <img src="${p.image || 'placeholder-product-1.jpg'}" alt="${p.name}" loading="lazy" />
      </div>
      <div class="p-meta">
        <div class="p-name">${p.name}</div>
        <div class="p-cat">${p.category || 'Ibikoresho'} • Imbika: ${p.stock ?? '—'}</div>
        <div class="p-price">${prettyPrice}</div>
        <div class="p-desc">${p.description || 'Ibisobanuro biri muri detail.'}</div>
        <button class="btn buy">Baza kuri WhatsApp</button>
      </div>
    `;

    // entrance animation
    card.style.animation = `fadeUp .45s ease ${i * 80}ms both`;

    const buyBtn = card.querySelector('.btn.buy');
    const phone = '25700000000'; // hindura numero yawe muri index.html/main.js nushaka
    const msg = `Muraho, ndashaka ${p.name} (id: ${p.id}). Mumbwire uko nayibona.`;

    function openWhatsApp() {
      const text = encodeURIComponent(msg);
      window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener');
      pop(buyBtn);
    }

    buyBtn.addEventListener('click', openWhatsApp);
    card.addEventListener('click', e => {
      if (!e.target.closest('.btn')) openWhatsApp();
    });

    grid.appendChild(card);
  });
}

/* -------------------------
   Testimonials (sample)
------------------------- */
function renderTestimonials() {
  const container = document.getElementById('testi-grid');
  if (!container) return;

  const samples = [
    { name: 'Aline', text: 'Serivisi yihuse, ibiciro byumvikana! ✨', rating: 5, emoji: '😄' },
    { name: 'Jean', text: 'WhatsApp support yansubije ako kanya. 👌', rating: 4, emoji: '👍' },
    { name: 'Marie', text: 'Urubuga rufasha cyane urubyiruko. 🚀', rating: 5, emoji: '🎉' }
  ];

  samples.forEach((s, i) => {
    const card = document.createElement('div');
    card.className = 'testimonial';
    card.setAttribute('role', 'listitem');
    card.style.animation = `fadeUp .45s ease ${i * 120}ms both`;
    card.innerHTML = `
      <strong>${s.name} ${s.emoji}</strong>
      <div class="muted" aria-label="Stars">${'★'.repeat(s.rating)}${'☆'.repeat(5 - s.rating)}</div>
      <p>${s.text}</p>
    `;
    container.appendChild(card);
  });
}

/* -------------------------
   Daily Joke Spinner
------------------------- */
function setupJokeSpinner() {
  const btn = document.getElementById('joke-spin');
  const txt = document.getElementById('joke-text');
  if (!btn || !txt || !window.JOKES) return;

  const KEY = 'bdm_seen_jokes_v1';
  let seen = new Set(JSON.parse(localStorage.getItem(KEY) || '[]'));

  function pick() {
    const all = window.JOKES;
    const indexes = all.map((_, i) => i);
    const unseen = indexes.filter(i => !seen.has(i));
    const index = unseen.length
      ? unseen[Math.floor(Math.random() * unseen.length)]
      : indexes[Math.floor(Math.random() * indexes.length)];

    txt.textContent = all[index] || 'Hehe.';
    seen.add(index);
    localStorage.setItem(KEY, JSON.stringify(Array.from(seen)));

    txt.animate(
      [{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 280, easing: 'ease-out' }
    );
  }

  pick();
  btn.addEventListener('click', () => {
    pop(btn);
    pick();
  });
}

/* -------------------------
   Dark Mode Toggle (🌞/🌜)
------------------------- */
function setupDarkToggle() {
  const btn = document.getElementById('dark-toggle');
  const root = document.documentElement;
  const KEY = 'bdm_theme_v1';
  if (!btn) return;

  const saved = localStorage.getItem(KEY);
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  apply(saved || (prefersLight ? 'light' : 'dark'));

  btn.addEventListener('click', () => {
    const next = root.classList.contains('light') ? 'dark' : 'light';
    apply(next);
    pop(btn);
  });

  function apply(mode) {
    root.classList.toggle('light', mode === 'light');
    const emoji = mode === 'light' ? '🌞' : '🌜';
    btn.textContent = `${emoji} ${ucFirst(mode)}`;
    btn.setAttribute('aria-pressed', String(mode === 'light'));
    localStorage.setItem(KEY, mode);
  }

  function ucFirst(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
}

/* -------------------------
   Smooth Scroll
------------------------- */
function setupSmoothScroll() {
  document.documentElement.style.scrollBehavior = 'smooth';
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);
      pop(el);
    }
  });
}

/* -------------------------
   Contact Fallback (Tawk.to)
------------------------- */
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

  function checkTawkStatus() {
    if (window.Tawk_API && typeof window.Tawk_API.getStatus === 'function') {
      window.Tawk_API.getStatus(status => {
        // Tawk.to ishobora kuba online/away/hidden; fallback igaragara gusa iyo ari offline
        if (status === 'offline') showFallback();
      });
    } else {
      // retry until Tawk_API iboneka cyangwa timeout
      setTimeout(checkTawkStatus, 1000);
    }
  }

  // tegereza page load + seconds nke kugira ngo Tawk yihute
  window.addEventListener('load', () => {
    setTimeout(checkTawkStatus, 2000);
  });

  // niba Tawk itigeze iboneka, garagaza fallback nyuma y’akazi gato
  setTimeout(() => {
    if (!decided && !window.Tawk_API) showFallback();
  }, 6000);

  // Local-only contact storage (offline)
  form.addEventListener('submit', ev => {
    ev.preventDefault();
    const fd = new FormData(form);
    const msg = {
      izina: fd.get('name'),
      imeli: fd.get('email'),
      ubutumwa: fd.get('message'),
      igihe: new Date().toISOString()
    };
    const KEY = 'bdm_local_messages_v1';
    const existing = JSON.parse(localStorage.getItem(KEY) || '[]');
    existing.push(msg);
    localStorage.setItem(KEY, JSON.stringify(existing));

    savedNote.textContent = '✅ Ubutumwa bwawe bwabitswe neza (offline).';
    savedNote.classList.remove('hidden');
    pop(savedNote);
    form.reset();
    setTimeout(() => savedNote.classList.add('hidden'), 3000);
  });
}

/* -------------------------
   PWA Service Worker
------------------------- */
function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register('/service-worker.js')
    .then(reg => {
      reg.addEventListener?.('updatefound', () => {
        const newWorker = reg.installing;
        newWorker?.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('🔄 Hari update nshya y’inyandiko (assets) — refresh ni optional.');
          }
        });
      });
    })
    .catch(err => console.warn('⚠️ SW registration yananiwe:', err));
}

/* -------------------------
   Footer Year
------------------------- */
function initYear() {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}
