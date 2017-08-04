import {get} from '../fetch';
 export default get("/posts").then((post) => {

        var $containerPosts = document.querySelector("[data-content='content-posts']");

        var outputPosts = [];

        post.forEach((posts, index) => {
            outputPosts.push(`
  <article class="post-content">
                <h2 class="title">${posts.title}</h2>

                <p class="text">${posts.content}</p>
                
                <a href="/posts/${index}" class="more">Leia Mais</a>
            </article>
`)
        });

       $containerPosts.innerHTML = outputPosts.join(' ')
    })