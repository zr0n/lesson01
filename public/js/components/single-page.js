export default function (fullPost) {
    return `
<a href="index.html"> Voltar</a>
  <h2 class="title">${fullPost.title}</h2>

  <p class="content">${fullPost.content}</p>

  <span class="heading"><b>Comentários:</b></span>

    <div class="user-comment" data-content="user-comment">
    </div>

<form class="comments" action="">
    <input required class="username" type="text" name="username" placeholder="Insira seu nome">

    <textarea required placeholder="Insira seu comentário" name="message" class="message"></textarea>

    <input type="submit" value="Postar seu comentário" class="send" name="send">
</form>

`
}
