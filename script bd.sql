create database MusicFans;

use musicfans;

create table usuario (
idUsuario int primary key auto_increment,
nome 	varchar (45),
email	varchar (60),
senha 	varchar (20)
);

create table artista (
idArtista int primary key auto_increment,
nome 	varchar(45),
caminhoFoto	varchar(200),
genero	varchar(45)
);

create table musica (
idMusica int primary key auto_increment,
nome	 varchar(45),
caminhoFoto  varchar(200),
caminhoAudio varchar(200) unique,
genero varchar(45),
likes	int
);

create table feat (
idFeat int auto_increment,
fkArtista int,
foreign key (fkArtista) references Artista(idArtista),
fkMusica int,
foreign key (fkMusica) references Musica(idMusica),
primary key (idFeat, fkArtista,fkMusica)
);

create table likes (
fkUsuario int,
foreign key (fkUsuario) references usuario (idUsuario),
fkMusica int,
foreign key (fkMusica) references Musica (idMusica),
primary key(fkUsuario,fkMusica)
);

create table PlayList (
idPlayList int primary key auto_increment,
nomePlayList varchar (45),
fkUsuario int,
foreign key (fkUsuario) references Usuario(idUsuario)
);

create table MusicaPlayList (
fkMusica int,
fkPlayList int,
foreign key (fkMusica) references Musica (idMusica),
foreign key (fkPlayList) references PlayList(idPlayList),
Primary key (fkPlayList, fkMusica)
);

-- INSERINDO ARTISTAS
insert into Artista values
(null,'MC Poze do Rodo', 'Artistas/poze.png','Funk'),
(null,'Luan Santana', 'Artistas/luan.png','Sertanejo'),
(null,'Felipe Ret', 'Artistas/felipe.jpg','RAP'),
(null,'Justin Bieber', 'Artistas/justin.png','POP');

-- INSERINDO MUSICAS
insert into Musica values
(null, 'Me Sinto Abençoado','Musicas/me-sinto-abencoado.jpg','me-sinto-abencoado.mp3',0),
(null, 'Red Eye','Musicas/red-eye.jpg','red-eye.mp3',0),
(null, 'Chuva de Arroz','Musicas/chuva-de-arroz.jpg','chuva-de-arroz.mp3',0);

-- VINCULANDO A MÚSICA AO ARTISTA
insert into feat values 
(null, 1 , 1),
(null, 3 , 1),
(null, 4 , 2),
(null, 2 , 3);

insert Musicas values
(null, 'Justin Bieber', 'Red Eye', 'JB.jpg','red-eye.mp3','POP',0),
(null, 'Luan Santana', 'Chuva de Arroz', 'LUAN.jpg','chuva-de-arroz.mp3','Sertanejo',0),
(null, 'Vanessa da Mata', 'Ai Ai Ai (Felguk & Cat Dealers Remix)', 'VANESSA.jpg','ai-ai-ai.mp3','Eletrônica',0),
(null, 'MC Poze do Rodo ft. Filipe Ret','Me Sinto Abençoado (prod. Ajaxx)','POZE.jpg','me-sinto-abencoado.mp3','Funk',0),
(null, 'Charlie Brown Jr.','Como Tudo Deve Ser','CBJR.jpg','como-tudo-deve-ser.mp3','Rock',0);

insert into Musicas values
(null, 'Zé Neto e Cristiano', 'Ferida Curada', 'ZNC.jpg','ferida-curada.mp3','Sertanejo',0);

insert into Musicas values
(null, 'Anitta', 'Girl From Rio', 'ANITTA.jpg','girl-from-rio.mp3','POP',0);
