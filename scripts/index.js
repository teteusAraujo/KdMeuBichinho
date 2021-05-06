const btnBuscar = document.querySelector("#btn_buscar");
const btnAplicarFiltro = document.querySelector("#btn_aplicar_filtro")
const imgSearch = document.querySelector(".img-home");
const sectionSearch = document.querySelector(".search");
const sectionResult = document.querySelector(".result");
const cardsArea = document.querySelector("#cards_area");
const paginationArea = document.querySelector("#pagination");
const numberResults = document.querySelector("#title_filters_result")
const card = document.querySelector('.res-card')
const logout = document.querySelector('#logout')

const anuncio = {};

let queryFilter = "";
let queryFilterStr;
let page = 0;

btnBuscar.addEventListener("click", () => {
    buscaAnimais(0);
    ampliaIndex();
})
btnAplicarFiltro.addEventListener("click", () => {
    buscaAnimais(0);
});
function capturaAnuncio(idAnuncio) {
    localStorage.setItem("idAnuncio", idAnuncio)
}