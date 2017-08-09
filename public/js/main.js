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

            function getCommentsUsers() {
                return get(`/posts/${commentsAll.id}/comments`).then((comment) => {
                        $containerComments.innerHTML = commentsList(comment);
                    })
                    .catch((errorGetComments) => {
                        console.error(errorGetComments)
                    })
            }

            getCommentsUsers()


            //Função responsável por inserir o comentário digitado pelo usuário
            document.forms[0].send.addEventListener("click", (evt) => {
                evt.preventDefault()
                const COMMENTS_FORM = {
                    form: document.forms[0],
                    username: document.forms[0].username,
                    message: document.forms[0].message
                }

                //Envia o cometário do usuário depois de valida-lo:
                if (COMMENTS_FORM.username.value) {
                    if (COMMENTS_FORM.message.value) {
                        post(`/posts/${commentsAll.id}/comments`, {
                            author: COMMENTS_FORM.username.value,
                            content: COMMENTS_FORM.message.value
                        }).catch((errorPostMessages) => {
                            console.error(errorPostMessages)
                        })
                        
                        //Remove classe de erro
                        COMMENTS_FORM.message.classList.remove('error')
                        COMMENTS_FORM.username.classList.remove('error')
                        //Reseta o formulário
                        COMMENTS_FORM.form.reset()
                        //Atualiza a lista de posts
                        getCommentsUsers()
                    } else {
                        COMMENTS_FORM.message.classList.add('error')
                        COMMENTS_FORM.message.focus()
                    }
                } else {
                    COMMENTS_FORM.username.classList.add('error')
                    COMMENTS_FORM.username.focus()
                }
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
