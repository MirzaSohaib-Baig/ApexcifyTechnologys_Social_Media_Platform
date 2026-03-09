// ══════════════════════════════════════════════════════
//  theme.js  —  Dark / Light mode + shared UI utils
// ══════════════════════════════════════════════════════

// ── Theme ────────────────────────────────────────────
function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  state.theme = theme;
  localStorage.setItem('pulse-theme', theme);

  // Update toggle button icon
  const sunIcon  = document.getElementById('icon-sun');
  const moonIcon = document.getElementById('icon-moon');
  if (sunIcon && moonIcon) {
    sunIcon.classList.toggle('hidden', theme === 'light');
    moonIcon.classList.toggle('hidden', theme === 'dark');
  }
}

function toggleTheme() {
  applyTheme(state.theme === 'dark' ? 'light' : 'dark');
}

// ── Toast ─────────────────────────────────────────────
let _toastTimer = null;
function showToast(msg, type = 'default') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  toastMsg.textContent = msg;

  toast.className = [
    'fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-[200]',
    'px-5 py-3 rounded-xl text-sm font-medium',
    'flex items-center gap-2 shadow-2xl pointer-events-none',
    'modal-pop glass',
    'dark:bg-zinc-900/90 dark:border dark:border-white/10 dark:text-white',
    'bg-white/90 border border-black/10 text-zinc-900',
  ].join(' ');

  toast.classList.remove('hidden');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => toast.classList.add('hidden'), 3000);
}

// ── SVG Icon helpers ──────────────────────────────────
const ICONS = {
  heart:    (filled) => `<svg width="15" height="15" viewBox="0 0 24 24" fill="${filled ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  comment:  () => `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  share:    () => `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
  bookmark: (filled) => `<svg width="15" height="15" viewBox="0 0 24 24" fill="${filled ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`,
  check:    () => `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`,
  send:     () => `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  plus:     () => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>`,
  close:    () => `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>`,
  dots:     () => `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>`,
  chevronR: () => `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>`,
  search:   () => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
  bell:     () => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  msg:      () => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  grid:     () => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
  user:     () => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  saved:    () => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`,
  pulse:    () => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  edit:     () => `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  link:     () => `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  calendar: () => `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  pin:      () => `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  photo:    () => `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
  emoji:    () => `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
  sun:      () => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  moon:     () => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  filter:   () => `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
  notifLike:    () => `<svg width="13" height="13" viewBox="0 0 24 24" fill="#f43f5e" stroke="#f43f5e" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  notifComment: () => `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  notifFollow:  () => `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>`,
};

// ── Avatar builder ────────────────────────────────────
function buildAvatar(user, sizeClass = 'w-10 h-10', textClass = 'text-sm', mainHeight = '') {
  return `
    <div class="avatar-ring ${mainHeight} flex-shrink-0">
      <div class="${sizeClass} ${textClass} rounded-full flex items-center justify-center font-display font-bold
                  dark:bg-zinc-900 bg-rose-50"
           style="color:${user.color}">
        ${user.initials}
      </div>
    </div>`;
}

// ── Follow button builder ─────────────────────────────
function buildFollowBtn(userId, extraClass = '') {
  const following = state.following.has(userId);
  return `
    <button onclick="toggleFollowUser(${userId}, this)"
            class="follow-btn text-xs px-3 py-1.5 rounded-xl font-display font-bold transition-all flex-shrink-0 ${extraClass}
                   ${following
                     ? 'border border-rose-400/40 text-rose-400 hover:bg-rose-400/10'
                     : 'btn-gradient text-white'}">
      ${following ? 'Following' : 'Follow'}
    </button>`;
}

// ── Navigation ────────────────────────────────────────
function showPage(page) {
  document.querySelectorAll('[data-page]').forEach(p => p.classList.add('hidden'));
  const target = document.querySelector(`[data-page="${page}"]`);
  if (!target) return;
  target.classList.remove('hidden');
  target.classList.add('page-enter');
//   target.classList.add('w-full');
  setTimeout(() => target.classList.remove('page-enter'), 400);

  // Sidebar nav highlights
  document.querySelectorAll('[data-nav]').forEach(n => {
    const isActive = n.dataset.nav === page;
    n.classList.toggle('nav-item-active', isActive);
    n.classList.toggle('text-rose-400', isActive);
    n.classList.toggle('dark:text-rose-400', isActive);
    n.classList.toggle('text-zinc-400', !isActive);
    n.classList.toggle('dark:text-zinc-400', !isActive);
  });

  if (page === 'saved')    renderSavedPage();
  if (page === 'profile')  renderProfilePage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Tab switcher helper ───────────────────────────────
function activateTab(btn, groupAttr) {
  const group = btn.closest(`[${groupAttr}]`) || btn.parentElement;
  group.querySelectorAll('[data-tab-btn]').forEach(b => {
    b.classList.remove('text-rose-400', 'border-rose-400');
    b.classList.add('text-zinc-500', 'border-transparent');
  });
  btn.classList.add('text-rose-400', 'border-rose-400');
  btn.classList.remove('text-zinc-500', 'border-transparent');
}