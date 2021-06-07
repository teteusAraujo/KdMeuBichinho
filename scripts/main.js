const BASE_URL_CLIENT = "http://localhost:5500/";
const BASE_URL_CLIENT = "https://kdmeubichinho.github.io/";
const BASE_URL_SERVER = "https://kdmeubichinho-app.herokuapp.com/";

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