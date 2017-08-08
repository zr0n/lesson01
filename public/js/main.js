import {
    get,
    post
} from './fetch';
import latestPosts from './components/posts-recent';
import singlePage from './components/single-page';
import commentsList from './components/comments-list';
import aboutConf from './components/about-conf';

//Função que lista os posts na home
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

//Função responsável por criar a single page de cada post
function createContentSingle(local) {

    const $containerMain = document.querySelector('[data-content="main"]');

    $containerMain.innerHTML += `
    <section class="single-page" data-content="single">
        <!-- Conteúdo inserido de forma dinâmica quando chamado -->
    </section>`

    const $containerSingle = document.querySelector('[data-content="single"]');

    //Imprime o conteúdo obtido em single page
    get(local).then((full) => {
            $containerSingle.innerHTML += singlePage(full);
            return full
        })
        .then((commentsAll) => {
            const $containerComments = document.querySelector('[data-content="user-comment"]');

            //Obtém a lista de comentários e imprime na tela
            get(`/posts/${commentsAll.id}/comments`).then((comment) => {
                    $containerComments.innerHTML = commentsList(comment);
                })
                .catch((errorGetComments) => {
                    console.error(errorGetComments)
                })

            //Função responsável por inserir o comentário digitado pelo usuário
            document.forms[0].send.addEventListener("click", () => {
                const COMMENTS_FORM = {
                    username: document.forms[0].username.value,
                    message: document.forms[0].message.value
                }

                post(`/posts/${commentsAll.id}/comments`, {
                    author: COMMENTS_FORM.username,
                    content: COMMENTS_FORM.message
                }).catch((errorPostMessages) => {
                    console.error(errorPostMessages)
                })
            })
        }).catch((errorCreateSingle) => {
            //Caso não seja possível renderizar o conteúdo da single page na tela
            console.error(errorCreateSingle)
        })
}

//Função responsável por obter a lista de posts do arquivo db.json
get("/posts")
    .then((posts) => {
        return createPosts(posts)
    })
    .then((postArray) => {

        const $containerPosts = document.querySelector('[data-content="content-posts"]');

        $containerPosts.innerHTML = postArray.join('');

        document.querySelectorAll('[data-content="read-more"]').forEach((element) => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                $containerPosts.remove()
                createContentSingle(element.href)
            })
        })
    }).catch((errorGetPosts) => {
        console.error(errorGetPosts);
    })
