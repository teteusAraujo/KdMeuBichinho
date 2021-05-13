const queryPessoaEmail = "pessoa?email="
const queryEmail = "email?email="
const email = localStorage.getItem('email');
const nameLabel = document.querySelector('#name');
const mailLabel = document.querySelector('#mail');
const zipCodeLabel = document.querySelector('#zip_code');
const streetLabel = document.querySelector('#street');
const numberLabel = document.querySelector('#number');
const phoneLabel = document.querySelector('#phone');
const complementLabel = document.querySelector('#complement');
const cardsArea = document.querySelector('#cards_area')

const pessoa = {};

function buscaPessoa(){
    fetch(`${BASE_URL_SERVER}${API_PESSOA}${queryEmail}${email}`)
        .then(res => res.json())
        .then(res => {
            pessoa.nome = `${res.nome}`;
            pessoa.email = `${res.email}`;
            pessoa.cep = `${res.cep}`;
            pessoa.logradouro = `${res.logradouro}`;
            pessoa.complemento = `${res.complemento}`;
            pessoa.bairro = `${res.bairro}`;
            pessoa.localidade = `${res.localidade}`;
            pessoa.uf = `${res.uf}`;
            pessoa.ibge = `${res.ibge}`;
            pessoa.ddd = `${res.ddd}`;
            pessoa.numeroResidencial = `${res.numeroResidencial}`;
            pessoa.celular = `${res.celular}`;
            inserePessoaNaTela(pessoa)
        })

}

function inserePessoaNaTela(pessoa){
    nameLabel.textContent = `${pessoa.nome}`;
    mailLabel.textContent = `Email: ${pessoa.email}`
    zipCodeLabel.textContent = `Cep: ${pessoa.cep}`;
    streetLabel.textContent = `Rua: ${pessoa.logradouro}`;
    numberLabel.textContent = `Numero: ${pessoa.numeroResidencial}`;
    complementLabel.textContent = `Complemento: ${pessoa.complemento}`;
    phoneLabel.textContent = `Celular: ${pessoa.celular}`;
}

function buscaAnuncios(email){
    cardsArea.innerHTML = `        
    <div class="loading-area">
        <p>Buscando</p>
        <img src="../images/loading.gif" alt="" class="loading-image">
    </div>
`

    fetch(`${BASE_URL_SERVER}${API_ANUNCIO}${queryPessoaEmail}${email}`)
        .then(res => res.json())
        .then(anuncio => {
            cardsArea.innerHTML = `<label class="filters">Meus anuncios</label>`
            if(!anuncio.empty){
                for(let anuncioRecebido of anuncio.content){
                    const dataCriado = new Date(Date.parse(anuncioRecebido.dataCriacao))
                    let dataCriadoFormatada = adicionaZero((dataCriado.getDate())) + "." + ((dataCriado.getMonth() + 1)) + "." + dataCriado.getFullYear() + " - " + (dataCriado.getHours() + 3) + ":" + adicionaZero(dataCriado.getMinutes()); 
                    let dataEncerradoFormatada

                    if(anuncioRecebido.dataEncerramento){
                        const dataEncerrado = new Date(Date.parse(anuncioRecebido.dataEncerramento))
                        dataEncerradoFormatada = adicionaZero((dataEncerrado.getDate())) + "." + ((dataEncerrado.getMonth() + 1)) + "." + dataEncerrado.getFullYear() + " - " + (dataEncerrado.getHours() + 3) + ":" + adicionaZero(dataEncerrado.getMinutes()); 
                    }else{
                        dataEncerradoFormatada = ""
                    }

                    let buttonAnuncio;
                    let classButton;

                    if(anuncioRecebido.status == "Ativo"){
                        buttonAnuncio = "Encerrar"
                        classButton = "btn-secondary"
                    }else if(anuncioRecebido.status == "Inativo"){
                        buttonAnuncio = "Ativar"
                        classButton = "btn-invert-secondary"
                    }

                    cardsArea.innerHTML += 
                        `
                        <div class="res-card">
                            <a href="${BASE_URL_CLIENT}pages/petprofile.html" class="res-card-link" onclick="capturaAnuncio(${anuncioRecebido.idAnuncio})">
                                <div class="res-card-img">
                                    <img src="${anuncioRecebido.idAnimal.fotos.caminho}" alt="">
                                </div>
                                <div class="res-card-txt">
                                    <p>${anuncioRecebido.idAnimal.nome}</p>
                                    <p>${anuncioRecebido.idAnimal.bairro}</p>
                                    <p>${anuncioRecebido.idAnimal.localidade}</p>
                                </div>
                                <div class="res-card-tag">
                                    <span class="tag">${anuncioRecebido.idCategoria.classificacao}</span>     
                                </div>
                            </a>
                            <div class="res-card-status">
                                <p>Criado em: <span>${dataCriadoFormatada}</span></p>
                                <p>Encerrado em: <span>${dataEncerradoFormatada}</span></p>
                                <p>Situação: <span>${anuncioRecebido.status}</span></p>   
                                <button class="${classButton}" onclick="atualizaStatus(${anuncioRecebido.idAnuncio})">${buttonAnuncio}</button>
                            </div>
                        </div>
                        `
                }
            }else{
                cardsArea.innerHTML +=
                    `<div>
                        <p>Opss, parece que você ainda não possui nenhum anuncio por aqui <i class="fas fa-ghost"></i></p>
                    </div>`
            }
        })
}

const btnEdit = document.getElementById('edit');
const btnCancel = document.getElementById('cancel');
const btnSave = document.getElementById('save');
const modal = document.querySelector('.modal-container');
const nameEdit = document.querySelector('#name_edit');
const zipCodeEdit = document.querySelector('#zip_code_edit');
const streetEdit = document.querySelector('#street_edit');
const numberEdit = document.querySelector('#number_edit');
const phoneEdit = document.querySelector('#phone_edit');
const complementEdit = document.querySelector('#complement_edit');

btnEdit.addEventListener('click', () => {
    nameEdit.value = pessoa.nome;
    zipCodeEdit.value = pessoa.cep;
    streetEdit.value = pessoa.logradouro;
    numberEdit.value = pessoa.numeroResidencial;
    phoneEdit.value = pessoa.celular;
    complementEdit.value = pessoa.complemento;
    modal.classList.add('show');
})
btnCancel.addEventListener('click', () => {
    modal.classList.remove('show');
})