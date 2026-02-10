function aceitarCookies() {
    localStorage.setItem("cookiesAceitos", "sim");
    alert("Cookies aceitos.");
}

function recusarCookies() {
    localStorage.setItem("cookiesAceitos", "nao");
    localStorage.removeItem("cookieNome");
    localStorage.removeItem("bancoDados");

    alert("Cookies recusados. Nenhum dado será armazenado.");
}

function salvarCookie() {
    const nome = document.getElementById("nomeUsuario").value;
    const consentimento = localStorage.getItem("cookiesAceitos");

    if (consentimento === "sim" && nome) {
        localStorage.setItem("cookieNome", nome);
        document.getElementById("resultado-cookie").innerText =
            "Dado pessoal armazenado com consentimento do titular.";
    } else {
        document.getElementById("resultado-cookie").innerText =
            "Os dados não podem ser armazenados sem consentimento.";
    }
}

function mostrarCookie() {
    const consentimento = localStorage.getItem("cookiesAceitos");
    const nome = localStorage.getItem("cookieNome");

    if (consentimento === "sim" && nome) {
        document.getElementById("resultado-cookie").innerText =
            "Cookie armazenado: Nome do usuário = " + nome;
    } else {
        document.getElementById("resultado-cookie").innerText =
            "Esses dados são sigilosos e não podem ser exibidos pois os cookies não foram aceitos.";
    }
}

function salvarBanco() {
    const consentimento = localStorage.getItem("cookiesAceitos");

    const dados = {
        nome: document.getElementById("bd-nome").value,
        email: document.getElementById("bd-email").value,
        interesse: document.getElementById("bd-interesse").value
    };

    if (consentimento === "sim") {
        localStorage.setItem("bancoDados", JSON.stringify(dados));
        document.getElementById("resultado-banco").innerText =
            "Dados armazenados em banco de dados simulado.";
    } else {
        document.getElementById("resultado-banco").innerText =
            "Os dados não foram coletados por ausência de consentimento.";
    }
}

function simularVazamentoReal() {
    const consentimento = localStorage.getItem("cookiesAceitos");
    const dados = localStorage.getItem("bancoDados");
    const area = document.getElementById("vazamento-area");

    area.style.display = "block";

    if (consentimento !== "sim") {
        area.innerHTML = `
            <strong>NENHUM INCIDENTE DETECTADO</strong><br><br>
            Não houve vazamento porque os dados não foram coletados,
            em razão da recusa de consentimento pelo usuário.
        `;
        return;
    }

    if (dados) {
        const obj = JSON.parse(dados);

        area.innerHTML = `
            <strong>🚨 INCIDENTE DE SEGURANÇA</strong><br><br>
            Dados pessoais foram acessados por terceiros não autorizados.<br><br>
            <strong>Dados vazados:</strong><br>
            Nome: ${obj.nome}<br>
            E-mail: ${obj.email}<br>
            Interesse: ${obj.interesse}<br><br>
            Conforme a LGPD, o controlador deve comunicar a ANPD e o titular dos dados.
        `;
    } else {
        area.innerHTML = `
            <strong>NENHUM DADO VAZADO</strong><br><br>
            Apesar do consentimento, não há dados armazenados no sistema.
        `;
    }
}

function consultarBanco() {
    const consentimento = localStorage.getItem("cookiesAceitos");
    const dados = localStorage.getItem("bancoDados");

    if (consentimento !== "sim") {
        document.getElementById("resultado-banco").innerText =
            "Acesso negado. Os dados não podem ser consultados sem consentimento do titular.";
        return;
    }

    if (dados) {
        const obj = JSON.parse(dados);
        document.getElementById("resultado-banco").innerText =
            `Registro encontrado: ${obj.nome} | ${obj.email} | ${obj.interesse}`;
    } else {
        document.getElementById("resultado-banco").innerText =
            "Nenhum dado encontrado no banco de dados.";
    }
}


function mostrarMarketing() {
    const consentimento = localStorage.getItem("cookiesAceitos");
    const dadosBanco = localStorage.getItem("bancoDados");

    if (consentimento !== "sim") {
        document.getElementById("resultado-marketing").innerText =
            "Não é possível realizar marketing personalizado sem consentimento.";
        return;
    }

    if (dadosBanco) {
        const obj = JSON.parse(dadosBanco);

        document.getElementById("resultado-marketing").innerText =
            `Olá, ${obj.nome}! Com base no seu interesse em "${obj.interesse}",
            selecionamos conteúdos e cursos relevantes para você.`;
    } else {
        document.getElementById("resultado-marketing").innerText =
            "Não há dados suficientes para personalização de marketing.";
    }
}


function atualizarPainel() {
    const consentimento = localStorage.getItem("cookiesAceitos");
    const cookie = localStorage.getItem("cookieNome");
    const banco = localStorage.getItem("bancoDados");

    document.getElementById("status-consentimento").innerText =
        "Consentimento: " + (consentimento === "sim" ? "Concedido" : "Não concedido");

    document.getElementById("status-cookie").innerText =
        "Cookie armazenado: " + (cookie ? "Sim" : "Não");

    document.getElementById("status-banco").innerText =
        "Registro em banco de dados: " + (banco ? "Sim" : "Não");
}

function abrirModal(tipo) {
    const titulo = document.getElementById("modal-titulo");
    const texto = document.getElementById("modal-texto");

    if (tipo === "cookies") {
        titulo.innerText = "Art. 7º, I — Consentimento do Titular";
        texto.innerText =
            "LGPD — Art. 7º, I:\n" +
            "O tratamento de dados pessoais somente poderá ser realizado nas seguintes hipóteses:\n\n" +
            "I - mediante o fornecimento de consentimento pelo titular.";
    }

    if (tipo === "banco") {
        titulo.innerText = "Arts. 6º e 7º — Princípios e Base Legal";
        texto.innerText =
            "LGPD — Art. 6º:\n" +
            "As atividades de tratamento de dados pessoais deverão observar a boa-fé e os seguintes princípios:\n" +
            "I - finalidade;\n" +
            "II - adequação;\n" +
            "III - necessidade.\n\n" +
            "LGPD — Art. 7º, I:\n" +
            "O tratamento de dados pessoais somente poderá ser realizado nas hipóteses legais previstas.";
    }

    if (tipo === "marketing") {
    titulo.innerText = "Marketing Digital — Base Legal (LGPD e CDC)";
    texto.innerText =
        "LGPD — Art. 9º:\n" +
        "O titular tem direito a informações claras sobre como seus dados\n" +
        "são utilizados para fins publicitários.\n\n" +

        "CDC — Art. 6º, III:\n" +
        "O consumidor tem direito à informação adequada e clara sobre\n" +
        "produtos, serviços e comunicações comerciais.";
    }

    document.getElementById("modal-legal").style.display = "block";
}

function fecharModal() {
    document.getElementById("modal-legal").style.display = "none";
}
