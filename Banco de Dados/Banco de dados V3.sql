CREATE DATABASE termoguard;

USE termoguard;

create table empresa(
idEmpresa int primary key auto_increment,
nomeFantasia varchar(45),
cnpj char(18)
) auto_increment = 100;

select * from empresa;

create table usuario(
idUsuario int auto_increment,
email varchar(45),
senha varchar(30),
fkEmpresa int,
constraint fkEmpresa foreign key (fkEmpresa) references empresa (idEmpresa),
constraint pkCompostaUsu primary key (idUsuario,fkEmpresa)
) auto_increment = 200;

select * from usuario;

create table localizacao(
idLocal int auto_increment,
cep char(9),
complemento varchar(45),
numero int,
fkEmpresaLocal int,
constraint fkEmpresaLocal foreign key (fkEmpresaLocal) references empresa (idEmpresa),
constraint pkCompostaLocal primary key (idLocal,fkEmpresaLocal)
) auto_increment = 300;

select * from localizacao;

create table sensor(
idSensor int primary key auto_increment,
situacao int,
instalacao varchar(9),
fkLocal int,
constraint chkInst check (instalacao in ('caminhão', 'câmara', 'geladeira')),
constraint fkLocal foreign key (fkLocal) references localizacao (idLocal),
constraint chkSituacao check (situacao in (0, 1))
) auto_increment = 400;

select * from sensor;

create table registro(
idRegistro int auto_increment,
temperatura int,
umidade int,
dtHora datetime default current_timestamp,
fkSensor int,
constraint fkSensor foreign key (fkSensor) references Sensor(idSensor),
constraint pkCompostaRegi primary key (idRegistro,fkSensor)
) auto_increment = 500;

select * from registro;

SELECT * FROM empresa JOIN usuario
	ON fkEmpresa = idEmpresa;
    
SELECT * FROM localizacao JOIN empresa
	ON fkEmpresaLocal = idEmpresa;

SELECT localizacao.cep AS LocalEndereço,
localizacao.complemento AS LocalDescrição
	FROM localizacao JOIN sensor
		ON fkLocal = idLocal;
        
SELECT * FROM empresa JOIN usuario JOIN localizacao
	JOIN sensor JOIN registro
		ON fkEmpresa = idEmpresa;