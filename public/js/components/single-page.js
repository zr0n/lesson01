export default function (fullPost) {
    return `
  <h2 class="title">${fullPost.title}</h2>

  <p class="content">${fullPost.content}</p>

  <span class="heading"><b>Comentários:</b></span>

    <div class="user-comment" data-content="user-comment">
    </div>

<form class="comments" action=".">
    <input required class="username" type="text" name="user" placeholder="Insira seu nome">

    <textarea required placeholder="Insira seu comentário" name="body" class="message"></textarea>

    <input type="submit" value="Postar seu comentário" class="send">
</form>

`
}