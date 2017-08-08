import {
    get,
    post
} from './fetch';
import latestPosts from './components/posts-recent';
import singlePage from './components/single-page';
import commentsList from './components/comments-list';
//import errosTypes from './components/errors-list'


function createPosts(postList) {
    var outputPosts = [];

    return outputPosts = postList.map((post, index) => {

        return (`<article class="post-content">
                <h2 class="title">${post.title}</h2>

                <p class="text">${post.content.substr(0, 130) + "..."}</p>
                
                <a data-content="read-more" href="/posts/${post.id}" class="more">Leia Mais</a>
            </article>
                        `)
    })
};

function createContentSingle(local) {

    var $containerMain = document.querySelector('[data-content="main"]');

    $containerMain.innerHTML += `
    <section class="single-page" data-content="single">
        <!-- Conteúdo inserido de forma dinâmica quando chamado -->
    </section>`

    var $containerSingle = document.querySelector('[data-content="single"]');

    get(local).then((full) => {
            $containerSingle.innerHTML += singlePage(full);
            return full
        })
        .then((commentsAll) => {
            var $containerComments = document.querySelector('[data-content="user-comment"]');

            get(`/posts/${commentsAll.id}/comments`).then((comment) => {
                $containerComments.innerHTML = commentsList(comment);
            })

            document.forms[0].send.addEventListener("click", () => {
                    const COMMENTS_FORM = {
                        username: document.forms[0].username.value,
                        message: document.forms[0].message.value
                    }

                    post(`/posts/${commentsAll.id}/comments`, {
                        author: COMMENTS_FORM.username,
                        content: COMMENTS_FORM.message
                    })
                })
        })
}

get("/posts")
    .then((posts) => {
        return createPosts(posts)
    })
    .then((postArray) => {

        var $containerPosts = document.querySelector('[data-content="content-posts"]');

        $containerPosts.innerHTML = postArray.join('');

        document.querySelectorAll('[data-content="read-more"]').forEach((element) => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                $containerPosts.remove()
                createContentSingle(element.href)
            })
        })
    })

