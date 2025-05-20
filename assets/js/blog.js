// blog.js
// import { blogs } from './data.js';

// export function loadBlogCards() {
//     const container = document.querySelector('#blog-card-container');
  
//     if (!container) return;
  
//     blogs.forEach((blog, index) => {
//       const blogCard = document.createElement('div');
//       blogCard.className = 'col-xl-4 col-md-6';
//       blogCard.setAttribute('data-aos', 'fade-up');
//       blogCard.setAttribute('data-aos-delay', 100 + index * 100); // staggered animation
  
//       blogCard.innerHTML = `
//         <article>
//           <div class="post-img">
//             <img src="${blog.coverImage}" alt="${blog.title}" class="img-fluid">
//           </div>
  
//           <p class="post-category">${blog.category}</p>
  
//           <h2 class="title">
//             <a href="blog-details.html?slug=${blog.slug}">${blog.title}</a>
//           </h2>
  
//           <div class="d-flex align-items-center">
//             <img src="${blog.author.photo}" alt="${blog.author.name}" class="img-fluid post-author-img flex-shrink-0">
//             <div class="post-meta">
//               <p class="post-author">${blog.author.name}</p>
//               <p class="post-date">
//                 <time datetime="${blog.date}">${new Date(blog.date).toDateString()}</time>
//               </p>
//             </div>
//           </div>
//         </article>
//       `;
  
//       container.appendChild(blogCard);
//     });
//   }
  