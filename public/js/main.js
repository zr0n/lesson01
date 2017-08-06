import {
    get
} from './fetch';
import latestPosts from './components/posts-recent'
import singlePage from './components/single-page'
import commentsList from './components/comments-list'

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
        
            get(`/comments?postId=${commentsAll.id}`).then((comment) => {
                $containerComments.innerHTML = commentsList(comment)
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
                //$containerPosts.innerHTML = postArray.map(e => e = "").join('')
            })
        })
    })


// Se o post tiver o ID igual o Comentário ele aparece
// obtem o href e com ele ua o get pra obter resto do conteúdo
