import {get} from './fetch';
import latestPosts from './components/posts-recent'
import singlePage from './components/single-page'

function createPosts(postList) {
    var outputPosts = [];

    return outputPosts = postList.map((post, index) => {

        return (`<article class="post-content">
                <h2 class="title">${post.title}</h2>

                <p class="text">${post.content.substr(0, 130) + "..."}</p>
                
                <a data-content="read-more" href="/posts/${index + 1}" class="more">Leia Mais</a>
            </article>
                        `)
    })
};

get("/posts")
    .then((posts) => {
        return createPosts(posts)
    })
    .then((postArray) => {

        var $containerPosts = document.querySelector('[data-content="content-posts"]');
        var $containerMain = document.querySelector('[data-content="main"]')

        $containerPosts.innerHTML = postArray.join('');

        document.querySelectorAll('[data-content="read-more"]').forEach((element) => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                $containerPosts.remove()
                $containerMain.innerHTML += singlePage()
                //$containerPosts.innerHTML = postArray.map(e => e = "").join('')
            })
        })
    })
