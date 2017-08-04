import {get} from '../fetch'

get("/posts").then((listPost) => {
    var $containerList = document.querySelector('[data-content="list-posts"]');
    
    var outputList = [];
    
    var lastFive = listPost.slice(listPost.length - 5)
    
    lastFive.forEach((current) => {
        outputList.push(`<li class="latest">${current.title}</li>
`)
        
        $containerList.innerHTML = outputList.join(' ')
    })
})