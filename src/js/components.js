// ══════════════════════════════════════════════════════
//  components.js  —  Reusable UI component builders
// ══════════════════════════════════════════════════════

// ── Post Card ─────────────────────────────────────────
function buildPostCard(post) {
  const user      = getUser(post.userId);
  const isLiked   = state.liked.has(post.id);
  const isSaved   = state.saved.has(post.id);
  const isMe      = user.id === 0;
  const following = state.following.has(user.id);

  const card = document.createElement('article');
  card.id = `post-${post.id}`;
  card.className = [
    'rounded-2xl p-5 transition-all duration-200',
    'border dark:border-white/[0.06] border-black/[0.07]',
    'dark:bg-zinc-900/70 bg-white/80 glass',
    'hover:-translate-y-0.5',
    'dark:hover:border-rose-400/20 hover:border-rose-400/30',
    'hover:shadow-lg dark:hover:shadow-rose-900/20 hover:shadow-rose-100/60',
  ].join(' ');

  card.innerHTML = `
    <!-- Header -->
    <div class="flex items-start gap-3 mb-4">
      <button onclick="openUserModal(${user.id})" class="flex-shrink-0">
        ${buildAvatar(user, 'w-10 h-10', 'text-sm')}
      </button>
      <div class="flex-1 min-w-0">
        <div class="flex items-center flex-wrap gap-1.5">
          <button onclick="openUserModal(${user.id})"
                  class="font-display font-bold text-sm dark:hover:text-rose-300 hover:text-rose-500 transition-colors
                         dark:text-white text-zinc-900">
            ${user.name}
          </button>
          <span class="verified-badge w-4 h-4">${ICONS.check()}</span>
          <span class="text-xs dark:text-zinc-500 text-zinc-400">@${user.username}</span>
          <span class="text-xs dark:text-zinc-600 text-zinc-300">·</span>
          <span class="text-xs dark:text-zinc-500 text-zinc-400">${post.timestamp}</span>
        </div>
      </div>
      <div class="flex items-center gap-2 ml-auto">
        ${!isMe ? buildFollowBtn(user.id) : ''}
        <button class="w-7 h-7 rounded-lg flex items-center justify-center
                       dark:text-zinc-500 text-zinc-400 dark:hover:text-white hover:text-zinc-700
                       dark:hover:bg-white/5 hover:bg-black/5 transition-all">
          ${ICONS.dots()}
        </button>
      </div>
    </div>

    <!-- Body -->
    <p class="text-sm leading-relaxed mb-3 dark:text-zinc-200 text-zinc-700">${post.text}</p>

    ${post.image ? `
      <div class="rounded-xl overflow-hidden mb-3">
        <img src="${post.image}" class="w-full max-h-80 object-cover" alt="Post image"/>
      </div>` : ''}

    <!-- Tags -->
    <div class="flex flex-wrap gap-1.5 mb-4">
      ${post.tags.map(t => `
        <span class="text-xs px-2.5 py-1 rounded-full font-medium
                     dark:bg-rose-400/10 dark:text-rose-300 dark:border dark:border-rose-400/20
                     bg-rose-50 text-rose-500 border border-rose-200/60">
          ${t}
        </span>`).join('')}
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-between pt-3 border-t dark:border-white/[0.05] border-black/[0.05]">
      <div class="flex gap-1">
        <!-- Like -->
        <button id="like-btn-${post.id}" onclick="toggleLike(${post.id}, this)"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all
                       dark:hover:bg-rose-400/10 hover:bg-rose-50
                       ${isLiked
                         ? 'text-rose-400'
                         : 'dark:text-zinc-400 text-zinc-500 hover:text-rose-400'}">
          ${ICONS.heart(isLiked)}
          <span id="like-count-${post.id}">${fmtNum(post.likes)}</span>
        </button>
        <!-- Comment -->
        <button onclick="openComments(${post.id})"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all
                       dark:text-zinc-400 text-zinc-500 dark:hover:text-rose-400 hover:text-rose-400
                       dark:hover:bg-rose-400/10 hover:bg-rose-50">
          ${ICONS.comment()}
          <span id="comment-count-${post.id}">${post.comments.length}</span>
        </button>
        <!-- Share -->
        <button onclick="sharePost(${post.id})"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all
                       dark:text-zinc-400 text-zinc-500 dark:hover:text-rose-400 hover:text-rose-400
                       dark:hover:bg-rose-400/10 hover:bg-rose-50">
          ${ICONS.share()}
          <span class="hidden sm:inline">Share</span>
        </button>
      </div>
      <!-- Save -->
      <button id="save-btn-${post.id}" onclick="toggleSave(${post.id}, this)"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all
                     dark:hover:bg-rose-400/10 hover:bg-rose-50
                     ${isSaved
                       ? 'text-rose-400'
                       : 'dark:text-zinc-400 text-zinc-500 hover:text-rose-400'}">
        ${ICONS.bookmark(isSaved)}
      </button>
    </div>
  `;
  return card;
}

// ── Follow Row (sidebar / modal) ──────────────────────
function buildFollowRow(user, compact = false) {
  const div = document.createElement('div');
  div.className = 'flex items-center gap-3';
  div.innerHTML = `
    <button onclick="openUserModal(${user.id})" class="flex-shrink-0">
      ${buildAvatar(user, compact ? 'w-8 h-8' : 'w-9 h-9', 'text-xs')}
    </button>
    <div class="flex-1 min-w-0">
      <div class="text-sm font-display font-bold dark:text-white text-zinc-900 truncate">${user.name}</div>
      <div class="text-xs dark:text-zinc-500 text-zinc-400 truncate">@${user.username}</div>
    </div>
    ${buildFollowBtn(user.id)}
  `;
  return div;
}

// ── Trending row ──────────────────────────────────────
function buildTrendRow(t, i) {
  const div = document.createElement('div');
  div.className = [
    'flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all',
    'dark:bg-zinc-800/40 bg-zinc-50/80',
    'border dark:border-white/[0.04] border-black/[0.05]',
    'dark:hover:border-rose-400/20 hover:border-rose-300/40',
  ].join(' ');
  div.innerHTML = `
    <div class="flex items-center gap-3">
      <span class="trend-num font-display font-bold text-sm w-6 text-right">${String(i + 1).padStart(2, '0')}</span>
      <div>
        <div class="text-sm font-display font-bold dark:text-white text-zinc-800">${t.tag}</div>
        <div class="text-xs dark:text-zinc-500 text-zinc-400">${fmtNum(t.posts)} posts</div>
      </div>
    </div>
    <span class="text-xs text-emerald-400 font-medium">${t.change}</span>
  `;
  return div;
}

// ── Comment item ──────────────────────────────────────
function buildCommentEl(c) {
  const user = getUser(c.userId);
  const div = document.createElement('div');
  div.className = 'flex gap-3 page-enter';
  div.innerHTML = `
    ${buildAvatar(user, 'w-8 h-8', 'text-xs', 'h-9')}
    <div class="flex-1">
      <div class="rounded-xl px-3 py-2.5
                  dark:bg-zinc-800/60 bg-zinc-100/80">
        <div class="flex items-center gap-2 mb-1">
          <span class="font-display font-bold text-xs dark:text-white text-zinc-900">${user.name}</span>
          <span class="text-xs dark:text-zinc-600 text-zinc-400">@${user.username}</span>
        </div>
        <p class="text-sm dark:text-zinc-200 text-zinc-700">${c.text}</p>
      </div>
      <div class="flex gap-4 mt-1.5 ml-3">
        <button class="text-xs dark:text-zinc-500 text-zinc-400 dark:hover:text-rose-400 hover:text-rose-400 transition-colors">Like (${c.likes})</button>
        <button class="text-xs dark:text-zinc-500 text-zinc-400 dark:hover:text-rose-400 hover:text-rose-400 transition-colors">Reply</button>
      </div>
    </div>
  `;
  return div;
}

// ── Notification item ─────────────────────────────────
function buildNotifItem(n) {
  const user = getUser(n.userId);
  const notifIcon = { like: ICONS.notifLike(), comment: ICONS.notifComment(), follow: ICONS.notifFollow() }[n.type];
  const div = document.createElement('div');
  div.className = [
    'flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors',
    'dark:hover:bg-white/[0.04] hover:bg-black/[0.04]',
    n.unread ? 'dark:bg-rose-400/[0.04] bg-rose-50/60' : '',
  ].join(' ');
  div.innerHTML = `
    <div class="relative flex-shrink-0 mt-0.5">
      ${buildAvatar(user, 'w-9 h-9', 'text-xs')}
      <div class="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center
                  dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-zinc-200">
        ${notifIcon}
      </div>
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-sm dark:text-zinc-200 text-zinc-700">
        <span class="font-display font-bold dark:text-white text-zinc-900">${user.name}</span>
        ${n.text}
      </p>
      <p class="text-xs dark:text-zinc-500 text-zinc-400 mt-0.5">${n.time}</p>
    </div>
    ${n.unread ? '<div class="w-2 h-2 rounded-full notif-dot flex-shrink-0 mt-2"></div>' : ''}
  `;
  return div;
}

// ── Message row ───────────────────────────────────────
function buildMessageRow(msg) {
  const user = getUser(msg.userId);
  const div = document.createElement('div');
  div.className = [
    'flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors',
    'dark:hover:bg-white/[0.04] hover:bg-black/[0.04]',
  ].join(' ');
  div.innerHTML = `
    <div class="relative flex-shrink-0">
      ${buildAvatar(user, 'w-11 h-11', 'text-sm')}
      ${msg.online ? `<div class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 dark:border-zinc-950 border-white bg-emerald-400"></div>` : ''}
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between">
        <span class="font-display font-bold text-sm dark:text-white text-zinc-900">${user.name}</span>
        <span class="text-xs dark:text-zinc-500 text-zinc-400">${msg.time}</span>
      </div>
      <div class="flex items-center justify-between mt-0.5">
        <span class="text-xs dark:text-zinc-400 text-zinc-500 truncate">${msg.last}</span>
        ${msg.unread ? `<span class="ml-2 notif-dot w-5 h-5 rounded-full text-white text-[10px] font-display flex items-center justify-center flex-shrink-0">${msg.unread}</span>` : ''}
      </div>
    </div>
  `;
  return div;
}