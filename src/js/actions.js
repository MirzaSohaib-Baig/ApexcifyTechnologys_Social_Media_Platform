// ══════════════════════════════════════════════════════
//  actions.js  —  All user interaction handlers
// ══════════════════════════════════════════════════════

// ── Like / Save / Share ───────────────────────────────
function toggleLike(postId, btn) {
  const post = state.posts.find(p => p.id === postId);
  if (!post) return;

  if (state.liked.has(postId)) {
    state.liked.delete(postId);
    post.likes--;
    btn.className = btn.className.replace('text-rose-400', 'dark:text-zinc-400 text-zinc-500 hover:text-rose-400');
    btn.innerHTML = ICONS.heart(false) + `<span id="like-count-${postId}">${fmtNum(post.likes)}</span>`;
  } else {
    state.liked.add(postId);
    post.likes++;
    btn.className = btn.className.replace('dark:text-zinc-400 text-zinc-500 hover:text-rose-400', 'text-rose-400');
    btn.innerHTML = ICONS.heart(true) + `<span id="like-count-${postId}">${fmtNum(post.likes)}</span>`;
    btn.classList.add('heart-pop');
    btn.addEventListener('animationend', () => btn.classList.remove('heart-pop'), { once: true });
  }
}

function toggleSave(postId, btn) {
  const post = state.posts.find(p => p.id === postId);
  if (!post) return;

  if (state.saved.has(postId)) {
    state.saved.delete(postId);
    post.saved = false;
    btn.className = btn.className.replace('text-rose-400', 'dark:text-zinc-400 text-zinc-500 hover:text-rose-400');
    btn.innerHTML = ICONS.bookmark(false);
    showToast('Removed from saved');
  } else {
    state.saved.add(postId);
    post.saved = true;
    btn.className = btn.className.replace('dark:text-zinc-400 text-zinc-500 hover:text-rose-400', 'text-rose-400');
    btn.innerHTML = ICONS.bookmark(true);
    showToast('Saved to collection ✨');
  }
}

function sharePost(postId) {
  navigator.clipboard?.writeText(window.location.href + '#post-' + postId).catch(() => {});
  showToast('Link copied to clipboard 🔗');
}

// ── Follow / Unfollow ─────────────────────────────────
function toggleFollowUser(userId, btn) {
  if (state.following.has(userId)) {
    state.following.delete(userId);
    btn.textContent = 'Follow';
    btn.className = btn.className
      .replace('border border-rose-400/40 text-rose-400 hover:bg-rose-400/10', '')
      .replace('btn-gradient text-white', '');
    btn.classList.add('btn-gradient', 'text-white');
    showToast('Unfollowed');
  } else {
    state.following.add(userId);
    btn.textContent = 'Following';
    btn.classList.remove('btn-gradient', 'text-white');
    btn.classList.add('border', 'border-rose-400/40', 'text-rose-400', 'hover:bg-rose-400/10');
    showToast(`Now following ${getUser(userId).name}! 🎉`);
  }
  renderSidebars();
}

// ── Post modal ────────────────────────────────────────
function openPostModal() {
  document.getElementById('post-modal').classList.remove('hidden');
  document.getElementById('post-content').focus();
}

function closePostModal() {
  document.getElementById('post-modal').classList.add('hidden');
  document.getElementById('post-content').value = '';
  document.getElementById('post-tags').value = '';
  document.getElementById('char-counter').textContent = '0 / 280';
  document.getElementById('char-counter').className =
    'text-xs dark:text-zinc-500 text-zinc-400 font-medium px-2';
  document.getElementById('post-image-preview').classList.add('hidden');
  document.getElementById('post-img-el').src = '';
}

function submitPost() {
  const text = document.getElementById('post-content').value.trim();
  if (!text) { showToast('Write something first ✏️'); return; }

  const rawTags = document.getElementById('post-tags').value;
  const tags    = rawTags.match(/#\w+/g) || [];
  const imgSrc  = document.getElementById('post-img-el').src;

  const newPost = {
    id: state.posts.length + 1,
    userId: 0,
    text,
    tags,
    likes: 0,
    comments: [],
    timestamp: 'just now',
    image: imgSrc && imgSrc !== window.location.href ? imgSrc : null,
    saved: false,
  };

  state.posts.unshift(newPost);
  closePostModal();
  renderFeedPage();
  renderProfilePage();
  showToast('Post published! 🚀');
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById('post-img-el').src = e.target.result;
    document.getElementById('post-image-preview').classList.remove('hidden');
  };
  reader.readAsDataURL(file);
}

function removePostImage() {
  document.getElementById('post-image-preview').classList.add('hidden');
  document.getElementById('post-img-el').src = '';
}

// ── Comments modal ────────────────────────────────────
function openComments(postId) {
  state.currentCommentPostId = postId;
  const post = state.posts.find(p => p.id === postId);
  document.getElementById('comment-modal-count').textContent = `(${post.comments.length})`;
  renderCommentsList(post.comments);
  document.getElementById('comments-modal').classList.remove('hidden');
  document.getElementById('comment-input').focus();
}

function closeCommentsModal() {
  document.getElementById('comments-modal').classList.add('hidden');
  state.currentCommentPostId = null;
}

function renderCommentsList(comments) {
  const container = document.getElementById('comments-list');
  container.innerHTML = '';
  if (comments.length === 0) {
    container.innerHTML = `<p class="text-center text-sm dark:text-zinc-500 text-zinc-400 py-10">No comments yet. Be first!</p>`;
    return;
  }
  comments.forEach(c => container.appendChild(buildCommentEl(c)));
}

function submitComment() {
  const input = document.getElementById('comment-input');
  const text  = input.value.trim();
  if (!text) return;

  const post = state.posts.find(p => p.id === state.currentCommentPostId);
  const newComment = { id: Date.now(), userId: 0, text, likes: 0 };
  post.comments.push(newComment);
  input.value = '';

  document.getElementById('comment-modal-count').textContent = `(${post.comments.length})`;
  renderCommentsList(post.comments);
  // update counter in card
  const ccEl = document.getElementById(`comment-count-${post.id}`);
  if (ccEl) ccEl.textContent = post.comments.length;

  const list = document.getElementById('comments-list');
  list.scrollTop = list.scrollHeight;
}

// ── User profile modal ────────────────────────────────
function openUserModal(userId) {
  if (userId === 0) { closeAllModals(); showPage('profile'); return; }
  const user = getUser(userId);
  state.currentModalUserId = userId;

  document.getElementById('umod-name').textContent     = user.name;
  document.getElementById('umod-username').textContent = '@' + user.username;
  document.getElementById('umod-bio').textContent      = user.bio;
  document.getElementById('umod-followers').textContent = fmtNum(user.followers);
  document.getElementById('umod-following').textContent = fmtNum(user.following);
  document.getElementById('umod-posts').textContent     = user.posts;
  document.getElementById('umod-avatar').textContent    = user.initials;
  document.getElementById('umod-avatar').style.color    = user.color;
  document.getElementById('umod-cover').style.background =
    `linear-gradient(135deg, #1e1b2e 0%, ${user.color}55 100%)`;

  const btn = document.getElementById('umod-follow-btn');
  if (state.following.has(userId)) {
    btn.textContent = 'Following';
    btn.classList.remove('btn-gradient', 'text-white');
    btn.classList.add('border', 'border-rose-400/40', 'text-rose-400');
  } else {
    btn.textContent = 'Follow';
    btn.classList.add('btn-gradient', 'text-white');
    btn.classList.remove('border', 'border-rose-400/40', 'text-rose-400');
  }

  document.getElementById('user-profile-modal').classList.remove('hidden');
}

function closeUserModal() {
  document.getElementById('user-profile-modal').classList.add('hidden');
}

function toggleModalFollow() {
  const btn = document.getElementById('umod-follow-btn');
  toggleFollowUser(state.currentModalUserId, btn);
}

// ── Followers / Following list modal ──────────────────
function openFollowListModal(type) {
  document.getElementById('follow-list-title').textContent = type === 'followers' ? 'Followers' : 'Following';
  const items = document.getElementById('follow-list-items');
  items.innerHTML = '';
  const users = type === 'followers'
    ? USERS.filter(u => u.followsMe)
    : USERS.filter(u => state.following.has(u.id));
  users.forEach(u => items.appendChild(buildFollowRow(u)));
  if (users.length === 0) {
    items.innerHTML = `<p class="text-center text-sm dark:text-zinc-500 text-zinc-400 py-6">No users here yet</p>`;
  }
  document.getElementById('follow-list-modal').classList.remove('hidden');
}

function closeFollowListModal() {
  document.getElementById('follow-list-modal').classList.add('hidden');
}

// ── Edit profile modal ────────────────────────────────
function openEditProfile() {
  document.getElementById('edit-name').value     = ME.name;
  document.getElementById('edit-username').value = '@' + ME.username;
  document.getElementById('edit-bio').value      = ME.bio;
  document.getElementById('edit-location').value = ME.location;
  document.getElementById('edit-website').value  = ME.website;
  document.getElementById('edit-profile-modal').classList.remove('hidden');
}

function closeEditProfile() {
  document.getElementById('edit-profile-modal').classList.add('hidden');
}

function saveProfile() {
  ME.bio = document.getElementById('edit-bio').value;
  document.getElementById('profile-bio-text').textContent = ME.bio;
  closeEditProfile();
  showToast('Profile updated ✨');
}

// ── Notifications ─────────────────────────────────────
function filterNotifs(type, btn) {
  activateTab(btn, 'data-tab-group');
  const filtered = type === 'all'
    ? state.notifications
    : state.notifications.filter(n => n.type === type.slice(0, -1)); // 'likes'->'like'
  renderNotifList(filtered);
}

function markAllRead() {
  state.notifications.forEach(n => n.unread = false);
  renderNotifList(state.notifications);
  showToast('All caught up ✅');
  document.querySelectorAll('.notif-badge').forEach(el => el.classList.add('hidden'));
}

// ── Explore search ────────────────────────────────────
function handleSearch(val) {
  const trending = document.getElementById('explore-trending-section');
  const people   = document.getElementById('explore-people-section');
  const results  = document.getElementById('explore-results-section');

  if (!val.trim()) {
    trending.classList.remove('hidden');
    people.classList.remove('hidden');
    results.classList.add('hidden');
    return;
  }

  trending.classList.add('hidden');
  people.classList.add('hidden');
  results.classList.remove('hidden');

  const q = val.toLowerCase();
  const matchUsers = USERS.filter(u =>
    u.name.toLowerCase().includes(q) ||
    u.username.toLowerCase().includes(q) ||
    u.bio.toLowerCase().includes(q)
  );
  const matchPosts = state.posts.filter(p =>
    p.text.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q))
  );

  const list = document.getElementById('search-results-list');
  list.innerHTML = '';

  if (matchUsers.length === 0 && matchPosts.length === 0) {
    list.innerHTML = `<p class="text-center text-sm dark:text-zinc-500 text-zinc-400 py-10">No results for "${val}"</p>`;
    return;
  }

  matchUsers.forEach(user => {
    const row = buildFollowRow(user);
    row.className += ' rounded-xl px-3 py-2 dark:bg-zinc-800/40 bg-zinc-50/80 border dark:border-white/[0.04] border-black/[0.05]';
    list.appendChild(row);
  });

  matchPosts.slice(0, 4).forEach(p => list.appendChild(buildPostCard(p)));
}

// ── Profile tabs ──────────────────────────────────────
function switchProfileTab(tab, btn) {
  activateTab(btn, 'data-tab-group');
  ['posts','media','liked'].forEach(t => {
    document.getElementById(`profile-tab-${t}`)?.classList.toggle('hidden', t !== tab);
  });
  if (tab === 'liked') {
    const container = document.getElementById('profile-tab-liked');
    container.innerHTML = '';
    const likedPosts = state.posts.filter(p => state.liked.has(p.id));
    if (likedPosts.length === 0) {
      container.innerHTML = `<p class="text-center text-sm dark:text-zinc-500 text-zinc-400 py-10">No liked posts yet</p>`;
    } else {
      likedPosts.forEach(p => container.appendChild(buildPostCard(p)));
    }
  }
}

// ── Misc ──────────────────────────────────────────────
function loadMorePosts() {
  showToast('Loading more posts…');
}

function closeAllModals() {
  ['post-modal','comments-modal','user-profile-modal','follow-list-modal','edit-profile-modal']
    .forEach(id => document.getElementById(id)?.classList.add('hidden'));
}

// Close modals on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAllModals();
});