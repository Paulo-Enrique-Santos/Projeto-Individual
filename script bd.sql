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

	select 
		artista.nome as Artista,
		musica.nome as Musica,
		idMusica,
        musica.caminhoFoto,
        musica.caminhoAudio
	from Playlist
		join musicaplaylist on idPlaylist = fkplaylist
			join musica on musicaplaylist.fkmusica = idMusica
				join feat on idMusica = feat.fkMusica
					join artista on fkArtista = idArtista
						where idPlaylist = 1;

select * from MusicaPlaylist;

delete from MusicaPlaylist where fkMusica = 1 and fkPlaylist = 7;

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

-- LISTAR GENEROS DIFERENTES 
select distinct genero from Artista;

-- LISTAR ARTISTAS SEPARADOS POR GÊNERO
select distinct 
	nome, 
    caminhoFoto 
from Artista
	where genero = 'RAP';
    
-- LISTAR MUSICAS 
select 
	idMusica,
    musica.nome as musica,
    artista.nome as artista,
    musica.caminhoFoto,
    musica.caminhoAudio
from musica join feat on idMusica = fkMusica 
	join Artista on fkArtista = idArtista;
    
-- LISTAR QUANTOS LIKES E MUSICAS TEM O ARTISTA
select 
	count(idMusica) as musics, 
    sum(likes) as likes 
from musica 
	join feat on idMusica = feat.fkMusica 
		join artista on feat.fkArtista = idArtista 
			where idArtista = 1;

-- LISTAR TODAS AS PLAYLIST DE UM DETERMINADO USUARIO
select 
	playlist.idPlaylist,
    playlist.nomePlaylist
from Usuario
	join playlist on idUsuario = fkUsuario 
		where fkUsuario = 1;

    insert into MusicaPlaylist values 
    (2,9);
    
-- SELECIONAR OS TOPS 3 DAS MÚSICAS
select 
    musica.nome as musica,
    musica.caminhoFoto,
    likes
from artista
	join feat on idArtista = feat.fkArtista
		join musica on feat.fkmusica = idmusica
				group by musica.nome
					order by likes desc limit 3;

select * from musica;

update musica set likes = 5 where idMusica = 2;

-- BUSCAR TODAS AS PLAYLIST DE UM DETERMINADO USUARIO
select 
	idPlaylist,
    nomePlaylist
from usuario 
	join playlist on idUsuario = fkUsuario
		where idUsuario = 1;

select idMusica,musica.nome as musica, artista.nome as artista, musica.caminhoFoto, caminhoAudio from usuario join likes on usuario.idUsuario = likes.fkUsuario join musica on likes.fkMusica = musica.idMusica 
	join feat on idMusica = feat.fkMusica 
		join artista on feat.fkArtista = idArtista where idUsuario = 1;

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

select distinct artista, caminhoFoto, genero from musicas;

select count(likes), sum(likes) from Musicas where artista = 'Luan Santana';

