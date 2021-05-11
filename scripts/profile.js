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