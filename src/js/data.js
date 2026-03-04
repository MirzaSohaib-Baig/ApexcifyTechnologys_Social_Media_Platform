// ══════════════════════════════════════════════════════
//  data.js  —  All static data & state for Pulse
// ══════════════════════════════════════════════════════

const USERS = [
  { id: 1, name: 'Jordan Lee',   username: 'jordanlee',   initials: 'JL', color: '#8b5cf6', bio: 'UI/UX designer. I make pixels pretty.',                              followers: 1820, following: 204, posts: 31, followsMe: true  },
  { id: 2, name: 'Mia Chen',     username: 'miachen',     initials: 'MC', color: '#06b6d4', bio: 'Full-stack dev. Coffee addict. Open source contributor.',            followers: 4100, following: 512, posts: 88, followsMe: false },
  { id: 3, name: 'Kai Santos',   username: 'kaisantos',   initials: 'KS', color: '#ec4899', bio: 'Creative coder. Making the web weird since 2018.',                   followers: 920,  following: 88,  posts: 22, followsMe: true  },
  { id: 4, name: 'Riley Morgan', username: 'rileymorgan', initials: 'RM', color: '#f97316', bio: 'Product manager. Turning ideas into reality.',                       followers: 3300, following: 320, posts: 55, followsMe: false },
  { id: 5, name: 'Sam Park',     username: 'sampark',     initials: 'SP', color: '#3b82f6', bio: 'Data scientist. I talk to machines all day.',                        followers: 2200, following: 190, posts: 44, followsMe: true  },
  { id: 6, name: 'Nour Khalil',  username: 'nourkhalil',  initials: 'NK', color: '#10b981', bio: 'Illustrator & motion designer. Crafting visual stories.',            followers: 5800, following: 430, posts: 120, followsMe: false },
];

const ME = {
  id: 0, name: 'Alex Jordan', username: 'alexjordan', initials: 'AJ',
  color: '#f43f5e', bio: 'Digital creator & developer. Building things at the intersection of design and code. ✨',
  location: 'San Francisco, CA', website: 'alexjordan.dev', joined: 'March 2022',
  followers: 2400, following: 318, posts: 47,
};

const TAGS = [
  { tag: '#webdev',     posts: 24100, change: '+12%', up: true  },
  { tag: '#uidesign',   posts: 18700, change: '+8%',  up: true  },
  { tag: '#ai',         posts: 52300, change: '+31%', up: true  },
  { tag: '#javascript', posts: 41200, change: '+5%',  up: true  },
  { tag: '#creative',   posts: 9800,  change: '+18%', up: true  },
];

const POST_SEEDS = [
  { userId: 1, text: 'Just shipped a massive redesign after 3 weeks of iteration. Sometimes you need to throw away your first draft to find the real answer. 🎨', tags: ['#uidesign', '#process'], likes: 214, savedInit: false },
  { userId: 2, text: 'Hot take: the best code review is one that makes the PR author feel empowered, not embarrassed. Feedback is a gift — wrap it nicely. 🎁',   tags: ['#dev', '#culture'],         likes: 387, savedInit: false },
  { userId: 3, text: 'Made a procedural terrain generator with just 120 lines of JS + Canvas. Noise functions are absolute magic. Demo link in bio! 🌋',          tags: ['#javascript', '#creative'], likes: 529, savedInit: true  },
  { userId: 0, text: 'Reading "A Philosophy of Software Design" for the second time. Hits different once you\'ve shipped a few real products. Highly recommended 📖', tags: ['#books', '#dev'],        likes: 94,  savedInit: false },
  { userId: 4, text: 'PRD vs spec sheet debate in our team today. Turns out we needed both and were calling them the same thing for 6 months 💀',                 tags: ['#product'],                 likes: 163, savedInit: false },
  { userId: 5, text: 'Fine-tuned a model on 3 years of GitHub issues. Now it predicts which bugs will be reopened with 81% accuracy. Thread incoming 🧵',         tags: ['#ai', '#ml'],               likes: 711, savedInit: true  },
  { userId: 6, text: 'Posted my first Dribbble shot in 2 years. Scary hitting publish but the community response has been incredible. Thank you all! 💜',          tags: ['#design', '#creative'],     likes: 432, savedInit: false },
  { userId: 1, text: 'Reminder that "done" beats "perfect" — every time. Ship it, learn, iterate. The loop is the product. ⚡',                                   tags: ['#mindset', '#product'],     likes: 288, savedInit: false },
];

const COMMENT_POOL = [
  { userId: 1, text: 'This is exactly what I needed to read today. Thank you!' },
  { userId: 2, text: 'Totally agree, shipped something imperfect last week and learned more than any planning session.' },
  { userId: 3, text: 'The demo looks incredible! What noise algorithm did you use?' },
  { userId: 4, text: 'Would love to see the before/after on the redesign. DMing you!' },
  { userId: 5, text: 'Great point. I try to frame feedback as questions not directives.' },
  { userId: 6, text: 'Love this perspective. Sharing with my team!' },
  { userId: 0, text: 'So relatable 😭 needed this' },
];

const TIMESTAMPS = ['just now','2m ago','14m ago','1h ago','3h ago','5h ago','8h ago','1d ago','2d ago'];

const NOTIFICATION_SEEDS = [
  { type: 'like',    userId: 1, text: 'liked your post about software design',         time: '2m',  unread: true  },
  { type: 'comment', userId: 2, text: 'commented: "Totally agree, shipped something…"', time: '14m', unread: true  },
  { type: 'follow',  userId: 3, text: 'started following you',                          time: '1h',  unread: true  },
  { type: 'like',    userId: 5, text: 'liked your post about procedural terrain',       time: '3h',  unread: false },
  { type: 'comment', userId: 4, text: 'commented: "Would love to see the before/after"',time: '5h',  unread: false },
  { type: 'follow',  userId: 6, text: 'started following you',                          time: '1d',  unread: false },
  { type: 'like',    userId: 1, text: 'liked your post about iteration',                time: '2d',  unread: false },
];

const MESSAGE_SEEDS = [
  { userId: 1, last: 'Can you share the Figma link?',   time: '2m',  unread: 2, online: true  },
  { userId: 3, last: 'Loved that post btw! 🔥',          time: '1h',  unread: 0, online: true  },
  { userId: 5, last: 'What model did you use?',          time: '3h',  unread: 1, online: false },
  { userId: 2, last: "Let's sync tomorrow?",             time: '1d',  unread: 0, online: false },
  { userId: 6, last: 'Thanks for the follow back! ✨',   time: '2d',  unread: 0, online: true  },
];

// ── Reactive state ────────────────────────────────────────────────────────────
const state = {
  posts: [],
  following: new Set([1, 3, 5]),
  liked: new Set(),
  saved: new Set(),
  notifications: [],
  currentCommentPostId: null,
  currentModalUserId: null,
  theme: localStorage.getItem('pulse-theme') || 'dark',
};

// ── Bootstrap posts from seeds ─────────────────────────────────────────────
function buildPosts() {
  state.posts = POST_SEEDS.map((seed, i) => ({
    id: i + 1,
    userId: seed.userId,
    text: seed.text,
    tags: seed.tags,
    likes: seed.likes,
    comments: buildComments(i),
    timestamp: TIMESTAMPS[(i + 1) % TIMESTAMPS.length],
    image: null,
    saved: seed.savedInit,
  }));
  state.posts.forEach(p => { if (p.saved) state.saved.add(p.id); });
  state.notifications = NOTIFICATION_SEEDS.map((n, i) => ({ ...n, id: i + 1 }));
}

function buildComments(seed) {
  const count = (seed % 3) + 1;
  return COMMENT_POOL.slice(0, count).map((c, i) => ({
    id: i + 1,
    userId: c.userId,
    text: c.text,
    likes: Math.floor(Math.random() * 18),
  }));
}

// ── Helpers ────────────────────────────────────────────────────────────────
function getUser(id) {
  if (id === 0) return ME;
  return USERS.find(u => u.id === id) || USERS[0];
}

function fmtNum(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1_000)     return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(n);
}