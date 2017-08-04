import {get} from '../fetch'

get("/posts").then((listPost) => {
    var $containerList = document.querySelector('[data-content="list-posts"]');
    
    var outputList = [];
    
    listPost.splice(5, listPost.length)
    
    listPost.forEach((current) => {
        outputList.push(`<li class="latest">${current.title}</li>
`)
        
        $containerList.innerHTML = outputList.join(' ')
    })
})