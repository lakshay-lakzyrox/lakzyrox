const SUPABASE_URL = 'https://pqbojfiuotsmzbcwngbb.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_hKIlQk-ufjTDpbyyp5lTlQ_T71XpOK4';
const supabaseClient = (window.supabase && SUPABASE_PUBLISHABLE_KEY !== 'PASTE_YOUR_SUPABASE_PUBLISHABLE_KEY_HERE')
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
  : null;

const root = document.documentElement;
const body = document.body;
const progressBar = document.querySelector('.progress-bar');
const loadingScreen = document.querySelector('.loading-screen');
const themeToggle = document.querySelector('[data-theme-toggle]');
const audioToggle = document.querySelector('[data-audio-toggle]');
const mobileToggle = document.querySelector('[data-mobile-toggle]');
const mobileNav = document.querySelector('[data-mobile-nav]');
const revealItems = document.querySelectorAll('.reveal');
const aiToggle = document.querySelector('[data-ai-toggle]');
const aiPanel = document.querySelector('[data-ai-panel]');
const aiMessages = document.querySelector('[data-ai-messages]');
const aiInput = document.querySelector('[data-ai-input]');
const aiSend = document.querySelector('[data-ai-send]');
const videoGrid = document.getElementById('video-grid');
const videoFilter = document.getElementById('video-filter');
const modal = document.getElementById('video-modal');
const adminGate = document.getElementById('admin-gate');
const adminContent = document.getElementById('admin-content');
const adminEmailInput = document.getElementById('admin-email');
const adminPasswordInput = document.getElementById('admin-password');
const unlockAdminButton = document.getElementById('unlock-admin');
const adminGateError = document.getElementById('admin-gate-error');
const adminFields = Array.from(document.querySelectorAll('#admin-content input, #admin-content textarea, #admin-content select, #admin-content button'));
const adminLogoutButton = document.getElementById('admin-logout');
const modalThumbnail = document.getElementById('modal-thumbnail');
const modalCategory = document.getElementById('modal-category');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalCaption = document.getElementById('modal-caption');
const modalHashtags = document.getElementById('modal-hashtags');
const modalLink = document.getElementById('modal-link');
const blogGrid = document.getElementById('blog-grid');
const communityGrid = document.getElementById('community-grid');
const contactForm = document.getElementById('contact-form');
const heroInstagram = document.getElementById('hero-instagram');
const heroYoutube = document.getElementById('hero-youtube');
const heroFacebook = document.getElementById('hero-facebook');
const galleryPageType = document.body.getAttribute('data-gallery-page');
const defaultVideo = {
  title: 'Neon Motion Reel',
  category: '4K Edit',
  thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80',
  short: 'Visual FX • Vlog • Cinematic',
  description: 'A cinematic short-form edit with bold red lighting, polished pacing, and a premium creator-first visual language.',
  caption: 'Luxury motion design for modern creators.',
  hashtags: '#edit #motion #creator',
  link: 'https://www.youtube.com/channel/UCCiS4pmkPA0A6lumgo6wHoQ',
  platforms: ['Instagram', 'YouTube', 'Facebook'],
  isPublic: true
};
const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const defaultContent = {
  instagram: 'https://www.instagram.com/lak.zyrox',
  youtube: 'https://www.youtube.com/channel/UCCiS4pmkPA0A6lumgo6wHoQ',
  facebook: 'https://www.facebook.com/lakzyrox',
  focus: 'Motion • Editing • Brand',
  otherLink: { title: '', url: '' },
  videos: [{ ...defaultVideo, id: createId() }],
  blogs: [{ id: createId(), title: 'Today my target', content: 'Create with focus, keep the energy sharp, and build premium visuals that feel intentional.', isPublic: true }],
  community: [
    { id: createId(), title: 'Instagram', url: 'https://www.instagram.com/lak.zyrox', image: 'https://cdn-icons-png.flaticon.com/512/174/174855.png', isPublic: true },
    { id: createId(), title: 'YouTube', url: 'https://www.youtube.com/channel/UCCiS4pmkPA0A6lumgo6wHoQ', image: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png', isPublic: true },
    { id: createId(), title: 'Facebook', url: 'https://www.facebook.com/lakzyrox', image: 'https://cdn-icons-png.flaticon.com/512/5968/5968764.png', isPublic: true }
  ],
  gallery: {
    edits: [{ id: createId(), title: 'Edit Reel 01', description: 'A premium edit with cinematic pacing and sharp motion.', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80', link: 'https://www.youtube.com/channel/UCCiS4pmkPA0A6lumgo6wHoQ', isPublic: true }],
    pics: [{ id: createId(), title: 'Mood Frame 01', description: 'Visual wallpaper and creator moodboard.', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80', link: 'https://www.instagram.com/lak.zyrox', isPublic: true }],
    stories: [{ id: createId(), title: 'Story 01', description: 'Short story content for Instagram and reels.', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80', link: 'https://www.instagram.com/lak.zyrox', isPublic: true }]
  }
};
let audioEnabled = false;
let audioContext = null;
let currentVideoFilter = 'all';
const adminSelection = {};

const setProgress = (value) => {
  if (progressBar) progressBar.style.transform = `scaleX(${value})`;
};

const revealOnScroll = () => {
  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 70) item.classList.add('is-visible');
  });
};

const initTheme = () => {
  const savedTheme = localStorage.getItem('lakzyrox-theme') || 'dark';
  body.setAttribute('data-theme', savedTheme);
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', savedTheme === 'dark' ? 'true' : 'false');
    themeToggle.innerHTML = savedTheme === 'dark' ? '☀︎' : '☾';
  }
};

const toggleTheme = () => {
  const next = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', next);
  localStorage.setItem('lakzyrox-theme', next);
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
    themeToggle.innerHTML = next === 'dark' ? '☀︎' : '☾';
  }
};

const mapDbVideoToApp = (row) => ({
  id: row.id,
  title: row.title || 'Untitled video',
  category: row.category || 'Video',
  thumbnail: row.thumbnail_url || '',
  link: row.video_url || '',
  short: row.short || '',
  description: row.description || '',
  caption: row.caption || '',
  hashtags: row.hashtags || '',
  platforms: row.platform ? String(row.platform).split(',').map((v) => v.trim()).filter(Boolean) : [],
  isPublic: row.published !== false
});

const mapAppVideoToDb = (item) => ({
  title: item.title || '',
  thumbnail_url: item.thumbnail || '',
  video_url: item.link || '',
  platform: Array.isArray(item.platforms) ? item.platforms.join(', ') : (item.platforms || ''),
  category: item.category || '',
  short: item.short || '',
  description: item.description || '',
  caption: item.caption || '',
  hashtags: item.hashtags || '',
  published: item.isPublic !== false,
  sort_order: Number(item.sort_order || 0)
});

const loadVideosFromSupabase = async () => {
  if (!supabaseClient) return false;
  const { data, error } = await supabaseClient.from('video').select('*').order('sort_order', { ascending: true }).order('created_at', { ascending: false });
  if (error) { console.error('Supabase video load failed:', error); return false; }
  const content = getStoredContent();
  content.videos = (data || []).map(mapDbVideoToApp);
  saveContent(content);
  renderContent();
  return true;
};

const saveVideoToSupabase = async (item) => {
  if (!supabaseClient) throw new Error('Supabase is not configured. Add your publishable key to script.js.');
  const payload = mapAppVideoToDb(item);
  const id = item.id && Number.isInteger(Number(item.id)) ? Number(item.id) : null;
  const result = id
    ? await supabaseClient.from('video').update(payload).eq('id', id).select().single()
    : await supabaseClient.from('video').insert(payload).select().single();
  if (result.error) throw result.error;
  return mapDbVideoToApp(result.data);
};

const deleteVideoFromSupabase = async (id) => {
  if (!supabaseClient) throw new Error('Supabase is not configured.');
  const { error } = await supabaseClient.from('video').delete().eq('id', Number(id));
  if (error) throw error;
};

const getStoredContent = () => {
  const stored = localStorage.getItem('lakzyrox-content');
  if (!stored) {
    return { ...defaultContent, gallery: { ...defaultContent.gallery } };
  }
  try {
    const parsed = JSON.parse(stored);
    return {
      ...defaultContent,
      ...parsed,
      videos: parsed.videos || defaultContent.videos,
      blogs: parsed.blogs || defaultContent.blogs,
      community: parsed.community || defaultContent.community,
      gallery: { ...defaultContent.gallery, ...(parsed.gallery || {}) }
    };
  } catch (error) {
    return { ...defaultContent, gallery: { ...defaultContent.gallery } };
  }
};

const saveContent = (content) => {
  localStorage.setItem('lakzyrox-content', JSON.stringify(content));
};

const getVisibleItems = (items) => (items || []).filter((item) => item.isPublic !== false);

const renderVideoFilters = () => {
  if (!videoFilter) return;
  videoFilter.innerHTML = '';
  const filters = ['all', 'Instagram', 'YouTube', 'Facebook'];
  filters.forEach((filter) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `pill-btn${currentVideoFilter === filter ? ' btn--primary' : ''}`;
    button.textContent = filter === 'all' ? 'All videos' : filter;
    button.addEventListener('click', () => {
      currentVideoFilter = filter;
      renderContent();
    });
    videoFilter.appendChild(button);
  });
};

const renderContent = () => {
  const content = getStoredContent();
  const socialInstagram = document.querySelector('[data-social-link="instagram"]');
  const socialYoutube = document.querySelector('[data-social-link="youtube"]');
  const youtubeLink = document.getElementById('youtube-link');
  const heroSocialList = document.querySelector('.hero__social-list');

  if (heroInstagram) heroInstagram.href = content.instagram;
  if (heroYoutube) heroYoutube.href = content.youtube;
  if (heroFacebook) heroFacebook.href = content.facebook;
  if (socialInstagram) socialInstagram.href = content.instagram;
  if (socialYoutube) socialYoutube.href = content.youtube;
  if (youtubeLink) youtubeLink.href = content.youtube;

  if (videoGrid) {
    const publicVideos = getVisibleItems(content.videos || []);
    const filteredVideos = publicVideos.filter((video) => {
      if (currentVideoFilter === 'all') return true;
      const platforms = (video.platforms || []).map((value) => value.toLowerCase());
      return platforms.includes(currentVideoFilter.toLowerCase());
    });
    videoGrid.innerHTML = '';
    if (filteredVideos.length === 0) {
      videoGrid.innerHTML = '<div class="card"><p>No public videos yet.</p></div>';
    } else {
      filteredVideos.forEach((video) => {
        const card = document.createElement('article');
        card.className = 'card video-card';
        card.style.backgroundImage = `url('${video.thumbnail}')`;
        const platformText = (video.platforms || []).length > 1 ? 'All platforms' : (video.platforms || [])[0] || 'All';
        card.innerHTML = `
          <div class="tag">${video.category}</div>
          <h3 style="margin:0.6rem 0 0.2rem;">${video.title}</h3>
          <p style="margin:0; color:#f2f2f2;">${video.short}</p>
          <div style="margin-top:0.7rem; display:flex; gap:0.45rem; flex-wrap:wrap;"><span class="tag">${platformText}</span></div>
        `;
        card.addEventListener('click', () => openVideoModal(video));
        videoGrid.appendChild(card);
      });
    }
  }

  renderVideoFilters();

  if (heroSocialList) {
    const existingCustomLink = heroSocialList.querySelector('[data-custom-link]');
    if (content.otherLink?.title && content.otherLink?.url) {
      if (!existingCustomLink) {
        const customLink = document.createElement('a');
        customLink.className = 'hero__social-item';
        customLink.setAttribute('data-custom-link', 'true');
        customLink.href = content.otherLink.url;
        customLink.target = '_blank';
        customLink.rel = 'noreferrer';
        customLink.textContent = content.otherLink.title;
        heroSocialList.appendChild(customLink);
      } else {
        existingCustomLink.href = content.otherLink.url;
        existingCustomLink.textContent = content.otherLink.title;
      }
    } else if (existingCustomLink) {
      existingCustomLink.remove();
    }
  }

  if (blogGrid) {
    blogGrid.innerHTML = '';
    const visibleBlogs = getVisibleItems(content.blogs || []);
    const post = visibleBlogs[0] || { title: content.blog?.title || 'Blog', content: content.blog?.content || 'No content yet.' };
    const article = document.createElement('article');
    article.className = 'card';
    article.innerHTML = `<h3 style="margin-top:0;">${post.title}</h3><p style="color:var(--muted);">${post.content}</p>`;
    blogGrid.appendChild(article);
  }

  if (communityGrid) {
    communityGrid.innerHTML = '';
    getVisibleItems(content.community || []).forEach((item) => {
      const card = document.createElement('a');
      card.className = 'card community-card';
      card.href = item.url;
      card.target = '_blank';
      card.rel = 'noreferrer';
      card.innerHTML = `<img src="${item.image}" alt="${item.title}" /><strong>${item.title}</strong>`;
      communityGrid.appendChild(card);
    });
  }
};

const renderGalleryPage = (type) => {
  const container = document.getElementById('gallery-page-grid');
  if (!container) return;
  const content = getStoredContent();
  const items = getVisibleItems((content.gallery && content.gallery[type]) || []);
  container.innerHTML = '';
  if (items.length === 0) {
    container.innerHTML = '<div class="card"><p>No items yet.</p></div>';
    return;
  }
  items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" style="border-radius: 16px; height: 220px; object-fit: cover; margin-bottom: 0.8rem;" />
      <h3 style="margin: 0 0 0.35rem;">${item.title}</h3>
      <p style="color: var(--muted); margin: 0 0 0.7rem;">${item.description}</p>
      <a class="btn btn--primary" href="${item.link}" target="_blank" rel="noreferrer">Open link</a>
    `;
    container.appendChild(card);
  });
};

const openVideoModal = (video) => {
  if (!modal) return;
  modalThumbnail.src = video.thumbnail;
  modalThumbnail.alt = video.title;
  modalCategory.textContent = video.category;
  modalTitle.textContent = video.title;
  modalDescription.textContent = video.description;
  modalCaption.textContent = video.caption;
  modalHashtags.textContent = video.hashtags;
  modalLink.href = video.link;
  modal.hidden = false;
};

const closeVideoModal = () => {
  if (modal) modal.hidden = true;
};

const ensureAudio = () => {
  if (!audioEnabled) return;
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') audioContext.resume();
};

const playTone = (frequency, duration, type = 'sine', volume = 0.03) => {
  if (!audioEnabled) return;
  ensureAudio();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
};

const toggleAudio = () => {
  audioEnabled = !audioEnabled;
  if (audioToggle) {
    audioToggle.setAttribute('aria-pressed', String(audioEnabled));
    audioToggle.textContent = audioEnabled ? '🔊' : '🔈';
  }
  if (audioEnabled) {
    ensureAudio();
    playTone(880, 0.12, 'sine', 0.025);
  }
};

const handleContactSubmit = async (event) => {
  event.preventDefault();
  if (!contactForm) return;
  const formData = new FormData(contactForm);
  const payload = {
    name: formData.get('name')?.toString().trim() || '',
    gmail: formData.get('gmail')?.toString().trim() || '',
    projectType: formData.get('projectType')?.toString().trim() || '',
    message: formData.get('message')?.toString().trim() || ''
  };

  try {
    await fetch('https://script.google.com/macros/s/AKfycbz-yE-O7lEx8BWUz7cnmbJrl3cJmo9qioS-BBVcEecVykZjpodg202KavTmVo2NeTMV/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    contactForm.reset();
    const successMessage = document.createElement('p');
    successMessage.textContent = 'Message sent successfully.';
    successMessage.style.color = '#7ee787';
    contactForm.appendChild(successMessage);
  } catch (error) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Message could not be sent right now.';
    errorMessage.style.color = '#ff8c8c';
    contactForm.appendChild(errorMessage);
  }
};

const addMessage = (text, sender = 'bot') => {
  if (!aiMessages) return;
  const message = document.createElement('div');
  message.className = `ai-message ai-message--${sender}`;
  message.textContent = text;
  aiMessages.appendChild(message);
  aiMessages.scrollTop = aiMessages.scrollHeight;
};

const respondToAi = (input) => {
  const value = input.trim().toLowerCase();
  let reply = 'I can help with editing style, brand collaborations, and the latest creator direction.';
  if (value.includes('project') || value.includes('work')) {
    reply = 'My work focuses on cinematic edits, premium brand campaigns, and modern motion-led storytelling.';
  } else if (value.includes('video') || value.includes('youtube')) {
    reply = 'The latest video direction blends strong hooks, polished pacing, and a clean premium visual identity.';
  } else if (value.includes('insta') || value.includes('instagram')) {
    reply = 'Instagram content is shaped around short-form energy, quick transitions, and high-impact visual branding.';
  } else if (value.includes('brand') || value.includes('collab')) {
    reply = 'Brand collaborations are built around trust, sharp creative direction, and content that feels unmistakably premium.';
  }
  addMessage(reply, 'bot');
};

const toggleAiPanel = () => {
  if (!aiPanel || !aiToggle) return;
  const isOpen = aiPanel.hidden;
  aiPanel.hidden = !isOpen;
  aiToggle.setAttribute('aria-expanded', String(isOpen));
  if (isOpen) {
    playTone(660, 0.1, 'triangle', 0.022);
  }
};

const setAdminAccess = (isUnlocked) => {
  if (adminGate) adminGate.hidden = isUnlocked;
  if (adminContent) adminContent.hidden = !isUnlocked;
  if (adminGateError) adminGateError.hidden = true;
  adminFields.forEach((field) => { field.disabled = !isUnlocked; });
};

const setAdminError = (message) => {
  if (adminGateError) {
    adminGateError.hidden = false;
    adminGateError.textContent = message;
  }
};

const unlockAdmin = async () => {
  const email = (adminEmailInput?.value || '').trim();
  const password = adminPasswordInput?.value || '';
  if (!supabaseClient) return setAdminError('Add your Supabase publishable key to script.js first.');
  if (!email || !password) return setAdminError('Enter your admin email and password.');
  if (unlockAdminButton) unlockAdminButton.disabled = true;
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (unlockAdminButton) unlockAdminButton.disabled = false;
  if (error) return setAdminError(error.message || 'Login failed.');
  if (!data.session) return setAdminError('Login did not create a session.');
  setAdminAccess(true);
  await loadVideosFromSupabase();
  setAdminPanel('videos');
};

const logoutAdmin = async () => {
  if (supabaseClient) await supabaseClient.auth.signOut();
  setAdminAccess(false);
  if (adminPasswordInput) adminPasswordInput.value = '';
};

const adminSections = {
  brand: { title: 'Brand' },
  videos: {
    title: 'Videos',
    listId: 'admin-videos-list',
    formTitleId: 'admin-video-form-title',
    listKey: 'videos',
    fields: [
      { id: 'admin-video-title', key: 'title' },
      { id: 'admin-video-category', key: 'category' },
      { id: 'admin-video-thumbnail', key: 'thumbnail' },
      { id: 'admin-video-link', key: 'link' },
      { id: 'admin-video-short', key: 'short' },
      { id: 'admin-video-description', key: 'description' },
      { id: 'admin-video-caption', key: 'caption' },
      { id: 'admin-video-hashtags', key: 'hashtags' },
      { id: 'admin-video-platforms', key: 'platforms' }
    ]
  },
  community: {
    title: 'Community',
    listId: 'admin-community-list',
    formTitleId: 'admin-community-form-title',
    listKey: 'community',
    fields: [
      { id: 'admin-community-title', key: 'title' },
      { id: 'admin-community-url', key: 'url' },
      { id: 'admin-community-image', key: 'image' }
    ]
  },
  blogs: {
    title: 'Blog',
    listId: 'admin-blog-list',
    formTitleId: 'admin-blog-form-title',
    listKey: 'blogs',
    fields: [
      { id: 'admin-blog-title-field', key: 'title' },
      { id: 'admin-blog-content-field', key: 'content' }
    ]
  },
  'gallery-edits': {
    title: 'Gallery Edits',
    listId: 'admin-edit-list',
    formTitleId: 'admin-edit-form-title',
    listKey: 'gallery-edits',
    fields: [
      { id: 'admin-edit-title', key: 'title' },
      { id: 'admin-edit-description', key: 'description' },
      { id: 'admin-edit-image', key: 'image' },
      { id: 'admin-edit-link', key: 'link' }
    ]
  },
  'gallery-pics': {
    title: 'Gallery Pics',
    listId: 'admin-pic-list',
    formTitleId: 'admin-pic-form-title',
    listKey: 'gallery-pics',
    fields: [
      { id: 'admin-pic-title', key: 'title' },
      { id: 'admin-pic-description', key: 'description' },
      { id: 'admin-pic-image', key: 'image' },
      { id: 'admin-pic-link', key: 'link' }
    ]
  },
  'gallery-stories': {
    title: 'Gallery Stories',
    listId: 'admin-story-list',
    formTitleId: 'admin-story-form-title',
    listKey: 'gallery-stories',
    fields: [
      { id: 'admin-story-title', key: 'title' },
      { id: 'admin-story-description', key: 'description' },
      { id: 'admin-story-image', key: 'image' },
      { id: 'admin-story-link', key: 'link' }
    ]
  }
};

const getSectionItems = (sectionName, content) => {
  switch (sectionName) {
    case 'community':
      return content.community || [];
    case 'blogs':
      return content.blogs || [];
    case 'gallery-edits':
      return (content.gallery && content.gallery.edits) || [];
    case 'gallery-pics':
      return (content.gallery && content.gallery.pics) || [];
    case 'gallery-stories':
      return (content.gallery && content.gallery.stories) || [];
    case 'videos':
    default:
      return content.videos || [];
  }
};

const setSectionItems = (sectionName, content, items) => {
  switch (sectionName) {
    case 'community':
      content.community = items;
      break;
    case 'blogs':
      content.blogs = items;
      break;
    case 'gallery-edits':
      content.gallery.edits = items;
      break;
    case 'gallery-pics':
      content.gallery.pics = items;
      break;
    case 'gallery-stories':
      content.gallery.stories = items;
      break;
    case 'videos':
    default:
      content.videos = items;
      break;
  }
};

const getEmptyItem = (sectionName) => {
  switch (sectionName) {
    case 'community':
      return { id: createId(), title: 'New community link', url: '', image: '', isPublic: true };
    case 'blogs':
      return { id: createId(), title: 'New blog post', content: '', isPublic: true };
    case 'gallery-edits':
      return { id: createId(), title: 'New edit', description: '', image: '', link: '', isPublic: true };
    case 'gallery-pics':
      return { id: createId(), title: 'New photo', description: '', image: '', link: '', isPublic: true };
    case 'gallery-stories':
      return { id: createId(), title: 'New story', description: '', image: '', link: '', isPublic: true };
    case 'videos':
    default:
      return { id: createId(), title: 'New video', category: 'Edit', thumbnail: '', short: '', description: '', caption: '', hashtags: '', link: '', platforms: ['Instagram'], isPublic: true };
  }
};

const populateAdminForm = (sectionName, item) => {
  const config = adminSections[sectionName];
  if (!config) return;
  const titleLabel = document.getElementById(config.formTitleId);
  if (titleLabel) {
    titleLabel.textContent = item && item.title ? `Editing ${item.title}` : `New ${config.title}`;
  }
  config.fields.forEach((field) => {
    const input = document.getElementById(field.id);
    if (!input) return;
    let value = item[field.key] || '';
    if (Array.isArray(value)) value = value.join(', ');
    input.value = value;
  });
};

const renderAdminSection = (sectionName) => {
  const config = adminSections[sectionName];
  if (!config || !config.listId) return;
  const list = document.getElementById(config.listId);
  if (!list) return;
  const content = getStoredContent();
  const items = getSectionItems(sectionName, content);
  list.innerHTML = '';
  if (!items.length) { list.innerHTML = '<p style="color:var(--muted);">No items yet.</p>'; return; }
  items.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'list-item';
    row.innerHTML = `<div><strong>${item.title || 'Untitled'}</strong><p style="margin:0.25rem 0 0;color:var(--muted);">${item.content || item.description || item.url || item.link || ''}</p></div><div style="display:flex;gap:.45rem;flex-wrap:wrap;"><button class="pill-btn" type="button" data-admin-edit="${sectionName}" data-id="${item.id}">Edit</button><button class="pill-btn" type="button" data-admin-private="${sectionName}" data-id="${item.id}">${item.isPublic === false ? 'Public' : 'Private'}</button><button class="pill-btn" type="button" data-admin-delete="${sectionName}" data-id="${item.id}">Delete</button></div>`;
    list.appendChild(row);
  });
  list.querySelectorAll('[data-admin-edit]').forEach((button) => button.addEventListener('click', () => {
    const selected = items.find((item) => String(item.id) === String(button.dataset.id));
    if (selected) { adminSelection[sectionName] = selected.id; populateAdminForm(sectionName, selected); }
  }));
  list.querySelectorAll('[data-admin-private]').forEach((button) => button.addEventListener('click', async () => {
    const selected = items.find((item) => String(item.id) === String(button.dataset.id));
    if (!selected) return;
    const next = { ...selected, isPublic: selected.isPublic === false };
    try {
      if (sectionName === 'videos') { await saveVideoToSupabase(next); await loadVideosFromSupabase(); renderAdminSection(sectionName); }
      else { const copy=getStoredContent(); setSectionItems(sectionName,copy,items.map((e)=>String(e.id)===String(selected.id)?next:e)); saveContent(copy); renderContent(); renderAdminSection(sectionName); }
    } catch (error) { setAdminError(error.message || 'Could not update this item.'); }
  }));
  list.querySelectorAll('[data-admin-delete]').forEach((button) => button.addEventListener('click', async () => {
    const selected = items.find((item) => String(item.id) === String(button.dataset.id));
    if (!selected) return;
    try {
      if (sectionName === 'videos') { await deleteVideoFromSupabase(selected.id); await loadVideosFromSupabase(); renderAdminSection(sectionName); }
      else { const copy=getStoredContent(); setSectionItems(sectionName,copy,items.filter((e)=>String(e.id)!==String(selected.id))); saveContent(copy); renderContent(); renderAdminSection(sectionName); }
      if (String(adminSelection[sectionName]) === String(selected.id)) delete adminSelection[sectionName];
    } catch (error) { setAdminError(error.message || 'Could not delete this item.'); }
  }));
};

const saveAdminSection = async (sectionName) => {
  const config = adminSections[sectionName];
  if (!config) return;
  const content = getStoredContent();
  const items = getSectionItems(sectionName, content);
  const selectedId = adminSelection[sectionName];
  const existing = items.find((item) => String(item.id) === String(selectedId)) || null;
  const nextItem = existing ? { ...existing } : getEmptyItem(sectionName);
  config.fields.forEach((field) => {
    const input = document.getElementById(field.id);
    if (!input) return;
    const rawValue = input.value.trim();
    nextItem[field.key] = field.key === 'platforms' ? (rawValue ? rawValue.split(',').map((e)=>e.trim()).filter(Boolean) : ['Instagram']) : rawValue;
  });
  try {
    if (sectionName === 'videos') {
      const saved = await saveVideoToSupabase(nextItem);
      content.videos = existing ? items.map((item)=>String(item.id)===String(selectedId)?saved:item) : [saved,...items];
      saveContent(content); renderContent(); renderAdminSection(sectionName); adminSelection[sectionName]=saved.id; populateAdminForm(sectionName,saved); return;
    }
    if (!existing) { nextItem.id=createId(); items.push(nextItem); }
    else items[items.findIndex((item)=>String(item.id)===String(selectedId))]=nextItem;
    setSectionItems(sectionName,content,items); saveContent(content); renderContent(); renderAdminSection(sectionName); adminSelection[sectionName]=nextItem.id; populateAdminForm(sectionName,nextItem);
  } catch(error) { setAdminError(error.message || 'Could not save this item.'); }
};

const resetAdminSection = (sectionName) => {
  const config = adminSections[sectionName];
  if (!config) return;
  delete adminSelection[sectionName];
  populateAdminForm(sectionName, getEmptyItem(sectionName));
};

const setAdminPanel = (sectionName) => {
  Object.keys(adminSections).forEach((key) => {
    const panel = document.getElementById(`admin-panel-${key}`);
    const button = document.querySelector(`[data-admin-tab="${key}"]`);
    if (panel) panel.hidden = key !== sectionName;
    if (button) button.classList.toggle('btn--primary', key === sectionName);
  });
  if (sectionName === 'brand') {
    const content = getStoredContent();
    document.getElementById('admin-instagram').value = content.instagram;
    document.getElementById('admin-youtube').value = content.youtube;
    document.getElementById('admin-facebook').value = content.facebook;
    document.getElementById('admin-focus').value = content.focus;
    document.getElementById('admin-other-link-title').value = content.otherLink.title;
    document.getElementById('admin-other-link-url').value = content.otherLink.url;
  } else {
    renderAdminSection(sectionName);
    populateAdminForm(sectionName, getEmptyItem(sectionName));
  }
};

const handleBrandSave = () => {
  const content = getStoredContent();
  content.instagram = document.getElementById('admin-instagram')?.value || defaultContent.instagram;
  content.youtube = document.getElementById('admin-youtube')?.value || defaultContent.youtube;
  content.facebook = document.getElementById('admin-facebook')?.value || defaultContent.facebook;
  content.focus = document.getElementById('admin-focus')?.value || defaultContent.focus;
  content.otherLink = {
    title: document.getElementById('admin-other-link-title')?.value || '',
    url: document.getElementById('admin-other-link-url')?.value || ''
  };
  saveContent(content);
  renderContent();
};

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (audioToggle) audioToggle.addEventListener('click', toggleAudio);
if (mobileToggle) mobileToggle.addEventListener('click', () => mobileNav.classList.toggle('is-open'));
if (aiToggle) aiToggle.addEventListener('click', toggleAiPanel);
if (document.getElementById('save-brand')) document.getElementById('save-brand').addEventListener('click', handleBrandSave);
if (unlockAdminButton) unlockAdminButton.addEventListener('click', unlockAdmin);
if (adminLogoutButton) adminLogoutButton.addEventListener('click', logoutAdmin);
if (adminPasswordInput) {
  adminPasswordInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') unlockAdmin();
  });
}
if (modal) {
  document.querySelectorAll('[data-close-modal]').forEach((button) => button.addEventListener('click', closeVideoModal));
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeVideoModal();
  });
}
if (contactForm) contactForm.addEventListener('submit', handleContactSubmit);
if (aiSend && aiInput) {
  aiSend.addEventListener('click', () => {
    const value = aiInput.value.trim();
    if (!value) return;
    addMessage(value, 'user');
    aiInput.value = '';
    playTone(540, 0.12, 'square', 0.018);
    window.setTimeout(() => respondToAi(value), 700);
  });
  aiInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      aiSend.click();
    }
  });
}
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
  setProgress(progress);
  revealOnScroll();
});
window.addEventListener('load', () => {
  setProgress(1);
  body.classList.add('loaded');
  setTimeout(() => {
    if (loadingScreen) loadingScreen.remove();
  }, 700);
  revealOnScroll();
  initTheme();
  renderContent();
  if (galleryPageType) renderGalleryPage(galleryPageType);
});
window.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();
  initTheme();
  renderContent();
  if (galleryPageType) renderGalleryPage(galleryPageType);

  setAdminAccess(false);
  if (supabaseClient) {
    supabaseClient.auth.getSession().then(async ({ data }) => {
      if (data.session) { setAdminAccess(true); await loadVideosFromSupabase(); }
    });
  }

  document.querySelectorAll('[data-admin-tab]').forEach((button) => {
    button.addEventListener('click', () => setAdminPanel(button.getAttribute('data-admin-tab')));
  });
  document.querySelectorAll('[data-admin-save]').forEach((button) => {
    button.addEventListener('click', () => saveAdminSection(button.getAttribute('data-admin-save')));
  });
  document.querySelectorAll('[data-admin-reset]').forEach((button) => {
    button.addEventListener('click', () => resetAdminSection(button.getAttribute('data-admin-reset')));
  });
  document.querySelectorAll('[data-admin-add]').forEach((button) => {
    button.addEventListener('click', () => {
      const sectionName = button.getAttribute('data-admin-add');
      resetAdminSection(sectionName);
      setAdminPanel(sectionName);
    });
  });
  if (document.getElementById('admin-instagram')) {
    const content = getStoredContent();
    document.getElementById('admin-instagram').value = content.instagram;
    document.getElementById('admin-youtube').value = content.youtube;
    document.getElementById('admin-facebook').value = content.facebook;
    document.getElementById('admin-focus').value = content.focus;
    document.getElementById('admin-other-link-title').value = content.otherLink.title;
    document.getElementById('admin-other-link-url').value = content.otherLink.url;
  }
  if (adminContent && !adminContent.hidden) setAdminPanel('videos');
  if (supabaseClient) loadVideosFromSupabase();
});
