-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

CREATE DATABASE termoguard;

USE termoguard;

CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nomeFantasia VARCHAR(45),
cnpj CHAR(18)
);
INSERT INTO empresa VALUES 
 (100,'C6','123456789');
 
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


/*
comando para sql server - banco remoto - ambiente de produção
*/

CREATE TABLE usuario (
	id INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
);

CREATE TABLE aviso (
	id INT PRIMARY KEY IDENTITY(1,1),
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT FOREIGN KEY REFERENCES usuario(id)
);

create table aquario (
/* em nossa regra de negócio, um aquario tem apenas um sensor */
	id INT PRIMARY KEY IDENTITY(1,1),
	descricao VARCHAR(300)
);

/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */

CREATE TABLE medida (
	id INT PRIMARY KEY IDENTITY(1,1),
	dht11_umidade DECIMAL,
	dht11_temperatura DECIMAL,
	luminosidade DECIMAL,
	lm35_temperatura DECIMAL,
	chave TINYINT,
	momento DATETIME,
	fk_aquario INT FOREIGN KEY REFERENCES aquario(id)
);

/*
comandos para criar usuário em banco de dados azure, sqlserver,
com permissão de insert + update + delete + select
*/

CREATE USER [usuarioParaAPIWebDataViz_datawriter_datareader]
WITH PASSWORD = '#Gf_senhaParaAPIWebDataViz',
DEFAULT_SCHEMA = dbo;

EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

EXEC sys.sp_addrolemember @rolename = N'db_datareader',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';
