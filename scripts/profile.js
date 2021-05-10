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