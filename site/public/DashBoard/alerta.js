var alertas = [];

var alertasUmidade = [];

let toastBox = document.getElementById('alertasBox');

let toastBox2 = document.getElementById('alertasBox2');

function obterDados(idSensor) {
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
    var umi = resposta[0].umidade;

    console.log(idSensor === resposta[0].fkSensor)

    var grauDeAviso = '';

    var grauDeAviso2 = '';


    var limites = {
        muito_quente: 23,
        quente: 22,
        ideal: 20,
        frio: 10,
        muito_frio: 5
    };

    var limitesUmi = {
        muito_quente: 95,
        quente: 92.85,
        ideal: 88,
        frio: 84,
        muito_frio: 80
    };

    var classe_temperatura = 'cor-alerta';

    var classe_umidade = 'cor-alerta';

    // validar temperatura

    if (temp >= limites.muito_quente) {
        classe_temperatura = 'cor-alerta perigo-quente';
        grauDeAviso = 'perigo quente'
        exibirAlerta(temp, idSensor, grauDeAviso, true)
    }
    else if (temp < limites.muito_quente && temp >= limites.quente) {
        classe_temperatura = 'cor-alerta alerta-quente';
        grauDeAviso = 'alerta quente'
        exibirAlerta(temp, idSensor, grauDeAviso, true)
    }
    // else if (temp < limites.quente && temp > limites.frio) {
    //     classe_temperatura = 'cor-alerta ideal';
    //     exibirAlerta(temp, idSensor, grauDeAviso, true)
    // }
    else if (temp <= limites.frio && temp > limites.muito_frio) {
        classe_temperatura = 'cor-alerta alerta-frio';
        grauDeAviso = 'alerta frio'
        exibirAlerta(temp, idSensor, grauDeAviso, true)
    }
    else if (temp <= limites.muito_frio) {
        classe_temperatura = 'cor-alerta perigo-frio';
        grauDeAviso = 'perigo frio'
        exibirAlerta(temp, idSensor, grauDeAviso, true)
    }

    // validar umidade

    if (umi >= limitesUmi.muito_quente) {
        classe_umidade = 'cor-alerta perigo-quente';
        grauDeAviso2 = 'perigo quente'
        exibirAlerta(umi, idSensor, grauDeAviso2, false)
    }
    else if (umi < limitesUmi.muito_quente && umi >= limitesUmi.quente) {
        classe_umidade = 'cor-alerta alerta-quente';
        grauDeAviso2 = 'alerta quente'
        exibirAlerta(umi, idSensor, grauDeAviso2, false)
    }
    // else if (umi < limitesUmi.quente && umi > limitesUmi.frio) {
    //     classe_umidade = 'cor-alerta ideal';
    //     exibirAlerta(umi, idSensor, grauDeAviso2, false)
    // }
    else if (umi <= limitesUmi.frio && umi > limitesUmi.muito_frio) {
        classe_umidade = 'cor-alerta alerta-frio';
        grauDeAviso2 = 'alerta frio'
        exibirAlerta(umi, idSensor, grauDeAviso2, false)
    }
    else if (umi <= limitesUmi.muito_frio) {
        classe_umidade = 'cor-alerta perigo-frio';
        grauDeAviso2 = 'perigo frio'
        exibirAlerta(umi, idSensor, grauDeAviso2, false)
    }
}

function exibirAlerta(tipoDado, idSensor, grauDeAviso, isTemp) {
    var indice = alertas.findIndex(item => item.idSensor == idSensor);

    if (indice >= 0) {
        alertas[indice] = { idSensor, tipoDado, grauDeAviso, isTemp };
        botaoTeste({ idSensor, tipoDado, grauDeAviso, isTemp });
    } else {
        alertas.push({ idSensor, tipoDado, grauDeAviso, isTemp });
        botaoTeste({ idSensor, tipoDado, grauDeAviso, isTemp })
    }

}


// function removerAlerta(idSensor) {
//     alertas = alertas.filter(item => item.idSensor != idSensor);
// }

// function exibirCards() {
//     toastBox.innerHTML = '';

//     for (var i = 0; i < alertas.length; i++) {
//         var mensagem = alertas[i];
//         toastBox.innerHTML += botaoTeste(mensagem);
//     }
// }

function botaoTeste({ idSensor, tipoDado, grauDeAviso, isTemp }) {

        
    
        let toastTemperatura = document.createElement('div');
        toastTemperatura.classList.add('toast2');
        toastTemperatura.innerHTML = `Alerta ${grauDeAviso} - Sensor ${idSensor} está 
                        com umidade relativa (UR) de ${tipoDado}!`;
        alertasBox.appendChild(toastTemperatura)

        setTimeout(() => {
            toastBox2.innerHTML = "";
        }, 6000);
    

        let toastUmidade = document.createElement('div');
        toastUmidade.classList.add('toast');
        toastUmidade.innerHTML = `Alerta ${grauDeAviso} - Sensor ${idSensor} está 
                       com uma temperatura de ${tipoDado}!`;
        alertasBox.appendChild(toastUmidade)

        setTimeout(() => {
            alertasBox.innerHTML = "";
        }, 6000);
    

}



