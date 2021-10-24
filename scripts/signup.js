const phone = document.getElementById("phone");
const cep = document.getElementById("cep");
const street = document.getElementById("street");
const button = document.getElementById("signup");
const mail = document.getElementById("mail");
const nameUser = document.getElementById("nameUser");
const number = document.getElementById("number");
const password = document.getElementById("password");
const complement = document.getElementById("complement");

const pessoa = {};

phone.addEventListener("keypress", function (){ 
    if(phone.value.length == 0)
        phone.value = '(' + phone.value; //quando começamos a digitar, o script irá inserir um parênteses no começo do campo.
    if(phone.value.length == 3)
        phone.value = phone.value + ') '; //quando o campo já tiver 3 caracteres (um parênteses e 2 números) o script irá inserir mais um parênteses, fechando assim o código de área.

    if(phone.value.length == 10)
        phone.value = phone.value + '-'; //quando o campo já tiver 8 caracteres, o script irá inserir um tracinho, para melhor visualização do telefone.

});

cep.addEventListener("keypress", function (){ 
    if(cep.value.length == 5)
        cep.value = cep.value + '-'; //quando o campo já tiver 8 caracteres, o script irá inserir um tracinho, para melhor visualização do cep. 
});

cep.addEventListener("blur",()=>{
    if(cep.value){
        let newcep=formatnumber(cep.value)
        fetch(`https://viacep.com.br/ws/${newcep}/json/`)
        .then(res => res.json())
        .then(local => {
            street.value = local.logradouro
            pessoa.cep = local.cep
            pessoa.bairro = local.bairro
            pessoa.localidade = local.localidade
            pessoa.uf = local.uf
            pessoa.ibge = local.ibge
            pessoa.ddd = local.ddd
            console.log(local)
        })
    }   
});

function constroiPessoa(){
    pessoa.logradouro = street.value
    pessoa.complemento = complement.value
    pessoa.celular=formatnumber(phone.value);
    pessoa.email=mail.value;
    pessoa.nome=nameUser.value;
    pessoa.numeroResidencial=number.value;
    pessoa.senha=password.value;
}

function verificaCamposObrigatorios(){
    if(cep.value && pessoa.nome && pessoa.email && pessoa.logradouro && pessoa.numeroResidencial && pessoa.celular && pessoa.senha){
        return true
    }else{
        return false
    }
}

button.addEventListener("click",(e)=>{
    e.preventDefault();
    constroiPessoa();
    
    if(verificaCamposObrigatorios()){
        fetch(`${BASE_URL_SERVER}${API_PESSOA}`,{
            method: "POST",
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify(pessoa)
        })
        .then(res => res.json())
        .then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Usuário cadastrado com sucesso!',
                text: 'Você será redirecionado para a tela de login.'
            })
            setTimeout(function(){location.href = `${BASE_URL_CLIENT}${CLIENT_LOGIN}`;}, 3000);
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }else{
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'Você não preencheu todos os campos obrigatórios marcados com *'
          })
    }
});