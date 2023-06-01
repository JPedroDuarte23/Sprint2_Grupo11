var alertas = [];

let toastBox = document.getElementById('alertasBox');

function obterdados(idSensor) {
    fetch(`/medidas/tempo-real/${idSensor}`)
        .then(resposta => {

            if (resposta.ok) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    alertar(resposta, idSensor);
                });
            } else {

                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do sensor p/ gráfico: ${error.message}`);
        });

}

function alertar(resposta, idSensor) {
    var temp = resposta[0].temperatura;

    console.log(idSensor === resposta[0].fkSensor)
    
    var grauDeAviso ='';


    var limites = {
        muito_quente: 23,
        quente: 22,
        ideal: 20,
        frio: 10,
        muito_frio: 5
    };

    var classe_temperatura = 'cor-alerta';

    if (temp >= limites.muito_quente) {
        classe_temperatura = 'cor-alerta perigo-quente';
        grauDeAviso = 'perigo quente'
        // grauDeAvisoCor = 'cor-alerta perigo-quente'
        exibirAlerta(temp, idSensor, grauDeAviso)
    }
    else if (temp < limites.muito_quente && temp >= limites.quente) {
        classe_temperatura = 'cor-alerta alerta-quente';
        grauDeAviso = 'alerta quente'
        // grauDeAvisoCor = 'cor-alerta alerta-quente'
        exibirAlerta(temp, idSensor, grauDeAviso)
    }
    else if (temp < limites.quente && temp > limites.frio) {
        classe_temperatura = 'cor-alerta ideal';
        removerAlerta(idSensor);
    }
    else if (temp <= limites.frio && temp > limites.muito_frio) {
        classe_temperatura = 'cor-alerta alerta-frio';
        grauDeAviso = 'alerta frio'
        // grauDeAvisoCor = 'cor-alerta alerta-frio'
        exibirAlerta(temp, idSensor, grauDeAviso)
    }
    else if (temp <= limites.muito_frio) {
        classe_temperatura = 'cor-alerta perigo-frio';
        grauDeAviso = 'perigo frio'
        // grauDeAvisoCor = 'cor-alerta perigo-frio'
        exibirAlerta(temp, idSensor, grauDeAviso)
    }
}

function exibirAlerta(temp, idSensor, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas.findIndex(item => item.idSensor == idSensor);

    if (indice >= 0) {
        alertas[indice] = { idSensor, temp, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas.push({ idSensor, temp, grauDeAviso, grauDeAvisoCor });
    }
    
// Dentro da div com classe grauDeAvisoCor há um caractere "invisível", 
// que pode ser inserido clicando com o seu teclado em alt+255 ou pelo código adicionado acima.
}

function exibirCards() {
    alerta.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        alerta.innerHTML += botaoTeste(mensagem);
    }
}

function botaoTeste({ idSensor, temp, grauDeAviso, grauDeAvisoCor}) {
    let toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = `${grauDeAvisoCor} Alerta ${grauDeAviso} - Sensor ${idSensor} está 
                       com uma temperatura de ${temp} `;
    alertasBox.appendChild(toast)

    setTimeout(() => {
        alertasBox.innerHTML = "";
    }, 6000);
}

// function transformarEmDiv({ idSensor, temp, grauDeAviso, grauDeAvisoCor }) {
//     return `<div class="mensagem-alarme">
//     <div class="informacao">
//     <div class="${grauDeAvisoCor}">&#12644;</div> 
//      <h3>Aquário ${idSensor} está em estado de ${grauDeAviso}!</h3>
//     <small>Temperatura ${temp}.</small>   
//     </div>
//     <div class="alarme-sino"></div>
//     </div>`;
// }