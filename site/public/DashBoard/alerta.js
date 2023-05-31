var alertas = [];

// function exibirToast(msg) {
//     

//     obterdados(5000)
//     botaoTeste(toastBox, msg)

    
// }

let toastBox = document.getElementById('alertasBox');

//     // Toast de Temperatura

//     let alertaVermelhoTemp = 'Alerta Vermelho - Sensor 2 Ultrapassou de 4°C'; 

//     var msg = alertaVermelhoTemp;

//     // let alertaAmareloTemp = 'Alerta Amarelo - Sensor 2 Ultrapassou de 2,95°C'; 
//     // let alertaAzulTemp = 'Alerta Azul - Sensor 3 Está abaixo de 0,07°C'; 
//     // let alertaRoxoTemp = 'Alerta Roxo - Sensor 4 Está abaixo de 0°C'; 

//     // // Toast de Umidade

//     // let alertaVermelhoUmi = 'Alerta Vermelho - Sensor 1 Ultrapassou de UR 95%'; 
//     // let alertaAmareloUmi = 'Alerta Amarelo - Sensor 2 Ultrapassou de UR 92,85%'; 
//     // let alertaAzulUmi = 'Alerta Azul - Sensor 3 Está abaixo de UR 84%'; 
//     // let alertaRoxoUmi = 'Alerta Roxo - Sensor 4 Está abaixo de UR 80%';


    function botaoTeste() {
    let toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = 'teste';
    alertasBox.appendChild(toast)

    setTimeout(() => {
        alertasBox.innerHTML = "";
    }, 6000);
}



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
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

}

function alertar(resposta, idSensor) {
    
    var temp = resposta[0].temperatura;
    // let msg = ""

    // if(temp >= 4) {
        // msg = "Muito quente"
        // exibirToast(msg)
    }

    // console.log(idSensor === resposta[0].fkSensor)
    
    // var grauDeAviso ='';


    // var limites = {
    //     muito_quente: 4,
    //     quente: 3.78,
    //     ideal: 2.34,
    //     frio: 1.80,
    //     muito_frio: 0
    // };

    // var classe_temperatura = 'cor-alerta';

    // if (temp >= limites.muito_quente) {
    //     classe_temperatura = 'cor-alerta perigo-quente';
    //     grauDeAviso = 'perigo quente'
    //     grauDeAvisoCor = 'cor-alerta perigo-quente'
    //     exibirAlerta(temp, idSensor, grauDeAviso, grauDeAvisoCor)
    // }
    // else if (temp < limites.muito_quente && temp >= limites.quente) {
    //     classe_temperatura = 'cor-alerta alerta-quente';
    //     grauDeAviso = 'alerta quente'
    //     grauDeAvisoCor = 'cor-alerta alerta-quente'
    //     exibirAlerta(temp, idSensor, grauDeAviso, grauDeAvisoCor)
    // }
    // else if (temp < limites.quente && temp > limites.frio) {
    //     classe_temperatura = 'cor-alerta ideal';
    //     removerAlerta(idSensor);
    // }
    // else if (temp <= limites.frio && temp > limites.muito_frio) {
    //     classe_temperatura = 'cor-alerta alerta-frio';
    //     grauDeAviso = 'alerta frio'
    //     grauDeAvisoCor = 'cor-alerta alerta-frio'
    //     exibirAlerta(temp, idSensor, grauDeAviso, grauDeAvisoCor)
    // }
    // else if (temp <= limites.muito_frio) {
    //     classe_temperatura = 'cor-alerta perigo-frio';
    //     grauDeAviso = 'perigo frio'
    //     grauDeAvisoCor = 'cor-alerta perigo-frio'
    //     exibirAlerta(temp, idSensor, grauDeAviso, grauDeAvisoCor)
    // }

/*     var card;

    if (idSensor == 1) {
        temp_aquario_1.innerHTML = temp + "°C";
        card = card_1
    } else if (idSensor == 2) {
        temp_aquario_2.innerHTML = temp + "°C";
        card = card_2
    } else if (idSensor == 3) {
        temp_aquario_3.innerHTML = temp + "°C";
        card = card_3
    } else if (idSensor == 4) {
        temp_aquario_4.innerHTML = temp + "°C";
        card = card_4
    }

    card.className = classe_temperatura; */
// }

function exibirAlerta(temp, idSensor, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas.findIndex(item => item.idSensor == idSensor);

    if (indice >= 0) {
        alertas[indice] = { idSensor, temp, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas.push({ idSensor, temp, grauDeAviso, grauDeAvisoCor });
    }

    exibirCards();
    
// Dentro da div com classe grauDeAvisoCor há um caractere "invisível", 
// que pode ser inserido clicando com o seu teclado em alt+255 ou pelo código adicionado acima.
}

function removerAlerta(idSensor) {
    alertas = alertas.filter(item => item.idSensor != idSensor);
    exibirCards();
}
 
function exibirCards() {
    alertasBox.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        alertasBox.innerHTML += transformarEmDiv(mensagem);
    }
}

// function transformarEmDiv({ idSensor, temp, grauDeAviso, grauDeAvisoCor }) {
//     return `<div class="alertasToatsBox">
//     <div class="toast">
//     <div class="${grauDeAvisoCor}">&#12644;</div> 
//      <h3>Aquário ${idSensor} está em estado de ${grauDeAviso}!</h3>
//     <small>Temperatura ${temp}.</small>   
//     </div>
//     </div>`;
// }
