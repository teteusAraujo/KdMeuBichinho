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

zipCodeEdit.addEventListener("keypress", function (){ 
    if(zipCodeEdit.value.length == 5)
        zipCodeEdit.value = zipCodeEdit.value + '-'; //quando o campo já tiver 8 caracteres, o script irá inserir um tracinho, para melhor visualização do cep. 
});
phoneEdit.addEventListener("keypress", function (){ 
    if(phoneEdit.value.length == 0)
        phoneEdit.value = '(' + phoneEdit.value; //quando começamos a digitar, o script irá inserir um parênteses no começo do campo.
    if(phoneEdit.value.length == 3)
        phoneEdit.value = phoneEdit.value + ') '; //quando o campo já tiver 3 caracteres (um parênteses e 2 números) o script irá inserir mais um parênteses, fechando assim o código de área.
    if(phoneEdit.value.length == 10)
        phoneEdit.value = phoneEdit.value + '-'; //quando o campo já tiver 8 caracteres, o script irá inserir um tracinho, para melhor visualização do telefone.
});

function verificaCamposObrigatorios(){
    if(pessoa.nome && pessoa.cep && pessoa.logradouro && pessoa.numeroResidencial && pessoa.celular){
        return true
    } else {
        return false
    }
}

function constroiPessoa(){
    pessoa.nome = nameEdit.value;
    pessoa.cep = zipCodeEdit.value;
    pessoa.logradouro = streetEdit.value;
    pessoa.numeroResidencial = numberEdit.value;
    pessoa.complemento = complementEdit.value;
    pessoa.celular = formatnumber(phoneEdit.value);
}

btnSave.addEventListener('click',(e) => {
    e.preventDefault()
    constroiPessoa();

    if(verificaCamposObrigatorios()){
        editaPessoa(pessoa)
        Swal.fire({
            icon: 'success',
            title: 'Usuário editado com sucesso!',
            timer: 1500
          })
        
        setTimeout(function(){modal.classList.remove('show');}, 1200);
        
    }else{
        //window.alert('Campos obrigatórios não preenchidos')
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'Você não preencheu todos os campos obrigatórios marcados com *'
          })
    }
} )

zipCodeEdit.addEventListener("blur", ()=>{
    if(zipCodeEdit.value && zipCodeEdit.value.length == 9){
        let newcep=formatnumber(zipCodeEdit.value)
        fetch(`https://viacep.com.br/ws/${newcep}/json/`)
        .then(res => res.json())
        .then(local => {
            streetEdit.value = local.logradouro
            pessoa.cep = local.cep
            pessoa.logradouro = local.logradouro
            pessoa.bairro = local.bairro
            pessoa.localidade = local.localidade
            pessoa.uf = local.uf
            pessoa.ibge = local.ibge
            pessoa.ddd = local.ddd
        })
    }   
});
function editaPessoa(pessoa){
    fetch(`${BASE_URL_SERVER}${API_PESSOA}${email}`,{
        method: "PUT",
        headers: { "Content-Type":"application/json"},
        body: JSON.stringify(pessoa)
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))

    inserePessoaNaTela(pessoa)
}
function atualizaStatus(idAnuncio){
    fetch(`${BASE_URL_SERVER}${API_ANUNCIO}${API_ATUALIZA_STATUS}${idAnuncio}`,{
        method: "PUT",
        headers: { "Content-Type":"application/json"}
    })
    .then(() => {
        buscaAnuncios(email)
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))

}

buscaPessoa()
buscaAnuncios(email)