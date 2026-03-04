// ══════════════════════════════════════════════════════
//  render.js  —  Page-level renderers
// ══════════════════════════════════════════════════════

// ── Feed ──────────────────────────────────────────────
function renderFeedPage() {
  const container = document.getElementById('feed-posts');
  container.innerHTML = '';
  state.posts.forEach(p => container.appendChild(buildPostCard(p)));
}

function renderStories() {
  const container = document.getElementById('stories-row');
  container.innerHTML = '';
  USERS.slice(0, 5).forEach(user => {
    const btn = document.createElement('button');
    btn.className = 'flex flex-col items-center gap-2 flex-shrink-0 group';
    btn.onclick = () => openUserModal(user.id);
    btn.innerHTML = `
      <div class="story-ring">
        <div class="story-ring-inner dark:bg-zinc-950 bg-white">
          <div class="w-12 h-12 rounded-full flex items-center justify-center text-sm font-display font-bold
                      dark:bg-zinc-900 bg-rose-50 group-hover:opacity-80 transition-opacity"
               style="color:${user.color}">
            ${user.initials}
          </div>
        </div>
      </div>
      <span class="text-xs dark:text-zinc-400 text-zinc-500 truncate w-14 text-center">
        ${user.name.split(' ')[0]}
      </span>
    `;
    container.appendChild(btn);
  });
}

// ── Sidebars ──────────────────────────────────────────
function renderSidebars() {
  // Who to follow
  const wtf = document.getElementById('who-to-follow');
  if (wtf) {
    wtf.innerHTML = '';
    USERS.filter(u => !state.following.has(u.id)).slice(0, 3).forEach(u => wtf.appendChild(buildFollowRow(u)));
    if (wtf.children.length === 0) {
      wtf.innerHTML = `<p class="text-xs dark:text-zinc-500 text-zinc-400 text-center py-2">You're following everyone!</p>`;
    }
  }

  // Trending right
  const tr = document.getElementById('trending-right');
  if (tr) {
    tr.innerHTML = '';
    TAGS.forEach((t, i) => tr.appendChild(buildTrendRow(t, i)));
  }
}

// ── Explore ───────────────────────────────────────────
function renderExplorePage() {
  // Trending tags
  const tt = document.getElementById('explore-tags-list');
  if (tt) {
    tt.innerHTML = '';
    TAGS.forEach((t, i) => {
      const row = buildTrendRow(t, i);
      row.classList.add('p-4');
      tt.appendChild(row);
    });
  }

  // People
  const ep = document.getElementById('explore-people-list');
  if (ep) {
    ep.innerHTML = '';
    USERS.forEach(user => {
      const div = document.createElement('div');
      div.className = [
        'rounded-xl p-4 flex items-center gap-3 transition-all cursor-default',
        'border dark:border-white/[0.06] border-black/[0.07]',
        'dark:bg-zinc-900/70 bg-white/80 glass',
        'dark:hover:border-rose-400/20 hover:border-rose-300/40',
        'hover:-translate-y-0.5',
      ].join(' ');
      div.innerHTML = `
        <button onclick="openUserModal(${user.id})" class="flex-shrink-0">
          ${buildAvatar(user, 'w-11 h-11', 'text-sm')}
        </button>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-1.5 mb-0.5">
            <span class="font-display font-bold text-sm dark:text-white text-zinc-900">${user.name}</span>
            <span class="verified-badge w-4 h-4">${ICONS.check()}</span>
          </div>
          <div class="text-xs dark:text-zinc-500 text-zinc-400 mb-1">@${user.username} · ${fmtNum(user.followers)} followers</div>
          <div class="text-xs dark:text-zinc-400 text-zinc-500 truncate">${user.bio}</div>
        </div>
        ${buildFollowBtn(user.id)}
      `;
      ep.appendChild(div);
    });
  }
}

// ── Notifications ─────────────────────────────────────
function renderNotifList(notifs) {
  const container = document.getElementById('notifications-list');
  if (!container) return;
  container.innerHTML = '';
  if (notifs.length === 0) {
    container.innerHTML = `<p class="text-center text-sm dark:text-zinc-500 text-zinc-400 py-10">Nothing here yet</p>`;
    return;
  }
  notifs.forEach(n => container.appendChild(buildNotifItem(n)));
}

// ── Messages ──────────────────────────────────────────
function renderMessagesPage() {
  const container = document.getElementById('messages-list');
  if (!container) return;
  container.innerHTML = '';
  MESSAGE_SEEDS.forEach(m => container.appendChild(buildMessageRow(m)));
}

// ── Profile ───────────────────────────────────────────
function renderProfilePage() {
  // My posts tab
  const postsContainer = document.getElementById('profile-tab-posts');
  if (postsContainer) {
    postsContainer.innerHTML = '';
    state.posts.filter(p => p.userId === 0).forEach(p => postsContainer.appendChild(buildPostCard(p)));
  }

  // Media grid
  const mediaContainer = document.getElementById('profile-tab-media');
  if (mediaContainer && mediaContainer.children.length === 0) {
    const palette = ['#8b5cf6','#f43f5e','#06b6d4','#f97316','#3b82f6','#ec4899'];
    const emojis  = ['🎨','⚡','🌊','🔮','🌿','✨','🎯','🚀','💡'];
    for (let i = 0; i < 9; i++) {
      const el = document.createElement('div');
      el.className = [
        'aspect-square rounded-xl cursor-pointer overflow-hidden',
        'hover:opacity-75 transition-opacity',
        'flex items-center justify-center text-3xl',
      ].join(' ');
      el.style.background = `linear-gradient(135deg, ${palette[i % palette.length]}22, ${palette[(i + 2) % palette.length]}44)`;
      el.textContent = emojis[i];
      mediaContainer.appendChild(el);
    }
  }
}

// ── Saved ─────────────────────────────────────────────
function renderSavedPage() {
  const container = document.getElementById('saved-posts');
  const empty     = document.getElementById('saved-empty');
  if (!container) return;

  const savedPosts = state.posts.filter(p => state.saved.has(p.id));
  container.innerHTML = '';

  if (savedPosts.length === 0) {
    empty?.classList.remove('hidden');
  } else {
    empty?.classList.add('hidden');
    savedPosts.forEach(p => container.appendChild(buildPostCard(p)));
  }
}

// ── Activity widget ───────────────────────────────────
function renderActivityWidget() {
  const el = document.getElementById('activity-bar');
  if (el) el.style.width = '70%';
}

// ── Boot ──────────────────────────────────────────────
function boot() {
  buildPosts();
  applyTheme(state.theme);
  renderStories();
  renderFeedPage();
  renderSidebars();
  renderNotifList(state.notifications);
  renderMessagesPage();
  renderExplorePage();
  renderProfilePage();
  renderActivityWidget();
  showPage('feed');

  // Post content char counter
  const ta = document.getElementById('post-content');
  if (ta) {
    ta.addEventListener('input', () => {
      const len = ta.value.length;
      const counter = document.getElementById('char-counter');
      counter.textContent = `${len} / 280`;
      counter.className = `text-xs font-medium px-2 ${len > 250 ? 'text-rose-400' : 'dark:text-zinc-500 text-zinc-400'}`;
    });
  }
}

document.addEventListener('DOMContentLoaded', boot);