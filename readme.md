# Lição #01 - Blog sobre lero lero

##Objetivo
O objetivo dessa lição será o aprendizado sobre DOM, assincronia, ajax e formulários. Foi criado um banco de dados falso com o conteúdo de http://www.lerolero.com/

##Restrições
 - Não usar bibliotecas javascript de terceiros. (css tudo bem)

##Funcionalidades

 O cliente Carlinhos Doe resolveu fazer um blog. Tendo em vista isso, ele nos enviou uma lista de funcionalidades que ele gostaria que implementássemos em seu pseudo sistema:

 - Devo poder ver a lista de todos os posts
 - Devo poder comentar no post, inserindo o meu nome e o conteúdo do comentário. O comentário deve ser salvo no banco de dados falso
 - Devo poder ver todos os comentários dos posts
 - Paginação de posts não será necessária, sendo assim todos os posts / comentários devem ser mostrados em uma única página
 - Apesar de ser em uma única página, o site deve ter 3 abas: Leros (posts), Sobre Nós, Contato
 - Todos os formulários devem ser validados para nenhum campo ser enviado em branco
 - É preciso ter um formulário em Contato, onde a pessoa pode digitar o email, nome e uma mensagem.
 - Não é necessário salvar a mensagem do formulário de contato, mas é necessário validar o formulário para impedir envio de qualquer campo em branco e exibir mensagens de erro e de sucesso: (Ex: "Erro: O campo email está em branco.", "Mensagem enviada com sucesso, nunca entraremos em contato :D")
 - Sou um cliente maluco, então escolha o estilo e layout que mais lhe agradar

##Instalação

 Para pode instalar e rodar o blog será necessário ter instalado o nodejs em seu computador. Caso você ainda não possua, siga esse tutorial para a instalação do mesmo: https://www.youtube.com/watch?v=brSwmLQA0iA

 Com o nodejs instalado, entre na pasta em que você baixou esse repositório e execute:

 `
  npm install
 `

 Espere alguns instantes enquanto os módulos são instalados e quando tiver concluído execute:

 `npm start`

 Se tudo estiver ok, quando http://localhost:3000 for acessado do seu navegador, você verá uma página com o nome Blog Sobre lero lero

##Dicas

 Você irá precisar acessar a api por ajax para buscar e inserir dados. Tem um exemplo pronto em public/js/app.js de como fazer um GET (busca) de dados na api e também tem um exemplo de como fazer um POST (inserção) de dados

 Lista de endpoints e retornos da api:

 `/config` GET

 Parâmetros: Nenhum

 Retorno:
 { postsCount, aboutUs, telephone, email, address }

 `/posts` GET

 Parâmetros: Nenhum

 Retorno: Array de Posts [ { id, title, content, date } ]

`/posts/{id}` GET

Parâmetros: Nenhum

Retorno: Um único post { id, title, content, date }

`/comments?postId={postId}` GET

Parâmetros: Id do post (postId)
Retorno: Array de Comments [{ id, author, content, postId}]

`/posts/{id}/comments` POST

Parâmentros: {author, content}

Retorno: {id, content, author, postId}
