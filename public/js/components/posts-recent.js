import {
    get
} from '../fetch'

//Cria a lista de posts no aside com apenas o título
function createList(list) {
    var outputList = [];

    var lastFive = list.slice(list.length - 5)

    return outputList = lastFive.map((current) => {
        return (`<li class="latest">${current.title}</li>`)
    })
}
//Otém a lista de posts
get("/posts").then((listPost) => {
        return createList(listPost)
    })
    .then((item) => {
        var $containerList = document.querySelector('[data-content="list-posts"]');
        $containerList.innerHTML = item.join('')
    }).catch((errorGetAsidePosts) => {
        console.warn(errorGetAsidePosts)
    })
