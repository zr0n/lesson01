//Fazendo a requisição ajax usando javascript puro
const get = function makeHTTPRequest(url, cb){
  //Primeiro instanciamos um novo XMLHttpRequest
  var xhr = new XMLHttpRequest();
  //Então usamos o método open dizendo o modo que vamos fazer a requisição e a url a qual será apontada
  xhr.open('GET', url);
  //No método send indicamos o que queremos enviar para a url, como estamos buscando dados, não vamos enviar nada (null)
  xhr.send(null);

  //toda vez que o status da nossa requisição mudar, a função abaixo será invocada
  xhr.onreadystatechange = function () {
  var DONE = 4; // status 4 = a requisição está completa
  var OK = 200; // status 200 = Não tivemos nenhum erro no servidor
  if (xhr.readyState === DONE) { //se a requisição tiver terminado
      if (xhr.status === OK){  //e não tiver obtido erros no servidor
        cb(JSON.parse(xhr.responseText)) //executamos nosso callback com o resultado obtido
      } else {
        console.log('Error: ' + xhr.status); // Ocorreu um erro com o servidor
      }
    }
  };
}
const post = function makeHTTPRequest(url, params,  cb){
  //Primeiro instanciamos um novo XMLHttpRequest
  var xhr = new XMLHttpRequest();
  //Então usamos o método open dizendo o modo que vamos fazer a requisição e a url a qual será apontada
  xhr.open('POST', url);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //No método send indicamos o que queremos enviar para a url
  params  = Object.keys(params).map(function(k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
  }).join('&')
  console.log("params", params)
  xhr.send(params);

  //toda vez que o status da nossa requisição mudar, a função abaixo será invocada
  xhr.onreadystatechange = function () {
  var DONE = 4; // status 4 = a requisição está completa
  var OK = 201; // status 200 = Não tivemos nenhum erro no servidor
  if (xhr.readyState === DONE) { //se a requisição tiver terminado
      if (xhr.status === OK){  //e não tiver obtido erros no servidor
        cb(JSON.parse(xhr.responseText)) //executamos nosso callback com o resultado obtido
      } else {
        console.log('Error: ' + xhr.status); // Ocorreu um erro com o servidor
      }
    }
  };
}

//E na prática fazemos o get dessa forma:

get('/config', function(resultado){
  //aqui manipulamos o que vamos fazer com o resultado obtido,
  //nesse caso imprimir na tela o campo aboutUs
  document.querySelector("#description").innerHTML = resultado.aboutUs
})


//Quando precisar usado o post:
/*
post('posts/1/comments', {author: "fernando", 'content': "Lorem ipsum sit dolor amet"}, function(resultado){
  window.alert("Comentário Publicado")
  console.log("result", resultado)
})
*/
