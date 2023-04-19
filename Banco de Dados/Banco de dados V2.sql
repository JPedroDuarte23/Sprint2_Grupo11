CREATE DATABASE termoguard;

USE termoguard;

create table empresa(
idEmpresa int primary key auto_increment,
nomeFantasia varchar(45),
cnpj char(18)
) auto_increment = 100;

insert into empresa values
(null, 'Friboi', '12.345.678/9012-34'),
(null, 'Swift', '11.455.632/2212-12'),
(null, 'Minerva Foods', '17.777.213/9999-32');

select * from empresa;

create table usuario(
idUsuario int auto_increment,
email varchar(45),
senha varchar(30),
fkEmpresa int,
constraint fkEmpresa foreign key (fkEmpresa) references empresa (idEmpresa),
constraint pkCompostaUsu primary key (idUsuario,fkEmpresa)
) auto_increment = 200;

insert into usuario values
(null, 'jorge.aragao@sptech.school', '12345678', 100),
(null, 'paulocoelho@gmail.com', '28193048', 101),
(null, 'paulo.plinio@sptech.school', '58627493', 102);

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

insert into localizacao values
(null, '12345-678', 'Geladeira do 1° andar', '45', 100),
(null, '12341-700', 'Caminhão 7', '46', 101),
(null, '14087-843', 'Fábrica SP', '47', 102);

select * from localizacao;

create table sensor(
idSensor int primary key auto_increment,
situacao int,
fkLocal int,
constraint fkLocal foreign key (fkLocal) references localizacao (idLocal),
constraint chkSituacao check (situacao in (0, 1))
) auto_increment = 400;

insert into sensor values
(null, '1', 300),
(null, '1', 301),
(null, '1', 302);

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

insert into registro (temperatura, umidade, fkSensor) values
('2', '50', 400),
('0', '55', 401),
('4', '52', 402);

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
