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
