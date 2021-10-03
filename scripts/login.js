const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const submit = document.getElementById("submit");
const pessoa = {}

submit.addEventListener("click", (e) => {
    e.preventDefault();
    enviar();
})

function constroiPessoa() {
    pessoa.email = emailField.value
    pessoa.senha = passwordField.value
}

function verificaCamposObrigatorios() {
    return (pessoa.email && pessoa.senha) ? true : false

}

function enviar() {
    constroiPessoa();
    if (verificaCamposObrigatorios()) {
        let status;
        fetch(`${BASE_URL_SERVER}${API_AUTH}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pessoa)
            })
            .then(res => {
                status = res.status;
                return res.json();
            })
            .then(({ token, email }) => {
                if (status == 200) {
                    localStorage.setItem("email", email)
                    localStorage.setItem("token", token)
                    if (localStorage.getItem("page") == `${BASE_URL_CLIENT}pages/petprofile.html`) {
                        redirecionamento(localStorage.getItem("page"))
                    } else {
                        redirecionamentoIndex()
                    }
                } else if (status == 401) {
                    localStorage.clear()
                        //alert("Usuário ou senha inválido")
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Usuário ou senha inválido!'
                    })
                    emailField.value = ""
                    passwordField.value = ""
                } else {
                    localStorage.clear()
                        //alert("Ocorreu um erro ao logar, tente novamente mais tarde")
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ocorreu um erro ao logar, tente novamente mais tarde!'
                    })
                    emailField.value = ""
                    passwordField.value = ""
                }
            })
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'Você não preencheu todos os campos obrigatórios.'
        })
    }
}