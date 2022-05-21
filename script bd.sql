create database MusicFans;

use musicfans;

create table usuario (
idUser int primary key auto_increment,
nome 	varchar (45),
email	varchar (60),
senha 	varchar (20)
);

create table musicas (
idMusica int primary key auto_increment,
artista	 varchar(45),
musica	 varchar(45),
caminhoFoto  varchar(200),
caminhoAudio varchar(200) unique,
genero 	varchar(45),
likes	int
);

create table likes (
fkUsuario int,
foreign key (fkUsuario) references usuario (idUser),
fkMusica int,
foreign key (fkMusica) references Musicas (idMusica),
primary key(fkUsuario,fkMusica)
);

create table PlayList (
idPlayList int primary key,
nomePlayList varchar (45),
fkUsuario int,
foreign key (fkUsuario) references Usuario(idUser)
);

create table MusicaPlayList (
fkMusica int,
fkPlayList int,
foreign key (fkMusica) references Musicas (idMusica),
foreign key (fkPlayList) references PlayList(idPlayList),
Primary key (fkPlayList, fkMusica)
);

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

select 
	artista,
    musica,
    caminhoFoto,
    caminhoAudio
from 
musicas;

update musicas set likes = likes+1 where idMusica = 1;
select * from Musicas;

select * from usuario join likes on usuario.idUser = likes.fkUsuario join musicas on likes.fkMusica = musicas.idMusica where idUser = 1;

insert into Musicas values
(null, 'Barões da Pisadinha', 'Teste', 'BAROES.PNG','teste-predio.mp3','Sertanejo');

select count(fkMusica) from likes;

select distinct artista, caminhofoto, genero from musicas;

select distinct artista, caminhoFoto from musicas where genero = 'Sertanejo';

-- SELECT PARA TRAZER O TOP 10
select * from musicas order by likes desc limit 10;

-- SELECT PARA TRAZER AS ULTIMAS MÚSICAS ADICIONADAS
select * from musicas order by idMusica desc limit 10;



