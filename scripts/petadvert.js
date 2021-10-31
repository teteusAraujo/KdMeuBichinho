const photo = document.getElementById("photo");
const anunciar = document.querySelector("#anunciar");
const especieForm = document.getElementsByName("especie")
const categoria = document.getElementsByName("evento")
const sexo = document.getElementsByName("sexo")
const idade = document.getElementsByName("idade")
const porte = document.getElementsByName("porte")
const castrado = document.querySelector("#castrado")
const vacinado = document.querySelector("#vacinado")
const nome = document.querySelector("#nome");
const cep = document.querySelector("#cep");

const anuncio = {};
const animal = {};
const fotos = {};
const especie = {};
const categoriaAnuncio = {};
const pessoa = {};

let firebaseConfig = {
    apiKey: "AIzaSyAYh5Jg2--ApCyh8jyfX88tmGhNQwOosoY ",
    authDomain: "kdmeubichinho-app.firebaseapp.com ",
    projectId: "kdmeubichinho-app ",
    storageBucket: "kdmeubichinho-app.appspot.com",
    messagingSenderId: "455469113787 ",
    appId: "1:455469113787:web:39fe5d7b8077886ddce49e ",
    measurementId: "G-BTHWR5STER "
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let storage = firebase.storage();

function uploadImageFirebase(image){

    const nameImage = Date.now() + image.name;
    const upload = storage.ref().child(nameImage).put(image);

    upload.on("state_changed", function(){
        upload.snapshot.ref.getDownloadURL().then(function(image_url){
            console.log("Sucesso ao salvar a imagem");
            fotos.caminho = image_url;
            animal.fotos = fotos;
            console.log(animal)
        })
    }, function(error){
        console.log("Erro ao salvar a imagem");
    })
}

photo.addEventListener("change", ()=>{
    //uploadFile(photo.files[0])
    uploadImageFirebase(photo.files[0])
})
const uploadFile = (file) => {
   
    const fd = new FormData();
    fd.append("file", file)
    fetch(`${BASE_URL_SERVER}${API_FOTO}`,{
        method: "POST",
        body: fd
    })
    .then(res => res.text())
    .then(res => {
        fotos.caminho=res;
        animal.fotos=fotos;
    })
    .catch(err => console.log(err))
}

function constroiAnuncio(){
    for(let especieFormFor of especieForm){
        if(especieFormFor.checked) especie.idEspecie = especieFormFor.value;
    }
    for(let categoriaFormFor of categoria){
        if(categoriaFormFor.checked) categoriaAnuncio.idCategoria = categoriaFormFor.value;
    }
    for(let sexoFormFor of sexo){
        if(sexoFormFor.checked) animal.sexo = sexoFormFor.value;
    }
    for(let idadeFormFor of idade){
        if(idadeFormFor.checked) animal.classificacaoEtaria = idadeFormFor.value;
    }
    for(let porteFormFor of porte){
        if(porteFormFor.checked) animal.porte = porteFormFor.value;
    }


animal.castrado=false
    animal.vacinado=false
    if(castrado.checked) animal.castrado = true;
    if(vacinado.checked) animal.vacinado = true;

    animal.nome = nome.value;
    pessoa.email = localStorage.email;
    animal.especie = especie;

    anuncio.idCategoria = categoriaAnuncio;
    anuncio.idPessoa = pessoa;
    anuncio.idAnimal = animal;
    anuncio.dataCriacao = new Date();

    anuncio.dataCriacao.setHours(anuncio.dataCriacao.getHours() - 3);
}

function verificaCamposObrigatorios(){
    if(especie.idEspecie && categoriaAnuncio.idCategoria && animal.sexo && animal.classificacaoEtaria && animal.porte && cep.value && photo.files[0]){
        return true
    }else{
        return false
    }
}

anunciar.addEventListener("click", (e) =>{
    e.preventDefault()
    constroiAnuncio()

    if(verificaCamposObrigatorios()){
        let newCep = formatnumber(cep.value)    
        fetch(`https://viacep.com.br/ws/${newCep}/json/`)
            .then(res => res.json())
            .then(local => {
                animal.logradouro = local.logradouro
                animal.cep = local.cep
                animal.bairro = local.bairro
                animal.localidade = local.localidade
                animal.uf = local.uf
                animal.ibge = local.ibge
                animal.ddd = local.ddd
            }).then(() => {
                fetch(`${BASE_URL_SERVER}${API_ANUNCIO}`,{
                    method: "POST",
                    headers: { "Content-Type":"application/json"},
                    body: JSON.stringify(anuncio)
                })
                .then(res => res.json())
                .then(res => capturaAnuncio(res.idAnuncio))
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Anúncio cadastrado com sucesso!',
                    })
                    setTimeout(function(){location.href = `${BASE_URL_CLIENT}${CLIENT_PETPROFILE}`}, 1800);
                })
                .then(res => console.log(res))
                .catch(err => console.log(err))
            })
        }else{
            Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: 'Você não preencheu todos os campos obrigatórios marcados com *'
              })
        }
})