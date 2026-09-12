export type Genre = 'Todos' | 'Shooter' | 'RPG' | 'Acción' | 'Terror' | 'Carreras' | 'Aventura';

export interface Game {
	id: number;
	title: string;
	year: number;
	genre: Genre;
	developer: string;
	publisher: string;
	rating: string;
	gamerscore: number;
	synopsis: string;
	tagline: string;
	players: string;
	badge: string;
	hue: number;
	features: string[];
}

export const games: Game[] = [
	{
		id: 0,
		title: 'Halo 3',
		year: 2007,
		genre: 'Shooter',
		developer: 'Bungie',
		publisher: 'Microsoft Game Studios',
		rating: '94/100',
		gamerscore: 1000,
		tagline: 'Finish the fight.',
		synopsis:
			'El Jefe Maestro regresa para concluir la épica batalla intergaláctica contra el Covenant y los Flood, forjando una alianza inesperada con el Inquisidor para salvar la humanidad.',
		players: '1-4 Jugadores • Co-op pantalla dividida • Xbox Live (16 jug.)',
		badge: 'Exclusivo Legendario',
		hue: 135,
		features: ['Modo Campaña Cooperativa', 'Modo Forja', 'Modo Cine', 'Matchmaking Xbox Live']
	},
	{
		id: 1,
		title: 'Gears of War',
		year: 2006,
		genre: 'Shooter',
		developer: 'Epic Games',
		publisher: 'Microsoft Game Studios',
		rating: '94/100',
		gamerscore: 1000,
		tagline: 'El Día de la Emergencia cambió todo.',
		synopsis:
			'Marcus Fenix lidera al escuadrón Delta en una desesperada misión bajo las ruinas de Sera contra la horda Locust, redefiniendo los shooters de cobertura en tercera persona.',
		players: '1-2 Jugadores • Co-op • Multijugador Xbox Live',
		badge: 'Juego del Año',
		hue: 20,
		features: ['Sistema de Cobertura Activo', 'Recarga Activa', 'Lancer con Sierra Mecánica']
	},
	{
		id: 2,
		title: 'BioShock',
		year: 2007,
		genre: 'Shooter',
		developer: '2K Boston / Irrational',
		publisher: '2K Games',
		rating: '96/100',
		gamerscore: 1000,
		tagline: '¿Serías tan amable?',
		synopsis:
			'Tras un accidente aéreo en el océano Atlántico, Jack descubre Rapture: una fallida utopía submarina art déco consumida por la locura genética, los plásmidos y los temibles Big Daddies.',
		players: '1 Jugador',
		badge: 'Obra Maestra',
		hue: 175,
		features: ['Atmósfera Inmersiva Art Déco', 'Modificación Genética (Plásmidos)', 'Narrativa Revolucionaria']
	},
	{
		id: 3,
		title: 'Red Dead Redemption',
		year: 2010,
		genre: 'Aventura',
		developer: 'Rockstar San Diego',
		publisher: 'Rockstar Games',
		rating: '95/100',
		gamerscore: 1000,
		tagline: 'La era de los forajidos llega a su fin.',
		synopsis:
			'El exbandolero John Marston es chantajeado por agentes federales para capturar a los últimos miembros de su antigua banda a través del indómito oeste fronterizo americano y México.',
		players: '1 Jugador • Multijugador Libre (16 jug.)',
		badge: 'Platino Clásico',
		hue: 35,
		features: ['Mundo Abierto Vivo', 'Sistema Dead Eye', 'Multijugador Libre', 'Banda Sonora Épica']
	},
	{
		id: 4,
		title: 'Mass Effect 2',
		year: 2010,
		genre: 'RPG',
		developer: 'BioWare',
		publisher: 'Electronic Arts',
		rating: '96/100',
		gamerscore: 1000,
		tagline: 'Misión suicida a través del relé Omega-4.',
		synopsis:
			'Recluta a los especialistas y criminales más letales de la galaxia para llevar a cabo una misión suicida contra los misteriosos Recolectores en el espacio más peligroso conocido.',
		players: '1 Jugador',
		badge: 'Premio de la Crítica',
		hue: 215,
		features: ['Narrativa Ramificada con Decisiones', 'Combate Táctico con Poderes Bióticos', 'Normandía SR-2']
	},
	{
		id: 5,
		title: 'The Elder Scrolls V: Skyrim',
		year: 2011,
		genre: 'RPG',
		developer: 'Bethesda Game Studios',
		publisher: 'Bethesda Softworks',
		rating: '96/100',
		gamerscore: 1000,
		tagline: 'Dovahkiin: Nacido de dragones.',
		synopsis:
			'El Imperio se desmorona en una sangrienta guerra civil mientras el ancestral dragón Alduin despierta del letargo para devorar el mundo en las gélidas tierras de Skyrim.',
		players: '1 Jugador',
		badge: 'Fenómeno Cultural',
		hue: 190,
		features: ['Libertad Absoluta de Exploración', 'Gritos de Dragón (Thu’um)', 'Cientos de Horas de Misiones']
	},
	{
		id: 6,
		title: 'Fallout 3',
		year: 2008,
		genre: 'RPG',
		developer: 'Bethesda Game Studios',
		publisher: 'Bethesda Softworks',
		rating: '93/100',
		gamerscore: 1000,
		tagline: 'La guerra... la guerra nunca cambia.',
		synopsis:
			'Sal del seguro Refugio 101 hacia el páramo radiactivo de Washington D.C. en busca de tu padre, decidiendo el destino de colonias enteras mediante el sistema de combate V.A.T.S.',
		players: '1 Jugador',
		badge: 'Juego del Año',
		hue: 55,
		features: ['Sistema de Puntería Asistida V.A.T.S.', 'Radio Pip-Boy 3000', 'Sistema de Karma y Decisiones']
	},
	{
		id: 7,
		title: 'Dead Space',
		year: 2008,
		genre: 'Terror',
		developer: 'EA Redwood Shores',
		publisher: 'Electronic Arts',
		rating: '89/100',
		gamerscore: 1000,
		tagline: 'Corta sus extremidades.',
		synopsis:
			'El ingeniero Isaac Clarke acude a reparar la nave minera USG Ishimura para descubrir que la tripulación ha sido masacrada y mutada en horripilantes abominaciones alienígenas.',
		players: '1 Jugador',
		badge: 'Terror Inolvidable',
		hue: 350,
		features: ['Desmembramiento Estratégico', 'Interfaz HUD Holográfica Dieléctrica', 'Atmósfera de Sonido 3D']
	},
	{
		id: 8,
		title: 'Left 4 Dead 2',
		year: 2009,
		genre: 'Shooter',
		developer: 'Valve Corporation',
		publisher: 'Valve / Electronic Arts',
		rating: '89/100',
		gamerscore: 1000,
		tagline: 'Sobrevive junto a tus compañeros.',
		synopsis:
			'Ambientado en el apocalipsis zombi del sur profundo de Estados Unidos, cuatro supervivientes deben abrirse paso entre hordas furiosas guiadas por el implacable Director de IA.',
		players: '1-4 Jugadores • Cooperativo Local y Online • Versus 4v4',
		badge: 'Co-op Definitivo',
		hue: 90,
		features: ['Director de IA 2.0 Dinámico', 'Armas Cuerpo a Cuerpo Salvajes', 'Infectados Especiales Letales']
	},
	{
		id: 9,
		title: 'Fable II',
		year: 2008,
		genre: 'RPG',
		developer: 'Lionhead Studios',
		publisher: 'Microsoft Game Studios',
		rating: '89/100',
		gamerscore: 1000,
		tagline: 'Forja tu legado como leyenda de Albión.',
		synopsis:
			'Comenzando como un huérfano en las calles de Bowerstone, crece junto a tu leal perro hasta convertirte en el mayor héroe o villano que el mundo de Albión jamás haya visto.',
		players: '1-2 Jugadores • Co-op cooperativo dinámico',
		badge: 'Exclusivo Xbox',
		hue: 45,
		features: ['Compañero Canino Fiel', 'Ruta del Destino Luminosa', 'Economía, Familia y Propiedades']
	},
	{
		id: 10,
		title: 'Call of Duty 4: Modern Warfare',
		year: 2007,
		genre: 'Shooter',
		developer: 'Infinity Ward',
		publisher: 'Activision',
		rating: '94/100',
		gamerscore: 1000,
		tagline: 'Bravo Six, luz verde.',
		synopsis:
			'La revolución del shooter contemporáneo. El sargento Soap MacTavish y el capitán Price combaten una coalición ultranacionalista en misiones legendarias como "Todos camuflados".',
		players: '1-4 Jugadores Local • Xbox Live 18 Jugadores',
		badge: 'Revolución Multijugador',
		hue: 110,
		features: ['Rachas de Bajas y Perks', 'Nivel de Prestigio', 'Misiones Cinemáticas Inolvidables']
	},
	{
		id: 11,
		title: 'Alan Wake',
		year: 2010,
		genre: 'Terror',
		developer: 'Remedy Entertainment',
		publisher: 'Microsoft Game Studios',
		rating: '83/100',
		gamerscore: 1000,
		tagline: 'La luz es tu única arma contra la oscuridad.',
		synopsis:
			'Un novelista en crisis viaja al pacífico pueblo de Bright Falls, donde su esposa desaparece y las páginas de un libro de terror que no recuerda haber escrito cobran vida letal.',
		players: '1 Jugador',
		badge: 'Thriller Psicológico',
		hue: 205,
		features: ['Combate con Linterna y Luz', 'Estructura por Episodios de TV', 'Misterio Escrito por Sam Lake']
	},
	{
		id: 12,
		title: 'Forza Motorsport 4',
		year: 2011,
		genre: 'Carreras',
		developer: 'Turn 10 Studios',
		publisher: 'Microsoft Game Studios',
		rating: '91/100',
		gamerscore: 1000,
		tagline: 'Donde los sueños se encuentran con el asfalto.',
		synopsis:
			'La simulación de conducción definitiva de la generación. Más de 500 coches licenciados reproducidos con fidelidad absoluta, físicas realistas e integración con Top Gear.',
		players: '1-2 Jugadores Local • 16 Jugadores Xbox Live',
		badge: 'Simulador Definitivo',
		hue: 15,
		features: ['Modo Autovista Detallado', 'Físicas de Neumáticos Pirelli', 'Clubes de Coches en Línea']
	},
	{
		id: 13,
		title: 'Portal 2',
		year: 2011,
		genre: 'Aventura',
		developer: 'Valve Corporation',
		publisher: 'Valve Corporation',
		rating: '95/100',
		gamerscore: 1000,
		tagline: 'Pensar con portales nunca fue tan divertido.',
		synopsis:
			'Despierta en las ruinas centenarias de Aperture Science y resuelve complejos rompecabezas físicos junto a Wheatley mientras te enfrentas al ácido ingenio de GLaDOS.',
		players: '1-2 Jugadores • Campaña Co-op Atlas y P-Body',
		badge: 'Puzles Magistrales',
		hue: 200,
		features: ['Mecánicas de Portales y Geles', 'Modo Cooperativo para Dos Jugadores', 'Guion y Doblaje Impecable']
	},
	{
		id: 14,
		title: 'Dark Souls',
		year: 2011,
		genre: 'RPG',
		developer: 'FromSoftware',
		publisher: 'Bandai Namco Games',
		rating: '89/100',
		gamerscore: 1000,
		tagline: 'Prepárate para morir.',
		synopsis:
			'En un reino maldito al borde de la extinción de la Primera Llama, viaja como un Hueco errante por Lordran enfrentando jefes legendarios y descubriendo secretos en cada rincón.',
		players: '1 Jugador • Invasiones y Co-op Online',
		badge: 'Desafío Maestro',
		hue: 270,
		features: ['Diseño de Niveles Interconectado', 'Combate Exigente y Preciso', 'Mensajes y Fantasmas Online']
	},
	{
		id: 15,
		title: 'Batman: Arkham City',
		year: 2011,
		genre: 'Acción',
		developer: 'Rocksteady Studios',
		publisher: 'Warner Bros. Interactive',
		rating: '94/100',
		gamerscore: 1000,
		tagline: 'La noche nunca ha sido tan oscura.',
		synopsis:
			'Batman queda atrapado en Arkham City, una prisión de máxima seguridad que abarca barrios enteros de Gotham, donde el Joker, Ra’s al Ghul y Hugo Strange conspiran.',
		players: '1 Jugador',
		badge: 'El Caballero Oscuro',
		hue: 220,
		features: ['Combate Freeflow Perfeccionado', 'Planeo sobre Gotham City', 'Modo Detective Avanzado']
	},
	{
		id: 16,
		title: 'Gears of War 3',
		year: 2011,
		genre: 'Shooter',
		developer: 'Epic Games',
		publisher: 'Microsoft Game Studios',
		rating: '91/100',
		gamerscore: 1000,
		tagline: 'Hermanos hasta el fin.',
		synopsis:
			'El clímax de la trilogía. Con la humanidad al borde del exterminio ante los nuevos Lambent mutados, Marcus Fenix descubre que su padre sigue vivo con la clave para erradicar la plaga.',
		players: '1-4 Jugadores Co-op Campaña • Modo Horda 2.0',
		badge: 'Campaña Épica',
		hue: 25,
		features: ['Campaña Co-op de 4 Jugadores', 'Modo Horda 2.0 con Fortificaciones', 'Modo Bestia']
	},
	{
		id: 17,
		title: 'Halo: Reach',
		year: 2010,
		genre: 'Shooter',
		developer: 'Bungie',
		publisher: 'Microsoft Game Studios',
		rating: '91/100',
		gamerscore: 1000,
		tagline: 'Recuerda Reach.',
		synopsis:
			'La conmovedora despedida de Bungie de la franquicia Halo. Vive la heroica y trágica caída del planeta Reach desde los ojos de Noble Seis y su escuadrón de supersoldados Spartan-III.',
		players: '1-4 Jugadores Co-op • Tiroteo (Firefight) • 16 jug. Online',
		badge: 'La Última Defensa',
		hue: 145,
		features: ['Habilidades de Armadura Spartan', 'Modo Tiroteo (Firefight)', 'Personalización Total de Armadura']
	},
	{
		id: 18,
		title: 'Assassin’s Creed II',
		year: 2009,
		genre: 'Aventura',
		developer: 'Ubisoft Montreal',
		publisher: 'Ubisoft',
		rating: '90/100',
		gamerscore: 1000,
		tagline: 'La venganza renace en Florencia.',
		synopsis:
			'Sigue la maduración del joven noble Ezio Auditore da Firenze en el Renacimiento italiano mientras domina las artes de los Asesinos con la ayuda de su amigo Leonardo da Vinci.',
		players: '1 Jugador',
		badge: 'Renacimiento Dorado',
		hue: 40,
		features: ['Florencia, Venecia y Toscana', 'Hojas Ocultas Gemelas', 'Construcción de Villa Monteriggioni']
	},
	{
		id: 19,
		title: 'Grand Theft Auto IV',
		year: 2008,
		genre: 'Acción',
		developer: 'Rockstar North',
		publisher: 'Rockstar Games',
		rating: '98/100',
		gamerscore: 1000,
		tagline: 'El sueño americano cuesta caro.',
		synopsis:
			'Niko Bellic llega a Liberty City persiguiendo una vida mejor prometida por su primo Roman, pero pronto se ve arrastrado al submundo criminal por viejas deudas y traiciones.',
		players: '1 Jugador • Multijugador Xbox Live 16 Jugadores',
		badge: 'Puntuación Histórica',
		hue: 210,
		features: ['Motor Físico Euphoria Realista', 'Liberty City Increíblemente Detallada', 'Narrativa Cruda y Adulta']
	},
	{
		id: 20,
		title: 'BioShock Infinite',
		year: 2013,
		genre: 'Shooter',
		developer: 'Irrational Games',
		publisher: '2K Games',
		rating: '93/100',
		gamerscore: 1000,
		tagline: 'Tráenos a la chica y saldarás tu deuda.',
		synopsis:
			'El exagente Booker DeWitt es enviado a la deslumbrante ciudad flotante de Columbia en 1912 para rescatar a Elizabeth, una joven dotada del poder de desgarrar el tejido del tiempo.',
		players: '1 Jugador',
		badge: 'Aventura en los Cielos',
		hue: 195,
		features: ['Ciudad Flotante de Columbia', 'Líneas Aéreas Sky-Lines', 'Desgarros Dimensionales con Elizabeth']
	},
	{
		id: 21,
		title: 'The Elder Scrolls IV: Oblivion',
		year: 2006,
		genre: 'RPG',
		developer: 'Bethesda Game Studios',
		publisher: 'Bethesda Softworks',
		rating: '94/100',
		gamerscore: 1000,
		tagline: 'Cierra los portales de Oblivion.',
		synopsis:
			'Tras el asesinato del emperador Uriel Septim VII, viaja por la provincia imperial de Cyrodiil para encontrar al heredero perdido y cerrar las infernales puertas daédricas.',
		players: '1 Jugador',
		badge: 'Pionero de la Generación',
		hue: 30,
		features: ['Inteligencia Artificial Radiant AI', 'Gremio de Ladrones y Hermandad Oscura', 'Mundo Exuberante']
	},
	{
		id: 22,
		title: 'Borderlands 2',
		year: 2012,
		genre: 'Shooter',
		developer: 'Gearbox Software',
		publisher: '2K Games',
		rating: '89/100',
		gamerscore: 1000,
		tagline: 'Miles de millones de armas. Un solo psicópata.',
		synopsis:
			'Únete a una nueva generación de buscadores de la Cámara en el desquiciado planeta Pandora para derrotar al carismático y despiadado tirano Handsome Jack.',
		players: '1-4 Jugadores • Co-op Online y Pantalla Dividida',
		badge: 'Looter Shooter Rey',
		hue: 50,
		features: ['Billones de Armas Procedurales', 'Villano Icónico Handsome Jack', 'Árboles de Habilidades Dinámicos']
	},
	{
		id: 23,
		title: 'Mirror’s Edge',
		year: 2008,
		genre: 'Acción',
		developer: 'EA DICE',
		publisher: 'Electronic Arts',
		rating: '81/100',
		gamerscore: 1000,
		tagline: 'Corre por los tejados de la libertad.',
		synopsis:
			'Faith Connors es una "Runner" que transmite mensajes ilegales por las alturas de una deslumbrante metrópolis distópica, esquivando balas mediante parkour en primera persona.',
		players: '1 Jugador • Carreras Contrarreloj Online',
		badge: 'Estilo Visual Puro',
		hue: 345,
		features: ['Parkour Fluido en Primera Persona', 'Estética Minimalista y Blanca', 'Velocidad y Vértigo']
	},
	{
		id: 24,
		title: 'Bayonetta',
		year: 2009,
		genre: 'Acción',
		developer: 'PlatinumGames',
		publisher: 'SEGA',
		rating: '90/100',
		gamerscore: 1000,
		tagline: 'Acción desenfrenada y brujería elegante.',
		synopsis:
			'La última superviviente de las Brujas de Umbra despierta sin memoria tras 500 años y desata acrobáticos combos de combate, pistolas en los tacones y monstruosos ataques de cabello.',
		players: '1 Jugador',
		badge: 'Hack and Slash Magistral',
		hue: 290,
		features: ['Mecánica Tiempo Brujo (Witch Time)', 'Combates Colosales a 60 FPS', 'Armas en Manos y Pies']
	},
	{
		id: 25,
		title: 'Lost Odyssey',
		year: 2007,
		genre: 'RPG',
		developer: 'Mistwalker / Feelplus',
		publisher: 'Microsoft Game Studios',
		rating: '78/100',
		gamerscore: 1000,
		tagline: 'Mil años de memorias y sueños.',
		synopsis:
			'Del creador de Final Fantasy, Hironobu Sakaguchi. Kaim Argonar es un guerrero inmortal que ha vivido un milenio perdiendo a todos sus seres queridos en una revolución mágica-industrial.',
		players: '1 Jugador (4 Discos)',
		badge: 'JRPG Legendario',
		hue: 260,
		features: ['Relatos "Mil Años de Sueños"', 'Música de Nobuo Uematsu', 'Sistema de Turnos Táctico por Anillos']
	},
	{
		id: 26,
		title: 'Silent Hill: Downpour',
		year: 2012,
		genre: 'Terror',
		developer: 'Vatra Games',
		publisher: 'Konami',
		rating: '68/100',
		gamerscore: 1000,
		tagline: 'El agua arrastra tus peores pecados.',
		synopsis:
			'El preso Murphy Pendleton huye tras el vuelco de su furgón penitenciario y se adentra en el sector sureste de Silent Hill, donde tormentas torrenciales desatan pesadillas vivientes.',
		players: '1 Jugador',
		badge: 'Terror Psicológico',
		hue: 180,
		features: ['Clima Dinámico de Lluvia y Niebla', 'Armas Improvisadas Rompibles', 'Dilemas Morales de Culpa']
	},
	{
		id: 27,
		title: 'Project Gotham Racing 4',
		year: 2007,
		genre: 'Carreras',
		developer: 'Bizarre Creations',
		publisher: 'Microsoft Game Studios',
		rating: '85/100',
		gamerscore: 1000,
		tagline: 'Estilo, velocidad y clima salvaje.',
		synopsis:
			'La máxima expresión de las carreras urbanas con el galardonado sistema de Kudos. Compite por metrópolis mundiales conduciendo superdeportivos y motos bajo lluvia y nieve dinámicas.',
		players: '1-4 Jugadores Local • 8 Jugadores Online',
		badge: 'Carreras de Autor',
		hue: 155,
		features: ['Sistema de Puntos Kudos', 'Motos y Superdeportivos Mixtos', 'Clima Dinámico (Hielo, Niebla, Lluvia)']
	},
	{
		id: 28,
		title: 'Castlevania: Lords of Shadow',
		year: 2010,
		genre: 'Acción',
		developer: 'MercurySteam',
		publisher: 'Konami',
		rating: '83/100',
		gamerscore: 1000,
		tagline: 'La cruz de combate purifica las sombras.',
		synopsis:
			'Gabriel Belmont emprende un viaje para salvar el alma de su esposa asesinada, blandiendo la legendaria Cruz de Combate contra licántropos, vampiros y titanes colosales.',
		players: '1 Jugador',
		badge: 'Aventura Gótica',
		hue: 330,
		features: ['Cruz de Combate Multifunción', 'Magia de Luz y Magia de Sombra', 'Batallas con Titanes Colosales']
	},
	{
		id: 29,
		title: 'Spec Ops: The Line',
		year: 2012,
		genre: 'Shooter',
		developer: 'Yager Development',
		publisher: '2K Games',
		rating: '77/100',
		gamerscore: 1000,
		tagline: '¿Te sientes como un héroe ahora?',
		synopsis:
			'El capitán Martin Walker lidera una patrulla de reconocimiento en un Dubái devastado por tormentas de arena para encontrar al batallón perdido, afrontando decisiones morales desgarradoras.',
		players: '1 Jugador • Multijugador Online',
		badge: 'Deconstrucción Bélica',
		hue: 28,
		features: ['Narrativa Basada en El Corazón de las Tinieblas', 'Físicas de Arena Dinámica', 'Decisiones Morales']
	},
	{
		id: 30,
		title: 'Viva Piñata',
		year: 2006,
		genre: 'Aventura',
		developer: 'Rare',
		publisher: 'Microsoft Game Studios',
		rating: '84/100',
		gamerscore: 1000,
		tagline: 'Siembra vida, atrae criaturas mágicas.',
		synopsis:
			'Transforma un descuidado pedazo de tierra en la paradisíaca Isla Piñata, cultivando flora exótica y diseñando hábitats para atraer a más de 60 especies de coloridas piñatas vivientes.',
		players: '1-2 Jugadores Local y Xbox Live',
		badge: 'Joya Oculta de Rare',
		hue: 80,
		features: ['Simulación Ecosistémica Detallada', 'Más de 60 Especies de Piñatas', 'Colorido Visual Deslumbrante']
	},
	{
		id: 31,
		title: 'Street Fighter IV',
		year: 2008,
		genre: 'Acción',
		developer: 'Capcom / Dimps',
		publisher: 'Capcom',
		rating: '93/100',
		gamerscore: 1000,
		tagline: 'El renacer de los luchadores mundiales.',
		synopsis:
			'El juego que revivió la escena de los juegos de lucha a nivel mundial, combinando modelos poligonales 3D con jugabilidad 2D clásica, efectos de pintura sumi-e y el sistema Focus Attack.',
		players: '1-2 Jugadores • Torneos en Línea Xbox Live',
		badge: 'Rey de la Lucha',
		hue: 10,
		features: ['Sistema de Ataque Focus (Saving Attack)', 'Ultra Combos Espectaculares', 'Estética Tinta Japonesa']
	}
];
