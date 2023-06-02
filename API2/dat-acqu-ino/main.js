// não altere!
const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');
const sql = require('mssql');

// não altere!
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// configure a linha abaixo caso queira que os dados capturados sejam inseridos no banco de dados.
// false -> nao insere
// true -> insere
const HABILITAR_OPERACAO_INSERIR = true;

// altere o valor da variável AMBIENTE para o valor desejado:
// API conectada ao banco de dados remoto, SQL Server -> 'producao'
// API conectada ao banco de dados local, MySQL Workbench - 'desenvolvimento'
const AMBIENTE = 'desenvolvimento';

const serial = async (
    valoresSensor1Umidade,
    valoresSensor1Temperatura,
    valoresSensor2Umidade,
    valoresSensor2Temperatura,
    valoresSensor3Umidade,
    valoresSensor3Temperatura,
    valoresSensor4Umidade,
    valoresSensor4Temperatura,
   
) => {
    let poolBancoDados = ''

    if (AMBIENTE == 'desenvolvimento') {
        poolBancoDados = mysql.createPool(
            {
                // altere!
                // CREDENCIAIS DO BANCO LOCAL - MYSQL WORKBENCH
                host: 'localhost',
                user: 'Rian',
                password: 'Rian2911',
                database: 'termoguard'
            }
        ).promise();
    } else if (AMBIENTE == 'producao') {
        console.log('Projeto rodando inserindo dados em nuvem. Configure as credenciais abaixo.');
    } else {
        throw new Error('Ambiente não configurado. Verifique o arquivo "main.js" e tente novamente.');
    }


    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' }))
    .on('data', async (data) => {
        console.log(data);
        const valores = data.split(';');        
        const sensor1_umidade = parseFloat(valores[0]);
        const sensor1_temperatura = parseFloat(valores[1]);
        const sensor2_umidade = parseFloat(valores[2]);
        const sensor2_temperatura = parseFloat(valores[3]);
        const sensor3_umidade = parseFloat(valores[4]);
        const sensor3_temperatura = parseFloat(valores[5]);
        const sensor4_umidade = parseFloat(valores[6]);
        const sensor4_temperatura = parseFloat(valores[7]);
       
        valoresSensor1Umidade.push(sensor1_umidade);
        valoresSensor1Temperatura.push(sensor1_temperatura);
        valoresSensor2Umidade.push(sensor2_umidade);
        valoresSensor2Temperatura.push(sensor2_temperatura);
        valoresSensor3Umidade.push(sensor3_umidade);
        valoresSensor3Temperatura.push(sensor3_temperatura);
        valoresSensor4Umidade.push(sensor4_umidade);
        valoresSensor4Temperatura.push(sensor4_temperatura);
       

        if (HABILITAR_OPERACAO_INSERIR) {
            if (AMBIENTE == 'producao') {
                // altere!
                // Este insert irá inserir os dados na tabela "medida"
                // -> altere nome da tabela e colunas se necessário
                // Este insert irá inserir dados de fk_aquario id=1 (fixo no comando do insert abaixo)
                // >> Importante! você deve ter o aquario de id 1 cadastrado.
                sqlquery = `INSERT INTO registro (idRegistro, temperatura, umidade, dtHora, fkSensor) VALUES (?, ${dht11Temperatura}, ${dht11Umidade}, CURRENT_TIMESTAMP, ?)`;

                // CREDENCIAIS DO BANCO REMOTO - SQL SERVER
                // Importante! você deve ter criado o usuário abaixo com os comandos presentes no arquivo
                // "script-criacao-usuario-sqlserver.sql", presente neste diretório.
                const connStr = "Server=servidor-acquatec.database.windows.net;Database=bd-acquatec;User Id=usuarioParaAPIArduino_datawriter;Password=#Gf_senhaParaAPI;";

                function inserirComando(conn, sqlquery) {
                    conn.query(sqlquery);
                    console.log("valores inseridos no banco: "  + dht11Temperatura + dht11Umidade  )
                }

                sql.connect(connStr)
                    .then(conn => inserirComando(conn, sqlquery))
                    .catch(err => console.log("erro! " + err));

            } else if (AMBIENTE == 'desenvolvimento') {

                // altere!
                // Este insert irá inserir os dados na tabela "medida"
                // -> altere nome da tabela e colunas se necessário
                // Este insert irá inserir dados de fk_aquario id=1 (fixo no comando do insert abaixo)
                // >> você deve ter o aquario de id 1 cadastrado.
                await poolBancoDados.execute(
                    'INSERT INTO registro (temperatura, umidade, dtHora, fkSensor) VALUES (?, ?, now(), 5000)',
                    [sensor1_umidade, sensor1_temperatura]
                );
                await poolBancoDados.execute(
                    'INSERT INTO registro (temperatura, umidade, dtHora, fkSensor) VALUES (?, ?, now(), 5001)',
                    [sensor2_umidade, sensor2_temperatura]
                );
                await poolBancoDados.execute(
                    'INSERT INTO registro (temperatura, umidade, dtHora, fkSensor) VALUES (?, ?, now(), 5002)',
                    [sensor3_umidade, sensor3_temperatura]
                );
                await poolBancoDados.execute(
                    'INSERT INTO registro (temperatura, umidade, dtHora, fkSensor) VALUES (?, ?, now(), 5003)',
                    [sensor4_umidade, sensor4_temperatura]
                );
                console.log("valores inseridos no banco: " + sensor1_temperatura + ","+ sensor1_umidade +
                sensor2_temperatura + ","+ sensor2_umidade +
                sensor3_temperatura + ","+ sensor3_umidade +
                sensor4_temperatura + ","+ sensor4_umidade)

            } else {
                throw new Error('Ambiente não configurado. Verifique o arquivo "main.js" e tente novamente.');
            }
        }
    });
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}


// não altere!
const servidor = (
    valoresSensor1Umidade,
    valoresSensor1Temperatura,
    valoresSensor2Umidade,
    valoresSensor2Temperatura,
    valoresSensor3Umidade,
    valoresSensor3Temperatura,
    valoresSensor4Umidade,
    valoresSensor4Temperatura
) => {
    const app = express();
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });
    app.get('/sensores/sensor1/umidade', (_, response) => {
        return response.json(valoresSensor1Umidade);
    });
    app.get('/sensores/sensor1/temperatura', (_, response) => {
        return response.json(valoresSensor1Temperatura);
    });
    app.get('/sensores/sensor2/umidade', (_, response) => {
        return response.json(valoresSensor2Umidade);
    });
    app.get('/sensores/sensor2/temperatura', (_, response) => {
        return response.json(valoresSensor2Temperatura);
    });
    app.get('/sensores/sensor3/umidade', (_, response) => {
        return response.json(valoresSensor3Umidade);
    });
    app.get('/sensores/sensor3/temperatura', (_, response) => {
        return response.json(valoresSensor3Temperatura);
    });
    app.get('/sensores/sensor4/umidade', (_, response) => {
        return response.json(valoresSensor4Umidade);
    });
    app.get('/sensores/sensor4/temperatura', (_, response) => {
        return response.json(valoresSensor4Temperatura);
    });
}

(async () => {    
    const valoresSensor1Umidade = [];
    const valoresSensor1Temperatura = [];
    const valoresSensor2Umidade = [];
    const valoresSensor2Temperatura = [];
    const valoresSensor3Umidade = [];
    const valoresSensor3Temperatura = [];
    const valoresSensor4Umidade = [];
    const valoresSensor4Temperatura = [];

    await serial(        
        valoresSensor1Umidade,
        valoresSensor1Temperatura,
        valoresSensor2Umidade,
        valoresSensor2Temperatura,
        valoresSensor3Umidade,
        valoresSensor3Temperatura,
        valoresSensor4Umidade,
        valoresSensor4Temperatura,
    );
    servidor(        
        valoresSensor1Umidade,
        valoresSensor1Temperatura,
        valoresSensor2Umidade,
        valoresSensor2Temperatura,
        valoresSensor3Umidade,
        valoresSensor3Temperatura,
        valoresSensor4Umidade,
        valoresSensor4Temperatura,
    );
})();
