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

function ampliaIndex(){
    imgSearch.classList.add("display-none")
    sectionSearch.classList.add("section-search-animation");
    sectionResult.classList.remove("display-none");
    footer.classList.remove("display-none")
}

function atualizaFiltros(){
    let cep = document.querySelector("#cep").value;
    let idEspecie = document.querySelector("#especie").value
    let idCategoria = document.querySelector("#categoria").value
    let sexo = document.querySelector("#sexo").value
    let idade = document.querySelector("#idade").value
    let porte = document.querySelector("#porte").value

    queryFilter = ""
    cep = cep.substring(0,5)

    if(cep) queryFilter += `cep=${cep}&`;
    if(idEspecie != 0) queryFilter += `idEspecie=${idEspecie}&`;
    if(idCategoria != 0) queryFilter += `idCategoria=${idCategoria}&`;
    if(sexo) queryFilter += `sexo=${sexo}&`;
    if(idade) queryFilter += `classificacaoEtaria=${idade}&`;
    if(porte) queryFilter += `porte=${porte}&`;
    queryFilter += `status=ATIVO&`;
    queryFilter += `size=20&`;

}

function selecionaPagina(pagina){
    pagina --
    buscaAnimais(pagina)
}