// List of Tamil names in English letters
const tamilNames = [
    "Arun", "Prakash", "Karthik", "Murugan", "Siva",
    "Ramesh", "Suresh", "Vijay", "Raj", "Manoj",
    "Anitha", "Priya", "Lakshmi", "Kavya", "Saritha",
    "Malathi", "Sujatha", "Radhika", "Vani", "Sruthi",
    "Deepak", "Ganesh", "Harish", "Ishaan", "Jagan",
    "Kiran", "Lokesh", "Naveen", "Omkar", "Pavan",
    "Rahul", "Sanjay", "Tharun", "Uday", "Vinod",
    "Yogesh", "Abirami", "Bhavani", "Chitra", "Divya"
  ];
  
  // Function to fetch posts and comments
  async function fetchData() {
    try {
      // Fetch posts
      const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
      const posts = await postsResponse.json();
  
      // Fetch comments for all posts
      const postsWithComments = await Promise.all(
        posts.map(async (post, index) => {
          const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`);
          const comments = await commentsResponse.json();
          return { ...post, comments };
        })
      );
  
      // Assign Tamil names to posts (cycle through the list if necessary)
      postsWithComments.forEach((post, index) => {
        post.userName = tamilNames[index % tamilNames.length]; // Cycle through names
      });
  
      // Render all posts
      postsWithComments.forEach(post => renderPost(post));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  // Function to render a post and its comments
  function renderPost(post) {
    const postTemplate = document.getElementById('post-template');
    const postClone = postTemplate.content.cloneNode(true); // Clone the template content
    const mainContent = postClone.querySelector('.main-content1');
  
    // Append the cloned post to the posts-container
    const postsContainer = document.getElementById('posts-container');
    postsContainer.appendChild(mainContent);
  
    // Update user info
    const userPic = mainContent.querySelector('.user-pic');
    userPic.src = `https://picsum.photos/50?random=${post.id}`; // Random avatar
    userPic.alt = post.userName; // User name as alt text
  
    const userName = mainContent.querySelector('.head h3');
    userName.textContent = post.userName; // Set user name
  
    // Update post title and body
    const postTitle = mainContent.querySelector('.post-title');
    postTitle.textContent = post.title;
  
    const postBody = mainContent.querySelector('.post-body');
    postBody.textContent = post.body;
  
    // Handle Like button
    const likeButton = mainContent.querySelector('.like');
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('liked');
      likeButton.querySelector('i').classList.toggle('bi-hand-thumbs-up-fill'); // Solid thumb when liked
      likeButton.querySelector('i').classList.toggle('bi-hand-thumbs-up'); // Regular thumb when unliked
    });
  
    // Handle Comment button
    const commentButton = mainContent.querySelector('.comment');
    const commentsContainer = mainContent.querySelector('.comments-container');
    const commentCount = mainContent.querySelector('.comment-count'); // Get the comment count element
  
    // Update comment count
    commentCount.textContent = `${post.comments.length} Comments`; // Display the number of comments
  
    // Toggle comments visibility
    commentButton.addEventListener('click', () => {
      commentsContainer.classList.toggle('visible'); // Toggle comments visibility
    });
  
    // Handle Report button
    const reportButton = mainContent.querySelector('.report');
    reportButton.addEventListener('click', () => {
      alert('Post reported!'); // Simulate report action
    });
  
    // Render comments
    const commentsSection = mainContent.querySelector('.comments');
    commentsSection.innerHTML = ''; // Clear previous comments
  
    post.comments.forEach(comment => {
      const commentElement = document.createElement('div');
      commentElement.className = 'comment';
  
      const commentUser = document.createElement('span');
      commentUser.textContent = `${comment.email}`; // Use email as commenter name
  
      const commentBody = document.createElement('p');
      commentBody.textContent = comment.body;
  
      commentElement.appendChild(commentUser);
      commentElement.appendChild(commentBody);
      commentsSection.appendChild(commentElement);
    });
  }
  
  // Fetch data and render all posts
  fetchData();