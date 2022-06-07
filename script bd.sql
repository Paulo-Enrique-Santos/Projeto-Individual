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
(null,'Filipe Ret', 'Artistas/felipe.jpg','RAP'),
(null,'Justin Bieber', 'Artistas/justin.png','POP'),
(null,'Jovem Dionísio', 'Artistas/jovem-dionisio.webp','POP'),
(null,'Anavitória', 'Artistas/ana-vitoria.jpg','MPB'),
(null,'Matheus e Kauan', 'Artistas/matheus-kauan.webp','Sertanejo'),
(null,'Caio Luccas', 'Artistas/caio-luccas.jpg','RAP'),
(null,'Matheus Fernandes', 'Artistas/matheus-fernandes.webp','Forró'),
(null,'Xand Avião', 'Artistas/xand-aviao.jpg','Forró'),
(null,'CPM 22', 'Artistas/cpm22.jpg','Rock'),
(null,'Quavo', 'Artistas/quavo.jpg','RAP'),
(null,'Teto', 'Artistas/teto.jpg','Trap'),
(null,'WIU', 'Artistas/wiu.jpg','Trap'),
(null,'Matue', 'Artistas/matue.png','Trap'),
(null,'L7NNON', 'Artistas/l7nnon.webp','RAP'),
(null,'Hungria', 'Artistas/hungria.jpg','Hip Hop'),
(null,'Ferrugem', 'Artistas/ferrugem.webp','Pagode'),
(null,'Marília Mendonça', 'Artistas/marilia-mendonca.jpg','Sertanejo'),
(null,'Gaab', 'Artistas/gaab.jpg','R&B'),
(null,'Rael', 'Artistas/rael.webp','R&B');

-- INSERINDO MUSICAS
insert into Musica values
(null, 'Me Sinto Abençoado','Musicas/me-sinto-abencoado.jpg','me-sinto-abencoado.mp4','RAP',0),
(null, 'Red Eye','Musicas/red-eye.jpg','red-eye.mp4','POP',0),
(null, 'Chuva de Arroz','Musicas/chuva-de-arroz.jpg','chuva-de-arroz.mp4','Sertanejo',0),
(null, 'Acorda Pedrinho','Musicas/acorda-pedrinho.png','acorda-pedrio.mp4','POP',0),
(null, 'Fica','Musicas/fica.jpg','fica.mp4','POP',0),
(null, 'Te Assumi pro Brasil','Musicas/te-assumi-pro-brasil.jpg','te-assumi-pro-brasil.mp4','Sertanejo',0),
(null, 'Até o Final','Musicas/ate-o-final.jpg','ate-o-final.mp4','Acústico',0),
(null, 'Balanço da Rede','Musicas/balanco-rede.jpg','balanco-da-rede.mp4','Forró',0),
(null, 'Um Minuto Para o Fim do Mundo','Musicas/um-minuto-para-o-fim-do-mundo.jpg','um-minuto-para-o-fim-do-mundo.mp4','Rock',0),
(null, 'Eu Você o Mar e Ela','Musicas/eu-voce-o-mar-e-ela.jpg','eu-voce-o-mar-ela.mp4','Sertanejo',0),
(null, 'Intentions','Musicas/intentions.webp','intentions.mp4','POP',0),
(null, 'Fim de Semana no Rio','Musicas/fim-semana-rio.jpg','fim-de-semana-no-rio.mp4','Trap',0),
(null, 'Vampiro','Musicas/vampiro.jpeg','vampiro.mp4','Trap',0),
(null, 'Gratidão','Musicas/gratidao.jpg','gratidao.mp4','RAP',0),
(null, 'Um Pedido','Musicas/um pedido.jpg','um pedido.mp4','Hip Hop',0),
(null, 'Eu Juro','Musicas/eu juro.jpg','eujuro.mp4','Pagode',0),
(null, 'Intenção','Musicas/intencao.jpg','intencao.mp4','POP',0),
(null, 'Envolvidão','Musicas/envolvidao.webp','envolvidao.mp4','R&B',0);


-- VINCULANDO A MÚSICA AO ARTISTA

-- artista primeiro depois musica
insert into feat values 
(null, 1 , 1),
(null, 3 , 1),
(null, 4 , 2),
(null, 2 , 3),
(null, 5 , 4),
(null, 6 , 5),
(null, 7 , 5),
(null, 7 , 6),
(null, 8 , 7),
(null, 9 , 8),
(null, 10 , 8),
(null, 11 , 9),
(null, 2 , 10),
(null, 4 , 11),
(null, 12 , 11),
(null, 13 , 12),
(null, 13 , 13),
(null, 14 , 13),
(null, 15 , 13),
(null, 16 , 14),
(null, 17 , 15),
(null, 18 , 16),
(null, 19 , 17),
(null, 20 , 17),
(null, 21 , 18);
