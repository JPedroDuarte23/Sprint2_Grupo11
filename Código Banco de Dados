CREATE DATABASE sprint2;
USE sprint2;

CREATE TABLE CADASTRO (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Email VARCHAR(50),
    Senha VARCHAR(40),
    NomeFantasia VARCHAR(40)
)
CREATE TABLE SENSOR (
    SensorID INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(10),
    fk_Empresa INT,
    Instalação VARCHAR(40),
    CONSTRAINT fk_empresa FOREIGN KEY (fk_Empresa) REFERENCES CADASTRO(UserID),
    CONSTRAINT chk_instalacao CHECK (Instalacao IN('Geladeira','Caminhão','Câmara Fria'))
)
CREATE TABLE TEMP_UMID (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    DtHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fk_Sensor INT,
    Temperatura INT,
    Umidade INT,
    CONSTRAINT fk_sensor FOREIGN KEY (fk_Sensor) REFERENCES SENSOR(SensorID)
)

