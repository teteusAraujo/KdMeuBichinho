const photo = document.getElementById("photo");
const anunciar = document.querySelector("#anunciar");
const especieForm = document.getElementsByName("especie")
const categoria = document.getElementsByName("evento")
const sexo = document.getElementsByName("sexo")
const idade = document.getElementsByName("idade")
const porte = document.getElementsByName("porte")
const castrado = document.querySelector("#castrado")
const vacinado = document.querySelector("#vacinado")
const nome = document.querySelector("#nome");
const cep = document.querySelector("#cep");

const anuncio = {};
const animal = {};
const fotos = {};
const especie = {};
const categoriaAnuncio = {};
const pessoa = {};

let firebaseConfig = {
    apiKey: " ",
    authDomain: " ",
    projectId: " ",
    storageBucket: "",
    messagingSenderId: " ",
    appId: " ",
    measurementId: " "
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

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