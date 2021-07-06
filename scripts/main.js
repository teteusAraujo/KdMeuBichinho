const BASE_URL_CLIENT = "http://localhost:5500/";
const BASE_URL_SERVER = "";

const API_ANUNCIO_BUSCA = "anuncio/busca?";
const API_FOTO = "storage/upload";
const API_ANUNCIO = "anuncio/";
const API_MENSAGEM = "mensagem/"
const API_AUTH = "pessoa/auth"
const API_PESSOA = "pessoa/"
const API_ATUALIZA_STATUS = "atualizastatus/"
const CLIENT_PETPROFILE = "pages/petprofile.html";
const CLIENT_PETADVERT = "pages/petadvert.html"
const CLIENT_LOGIN = "pages/login.html"

const URL_BLOCK = [`${BASE_URL_CLIENT}${CLIENT_PETADVERT}`, ]

let token = false;
const menu = document.querySelector('#menu')
const footer = document.querySelector('#footer')
const localizacaoViaCep = {}
const menuLogout = `
    <a href="${BASE_URL_CLIENT}">
        <img src="${BASE_URL_CLIENT}images/logo-black.svg" alt="Logo KdMeuBichinho" class="logo">
    </a>
    <input type="checkbox" id="bar">
    <label for="bar" class="bars">&#9776;</label>
    <ul class="">
        <li><a href="${BASE_URL_CLIENT}">Início <!--<i class="fas fa-home"></i>--></a></li>
        <li><a href="${BASE_URL_CLIENT}pages/petadvert.html">Anunciar <!--<i class="fas fa-plus">--></i></a></li>
        <li><a href="${BASE_URL_CLIENT}pages/signup.html">Cadastrar <!--<i class="fas fa-user-plus"></i>--></a></li>
        <li><button class="btn-primary" onclick="location.href='${BASE_URL_CLIENT}pages/login.html'">Entrar  <!--<i class="fas fa-sign-in-alt">--></i></button></li>
    </ul>  
    `
    const menuLogin = `
        <a href="${BASE_URL_CLIENT}">
            <img src="${BASE_URL_CLIENT}images/logo-black.svg" alt="Logo KdMeuBichinho" class="logo">
        </a>
        <input type="checkbox" id="bar">
        <label for="bar" class="bars">&#9776;</label> 
        <ul>
            <li><a href="${BASE_URL_CLIENT}">Início </a></li>
            <li><a href="${BASE_URL_CLIENT}pages/petadvert.html">Anunciar</a></li>
            <li>
                <div class="dropdown">
                    <i class="fas fa-user dropbtn"></i>
                    <div class="dropdown-content">
                        <a href="${BASE_URL_CLIENT}pages/profile.html">Meus anuncios</a>
                        <a href="#" id="logout" onclick="fazlogout()">Sair</a>
                    </div>
                </div>
            </li>
        </ul>
    `
const footerPages = `
    <img src="https://kdmeubichinho.github.io/images/icone-black.svg" alt="Icone do KdMeuBichinho" class="icone">
    <div>
        <a href="https://github.com/KdMeuBichinho" target="_blank"><strong>Colabore no Github do projeto.</strong></a>
        <p>2020 Todos os direitos reservados.</p>
    </div>
    <a href="#main"><button class="btn-primary"><span class="footer-top-button"><i class="fas fa-chevron-up"></i></span></button></a>
`
function fazlogout(){
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    verificaToken()
    redirecionamentoIndex()
}

function verificaRota(rota){
    if(!token){
        for(rotaBloqueada of URL_BLOCK){
            if(rotaBloqueada == rota){
                window.alert('Você precisa estar logado para fazer anuncios')
                location.href = BASE_URL_CLIENT + CLIENT_LOGIN
            }
        }
    }
}
function verificaToken(){
    if(localStorage.getItem('token')){
        menu.innerHTML = menuLogin;
        token = true;
    }else{
        menu.innerHTML = menuLogout;
        token = false;
    }
}

function redirecionamentoIndex(){
    location.href = BASE_URL_CLIENT; 
}

function redirecionamento(url){
    location.href = url; 
}

function capturaAnuncio(idAnuncio) {
    localStorage.setItem("idAnuncio", idAnuncio)
}

function formatnumber(number){
    return number.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ^a-zA-Z]/gi, '')
}

function adicionaZero(numero){
    if (numero <= 9) 
        return "0" + numero;
    else
        return numero; 
}

function atualizaFooter(){
    footer.innerHTML = footerPages;
}

function capturaPagina(){
    localStorage.setItem("page", location.href)
}

atualizaFooter()
verificaToken()
verificaRota(location.href)
capturaPagina()

const urll = "https://viacep.com.br/ws/14810125/json/"

fetch(urll).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
    });
  }).catch(function(err) {
    console.error('Failed retrieving information', err);
  });