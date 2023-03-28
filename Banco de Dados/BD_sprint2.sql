CREATE DATABASE sprint2;
USE sprint2;

CREATE TABLE EMPRESA (
    IDEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    Email VARCHAR(50) NOT NULL,
    Senha VARCHAR(40) NOT NULL,
    Empresa VARCHAR(50) NOT NULL,
);
CREATE TABLE LOTE (
    IDLote INT PRIMARY KEY AUTO_INCREMENT,
    Serial VARCHAR(50) NOT NULL,
    fk_Lote_Empresa INT,
    fk_Lote_Sensor INT,
    CONSTRAINT fk_Lote_Empresa FOREIGN KEY (fk_Lote_Empresa) REFERENCES EMPRESA(IDEmpresa),
    CONSTRAINT fk_Lote_Sensor FOREIGN KEY (fk_Lote_Sensor) REFERENCES SENSOR(SensorID)
);
CREATE TABLE SENSOR (
    IDSensor INT PRIMARY KEY AUTO_INCREMENT,
    fk_Empresa INT,
    Instalação VARCHAR(40),
    CONSTRAINT fk_empresa FOREIGN KEY (fk_Empresa) REFERENCES EMPRESA(IDEmpresa),
    CONSTRAINT chk_instalacao CHECK (Instalacao IN('fábrica', 'caminhão', 'câmara fria'))
);
CREATE TABLE REGISTRO (
    IDRegistro INT PRIMARY KEY AUTO_INCREMENT,
    DtHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fk_Sensor INT,
    Temperatura INT,
    Umidade INT,
    CONSTRAINT fk_sensor FOREIGN KEY (fk_Sensor) REFERENCES SENSOR(SensorID)
);
