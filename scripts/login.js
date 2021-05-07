const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const submit = document.getElementById("submit");
const pessoa = {}

submit.addEventListener("click", (e) => {
    e.preventDefault();
    enviar();
})
function constroiPessoa(){
    pessoa.email = emailField.value
    pessoa.senha = passwordField.value
}
function verificaCamposObrigatorios(){
    if(pessoa.email  && pessoa.senha){
        return true
    } else {
        return false
    }
}