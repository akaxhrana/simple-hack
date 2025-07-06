import supabase from './supabase.js';

const logoutBtn = document.getElementById('logout-btn');
const submitPostBtn = document.getElementById('submit-post');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const postsDiv = document.getElementById('posts');
const authLink = document.getElementById('auth-link');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

const { data: userData } = await supabase.auth.getUser();
if (authLink && userData?.user) authLink.textContent = 'Logout';
if (authLink && userData?.user) authLink.onclick = async () => {
  await supabase.auth.signOut();
  window.location.reload();
};

if (submitPostBtn) {
  submitPostBtn.onclick = async () => {
    if (!userData?.user) {
      alert("You must be logged in to post.");
      return;
    }
    const title = titleInput?.value.trim();
    const content = contentInput?.value.trim();

    if (!title || !content) {
      alert("Please fill in both title and content.");
      return;
    }

    const { error } = await supabase.from('blogs').insert({
      title,
      content,
      author: userData.user.email,
    });

    if (error) {
      alert("Failed to post: " + error.message);
    } else {
      alert("Post published successfully!");
      window.location = 'index.html';
    }
  };
}

if (postsDiv) {
  const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
  postsDiv.classList.add('posts-grid');
  data?.forEach((post) => {
    const el = document.createElement('article');
    el.className = 'post-card';
    el.innerHTML = `
      <div class="post-meta">
        <time>${new Date(post.created_at).toDateString()}</time>
        <span>${post.author}</span>
      </div>
      <h3 class="post-title">${post.title}</h3>
      <p class="post-excerpt">${post.content}</p>
    `;
    postsDiv.appendChild(el);
  });
}
