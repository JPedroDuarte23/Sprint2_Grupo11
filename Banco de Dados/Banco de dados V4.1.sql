CREATE DATABASE termoguard;

USE termoguard;

CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nomeFantasia VARCHAR(45),
cnpj CHAR(18)
);

CREATE TABLE usuario(
idUsuario INT AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(45),
senha VARCHAR(16),
fkEmpresa INT,
CONSTRAINT fkEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa),
CONSTRAINT pkCompostaUsu PRIMARY KEY (idUsuario,fkEmpresa)
) AUTO_INCREMENT = 500;

CREATE TABLE localizacao(
idLocal INT AUTO_INCREMENT,
cep CHAR(9),
complemento VARCHAR(45),
numero INT,
fkEmpresaLocal INT,
CONSTRAINT fkEmpresaLocal FOREIGN KEY (fkEmpresaLocal) REFERENCES empresa (idEmpresa),
CONSTRAINT pkCompostaLocal PRIMARY KEY (idLocal,fkEmpresaLocal)
) AUTO_INCREMENT = 1000;

CREATE TABLE sensor(
idSensor INT PRIMARY KEY AUTO_INCREMENT,
situacao INT,
instalacao VARCHAR(9),
fkLocal INT,
CONSTRAINT chkInst CHECK (instalacao IN ('caminhão', 'câmara', 'geladeira')),
CONSTRAINT fkLocal FOREIGN KEY (fkLocal) REFERENCES localizacao (idLocal),
CONSTRAINT chkSituacao CHECK (situacao IN (0, 1))
) AUTO_INCREMENT = 5000;

CREATE TABLE historico (
idHistorico INT AUTO_INCREMENT,
fkSensor INT,
fkUsuario INT,
alertas DATETIME DEFAULT CURRENT_TIMESTAMP, 
CONSTRAINT fkHistoricoSensor FOREIGN KEY (fkSensor) 
	REFERENCES sensor(idSensor),
CONSTRAINT fkHistoricoUsuario FOREIGN KEY (fkUsuario) 
	REFERENCES usuario(idUsuario),
CONSTRAINT pkCompostaHistorico PRIMARY KEY (idHistorico, fkSensor, fkUsuario)
) AUTO_INCREMENT = 10000;

CREATE TABLE registro(
idRegistro INT AUTO_INCREMENT,
temperatura INT,
umidade INT,
dtHora DATETIME DEFAULT CURRENT_TIMESTAMP,
fkSensor INT,
CONSTRAINT fkSensor FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor),
CONSTRAINT pkCompostaRegi PRIMARY KEY (idRegistro,fkSensor)
) AUTO_INCREMENT = 50000;

SELECT * FROM usuario;

