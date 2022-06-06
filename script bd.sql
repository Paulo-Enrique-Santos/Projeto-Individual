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
(null, 'Me Sinto Abençoado','Musicas/me-sinto-abencoado.jpg','me-sinto-abencoado.mp3','RAP',0),
(null, 'Red Eye','Musicas/red-eye.jpg','red-eye.mp3','POP',0),
(null, 'Chuva de Arroz','Musicas/chuva-de-arroz.jpg','chuva-de-arroz.mp3','Sertanejo',0);

-- VINCULANDO A MÚSICA AO ARTISTA
insert into feat values 
(null, 1 , 1),
(null, 3 , 1),
(null, 4 , 2),
(null, 2 , 3);

    select 
        artista.nome as artista,
        musica.nome as musica,
        musica.caminhoFoto,
        likes
    from artista
        join feat on idArtista = feat.fkArtista
            join musica on feat.fkmusica = idmusica
                        order by likes desc;

