const nomeAnimal = document.getElementById('nome_animal');
const localizacaoAnimal = document.querySelector('#localizacao_animal');
const cidadeAnimal = document.getElementById('cidade_animal');
const tags = document.getElementById('tags');
const foto = document.querySelector('#container_img');
const contato = document.querySelector('#contact');
const categoria = document.querySelector('#categoria');
const id = localStorage.getItem('idAnuncio');
const email = localStorage.getItem('email');
const messageArea = document.querySelector('#message_area');
const message = document.querySelector('#message');
const send = document.querySelector('#send');
const update = document.querySelector('#update');

function atualizaMensagens(){
    var messageScroll = document.getElementById('message_area');
    
    messageArea.innerHTML = `
        <div class="loading-area">
            <p>Atualizando</p>
            <img src="../images/loading.gif" alt="" class="loading-image">
        </div>
    `
    fetch(`${BASE_URL_SERVER}${API_ANUNCIO}${id}`)
        .then(res => res.json())
        .then(anuncio => {
            messageArea.innerHTML = ""
            anuncio.mensagens.sort(function (a, b) {
                if (a.idMensagem > b.idMensagem) {
                  return 1;
                }
                if (a.idMensagem < b.idMensagem) {
                  return -1;
                }
                return 0;
              });

            for(let mensagem of anuncio.mensagens){

                const data = new Date(Date.parse(mensagem.dataMensagem))
                let dataFormatada = adicionaZero((data.getDate())) + "." + ((data.getMonth() + 1)) + "." + data.getFullYear() + " - " + (data.getHours() + 3) + ":" + adicionaZero(data.getMinutes()); 

                messageArea.innerHTML += 
                `
                    <p class="style-message">
                    <span><strong>${mensagem.idPessoa.nome}:</strong></span>
                    ${mensagem.mensagem}
                    <span>${dataFormatada}</span>
                    </p>
                `
            }
        })
        .then(() => {
            messageScroll.scrollTop = messageScroll.scrollHeight - messageScroll.clientHeight;
        })
}

function enviaMensagem(){
    const mensagem = {}
    const idAnuncio = {}
    const idPessoa = {}

    verificaToken()
    if(token){
        if(message.value){
            idAnuncio.idAnuncio = id;
            idPessoa.email = email;
    
            mensagem.dataMensagem = new Date();
            mensagem.dataMensagem.setHours(mensagem.dataMensagem.getHours() - 3);
    
            mensagem.idAnuncio = idAnuncio;
            mensagem.idPessoa = idPessoa;
            mensagem.mensagem = message.value;
    
            fetch(`${BASE_URL_SERVER}${API_MENSAGEM}`,{
                method: "POST",
                headers: { "Content-Type":"application/json"},
                body: JSON.stringify(mensagem)
            })
            .then(res => res.json())
            .then(() => {
                atualizaMensagens()
                message.value = ""
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))  
        } else {
            //window.alert('Campos obrigatórios não preenchidos')
            Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: 'Você não escreveu nenhuma mensagem para enviar.'
              })
        }
    } else {
        //window.alert('Você precisa estar logado para enviar mensagens')
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Você precisa estar logado para enviar mensagens!',
            footer: '<a href="./login.html">Entrar na minha conta</a>'
          })
    } 
}

