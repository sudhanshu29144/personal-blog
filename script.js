// DOM elements
const postForm = document.getElementById('post-form');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const postIdInput = document.getElementById('post-id');
const postsContainer = document.getElementById('posts');

// Load posts from Local Storage
function loadPosts() {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  postsContainer.innerHTML = '';
  posts.forEach((post, index) => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.innerHTML = `
      <h3 class="post-title">${post.title}</h3>
      <p class="post-content">${post.content}</p>
      <div class="actions">
        <button onclick="editPost(${index})">✏️ Edit</button>
        <button onclick="deletePost(${index})">🗑️ Delete</button>
      </div>
    `;
    postsContainer.appendChild(postDiv);
  });
}

// Save or Update post
postForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const postId = postIdInput.value;

  if (!title || !content) return;

  let posts = JSON.parse(localStorage.getItem('posts')) || [];

  if (postId) {
    // Update
    posts[postId] = { title, content };
  } else {
    // Create
    posts.push({ title, content });
  }

  localStorage.setItem('posts', JSON.stringify(posts));
  postForm.reset();
  postIdInput.value = '';
  loadPosts();
});

// Edit post
function editPost(index) {
  const posts = JSON.parse(localStorage.getItem('posts'));
  const post = posts[index];
  titleInput.value = post.title;
  contentInput.value = post.content;
  postIdInput.value = index;
}

// Delete post
function deletePost(index) {
  let posts = JSON.parse(localStorage.getItem('posts'));
  posts.splice(index, 1);
  localStorage.setItem('posts', JSON.stringify(posts));
  loadPosts();
}

// Initial load
loadPosts();
