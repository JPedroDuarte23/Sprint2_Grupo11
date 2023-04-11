use sprint2;
create table empresa(
idEmpresa int primary key auto_increment,
nomeFantasia varchar(45),
cnpj char(18)
) auto_increment = 100;

insert into empresa values
(null, 'C6Bank', '12.345.678/9012-34');

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
(null, 'jorge.aragao@sptech.school', '12345678', 100);

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
(null, '12345-678', 'Apartamento 54', '45', 100);

select * from localizacao;

create table sensor(
idSensor int primary key auto_increment,
situacao int,
fkLocal int,
constraint fkLocal foreign key (fkLocal) references localizacao (idLocal),
constraint chkSituacao check (situacao in (0, 1))
) auto_increment = 400;

insert into sensor values
(null, '1', 300);

select * from sensor;

create table registro(
idRegistro int auto_increment,
temperatura int,
umidade int,
dtHora datetime default current_timestamp,
fkSensor int,
constraint fkSensor foreign key (fkSensor) references sensor (idSensor),
constraint pkCompostaRegi primary key (idRegistro,fkSensor)
) auto_increment = 500;

insert into registro (temperatura, umidade, fkSensor) values
('24', '50', 401);

select * from registro;
