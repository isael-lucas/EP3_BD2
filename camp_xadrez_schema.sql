CREATE DATABASE xadrez;
USE xadrez;

SET foreign_key_checks = 0;
DROP TABLE IF EXISTS `Hotel`;
DROP TABLE IF EXISTS `Participante`;
DROP TABLE IF EXISTS `Salao`;
DROP TABLE IF EXISTS `Acomoda`;
DROP TABLE IF EXISTS `Jogador`;
DROP TABLE IF EXISTS `CampPart`;
DROP TABLE IF EXISTS `MedioSal`;
DROP TABLE IF EXISTS `Jogo`;
DROP TABLE IF EXISTS `Movimento`;
DROP TABLE IF EXISTS `Joga`;
DROP TABLE IF EXISTS `Pais`;
SET foreign_key_checks = 1;


CREATE TABLE `Hotel` (
  `NomeHotel` varchar(200) NOT NULL,
  `EndHotel` varchar(200) NOT NULL,
  `Telefone` varchar(200) NOT NULL,
  PRIMARY KEY (`NomeHotel`)
) DEFAULT CHARSET=utf8;

CREATE TABLE `Participante` (
  `NumAssoc` integer NOT NULL,
  `NomeAssoc` varchar(200) NOT NULL,
  `Endereco` varchar(200) NOT NULL,
  `TelContato` varchar(200) NOT NULL,
  `CodPais` varchar(200) NOT NULL,
  `TipoPart` varchar(200) NOT NULL,
  PRIMARY KEY (`NumAssoc`)
) DEFAULT CHARSET=utf8;

CREATE TABLE `Salao` (
  `IdSal` integer NOT NULL,
  `NomeHotel` varchar(200) NOT NULL,
  `capacidade` integer NOT NULL DEFAULT 0,
  PRIMARY KEY (`IdSal`),
  FOREIGN KEY (`NomeHotel`) REFERENCES Hotel(`NomeHotel`)
) DEFAULT CHARSET=utf8;

CREATE TABLE `Acomoda` (
  `NomeHotel` varchar(200) NOT NULL,
  `NumAssoc` integer NOT NULL,
  `DataSaida` varchar(200) NOT NULL,
  `DataEntrada` varchar(200) NOT NULL,
  FOREIGN KEY (`NomeHotel`) REFERENCES Hotel(`NomeHotel`),
  FOREIGN KEY (`NumAssoc`) REFERENCES Participante(`NumAssoc`)
) DEFAULT CHARSET=utf8;

CREATE TABLE `Jogador` (
  `NumAssoc` integer NOT NULL,
  `Nivel` varchar(200) NOT NULL,
  FOREIGN KEY (`NumAssoc`) REFERENCES Participante(`NumAssoc`)
) DEFAULT CHARSET=utf8;

CREATE TABLE `CampPart` (
  `NumAssoc` integer NOT NULL,
  `NomeCamp` varchar(200) NOT NULL,
  `TipoParticip` varchar(200) NOT NULL,
  PRIMARY KEY (`NomeCamp`),
  FOREIGN KEY (`NumAssoc`) REFERENCES Participante(`NumAssoc`)
) DEFAULT CHARSET=utf8;

CREATE TABLE `MedioSal` (
  `IdSal` integer NOT NULL,
  `Medio` varchar(200) NOT NULL,
  PRIMARY KEY (`Medio`),
  FOREIGN KEY (`IdSal`) REFERENCES Salao(`IdSal`)
) DEFAULT CHARSET=utf8;

CREATE TABLE `Jogo` (
  `CodJogo` integer NOT NULL,
  `NumArb` integer NOT NULL,
  `IdSal` integer NOT NULL,
  `EntrVend` integer NOT NULL DEFAULT 0,
  `DiaJorn` integer NOT NULL,
  `MesJorn` integer NOT NULL,
  `AnoJorn` integer NOT NULL,
  PRIMARY KEY (`CodJogo`),
  FOREIGN KEY (`NumArb`) REFERENCES Participante(`NumAssoc`),
  FOREIGN KEY (`IdSal`) REFERENCES Salao(`IdSal`)
) DEFAULT CHARSET=utf8;

CREATE TABLE `Movimento` (
  `CodJogo` integer NOT NULL,
  `IdMov` integer NOT NULL,
  `Jogada` varchar(200) NOT NULL,
  `Comentario` varchar(200) NOT NULL DEFAULT '',
  PRIMARY KEY (`IdMov`),
  FOREIGN KEY (`CodJogo`) REFERENCES Jogo(`CodJogo`)
) DEFAULT CHARSET=utf8;

CREATE TABLE `Joga` (
  `CodJogo` integer NOT NULL,
  `NumJogador` integer NOT NULL,
  `Cor` varchar(200) NOT NULL,
  FOREIGN KEY (`CodJogo`) REFERENCES Jogo(`CodJogo`),
  FOREIGN KEY (`NumJogador`) REFERENCES Jogador(`NumAssoc`)
) DEFAULT CHARSET=utf8;

CREATE TABLE `Pais` (
  `NumPais` varchar(200) NOT NULL,
  `NomePais` varchar(200) NOT NULL,
  `NumClubes` integer NOT NULL,
  PRIMARY KEY (`NumPais`)
) DEFAULT CHARSET=utf8;

-- Inserindo dados nas tabelas Hotel, Participante, Salao, Acomoda, Jogador, CampPart, MedioSal, Jogo, Movimento, Joga e Pais
INSERT INTO Hotel (NomeHotel, EndHotel, Telefone)
VALUES 
    ('Hotel A', 'Endereço A', '1234567890'),
    ('Hotel B', 'Endereço B', '9876543210'),
    ('Hotel C', 'Endereço C', '5555555555'),
    ('Hotel D', 'Endereço D', '4444444444'),
    ('Hotel E', 'Endereço E', '5555555555');

INSERT INTO Participante (NumAssoc, NomeAssoc, Endereco, TelContato, CodPais, TipoPart)
VALUES 
    (1, 'Participante 1', 'Endereço 1', '1111111111', 'BR', 'Tipo 1'),
    (2, 'Participante 2', 'Endereço 2', '2222222222', 'US', 'Tipo 2'),
    (3, 'Participante 3', 'Endereço 3', '3333333333', 'ES', 'Tipo 3'),
    (4, 'Participante 4', 'Endereço 4', '4444444444', 'UK', 'Tipo 4'),
    (5, 'Participante 5', 'Endereço 5', '5555555555', 'FR', 'Tipo 5');

INSERT INTO Salao (IdSal, NomeHotel, capacidade)
VALUES 
    (1, 'Hotel A', 100),
    (2, 'Hotel B', 150),
    (3, 'Hotel C', 200),
    (4, 'Hotel D', 120),
    (5, 'Hotel E', 180);

INSERT INTO Acomoda (NomeHotel, NumAssoc, DataSaida, DataEntrada)
VALUES 
    ('Hotel A', 1, '2023-06-15', '2023-06-10'),
    ('Hotel B', 2, '2023-06-16', '2023-06-11'),
    ('Hotel C', 3, '2023-06-17', '2023-06-12'),
    ('Hotel D', 4, '2023-06-18', '2023-06-13'),
    ('Hotel E', 5, '2023-06-19', '2023-06-14');

INSERT INTO Jogador (NumAssoc, Nivel)
VALUES 
    (1, 'Nível 1'),
    (2, 'Nível 2'),
    (3, 'Nível 3'),
    (4, 'Nível 4'),
    (5, 'Nível 5');

INSERT INTO CampPart (NumAssoc, NomeCamp, TipoParticip)
VALUES 
    (1, 'Campeonato 1', 'Tipo 1'),
    (2, 'Campeonato 2', 'Tipo 2'),
    (3, 'Campeonato 3', 'Tipo 3'),
    (4, 'Campeonato 4', 'Tipo 4'),
    (5, 'Campeonato 5', 'Tipo 5');

INSERT INTO MedioSal (IdSal, Medio)
VALUES 
    (1, 'Médio 1'),
    (2, 'Médio 2'),
    (3, 'Médio 3'),
    (4, 'Médio 4'),
    (5, 'Médio 5');

INSERT INTO Jogo (CodJogo, NumArb, IdSal, EntrVend, DiaJorn, MesJorn, AnoJorn)
VALUES 
    (1, 1, 1, 100, 1, 6, 2023),
    (2, 2, 2, 200, 2, 6, 2023),
    (3, 3, 3, 300, 3, 6, 2023),
    (4, 4, 4, 400, 4, 6, 2023),
    (5, 5, 5, 500, 5, 6, 2023);

INSERT INTO Movimento (CodJogo, IdMov, Jogada, Comentario)
VALUES 
    (1, 1, 'Jogada 1', 'Comentário 1'),
    (2, 2, 'Jogada 2', 'Comentário 2'),
    (3, 3, 'Jogada 3', 'Comentário 3'),
    (4, 4, 'Jogada 4', 'Comentário 4'),
    (5, 5, 'Jogada 5', 'Comentário 5');

INSERT INTO Joga (CodJogo, NumJogador, Cor)
VALUES 
    (1, 1, 'Branco'),
    (2, 2, 'Preto'),
    (3, 3, 'Branco'),
    (4, 4, 'Preto'),
    (5, 5, 'Branco');

INSERT INTO Pais (NumPais, NomePais, NumClubes)
VALUES 
    ('BR', 'Brasil', 10),
    ('US', 'Estados Unidos', 15),
    ('ES', 'Espanha', 8),
    ('UK', 'Reino Unido', 12),
    ('FR', 'França', 6);
